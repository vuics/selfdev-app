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
import { sleep } from './helper'

const Vault = () => {
  const [ vault, setVault ] = useState({})
  const [ key, setKey ] = useState('')
  const [ keyError, setKeyError ] = useState('')
  const [ value, setValue ] = useState('')
  const [ valueError, setValueError ] = useState('')
  const [ visible, setVisible ] = useState(null)
  const [ responseError, setResponseError ] = useState('')
  const [ responseMessage, setResponseMessage ] = useState('')
  const [ adding, setAdding ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const getVault = async () => {
    setLoading(true)
    setVisible(null)
    try {
      const res = await axios.get(`${conf.api.url}/vault`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      console.log('vault index res:', res)
      setVault(res?.data || {})
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

  const exposeSecret = async ({ key, copy = false } = {}) => {
    setLoading(true)
    try {
      const res = await axios.post(`${conf.api.url}/vault/expose`, {
        key,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      console.log('post vault res:', res)
      // setResponseMessage(`${res.statusText} vault "${res.data}"`)
      setVault(prevVault => ({
        ...prevVault,
        ...res?.data,
      }));
      if (copy) {
        navigator.clipboard.writeText(res?.data[key])
      }
    } catch (err) {
      console.error('post vault error:', err);
      return setResponseError(err.toString() || 'Error posting vault.')
    } finally {
      setLoading(false)
    }
  }

  const addSecret = async () => {
    setVisible(null)
    if (!key) {
      return setKeyError('Key is empty')
    }
    if (!value) {
      return setValueError('Value is empty')
    }
    setLoading(true)
    try {
      const res = await axios.post(`${conf.api.url}/vault`, {
        key,
        value
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      console.log('post vault res:', res)
      // setResponseMessage(`${res.statusText} vault "${res.data}"`)
      setVault(res?.data || {})
      setKey('')
      setValue('')
    } catch (err) {
      console.error('post vault error:', err);
      return setResponseError(err.toString() || 'Error posting vault.')
    } finally {
      setLoading(false)
    }
  }

  const deleteSecret = async ({ key }) => {
    setVisible(null)
    setLoading(true)
    try {
      const res = await axios.delete(`${conf.api.url}/vault`, {
        data: { key },
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        // crossOrigin: { mode: 'cors' },
      })
      console.log('delete vault res:', res)
      // setResponseMessage(`API vault "${name}" deleted`)
      setVault(res?.data || {})
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
      { keyError &&
        <Message
          negative
          style={{ textAlign: 'left'}}
          icon='exclamation circle'
          header='Error'
          content={keyError}
          onDismiss={() => setKeyError('')}
        />
      }
      { valueError &&
        <Message
          negative
          style={{ textAlign: 'left'}}
          icon='exclamation circle'
          header='Error'
          content={valueError}
          onDismiss={() => setValueError('') }
        />
      }

      <Segment secondary>
        <Header as='h3'>Vault</Header>

        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Key</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
              <Table.HeaderCell textAlign='right'>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { Object.entries(vault).map(([key, value]) => (
              <Table.Row key={key}>
                <Table.Cell width={5}>{ key }</Table.Cell>
                <Table.Cell width={9}>
                  <Input
                    type={ visible === key ? 'text': 'password' }
                    value={ value || '*********' }
                    action
                    fluid
                  >
                    <input />
                    <Button icon onClick={() => { exposeSecret({ key }); setVisible(visible === key ? null : key ) }}>
                      <Icon name={ visible === key? 'eye slash' : 'eye' } />
                    </Button>
                    <Popup
                      content='Copied'
                      on='click'
                      pinned
                      trigger={
                        <Button icon onClick={async () => { exposeSecret({ key, copy: true });  }}>
                          <Icon name='copy' />
                        </Button>
                      }
                    />
                  </Input>
                </Table.Cell>
                <Table.Cell width={1} textAlign='right'>
                  <Button icon onClick={() => { deleteSecret({ key }) }}>
                    <Icon name='trash' />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        { !adding && (
          <Button onClick={() => setAdding(!adding) }>
            <Icon name='add' />
            {' '}Add Secret{' '}
          </Button>
        )}

        { adding && (
          <Form>
            <Segment stacked>
              <Header as='h4'>Add Secret</Header>
              <Form.Input fluid
                icon='key'
                iconPosition='left'
                placeholder='Key'
                name='key'
                value={key}
                onChange={e => setKey(e.target.value)}
                error={ !isEmpty(keyError) && {
                  content: keyError,
                  pointing: 'above',
                }}
                required
              />
              <Form.Input fluid
                icon='envelope'
                iconPosition='left'
                placeholder='Value'
                name='value'
                value={value}
                onChange={e => setValue(e.target.value)}
                error={ !isEmpty(valueError) && {
                  content: valueError,
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
                <Button positive onClick={() => { addSecret(); setAdding(!adding) }}>
                  <Icon name='save' />
                  {' '}Submit{' '}
                </Button>
              </Button.Group>
            </Segment>
          </Form>
        )}
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
