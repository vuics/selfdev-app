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
import { ResponsiveLine } from '@nivo/line'

import { GraphicWalker } from '@kanaries/graphic-walker';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'
import { themeQuartz } from "ag-grid-community"
import { useWindowDimensions } from './helper.js'

import Menubar from './components/Menubar'
import conf from './conf'

ModuleRegistry.registerModules([AllCommunityModule])


export function transformPrometheusRange(response) {
  const result = response?.data?.result?.[0];
  if (!result) return [];

  const labels = result.metric; // metric labels like job, instance, etc.

  return result.values.map(([ts, val]) => ({
      timestamp: ts * 1000,
      value: Number(val),
      ...labels
    }));
}

export function toNivoLineData(points) {
  return [
    {
      id: points[0]?.__name__ || "metric",
      data: points.map(p => ({
        x: new Date(p.timestamp),
        y: p.value
      }))
    }
  ];
}

export default function Omni () {
  const { t } = useTranslation('Logs')
  const { height, width } = useWindowDimensions();
  const [ responseError, setResponseError ] = useState('')
  const [ loading, setLoading ] = useState(false)

  // For GraphicWalker
  const [ logsFields, ] = useState([
    { "fid": "@timestamp", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "level", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "agentId", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "archetype", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "name", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "message", "semanticType": "nominal", "analyticType": "dimension" },
  ])

  // For AgGridReact
  const [logsColumns, ] = useState([
      { "field": "@timestamp", filter: true },
      { "field": "level", filter: true },
      { "field": "agentId", filter: true },
      { "field": "archetype", filter: true },
      { "field": "name", filter: true },
      { "field": "message", filter: true },
  ]);

  const [ logsData, setLogsData ] = useState([ ]);

  // For GraphicWalker
  const [ metricsFields, ] = useState([
    { "fid": "x", "semanticType": "nominal", "analyticType": "dimension" },
    { "fid": "y", "semanticType": "nominal", "analyticType": "dimension" },
  ])

  const [ metricsData, setMetricsData ] = useState([]);
  // console.log('metricsData:', metricsData)


  const fetchLogs = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${conf.api.url}/logs?skip=${conf.logs.skip}&limit=${conf.logs.limit}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      // console.log('res:', res)
      console.log('res.data:', res.data)
      setLogsData(res.data.logsData)
    } catch (err) {
      console.error('fetch logs error:', err);
      return setResponseError(err?.response?.data?.message || t('Error fetching logs.'))
    } finally {
      setLoading(false)
    }
  }

  const fetchMetrics = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${conf.api.url}/logs/metrics`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      // console.log('res:', res)
      console.log('res.data:', res.data)
      const points = transformPrometheusRange(res.data.metrics);
      setMetricsData(toNivoLineData(points))
    } catch (err) {
      console.error('fetch metrics error:', err);
      return setResponseError(err?.response?.data?.message || t('Error fetching metrics.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
    fetchMetrics()
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
          menuItem: 'Logs Grid',
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
                  rowData={logsData}
                  columnDefs={logsColumns}
                  theme={theme}
                  pagination
                  paginationPageSize={500}
                  paginationPageSizeSelector={[200, 500, 1000]}
                />
              </div>
            </Tab.Pane>),
        }, {
          menuItem: 'Metrics Chart',
          render: () => (
            <Tab.Pane
              attached='top'
              // attached='bottom'
            >
              <div
                style={{
                  width: width - 25,
                  height: height - conf.iframe.topOffset - conf.iframe.bottomOffset - 75
                }}
              >
                <ResponsiveLine
                  data={metricsData}
                  margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
                  xScale={{ type: 'time', format: 'native' }}
                  xFormat="time:%H:%M:%S"
                  // yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                  axisBottom={{
                    format: "%H:%M:%S",
                    tickValues: "every 2 minutes",
                    tickRotation: -30,
                    legend: "time",
                    legendOffset: 36
                  }}
                  // axisLeft={{
                  //   tickSize: 5,
                  //   tickPadding: 5,
                  //   format: value => Number(value).toFixed(0), // <-- numbers on Y axis
                  //   legend: "count",
                  //   legendOffset: -40
                  // }}
                  // enableGridX={true} // vertical grid lines
                  // enableGridY={true} // horizontal grid lines
                  pointSize={4}
                  useMesh={true}
                />
              </div>
            </Tab.Pane>),
        }, {
          menuItem: 'Logs Analysis',
          render: () => (
            <Tab.Pane
              attached='top'
              // attached='bottom'
            >
              <GraphicWalker
                data={logsData}
                fields={logsFields}
                i18nLang={i18n.language}
              />
            </Tab.Pane>),
        }, {
          menuItem: 'Metrics Analysis',
          render: () => (
            <Tab.Pane
              attached='top'
              // attached='bottom'
            >
              <GraphicWalker
                data={metricsData[0].data}
                fields={metricsFields}
                i18nLang={i18n.language}
              />
            </Tab.Pane>),
        } ] }
      />

  </>)
}
