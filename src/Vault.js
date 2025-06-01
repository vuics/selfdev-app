import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import axios from 'axios'
import {
  Form,
  Container,
  Segment,
  Loader,
  Message,
  Button,
  Icon,
  Header,
  Table,
  Popup,
  Input,
} from 'semantic-ui-react'
import Menubar from './components/Menubar'
import conf from './conf'

const Vault = () => {
  const [ vault, setVault ] = useState([])
  const [ name, setName ] = useState('')
  const [ visible, setVisible ] = useState(null)
  const [ nameError, setNameError ] = useState('')
  const [ responseError, setResponseError ] = useState('')
  const [ responseMessage, setResponseMessage ] = useState('')
  const [ adding, setAdding ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const getVault = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${conf.api.url}/vault`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('vault index res:', res)
      setVault(res?.data || [])
    } catch (err) {
      console.error('getVault error:', err);
      return setResponseError(err?.response?.data?.message || 'Error getting vault.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getVault()
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`${conf.api.url}/vault`, {
        name,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('post vault res:', res)
      // setResponseMessage(`${res.statusText} API vault "${res.data.name}"`)
      vault.push(res.data)
      setVault(vault)
      setName('')
    } catch (err) {
      console.error('post vault error:', err);
      return setResponseError(err.toString() || 'Error posting vault.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async ({ _id, name }) => {
    setLoading(true)
    try {
      const res = await axios.delete(`${conf.api.url}/vault/${_id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('delete vault res:', res)
      // setResponseMessage(`API vault "${name}" deleted`)
      setVault(vault.filter(obj => obj._id !== _id))
    } catch (err) {
      console.error('delete vault error:', err);
      return setResponseError(err.toString() || 'Error deleting vault.')
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

      <Segment secondary>
        <Header as='h3'>Vault</Header>

        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
              {/*
              <Table.HeaderCell>Created At</Table.HeaderCell>
              <Table.HeaderCell>Last Used At</Table.HeaderCell>
              <Table.HeaderCell textAlign='right'>Actions</Table.HeaderCell>
              */}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { Object.entries(vault).map(([key, value]) => (
              <Table.Row key={key}>
                <Table.Cell>{ key }</Table.Cell>
                <Table.Cell>{ value }</Table.Cell>
                {/*
                <Table.Cell>
                  <Input
                    type={ visible === _id ? 'text': 'password' }
                    defaultValue={ key+':'+secret }
                    action
                  >
                    <input />
                    <Button icon onClick={() => { setVisible(visible === _id ? null : _id) }}>
                      <Icon name='eye' />
                    </Button>
                    <Popup
                      content='Copied'
                      on='click'
                      pinned
                      trigger={
                        <Button icon onClick={() => { navigator.clipboard.writeText(`${key}:${secret}`) }}>
                          <Icon name='copy' />
                        </Button>
                      }
                    />
                  </Input>
                </Table.Cell>
                <Table.Cell>{ new Date(createdAt).toLocaleDateString() }</Table.Cell>
                <Table.Cell>{ lastUsedAt && new Date(lastUsedAt).toLocaleDateString() }</Table.Cell>
                <Table.Cell textAlign='right'>
                  <Button icon onClick={() => { handleDelete({ name, _id }) }}>
                    <Icon name='trash' />
                  </Button>
                </Table.Cell>
                */}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        { !adding && (
          <Button onClick={() => setAdding(!adding) }>
            <Icon name='add' />
            {' '}Add Key{' '}
          </Button>
        )}

        { adding && (
          <Form>
            <Segment stacked>
              <Header as='h4'>Add Key</Header>
              <Form.Input fluid
                icon='key'
                iconPosition='left'
                placeholder='Key Name'
                name='name'
                value={name}
                onChange={e => setName(e.target.value)}
                error={ !isEmpty(nameError) && {
                  content: nameError,
                  pointing: 'above',
                }}
                required
              />
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
          </Form>
        )}
      </Segment>

      <Segment>
      </Segment>
      <Message info>
        <Message.Header>
          Your keys are safely protected and securely stored.
        </Message.Header>
        <p>We use advanced encryption methods to ensure that your keys are never exposed in plain text. They are encrypted before storage and kept protected by industry-leading security protocols, so only you and authorized systems have access. Your privacy and security are our top priorities.</p>
      </Message>
    </Container>
  )
}

export default Vault
