import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Container,
  Segment,
  Loader,
  Message,
  Header,
  // Menu,
  // Icon,
  // Button,
  // Card,
  // Checkbox,
  // Dropdown,
  // Popup,
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
import i18n from "i18next";
import { GraphicWalker, TableWalker } from '@kanaries/graphic-walker';

import Menubar from './components/Menubar'
import conf from './conf'

export default function Omni () {
  const { t } = useTranslation('Logs')
  const [ responseError, setResponseError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  // const [ data, setData ] = useState(dataSource.dataSource)
  // const [ fields, setFields ] = useState(dataSource.fields)

  const [ fields, setFields ] = useState([
    { "fid": "@timestamp", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "agentId", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "level", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "message", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "userId", "semanticType": "nominal", "analyticType": "dimension" },
  ])

  const [ data, setData ] = useState([ ])

  const fetchLogs = async () => {
    setLoading(true)
    try {
      // const res = await axios.get(`${conf.api.url}/logs?skip=${conf.omni.skip}&limit=${conf.omni.limit}`, {
      const res = await axios.get(`${conf.api.url}/logs?skip=${conf.omni.skip}&limit=${conf.omni.limit}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      // console.log('res:', res)
      console.log('res.data:', res.data)
      // FIXME:
      // setFields(res.data.fields)
      setData(res.data.result)
    } catch (err) {
      console.error('fetch logs error:', err);
      return setResponseError(err?.response?.data?.message || t('Error fetching logs.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
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
          {t('Logs & Metrics')}
        </Header>
      </Segment>

    </Container>

      <GraphicWalker
        data={data}
        fields={fields}
        // pageSize={1000}
        // chart={graphicWalkerSpec}
        i18nLang={i18n.language}
      />

      {/*/}
      <TableWalker
        // style={{ width: '100%', height: '100%' }}
        fields={fields}
        data={data}
        pageSize={1000}
      />
      {/*/}

  </>)
}
