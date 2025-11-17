import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Container,
  Loader,
  Message,
  Tab,
  Input,
  Button,
  Icon,
  Segment,
  Menu,
  // Header,
  // Card,
  // Checkbox,
  // Dropdown,
  // Popup,
  // Divider,
  // Accordion,
  // List,
  // Label,
  // Confirm,
  // Form,
  // Table,
} from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import i18n from "i18next";
import { ResponsiveLine } from '@nivo/line'

import Form from '@rjsf/semantic-ui'
import validator from '@rjsf/validator-ajv8';

import { GraphicWalker } from '@kanaries/graphic-walker';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'
import { themeQuartz } from "ag-grid-community"

import {
  ChartsProvider,
  generateChartsTheme,
  getTheme,
  SnackbarProvider,
} from "@perses-dev/components";
import {
  DataQueriesProvider,
  dynamicImportPluginLoader,
  // PluginModuleResource,
  PluginRegistry,
  TimeRangeProvider,
} from "@perses-dev/plugin-system";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  DatasourceStoreProvider,
  Panel,
  VariableProvider,
} from "@perses-dev/dashboards";
// import {
//   DashboardResource,
//   DurationString,
//   GlobalDatasourceResource,
//   DatasourceResource,
//   TimeRangeValue,
// } from "@perses-dev/core";
// import { DatasourceApi } from "@perses-dev/dashboards";
import * as prometheusPlugin from "@perses-dev/prometheus-plugin";
import * as timeseriesChartPlugin from "@perses-dev/timeseries-chart-plugin";

import { useWindowDimensions } from './helper.js'
import Menubar from './components/Menubar'
import conf from './conf'

ModuleRegistry.registerModules([AllCommunityModule])



const fakeDatasource = {
  kind: "GlobalDatasource",
  metadata: { name: "hello" },
  spec: {
    default: true,
    plugin: {
      kind: "PrometheusDatasource",
      spec: {
        directUrl: "http://prometheus.dev.local:9090",
      },
    },
  },
};

class DatasourceApiImpl {
  getDatasource() {
    return Promise.resolve(undefined);
  }

  getGlobalDatasource() {
    return Promise.resolve(fakeDatasource);
  }

  listDatasources() {
    return Promise.resolve([]);
  }

  listGlobalDatasources() {
    return Promise.resolve([fakeDatasource]);
  }

  buildProxyUrl() {
    return "/prometheus";
  }
}
export const fakeDatasourceApi = new DatasourceApiImpl();
export const fakeDashboard = {
  kind: "Dashboard",
  metadata: {},
  spec: {},
};


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

export default function Logs () {
  const { t } = useTranslation('Logs')
  const { height, width } = useWindowDimensions();
  const [ responseError, setResponseError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ querying, setQuerying ] = useState(false)
  const [ metricsQuery, setMetricsQuery ] = useState('agents_processed')
  const [ adding, setAdding ] = useState(false)

  const metricsQueriesSchema = {
    type: 'array',
    title: 'Queries',
    items: {
      type: 'string',
      title: 'PromQL query',
    },
  }
  const [ metricsQueries, setMetricsQueries ] = useState([
    `agents_processed`,
    `running_agents`,
  ])

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


  const [timeRange, setTimeRange] = useState({
    // start: new Date(Math.floor(Date.now() / 1000) - 60 * 60),
    // end: new Date(),

    // pastDuration: "30m"

    pastDuration: "3h"
  });
  const [refreshInterval, setRefreshInterval] = useState("0s");
  // const [refreshInterval, setRefreshInterval] = useState("10s");
  const muiTheme = getTheme("light");
  const chartsTheme = generateChartsTheme(muiTheme, {});
  const pluginLoader = dynamicImportPluginLoader([
    {
      resource: prometheusPlugin.getPluginModule(),
      importPlugin: () => Promise.resolve(prometheusPlugin),
    },
    {
      resource: timeseriesChartPlugin.getPluginModule(),
      importPlugin: () => Promise.resolve(timeseriesChartPlugin),
    },
  ]);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });


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
    setQuerying(true)
    try {
      const res = await axios.get(`${conf.api.url}/logs/metrics?query=${metricsQuery}`, {
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
      setQuerying(false)
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
                <Input
                  loading={querying}
                  iconPosition='left'
                  type='text'
                  placeholder='Query...'
                  action
                  fluid
                  value={metricsQuery}
                  onChange={e => setMetricsQuery(e.target.value)}
                >
                  <Icon name='terminal' />
                  <input />
                  <Button
                    icon
                    // iconPosition='left'
                    labelPosition='right'
                    color={conf.style.color0}
                    onClick={fetchMetrics}
                  >
                    Query
                    <Icon name='search' />
                  </Button>
                </Input>
                <div
                  style={{
                    width: width - 25,
                    height: height - conf.iframe.topOffset - conf.iframe.bottomOffset - 100
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
                      // tickValues: "every 2 minutes",
                      tickValues: "every 5 minutes",
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
        }, {
          menuItem: 'Metrics',
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

                { adding ? (
                  <Segment secondary size='mini'>
                    <Form
                      schema={metricsQueriesSchema}
                      validator={validator}
                      formData={metricsQueries}
                      // onChange={log('changed')}
                      onSubmit={({ formData }) => { setMetricsQueries(formData); setAdding(!adding) }}
                      // onError={log('errors')}
                    >
                      <Button.Group>
                        <Button type='button' onClick={() => { setMetricsQueries(metricsQueries); setAdding(!adding) }}>
                          <Icon name='cancel' />
                          {' '}
                          {t('Cancel')}
                          {' '}
                        </Button>
                        <Button.Or />
                        <Button type='submit' positive on>
                          <Icon name='save' />
                          {' '}
                          {t('Apply')}
                          {' '}
                        </Button>
                      </Button.Group>
                    </Form>
                  </Segment>
                ) : (
                  <Menu pointing secondary>
                    <Menu.Item
                      position='right'
                      onClick={() => { setAdding(!adding) }}
                    >
                      <Icon name='edit' />
                      {' '}
                      {t('Edit Queries')}
                      {' '}
                    </Menu.Item>
                  </Menu>
                )}

                <ThemeProvider theme={muiTheme}>
                  <ChartsProvider chartsTheme={chartsTheme}>
                    <SnackbarProvider
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="default"
                      content=""
                    >
                      <PluginRegistry
                        pluginLoader={pluginLoader}
                        defaultPluginKinds={{
                          Panel: "TimeSeriesChart",
                          TimeSeriesQuery: "PrometheusTimeSeriesQuery",
                        }}
                      >
                        <QueryClientProvider client={queryClient}>
                          <TimeRangeProvider timeRange={timeRange} refreshInterval={refreshInterval} setTimeRange={setTimeRange} setRefreshInterval={setRefreshInterval}>
                            <VariableProvider>
                              <DatasourceStoreProvider
                                dashboardResource={fakeDashboard}
                                datasourceApi={fakeDatasourceApi}
                              >
                                <DataQueriesProvider
                                  definitions={metricsQueries.map(mq => ({
                                    kind: "PrometheusTimeSeriesQuery",
                                    spec: { query: mq },
                                  }))}
                                  // definitions={[
                                  //   {
                                  //     kind: "PrometheusTimeSeriesQuery",
                                  //     // spec: { query: `up{job="prometheus"}` },
                                  //     spec: { query: `agents_processed` },
                                  //   },
                                  //   {
                                  //     kind: "PrometheusTimeSeriesQuery",
                                  //     // spec: { query: `up{job="prometheus"}` },
                                  //     spec: { query: `running_agents` },
                                  //   },
                                  // ]}
                                >
                                  <Panel
                                    panelOptions={{
                                      hideHeader: true,
                                      // hideHeader: false,
                                    }}
                                    definition={{
                                      kind: "Panel",
                                      spec: {
                                        display: { name: "Example Panel" },
                                        plugin: {
                                          kind: "TimeSeriesChart",
                                          spec: {
                                            legend: {
                                              position: "bottom",
                                              size: "medium",
                                            },
                                          },
                                        },
                                      },
                                    }}
                                  />
                                </DataQueriesProvider>
                              </DatasourceStoreProvider>
                            </VariableProvider>
                          </TimeRangeProvider>
                        </QueryClientProvider>
                      </PluginRegistry>
                    </SnackbarProvider>
                  </ChartsProvider>
                </ThemeProvider>
              </div>
            </Tab.Pane>),
        } ] }
      />

  </>)
}
