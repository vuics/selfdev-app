import React, { useState, useEffect, useRef } from 'react'
// import { isEmpty } from 'lodash'
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
} from 'semantic-ui-react'
import Menubar from './components/Menubar'
import conf from './conf'

const Hive = () => {
  const [ agents, setAgents ] = useState([])
  const [ agentsImmutable, setAgentsImmutable ] = useState([])

  const [ options, setOptions ] = useState({ agent: 'alice' })
  // const [ optionsError, setOptionsError ] = useState('')
  const [ responseError, setResponseError ] = useState('')
  const [ responseMessage, setResponseMessage ] = useState('')
  const [ adding, setAdding ] = useState(false)
  const [ loading, setLoading ] = useState(true)

  const getAgents = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${conf.api.url}/agent`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('agents index res:', res)
      setAgents(res?.data || [])
      setAgentsImmutable(res?.data || [])
    } catch (err) {
      // FIXME: this is only for testing purposes:
      const ags = [ {
        _id: 'alice-id',
        deployed: false,
        // local values
        // edited: true,
        // editing: true,
        options: {
          name: 'alice',
          description: 'Alice is woman from the famous crypto couple.',
          model: {
            provider: 'openai',
            name: 'o3-mini',
          },
        },
      }, {
        _id: 'bob-id',
        deployed: true,
        options: {
          name: 'bob',
          description: 'Bob is man from the famous crypto couple.',
          model: {
            provider: 'anthropic',
            name: 'sonnet',
          },
        },
      } ]
      setAgents(ags)
      setAgentsImmutable(ags)

      console.error('getAgents error:', err);
      return setResponseError(err?.response?.data?.message || 'Error getting agents.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAgents()
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`${conf.api.url}/agent`, {
        options,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('post agent res:', res)
      setResponseMessage(`${res.statusText} Agent Submit "${res.data.options}"`)
      agents.push(res.data)
      setAgents(agents)
      setOptions({})
    } catch (err) {
      console.error('post agent error:', err);
      return setResponseError(err.toString() || 'Error posting agent.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async ({ _id, options }) => {
    setLoading(true)
    try {
      const res = await axios.delete(`${conf.api.url}/agent/${_id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('agent delete res:', res)
      // setResponseMessage(`API key "${options}" deleted`)
      setAgents(agents.filter(obj => obj._id !== _id))
    } catch (err) {
      console.error('delete agent error:', err);
      return setResponseError(err.toString() || 'Error deleting agent.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Menubar />

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

      { !adding && (
        <Button onClick={() => setAdding(!adding) }>
          <Icon name='add' />
          {' '}Add Agent{' '}
        </Button>
      )}

      { adding && (
        <Segment stacked>
          <Header as='h4'>Add Agent</Header>
          <JsonEditor
            data={ options }
            setData={ setOptions }
            rootName=''
            />
          <br/>
          <Button.Group>
            <Button onClick={() => setAdding(!adding) }>
              <Icon name='cancel' />
              {' '}Cancel{' '}
            </Button>
            <Button.Or />
            <Button positive onClick={() => { handleSubmit(); setAdding(!adding) }}>
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
            <Grid.Column width={5}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={13}>
                          <span style={{color:'lightgrey'}}>@</span>
                          {agent.options.name || '(no name)'}
                        </Grid.Column>
                        <Grid.Column width={3}>
                          <Dropdown item icon='cog' simple position='right'>
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
                              <Dropdown.Item>
                                <Icon name='delete' />
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Header>
                  <Card.Description>
                    {agent.options.description || '(no description)' }
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Card.Meta>
                    <Checkbox toggle label='Deployed'
                      // TODO:
                      // onChange={(e, data) => setChecked(data.checked)}
                      // checked={checked}
                    />
                  </Card.Meta>
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
                            // TODO: save on server
                            setAgents(agents.map(a =>
                              a._id === agent._id ? { ...a, editing: false } : a
                            ))
                          }}
                        >
                          Save
                        </Button>
                      )}
                    </div>
                </Card.Content>
                ) }
              </Card>
            </Grid.Column>
            { agent.editing && (
              <Grid.Column width={11}>
                <JsonEditor
                  data={ agent.options }
                  setData={ (options) => {
                    // TODO: update with API
                    setAgents(agents.map(a =>
                      a._id === agent._id ? { ...agent, options, edited: true } : a
                    ))
                  } }
                  rootName=''
                  />
              </Grid.Column>
            )}
          </Grid.Row>
        ))}
      </Grid>
    </Container>
  )
}

export default Hive
