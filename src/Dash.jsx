import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Container,
  Segment,
  Loader,
  Message,
  Header,
  Statistic,
  Icon,
  // Input,
  // Button,
  // List,
  // Label,
  // Confirm,
  // Checkbox,
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

export default function Dash () {
  const { t } = useTranslation('Dash')
  const [ responseError, setResponseError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ dashboard, setDashboard ] = useState({})

  const getDash = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${conf.api.url}/dashboard`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      // console.log('res:', res)
      console.log('res.data:', res.data)
      // setAddress(res.data.address)
      setDashboard(res.data)
    } catch (err) {
      console.error('get dash error:', err);
      return setResponseError(err?.response?.data?.message || t('Error getting dash.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDash()
  }, [])

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
          {t('Dashboard')}
        </Header>

        <div
          style={{
            marginTop: '10vh',
            display: 'flex',
            justifyContent: 'center', // horizontal centering
            // alignItems: 'center',     // vertical centering
            // height: '85vh',          // make container full viewport height (optional)
            textAlign: 'center'       // center text inside stats
          }}
        >
          <Statistic.Group>
            <Statistic color='blue' size='huge'>
              <Statistic.Value>
                {dashboard.deployedAgents}/{dashboard.agents}
              </Statistic.Value>
              <Statistic.Label>
                <Icon name='user secret' />
                Deployed Agents
              </Statistic.Label>
            </Statistic>

            <Statistic color='purple' size='huge'>
              <Statistic.Value>
                {dashboard.deployedBridges}/{dashboard.bridges}
              </Statistic.Value>
              <Statistic.Label>
                <Icon name='linkify' />
                Deployed Bridges
              </Statistic.Label>
            </Statistic>
          </Statistic.Group>
          <br/>
        </div>
        <br/>

        <div
          style={{
            marginTop: '10vh',
            marginBottom: '10vh',
            display: 'flex',
            justifyContent: 'center', // horizontal centering
            // alignItems: 'center',     // vertical centering
            // height: '85vh',          // make container full viewport height (optional)
            textAlign: 'center'       // center text inside stats
          }}
        >
          <Statistic.Group>
            <Statistic color='violet' size='huge'>
              <Statistic.Value>
                {dashboard.maps}
              </Statistic.Value>
              <Statistic.Label>
                <Icon name='map' />
                Maps
              </Statistic.Label>
            </Statistic>

            <Statistic color='pink' size='huge'>
              <Statistic.Value>
                {dashboard.apps}
              </Statistic.Value>
              <Statistic.Label>
                <Icon name='cloud download' />
                Apps
              </Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </div>

      </Segment>
    </Container>
  </>)
}
