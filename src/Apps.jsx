import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Container,
  Segment,
  Loader,
  Message,
  Header,
  Input,
  Button,
  Icon,
  Checkbox,
  List,
  Label,
  // Form,
  // Table,
  // Popup,
  // Dropdown,
  // Divider,
} from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
// import { isEmpty } from 'lodash'

import Menubar from './components/Menubar'
import conf from './conf'
// import { sleep } from './helper'

export default function Apps () {
  const { t } = useTranslation('Apps')
  const [ responseError, setResponseError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ apps, setApps ] = useState([])
  const [ candidates, setCandidates ] = useState([])
  const [ appName, setAppName ] = useState('')

  // Handles links like:
  //   <a href="web+hyag://hello-world@0.0.1">link</a>
  //   <a href="web+hyag://hello-market@0.0.2">link</a>
  // Based on registerProtocolHandler in ./index.jsx
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const uri = params.get("uri");
    if (uri) {
      console.log("Protocol invoked with:", uri);

      try {
        // If uri is not a valid URL, this will throw — so catch it
        const parsed =
          uri.startsWith("http") || uri.includes("://")
            ? new URL(uri)
            : new URL(`web+hyag://${uri}`);

        console.log("Host:", parsed.hostname, "Params:", parsed.searchParams);
      } catch (err) {
        console.warn("Invalid URI:", uri, err);
      }
      setAppName(uri)
    }
  }, []);

  // console.log('approvalData:', approvalData)

  const getApps = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${conf.api.url}/app`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      // console.log('res:', res)
      console.log('res.data:', res.data)
      // setAddress(res.data.address)
      setApps(res.data)
    } catch (err) {
      console.error('get apps error:', err);
      return setResponseError(err?.response?.data?.message || t('Error getting apps.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getApps()
  }, [])

  const searchApp = async () => {
    setLoading(true)
    try {
      if (!appName) {
        setCandidates([])
      } else {
        const res = await axios.post(`${conf.api.url}/apps/search`, {
          appName,
        }, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          crossOrigin: { mode: 'cors' },
        })
        // console.log('res:', res)
        console.log('res.data:', res.data)
        setCandidates(res.data)
      }
    } catch (err) {
      console.error('App install error:', err);
      return setResponseError(err?.response?.data?.message || t('Error searching app.'))
    } finally {
      setLoading(false)
    }
  }

  const installApp = async ({ appName }) => {
    // NOTE: appName argument redefines the state
    setLoading(true)
    try {
      const res = await axios.post(`${conf.api.url}/apps/install`, {
        appName,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      // console.log('res:', res)
      console.log('res.data:', res.data)
      getApps()
      setCandidates([])
    } catch (err) {
      console.error('App install error:', err);
      return setResponseError(err?.response?.data?.message || t('Error installing app.'))
    } finally {
      setLoading(false)
    }
  }

  const uninstallApp = async ({ appId }) => {
    setLoading(true)
    try {
      const res = await axios.post(`${conf.api.url}/apps/uninstall`, {
        appId
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      // console.log('res:', res)
      console.log('res.data:', res.data)
      getApps()
    } catch (err) {
      console.error('App uninstall error:', err);
      return setResponseError(err?.response?.data?.message || t('Error uninstalling app.'))
    } finally {
      setLoading(false)
    }
  }

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
          {t('Install a HyperAgent')}
        </Header>

        <Input
          icon='search'
          iconPosition='left'
          type='text' placeholder='Package name@version...' action
          fluid
          value={appName}
          onChange={e => setAppName(e.target.value)}
        >
          <Icon name='search' />
          <input />
          <Button
            onClick={searchApp}
          >
            Search
          </Button>
        </Input>
        <p style={{ marginTop: '5px' }}>
          Example:
          <Button
            compact standard size='mini'
            onClick={() => setAppName('hello-world@latest')}
          >
            hello-world@latest
          </Button>
          Browse more HyperAgent packages in the{' '}
          <a href={conf.apps.registryUrl} target="_blank" rel="noopener noreferrer">
            {t('Registry')}
          </a>
          .
        </p>
      </Segment>

      { candidates?.length > 0 && (
        <Segment inverted color={conf.style.color0}>
          <Header as='h3'>
            {t('Found HyperAgents')}
          </Header>

          {candidates.map(candidate => {
            // "pricing": {
            //   "symbol": "SDFT",     // currency symbol
            //   "tokenIndex": "",     // token index for NFTs only
            //   "price": "1",         // always 1 for nonfungible
            //   "model": "one-time",  // or "subscription"
            //   "interval": ""        // "month" for subscription
            // }
            const pricing = candidate['x-hyag']?.pricing
            return (
              <Segment key={candidate._id}>
                <Header as="h3">{candidate.name} <Label>{candidate.version}</Label></Header>
                <p>{candidate.description}</p>
                <List>
                  <List.Item>
                    <strong>Author:</strong> {candidate.author}
                  </List.Item>
                  <List.Item>
                    <strong>License:</strong> {candidate.license}
                  </List.Item>
                  { pricing && (<>
                    <List.Item>
                      <strong>Price:</strong> {pricing.symbol}{' '}{pricing.price}
                      {' '}{pricing.tokenIndex}
                      {' '}{pricing.model}
                      {' '}{pricing.interval}
                    </List.Item>
                  </>)}
                </List>
                <Button positive onClick={() => installApp({ appName: `${candidate.name}@${candidate.version}` })}>
                  Install
                </Button>
              </Segment>
            )
          })}
        </Segment>
      )}

      { apps?.length > 0 && (
        <Segment secondary>
          <Header as='h3'>
            {t('Installed HyperAgents')}
          </Header>

          {apps.map(app => (
            <Segment key={app._id}>
              <Header as="h3">{app.package.name} <Label>{app.package.version}</Label></Header>
              <p>{app.package.description}</p>
              <List>
                <List.Item>
                  <strong>Author:</strong> {app.package.author}
                </List.Item>
                <List.Item>
                  <strong>License:</strong> {app.package.license}
                </List.Item>
                <List.Item>
                  <strong>Installed:</strong> {new Date(app.createdAt).toLocaleString()}
                </List.Item>
                <List.Item>
                  <strong>Maps:</strong> {app.mapIds.length} {app.mapIds.length === 1 ? 'map' : 'maps'}
                </List.Item>
                <List.Item>
                  <strong>Agents:</strong> {app.agentIds.length} {app.agentIds.length === 1 ? 'agent' : 'agents'}
                </List.Item>
              </List>
              <Checkbox label="Deployed" toggle style={{ marginRight: '1em' }} />
              <Button negative onClick={() => uninstallApp({ appId: app._id })}>
                Uninstall
              </Button>
            </Segment>
          ))}
        </Segment>
      )}

    </Container>
  </>)
}
