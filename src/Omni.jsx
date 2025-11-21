import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import {
  Container,
  Segment,
  Loader,
  Message,
  Header,
  Menu,
  Icon,
  Button,
  Card,
  Checkbox,
  Dropdown,
  Popup,
  // Divider,
  // Accordion,
  // Input,
  // List,
  // Label,
  // Confirm,
  // Form,
  // Table,
} from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import Form from '@rjsf/semantic-ui'
import validator from '@rjsf/validator-ajv8';
import connectors, { defaultConnector } from './connectors'
import { useXmppContext } from './components/XmppContext'
import { sortDeployed } from './Hive'

import Menubar from './components/Menubar'
import conf from './conf'

export default function Omni () {
  const { t } = useTranslation('Omni')
  const [ responseError, setResponseError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ bridges, setBridges ] = useState([])
  const [ bridgesImmutable, setBridgesImmutable ] = useState([])
  const [ connector, setConnector ] = useState(defaultConnector.key)
  const [ adding, setAdding ] = useState(false)
  const fileInputRef = useRef(null);

  const { xmppClient } = useXmppContext()
  const [ roster, setRoster ] = useState(xmppClient?.roster || [])
  const [ presence, setPresence ] = useState(xmppClient?.presence || {});
  // console.log('presence:', presence)
  // console.log('roster:', roster)

  useEffect(() => {
    if (!xmppClient?.emitter) return;
    setRoster(xmppClient.roster)
    setPresence(xmppClient.presence)
    xmppClient.emitter.on('roster', setRoster)
    xmppClient.emitter.on('presence', setPresence)
    return () => {
      xmppClient.emitter.removeListener('roster', setRoster)
      xmppClient.emitter.removeListener('presence', setPresence)
    }
  }, [xmppClient]);

  const indexBridges = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${conf.api.url}/bridge?skip=${conf.omni.skip}&limit=${conf.omni.limit}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      // console.log('res:', res)
      console.log('res.data:', res.data)
      setBridges(res.data.sort(sortDeployed) || [])
      setBridgesImmutable(res?.data || [])
    } catch (err) {
      console.error('get bridges error:', err);
      return setResponseError(err?.response?.data?.message || t('Error getting bridges.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    indexBridges()
  }, [])

  const postBridge = async ({ bridge = null, bridgeOptions = null } = {}) => {
    setLoading(true)
    try {
      const res = await axios.post(`${conf.api.url}/bridge`, {
        deployed: false,
        connector: bridge ? bridge.connector : connector,
        options: bridge ? bridge.options : bridgeOptions,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      // console.log('res:', res)
      console.log('res.data:', res.data)
      setBridges([ ...bridges, res.data ])
      setBridgesImmutable(bridgesImmutable => [res.data, ...bridgesImmutable])
      await xmppClient?.addToRoster({
        jid: `${res.data.options.name}@${xmppClient?.credentials.user}.${conf.xmpp.host}`,
        name: res.data.options.name,
        groups: [res.data.options.joinRoom],
      })
    } catch (err) {
      console.error('get bridges error:', err);
      return setResponseError(err?.response?.data?.message || t('Error getting bridges.'))
    } finally {
      setLoading(false)
    }
  }

  const putBridge = async ({ bridge }) => {
    setLoading(true)
    try {
      console.log('putBridge bridge:', bridge)
      const res = await axios.put(`${conf.api.url}/bridge/${bridge._id}`, {
        ...bridge,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      console.log('bridge put res:', res)
      // setResponseMessage(`Bridge updated successfully`)
      const prevBridge = bridgesImmutable.find(b => b._id === bridge._id)
      setBridges(bridges.map(b => b._id === res.data._id ? res.data : b))
      setBridgesImmutable(bridgesImmutable.map(b => b._id === res.data._id ? res.data : b))
      const jid = `${res.data.options.name}@${xmppClient?.credentials.user}.${conf.xmpp.host}`
      const name = res.data.options.name
      const inRoster = roster.find(r => r.jid === jid && r.name === name)
      console.log('jid:', jid, ', name:', name, ', inRoster:', inRoster)
      if (!inRoster) {
        console.log('Bridge with name:', res.data.options.name, ', and jid:', jid, 'does not exist in roster. Adding...')
        await xmppClient?.removeFromRoster({
          jid: `${prevBridge.options.name}@${xmppClient?.credentials.user}.${conf.xmpp.host}`,
        })
        await xmppClient?.addToRoster({
          jid,
          name: res.data.options.name,
          groups: [res.data.options.joinRoom],
        })
      }
    } catch (err) {
      console.error('put bridge error:', err);
      return setResponseError(err?.response?.data?.message || err.toString() || t('Error putting bridge.'))
    } finally {
      setLoading(false)
    }
  }

  const deleteBridge = async ({ _id }) => {
    setLoading(true)
    try {
      const res = await axios.delete(`${conf.api.url}/bridge/${_id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      console.log('bridge delete res:', res)
      const [deletedBridge] = bridges.filter(obj => obj._id === _id)
      setBridges(bridges.filter(obj => obj._id !== _id))
      setBridgesImmutable(bridgesImmutable.filter(obj => obj._id !== _id))
      await xmppClient?.removeFromRoster({
        jid: `${deletedBridge.options.name}@${xmppClient?.credentials.user}.${conf.xmpp.host}`,
      })
    } catch (err) {
      console.error('delete bridge error:', err);
      return setResponseError(err?.response?.data?.message || err.toString() || t('Error deleting bridge.'))
    } finally {
      setLoading(false)
    }
  }

  const downloadBridges = () => {
    setLoading(true)
    try {
      const jsonString = JSON.stringify(bridges, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bridges.sdb.json`;
      link.click();
      URL.revokeObjectURL(url); // Clean up
    } catch (err) {
      console.error('download bridges error:', err);
      return setResponseError(err.toString() || t('Error downloading bridges.'))
    } finally {
      setLoading(false)
    }
  };

  const uploadBridges = async (event) => {
    setLoading(true)
    try {
      const file = event.target.files[0];
      if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const parsedBridges = JSON.parse(e.target.result);
            for (const bridge of parsedBridges) {
              await postBridge({ bridge })
            }
            console.log('Bridges loaded:', parsedBridges);
            await indexBridges()
          } catch (err) {
            alert(`${t('Invalid JSON file')}: ${err}`);
          }
        };
        reader.readAsText(file);
      } else {
        alert(t('Please upload a valid JSON file.'))
      }
    } catch (err) {
      console.error('upload bridges error:', err);
      return setResponseError(err.toString() || t('Error uploading bridge.'))
    } finally {
      setLoading(false)
    }
  };

  const uploadBridgesInit = () => {
    fileInputRef.current.click(); // triggers hidden input
  };

  // const log = (type) => console.log.bind(console, type);

  // console.log('connector:', connector)

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
          header={t('error')}
          content={responseError}
          onDismiss={() => setResponseError('')}
        />
      }

      <Segment secondary>
        <Header as='h3'>
          {t('Omni-channel')}
        </Header>

        { !adding && (<>
          <Button size='large' onClick={() => setAdding(!adding) }>
            <Icon.Group size='large'>
              <Icon name='linkify' />
              <Icon corner name='add' />
            </Icon.Group>
            {' '}
            {t('Add Bridge')}
            {' '}
          </Button>
          <Button.Group floated='right'>
            <Popup content='Download bridges' trigger={
              <Button icon onClick={downloadBridges}>
                <Icon name='download' />
                {t('Download')}
              </Button>
            } />
            <Popup content='Upload bridges' trigger={
              <Button icon onClick={uploadBridgesInit}>
                <Icon name="upload" />
                <input
                  type="file"
                  accept="application/json"
                  ref={fileInputRef}
                  onChange={uploadBridges}
                  style={{ display: 'none' }} // hide input
                />
                {t('Upload')}
              </Button>
            } />
          </Button.Group>
        </>)}

        { adding && (<>
          <Header as='h4'>
            {t('Add Bridge')}:
          </Header>
          <Menu icon='labeled' horizontal>
            { Object.values(connectors).map(c => (
              <Menu.Item
                key={c.key}
                name={c.text}
                active={connector === c.key}
                onClick={() => setConnector(c.key)}
              >
                <Icon name={c.icon} />
                {c.text}
              </Menu.Item>
            ))}
          </Menu>

          <Form
            schema={connectors[connector].schema}
            validator={validator}
            // onChange={log('changed')}
            onSubmit={({ formData }) => { postBridge({ bridgeOptions: formData }); setAdding(!adding) }}
            // onError={log('errors')}
          >
            <Button.Group>
              <Button type='button' onClick={() => setAdding(!adding) }>
                <Icon name='cancel' />
                {' '}
                {t('Cancel')}
                {' '}
              </Button>
              <Button.Or />
              <Button type='submit' positive on>
                <Icon name='save' />
                {' '}
                {t('Submit')}
                {' '}
              </Button>
            </Button.Group>
          </Form>
        </>)}
      </Segment>

      <Card.Group>
        { bridges.map(bridge => (
          <Card
            key={bridge._id}
            fluid
            color={conf.style.color0}
          >
            <Card.Content>
              <Card.Header>
                <Icon
                  name={
                    presence[`${bridge.options.name}@${xmppClient?.credentials?.user}.${conf.xmpp.host}`]
                      ? (bridge.deployed ? 'exchange' : 'circle notch')
                      : (bridge.deployed ? 'circle notch' : 'exchange')
                  }
                  color={
                    presence[`${bridge.options.name}@${xmppClient?.credentials?.user}.${conf.xmpp.host}`]
                      ? (bridge.deployed ? 'green' : 'red')
                      : (bridge.deployed ? 'yellow' : 'grey')
                  }
                  loading={
                    presence[`${bridge.options.name}@${xmppClient?.credentials?.user}.${conf.xmpp.host}`]
                      ? (bridge.deployed ? false : true)
                      : (bridge.deployed ? true : false)
                  }
                />
                {' '}
                {bridge.options.name}
                {' '}
                <Dropdown item simple position='right'
                  icon={<>
                    <Icon name='cog' color='grey'/>
                  </>}>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        setBridges(bridges.map(a =>
                          a._id === bridge._id ? { ...a, editing: true } : a
                        ))
                      }}
                    >
                      <Icon name='edit' />
                      {t('Edit')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        deleteBridge({ _id: bridge._id })
                      }}
                    >
                      <Icon name='delete' />
                      {t('Delete')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
              <Card.Meta>
              </Card.Meta>
              <Card.Description>
                {bridge.options.description}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Checkbox toggle label={t('Deployed')}
                disabled={bridge.editing}
                onChange={(e, data) => {
                  putBridge({ bridge: {...bridge, deployed: data.checked } })
                }}
                checked={bridge.deployed}
              />
            </Card.Content>
            { bridge.editing && (
              <Card.Content extra>
                <Form
                  schema={connectors[bridge.connector].schema}
                  uiSchema={connectors[bridge.connector].uiSchema || {}}
                  validator={validator}
                  formData={bridge.options}
                  // onChange={log('changed')}
                  onChange={({ formData }) => {
                    setBridges(bridges.map(b =>
                      b._id === bridge._id ? { ...bridge, edited: true, options: formData } : b
                    ))
                  }}
                  onSubmit={({ formData }) => {
                    putBridge({ bridge: { ...bridge, options: formData }});
                  }}
                  // onError={log('errors')}
                >
                  <Button.Group>
                    <Button type='button' onClick={() => {
                      const foundBridge = bridgesImmutable.find(b => b._id === bridge._id)
                      setBridges(bridges.map(b =>
                        b._id === bridge._id ? { ...foundBridge, editing: false } : b
                      ))
                    }}>
                      <Icon name='cancel' />
                      {' '}
                      {t('Cancel')}
                      {' '}
                    </Button>
                    <Button.Or />
                    <Button type='submit' color='yellow' on>
                      <Icon name='save' />
                      {' '}
                      {t('Update')}
                      {' '}
                    </Button>
                  </Button.Group>
                </Form>
              </Card.Content>
            )}
          </Card>
        ))}
      </Card.Group>

    </Container>
  </>)
}
