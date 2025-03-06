import React, { useState, useEffect } from 'react'
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
import { faker } from '@faker-js/faker'

import Menubar from './components/Menubar'
import conf from './conf'


function defaultOptions() {
  return {
    schemaVersion: '0.1',

    name: faker.internet.username().toLowerCase(),
    description: '',
  }
}

const Hive = () => {
  const [ agents, setAgents ] = useState([])
  const [ agentsImmutable, setAgentsImmutable ] = useState([])

  const [ options, setOptions ] = useState(() => defaultOptions())
  const [ responseError, setResponseError ] = useState('')
  const [ responseMessage, setResponseMessage ] = useState('')
  const [ adding, setAdding ] = useState(false)
  const [ loading, setLoading ] = useState(true)

  const indexAgents = async () => {
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
      console.error('indexAgents error:', err);
      return setResponseError(err?.response?.data?.message || 'Error getting agents.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    indexAgents()
  }, [])

  const postAgent = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`${conf.api.url}/agent`, {
        deployed: false,
        options,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('post agent res:', res)
      // setResponseMessage(`Agent created successfully`)
      setAgents(agents => [res.data, ...agents])
      setAgentsImmutable(agentsImmutable => [res.data, ...agentsImmutable])
      setOptions(() => defaultOptions())
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
      setAgents(agents.map(a => a._id === res.data._id ? res.data : a))
      setAgentsImmutable(agentsImmutable.map(a => a._id === res.data._id ? res.data : a))
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
      setAgents(agents.filter(obj => obj._id !== _id))
      setAgentsImmutable(agentsImmutable.filter(obj => obj._id !== _id))
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
        <Button size='large' onClick={() => setAdding(!adding) }>
          <Icon.Group size='large'>
            <Icon name='spy' />
            <Icon corner name='add' />
          </Icon.Group>
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
            <Grid.Column width={5}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={13}>
                          <span style={{color:'lightgrey'}}>@</span>
                          {agent.options?.name || '(no name)'}
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
                  <Card.Description>
                    {agent.options?.description || '(no description)' }
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Card.Meta>
                    <Checkbox toggle label='Deployed'
                      disabled={agent.editing}
                      onChange={(e, data) => {
                        putAgent({ agent: {...agent, deployed: data.checked } })
                      }}
                      checked={agent.deployed}
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
              <Grid.Column width={11}>
                <JsonEditor
                  data={ agent.options || {} }
                  setData={ (options) => {
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
