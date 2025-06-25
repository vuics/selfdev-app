import React, { useState, useEffect, useRef } from 'react'
import { JsonEditor } from 'json-edit-react'
import axios from 'axios'
import {
  Container,
  Loader,
  Message,
  Card,
  Grid,
  Button,
  Checkbox,
  Segment,
  Icon,
  Header,
  Dropdown,
  List,
  Label,
  Popup,
} from 'semantic-ui-react'
import Ajv from 'ajv'
import { client, xml } from '@xmpp/client'
import { v4 as uuidv4 } from 'uuid'

import Menubar from './components/Menubar'
import conf from './conf'
import archetypes, { defaultArchetype } from './archetypes'

const ajv = new Ajv()

const Hive = () => {
  const [ agents, setAgents ] = useState([])
  const [ agentsImmutable, setAgentsImmutable ] = useState([])
  const [ archetype, setArchetype ] = useState(defaultArchetype.value)
  const [ options, setOptions ] = useState(() => defaultArchetype.defaultOptions())
  const [ responseError, setResponseError ] = useState('')
  const [ validationError, setValidationError ] = useState('')
  const [ responseMessage, setResponseMessage ] = useState('')
  const [ adding, setAdding ] = useState(false)
  const [ loading, setLoading ] = useState(true)
  const fileInputRef = useRef(null);

  const xmppRef = useRef(null);
  const [ credentials, setCredentials ] = useState(null)
  const [ roster, setRoster ] = useState([])
  const [ presence, setPresence ] = useState({});

  // console.log('roster:', roster)
  // console.log('presence:', presence)

  useEffect(() =>{
    async function fetchCredentials () {
      try {
        const response = await axios.post(`${conf.api.url}/xmpp/credentials`, { }, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          crossOrigin: { mode: 'cors' },
        })
        console.log('fetchCredentials response:', response)
        const { user, password, jid } = response.data
        setCredentials({ user, password, jid })
      } catch (err) {
        console.error('xmpp/credentials error:', err)
        setResponseError(err?.response?.data?.message || 'Error retrieving credentials.')
        setLoading(false)
      }
    }
    fetchCredentials()
  }, [])

  useEffect(() => {
    console.log('xmpp client credentials:', credentials)
    if (!credentials || !credentials.user || !credentials.password || !credentials.jid) {
      return console.error("No credentials error")
    }

    // Initialize XMPP client
    const xmpp = client({
      service: conf.xmpp.websocketUrl,
      domain: conf.xmpp.host,
      username: credentials.user,
      password: credentials.password,
      tls: {
        rejectUnauthorized: false
      }
    });
    xmppRef.current = xmpp;
    console.log('xmpp:', xmpp)

    // Handle online event
    xmpp.on('online', async (jid) => {
      console.log(`Connected as ${jid.toString()}`);

      // Get roster (contact list)
      await xmpp.send(xml('iq', { type: 'get', id: 'roster_1' },
        xml('query', { xmlns: 'jabber:iq:roster' })
      ));
      console.log('Requested roster');

      // Send initial presence to let the server know we're online
      xmpp.send(xml('presence'));
      console.log('Sent initial presence');

      setLoading(false)
    });

    // Handle errors
    xmpp.on('error', (err) => {
      setLoading(false)
      console.error('XMPP error:', err);
      setResponseError(`XMPP error: ${err}`)
    });

    // Handle disconnection
    xmpp.on('close', () => {
      setLoading(false)
      console.log('Connection closed');
    });

    // Handle incoming stanzas
    xmpp.on('stanza', (stanza) => {
      // console.log('Got stanza:', stanza.toString());

      if (stanza.is('iq') && stanza.attrs.type === 'result') {
        const query = stanza.getChild('query', 'jabber:iq:roster');
        if (query) {
          console.log('recieved roster query:', query)
          const items = query.getChildren('item');
          if (items && items.length) {
            const updatedRoster = items.map(({ attrs }) => {
              return {
                jid: attrs.jid.split('/')[0],
                name: attrs.name,
              };
            });
            setRoster(updatedRoster);
          }
        }
      } else if (stanza.is('presence')) {
        const from = stanza.attrs.from;
        const type = stanza.attrs.type;
        const jid = from.split('/')[0];

        setPresence(prev => {
          return { ...prev, [jid]: type !== 'unavailable' };
        });
      }

      // Skip non-message stanzas
      if (!stanza.is('message')) return;

      const body = stanza.getChildText('body');
      if (!body) return;

      const from = stanza.attrs.from;
      const type = stanza.attrs.type;

      if (type === 'chat' || type === 'normal' || !type) {
        console.log(`Personal message response from ${from}: ${body}`);
      } else if (type === 'groupchat') {
        // Skip our own messages
        if (from.includes(`/${credentials.user}`)) return;
        // Skip historical messages
        const delay = stanza.getChild('delay');
        if (delay) return;
        console.log(`Group chat message from ${from}: ${body}`);
      }
    });

    xmpp.start().catch(console.error);
  }, [credentials]) // presense should not be supplied because it should only connect once

  const addToRoster = ({ jid, name, groups = [] } = {}) => {
    const iq = xml(
      'iq',
      { type: 'set', id: `roster_${uuidv4()}` },
      xml('query', { xmlns: 'jabber:iq:roster' }, [
        xml(
          'item',
          { jid, name },
          groups.map(group => xml('group', {}, group))
        ),
      ])
    )
    xmppRef.current.send(iq)
    console.log('addToRoster iq:', iq)

    // Send a subscription request
    const presence = xml('presence', { to: jid, type: 'subscribe' })
    xmppRef.current.send(presence)
    console.log('addToRoster subscribe presense:', presence)
  }

  const removeFromRoster = ({ jid }) => {
    const iq = xml(
      'iq',
      { type: 'set', id: `remove_${uuidv4()}` },
      xml('query', { xmlns: 'jabber:iq:roster' }, [
        xml('item', { jid, subscription: 'remove' }),
      ])
    )

    xmppRef.current.send(iq)
  }

  const sortAgents = (a, b) => {
    // 1. Sort by deployed (true first)
    if (a.deployed !== b.deployed) {
      return b.deployed - a.deployed  // true > false → descending
    }

    // 2. Sort by updatedAt (newer first)
    const updatedA = new Date(a.updatedAt || 0)
    const updatedB = new Date(b.updatedAt || 0)

    if (updatedA.getTime() !== updatedB.getTime()) {
      return updatedB - updatedA
    }

    // 3. Sort by createdAt (newer first)
    const createdA = new Date(a.createdAt || 0)
    const createdB = new Date(b.createdAt || 0)

    return createdB - createdA
  }

  const indexAgents = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${conf.api.url}/agent?skip=${conf.hive.skip}&limit=${conf.hive.limit}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('agents index res:', res)
      setAgents(res?.data.sort(sortAgents) || [])
      setAgentsImmutable(res?.data || [])
    } catch (err) {
      console.error('indexAgents error:', err);
      return setResponseError(err?.response?.data?.message || 'Error getting agents.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setOptions(archetypes[archetype].defaultOptions())
  }, [archetype])


  useEffect(() => {
    indexAgents()
  }, [])

  const postAgent = async ({ agent = null } = {}) => {
    setLoading(true)
    try {
      const res = await axios.post(`${conf.api.url}/agent`, {
        deployed: false,
        archetype: agent ? agent.archetype : archetype,
        options: agent ? agent.options : options,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('post agent res:', res)
      // setResponseMessage(`Agent created successfully`)
      setAgents(agents => [res.data, ...agents])
      setAgentsImmutable(agentsImmutable => [res.data, ...agentsImmutable])
      setOptions(archetypes[archetype].defaultOptions())
      addToRoster({
        jid: `${res.data.options.name}@${credentials.user}.${conf.xmpp.host}`,
        name: res.data.options.name,
        groups: res.data.options.joinRooms,
      })
    } catch (err) {
      console.error('post agent error:', err);
      return setResponseError(err.toString() || 'Error posting agent.')
    } finally {
      setLoading(false)
    }
  }

  const putAgent = async ({ agent }) => {
    setLoading(true)
    try {
      const res = await axios.put(`${conf.api.url}/agent/${agent._id}`, {
        ...agent,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('agent put res:', res)
      // setResponseMessage(`Agent updated successfully`)
      const prevAgent = agentsImmutable.find(a => a._id === agent._id)
      setAgents(agents.map(a => a._id === res.data._id ? res.data : a))
      setAgentsImmutable(agentsImmutable.map(a => a._id === res.data._id ? res.data : a))
      const jid = `${res.data.options.name}@${credentials.user}.${conf.xmpp.host}`
      const name = res.data.options.name
      const inRoster = roster.find(r => r.jid === jid && r.name === name)
      console.log('jid:', jid, ', name:', name, ', inRoster:', inRoster)
      if (!inRoster) {
        console.log('Agent with name:', res.data.options.name, ', and jid:', jid, 'does not exist in roster. Adding...')
        removeFromRoster({
          jid: `${prevAgent.options.name}@${credentials.user}.${conf.xmpp.host}`,
        })
        addToRoster({
          jid,
          name: res.data.options.name,
          groups: res.data.options.joinRooms,
        })
      }
    } catch (err) {
      console.error('delete agent error:', err);
      return setResponseError(err.toString() || 'Error deleting agent.')
    } finally {
      setLoading(false)
    }
  }

  const deleteAgent = async ({ _id }) => {
    setLoading(true)
    try {
      const res = await axios.delete(`${conf.api.url}/agent/${_id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('agent delete res:', res)
      // setResponseMessage(`Agent deleted successfully`)
      const [deletedAgent] = agents.filter(obj => obj._id === _id)
      setAgents(agents.filter(obj => obj._id !== _id))
      setAgentsImmutable(agentsImmutable.filter(obj => obj._id !== _id))
      removeFromRoster({
        jid: `${deletedAgent.options.name}@${credentials.user}.${conf.xmpp.host}`,
      })
    } catch (err) {
      console.error('delete agent error:', err);
      return setResponseError(err.toString() || 'Error deleting agent.')
    } finally {
      setLoading(false)
    }
  }

  const downloadAgents = () => {
    setLoading(true)
    try {
      const jsonString = JSON.stringify(agents, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const firstName = localStorage.getItem('user.firstName')
      const lastName = localStorage.getItem('user.lastName')
      link.download = `${firstName}${lastName}.sda.json`;
      link.click();
      URL.revokeObjectURL(url); // Clean up
    } catch (err) {
      console.error('download agents error:', err);
      return setResponseError(err.toString() || 'Error downloading agents.')
    } finally {
      setLoading(false)
    }
  };

  const uploadAgents = async (event) => {
    setLoading(true)
    try {
      const file = event.target.files[0];
      if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const parsedAgents = JSON.parse(e.target.result);
            for (const agent of parsedAgents) {
              await postAgent({ agent })
            }
            console.log('Agents loaded:', parsedAgents);
          } catch (err) {
            alert('Invalid JSON file.');
          }
        };
        reader.readAsText(file);
      } else {
        alert('Please upload a valid JSON file.');
      }
    } catch (err) {
      console.error('upload agents error:', err);
      return setResponseError(err.toString() || 'Error uploading map.')
    } finally {
      setLoading(false)
    }
  };

  const uploadAgentsInit = () => {
    fileInputRef.current.click(); // triggers hidden input
  };

  return (<>
    <Container fluid>
      <Menubar />
    </Container>

    <Container style={{ marginTop: '1rem' }}>
      <Loader active={loading} inline='centered' />
      { responseError &&
        <Message
          negative
          style={{ textAlign: 'left'}}
          icon='exclamation circle'
          header='Error'
          content={responseError}
          onDismiss={() => setResponseError('')}
        />
      }
      { responseMessage &&
        <Message
          positive
          style={{ textAlign: 'left'}}
          icon='info circle'
          header='Info'
          content={responseMessage}
          onDismiss={() => setResponseMessage('')}
        />
      }
      { validationError &&
        <Message
          negative
          style={{ textAlign: 'left'}}
          icon='exclamation circle'
          header='Schema Validation Error'
          content={validationError}
          onDismiss={() => setValidationError('')}
        />
      }

      { !adding && (
        <div>
        <Button size='large' onClick={() => setAdding(!adding) }>
          <Icon.Group size='large'>
            <Icon name='spy' />
            <Icon corner name='add' />
          </Icon.Group>
          {' '}Add Agent{' '}
        </Button>
        <Button.Group floated='right'>
          <Popup content='Download agents' trigger={
            <Button icon onClick={downloadAgents}>
              <Icon name='download' />
              Download
            </Button>
          } />
          <Popup content='Upload agents' trigger={
            <Button icon onClick={uploadAgentsInit}>
              <Icon name="upload" />
              <input
                type="file"
                accept="application/json"
                ref={fileInputRef}
                onChange={uploadAgents}
                style={{ display: 'none' }} // hide input
              />
              Upload
            </Button>
          } />
        </Button.Group>
       </div>
      )}
      <br/>

      { adding && (
        <Segment stacked>
          <Header as='h4'>Add Agent</Header>
          <span>
            Archetype:{' '}
            <Dropdown
              inline
              placeholder='Select Archetype'
              search
              options={ Object.values(archetypes) }
              defaultValue={ archetype }
              onChange={(e, { value }) => setArchetype(value) }
            />
          </span>
          <br/>
          <span>Options:</span>
          <JsonEditor
            data={ options }
            setData={ setOptions }
            defaultValue=''
            rootName=''
            maxWidth='1100px'
            onUpdate={ ({ newData }) => {
              const validate = ajv.compile(archetypes[archetype].schema)
              const valid = validate(newData)
              if (!valid) {
                console.log('Validation Errors:', validate.errors)
                const errorMessage = validate.errors
                  ?.map((error) => `${error.instancePath}${error.instancePath ? ': ' : ''}${error.message}`)
                  .join('\n')
                setValidationError(
                  `Not compliant with JSON Schema ${errorMessage}`
                )
                return 'JSON Schema error'
              }
            }}
            />
          <br/>
          <Button.Group>
            <Button onClick={() => setAdding(!adding) }>
              <Icon name='cancel' />
              {' '}Cancel{' '}
            </Button>
            <Button.Or />
            <Button positive onClick={() => { postAgent(); setAdding(!adding) }}>
              <Icon name='save' />
              {' '}Submit{' '}
            </Button>
          </Button.Group>
        </Segment>
      )}
      <br/>
      <br/>

      <Grid>
        { agents.map((agent) => (
          <Grid.Row key={agent._id}>
            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={13}>
                          <Icon
                            name={
                              presence[`${agent.options.name}@${credentials?.user}.${conf.xmpp.host}`]
                                ? (agent.deployed ? 'spy' : 'spinner')
                                : (agent.deployed ? 'spinner' : 'spy')
                            }
                            color={
                              presence[`${agent.options.name}@${credentials?.user}.${conf.xmpp.host}`]
                                ? (agent.deployed ? 'green' : 'red')
                                : (agent.deployed ? 'yellow' : 'grey')
                            }
                            loading={
                              presence[`${agent.options.name}@${credentials?.user}.${conf.xmpp.host}`]
                                ? (agent.deployed ? false : true)
                                : (agent.deployed ? true : false)
                            }
                          />
                          {agent.options?.name || '(no name)'}
                        </Grid.Column>
                        <Grid.Column width={3}>
                          <Dropdown item simple position='right'
                            icon={
                             <Icon name='cog' color='grey'/>
                            }>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => {
                                  setAgents(agents.map(a =>
                                    a._id === agent._id ? { ...a, editing: true } : a
                                  ))
                                }}
                              >
                                <Icon name='edit' />
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  deleteAgent({ _id: agent._id })
                                }}
                              >
                                <Icon name='delete' />
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Header>
                  <Card.Meta textAlign='center'>
                    { archetypes[agent.archetype].text }
                  </Card.Meta>
                  <Card.Description>
                    {agent.options?.description || '(no description)' }
                  </Card.Description>
                  { agent.options?.joinRooms?.length > 0 && (
                    <List>
                    { agent.options?.joinRooms?.map(room => (
                        <Label><List.Item>{room}</List.Item></Label>
                    ))}
                    </List>
                  ) }
                </Card.Content>
                <Card.Content extra>
                  <Checkbox toggle label='Deployed'
                    disabled={agent.editing}
                    onChange={(e, data) => {
                      putAgent({ agent: {...agent, deployed: data.checked } })
                    }}
                    checked={agent.deployed}
                  />
                </Card.Content>
                { agent.editing && (
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      <Button basic color='grey'
                        onClick={() => {
                          const foundAgent = agentsImmutable.find(a => a._id === agent._id)
                          setAgents(agents.map(a =>
                            a._id === agent._id ? { ...foundAgent, editing: false } : a
                          ))
                        }}
                      >
                        Cancel
                      </Button>
                      { agent.edited && (
                        <Button color='yellow'
                          onClick={() => {
                            putAgent({ agent })
                          }}
                        >
                          Update
                        </Button>
                      )}
                    </div>
                </Card.Content>
                ) }
              </Card>
            </Grid.Column>
            { agent.editing && (
              <Grid.Column width={12}>
                <JsonEditor
                  data={ agent.options || {} }
                  setData={ (options) => {
                    setAgents(agents.map(a =>
                      a._id === agent._id ? { ...agent, options, edited: true } : a
                    ))
                  } }
                  defaultValue=''
                  rootName=''
                  maxWidth='1000px'
                  />
              </Grid.Column>
            )}
          </Grid.Row>
        ))}
      </Grid>
    </Container>
  </>)
}

export default Hive
