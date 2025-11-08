import React, { useState, useEffect } from 'react'
import { ResponsiveBar } from '@nivo/bar'
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
            marginTop: '5vh',
            marginBottom: '5vh',
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
          <br/>
        </div>
      </Segment>

      <Segment style={{ height: '800px' }}>
        { dashboard && dashboard.agentArchetypes && (<>
          <Header as='h4'>
            {t('Agent Archetypes')}
          </Header>
          <ResponsiveBar
            key='archetypes-bar-chat'
            data={dashboard.agentArchetypes}
            indexBy="_id"
            height={800}
            keys={[
              'deployed',
              'total'
            ]}
            layout="horizontal" enableGridY={false} enableGridX={true}
            labelSkipHeight={16}
            labelSkipWidth={16}
            labelTextColor="inherit:darker(1.4)"
            margin={{
              bottom: 60,
              left: 80,
              right: 110,
              top: 60
            }}
            onClick={() => {}}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
            padding={0.2}
            width={900}
            legends={[ {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              translateX: 120,
              itemsSpacing: 3,
              itemWidth: 100,
              itemHeight: 16
            } ]}
          />
        </>)}
      </Segment>

      <Segment style={{ height: '300px' }} >
        { dashboard && dashboard.bridgeConnectors && (<>
          <Header as='h4'>
            {t('Bridge Connectors')}
          </Header>
          <ResponsiveBar
            key='connectors-bar-chat'
            data={dashboard.bridgeConnectors}
            indexBy="_id"
            height={500}
            keys={[
              'deployed',
              'total'
            ]}
            layout="horizontal" enableGridY={false} enableGridX={true}
            labelSkipHeight={16}
            labelSkipWidth={16}
            labelTextColor="inherit:darker(1.4)"
            margin={{
              bottom: 60,
              left: 80,
              right: 110,
              top: 60
            }}
            onClick={() => {}}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
            padding={0.2}
            width={900}
            legends={[ {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              translateX: 120,
              itemsSpacing: 3,
              itemWidth: 100,
              itemHeight: 16
            } ]}
          />
        </>)}
      </Segment>
    </Container>
  </>)
}
