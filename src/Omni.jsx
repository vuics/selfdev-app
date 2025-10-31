import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Container,
  Segment,
  Loader,
  Message,
  Header,
  Menu,
  Icon,
  Divider,
  Button,
  Popup,
  Card,
  Checkbox,
  // Input,
  // List,
  // Label,
  // Confirm,
  // Form,
  // Table,
  // Dropdown,
} from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import Form from '@rjsf/semantic-ui'
import validator from '@rjsf/validator-ajv8';
import connectors, { defaultConnector } from './connectors'

import Menubar from './components/Menubar'
import conf from './conf'


export default function Dash () {
  const { t } = useTranslation('Dash')
  const [ responseError, setResponseError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ bridges, setBridges ] = useState([])
  const [ connector, setConnector ] = useState(defaultConnector.value)
  const [ activeConnector, setActiveConnector ] = useState('telegram')
  const [ adding, setAdding ] = useState(false)

  const indexBridges = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${conf.api.url}/bridge`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      // console.log('res:', res)
      console.log('res.data:', res.data)
      // setAddress(res.data.address)
      setBridges(res.data)
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
      const res = await axios.put(`${conf.api.url}/bridge/${bridge._id}`, {
        ...bridge,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('bridge put res:', res)
      // setResponseMessage(`Bridge updated successfully`)
      // const prevBridge = bridgesImmutable.find(a => a._id === bridge._id)
      setBridges(bridges.map(a => a._id === res.data._id ? res.data : a))
      // setBridgesImmutable(bridgesImmutable.map(a => a._id === res.data._id ? res.data : a))
    } catch (err) {
      console.error('put bridge error:', err);
      return setResponseError(err?.response?.data?.message || err.toString() || t('Error putting bridge.'))
    } finally {
      setLoading(false)
    }
  }

  const log = (type) => console.log.bind(console, type);

  console.log('connector:', connector)

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

        { !adding && (
          <div>
          <Button size='large' onClick={() => setAdding(!adding) }>
            <Icon.Group size='large'>
              <Icon name='spy' />
              <Icon corner name='add' />
            </Icon.Group>
            {' '}
            {t('Add Bridge')}
            {' '}
          </Button>
          {/*/}
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
          {/*/}
         </div>
        )}
        <br/>

        { adding && (<>
          <Menu icon='labeled' horizontal>
            { Object.values(connectors).map(connector => (
              <Menu.Item
                key={connector.key}
                name={connector.text}
                active={activeConnector === connector.key}
                onClick={() => setActiveConnector(connector.key)}
              >
                <Icon name={connector.icon} />
                {connector.text}
              </Menu.Item>
            ))}
          </Menu>

          <Form
            schema={connectors[connector].schema}
            validator={validator}
            onChange={log('changed')}
            onSubmit={({ formData }) => { postBridge({ bridgeOptions: formData }); setAdding(!adding) }}
            onError={log('errors')}
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
        <br/>
        <br/>
      </Segment>

      <Card.Group>
        { bridges.map(bridge => (
          <Card
            key={bridge._id}
            fluid color='red'
          >
            <Card.Content>
              <Card.Header>
                {bridge.options.name}
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
          </Card>
        ))}
      </Card.Group>

      <Divider/>
        {JSON.stringify(bridges)}
      <Divider/>

    </Container>
  </>)
}
