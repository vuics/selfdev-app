import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Container,
  Loader,
  Message,
  Tab,
  // Header,
  // Segment,
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

import { GraphicWalker } from '@kanaries/graphic-walker';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'
import { themeQuartz } from "ag-grid-community"
import { useWindowDimensions } from './helper.js'

import Menubar from './components/Menubar'
import conf from './conf'

ModuleRegistry.registerModules([AllCommunityModule])

export default function Omni () {
  const { t } = useTranslation('Logs')
  const { height, width } = useWindowDimensions();
  const [ responseError, setResponseError ] = useState('')
  const [ loading, setLoading ] = useState(false)

  // For GraphicWalker
  const [ fields, ] = useState([
    { "fid": "@timestamp", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "level", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "agentId", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "archetype", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "name", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "message", "semanticType": "nominal", "analyticType": "dimension" },
  ])

  // For AgGridReact
  const [colDefs, ] = useState([
      { "field": "@timestamp", filter: true },
      { "field": "level", filter: true },
      { "field": "agentId", filter: true },
      { "field": "archetype", filter: true },
      { "field": "name", filter: true },
      { "field": "message", filter: true },
  ]);
  const [rowData, setRowData] = useState([ ]);

  const fetchLogs = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${conf.api.url}/logs?skip=${conf.logs.skip}&limit=${conf.logs.limit}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      // console.log('res:', res)
      console.log('res.data:', res.data)
      setRowData(res.data.rowData)
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

  const theme = themeQuartz.withParams({
    spacing: 3,
  });

  return (<>
    <Container fluid>
      <Menubar />
    </Container>

    <Container>
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

    </Container>

      <Tab
        menu={{ attached: 'bottom' }} 
        panes={[ {
          menuItem: 'Grid',
          render: () => (
            <Tab.Pane
              attached='top'
              // attached='bottom'
              // style={{ margin: '0 0 0 0', padding: '0 0 0 0'}}
            >
              <div
                style={{
                  width: width - 25,
                  height: height - conf.iframe.topOffset - conf.iframe.bottomOffset - 75
                }}
              >
                <AgGridReact
                  rowData={rowData}
                  columnDefs={colDefs}
                  theme={theme}
                  pagination
                  paginationPageSize={500}
                  paginationPageSizeSelector={[200, 500, 1000]}
                />
              </div>
            </Tab.Pane>),
        }, {
          menuItem: 'Visualization',
          render: () => (
            <Tab.Pane
              attached='top'
              // attached='bottom'
            >
              <GraphicWalker
                data={rowData}
                fields={fields}
                i18nLang={i18n.language}
              />
            </Tab.Pane>),
        } ] }
      />

  </>)
}
