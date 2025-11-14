import React, { useState, useEffect, useRef } from 'react'
// import axios from 'axios'
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
// import conf from './conf'
// import dataSource from './ds-students-service.json'

export default function Omni () {
  const { t } = useTranslation('Logs')
  const [ responseError, setResponseError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  // const [ data, setData ] = useState(dataSource.dataSource)
  // const [ fields, setFields ] = useState(dataSource.fields)

  const [ fields, setFields ] = useState([
    { "fid": "gender", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "race/ethnicity", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "parental level of education", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "lunch", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "test preparation course", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "math score", "semanticType": "quantitative", "analyticType": "measure" },
    { "fid": "reading score", "semanticType": "quantitative", "analyticType": "measure" },
    { "fid": "writing score", "semanticType": "quantitative", "analyticType": "measure" }
  ])

  const [ data, setData ] = useState([
    {
      "gender": "female",
      "race/ethnicity": "group B",
      "parental level of education": "bachelor's degree",
      "lunch": "standard",
      "test preparation course": "none",
      "math score": 72,
      "reading score": 72,
      "writing score": 74
    },
    {
      "gender": "female",
      "race/ethnicity": "group C",
      "parental level of education": "some college",
      "lunch": "standard",
      "test preparation course": "completed",
      "math score": 69,
      "reading score": 90,
      "writing score": 88
    },
    {
      "gender": "female",
      "race/ethnicity": "group B",
      "parental level of education": "master's degree",
      "lunch": "standard",
      "test preparation course": "none",
      "math score": 90,
      "reading score": 95,
      "writing score": 93
    },
  ])


  // const fetchData = async () => {
  //   setLoading(true)
  //   try {
  //     const res = await axios.get('https://pub-2422ed4100b443659f588f2382cfc7b1.r2.dev/datasets/ds-students-service.json', {
  //       headers: { 'Content-Type': 'application/json' },
  //       withCredentials: true,
  //     })
  //     // console.log('res:', res)
  //     console.log('res.data:', res.data)
  //     setFields(res.data.fields)
  //     setData(res.data.dataSource)
  //   } catch (err) {
  //     console.error('get bridges error:', err);
  //     return setResponseError(err?.response?.data?.message || t('Error fetching data.'))
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])


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

      <TableWalker
        // style={{ width: '100%', height: '100%' }}
        fields={fields}
        data={data}
        pageSize={1000}
      />

  </>)
}
