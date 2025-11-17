import React, { useState, useEffect, useMemo } from 'react'
import ReactECharts from "echarts-for-react";

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
  Card,
  Dropdown,
  Modal,
  // Header,
  // Checkbox,
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
import Form from '@rjsf/semantic-ui'
import validator from '@rjsf/validator-ajv8';
import { JsonEditor } from "json-edit-react"
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
import * as prometheusPlugin from "@perses-dev/prometheus-plugin";
import * as timeseriesChartPlugin from "@perses-dev/timeseries-chart-plugin";

import { useWindowDimensions } from './helper.js'
import Menubar from './components/Menubar'
import conf from './conf'

ModuleRegistry.registerModules([AllCommunityModule])


const prometheusDatasource = {
  kind: "GlobalDatasource",
  metadata: { name: "hello" },
  spec: {
    default: true,
    plugin: {
      kind: "PrometheusDatasource",
      spec: {
        // TODO: move to conf
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
    return Promise.resolve(prometheusDatasource);
  }

  listDatasources() {
    return Promise.resolve([]);
  }

  listGlobalDatasources() {
    return Promise.resolve([prometheusDatasource]);
  }

  buildProxyUrl() {
    return "/prometheus";
  }
}
export const prometheusDatasourceApi = new DatasourceApiImpl();
export const prometheusDashboard = {
  kind: "Dashboard",
  metadata: {},
  spec: {},
};

export function LogsHistogram({ buckets }) {
  const data = useMemo(() => {
    if (!buckets) return [];
    return buckets.map(b => ({
      time: new Date(b.key).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      count: b.doc_count
    }));
  }, [buckets]);

  const option = {
    tooltip: {
      trigger: "axis"
    },
    grid: {
      left: 50,
      right: 20,
      top: 40,
      bottom: 40
    },
    xAxis: {
      type: "category",
      data: data.map(d => d.time),
      axisLabel: { rotate: 45 }
    },
    yAxis: {
      type: "value",
      name: "Count"
    },
    dataZoom: [
      { type: "inside" },
      { type: "slider" }
    ],
    series: [
      {
        name: "Logs",
        data: data.map(d => d.count),
        type: "bar",
        barWidth: "60%"
      }
    ]
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Logs per Minute</Card.Header>
      </Card.Content>

      <Card.Content>
        <ReactECharts option={option} style={{ height: 400 }} />
      </Card.Content>
    </Card>
  );
}



// export function transformPrometheusRange(response) {
//   const result = response?.data?.result?.[0];
//   if (!result) return [];

//   const labels = result.metric; // metric labels like job, instance, etc.

//   return result.values.map(([ts, val]) => ({
//       timestamp: ts * 1000,
//       value: Number(val),
//       ...labels
//     }));
// }

// export function toNivoLineData(points) {
//   return [
//     {
//       id: points[0]?.__name__ || "metric",
//       data: points.map(p => ({
//         x: new Date(p.timestamp),
//         y: p.value
//       }))
//     }
//   ];
// }

export default function Logs () {
  const { t } = useTranslation('Logs')
  const { height, width } = useWindowDimensions();
  const [ responseError, setResponseError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ querying, setQuerying ] = useState(false)
  const [ logsQuery, setLogsQuery ] = useState('*')
  const [ adding, setAdding ] = useState(false)
  const [ selectedLog, setSelectedLog ] = useState(null)
  const [ modalOpen, setModalOpen ] = useState(false)
  const [ levelFilter, setLevelFilter ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  function toLocalDatetime(date) {
    const pad = (n) => n.toString().padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
  const [startTs, setStartTs] = useState(toLocalDatetime(new Date(Date.now() - 24*60*60*1000))); // 24h ago
  const [endTs, setEndTs] = useState(toLocalDatetime(new Date())); // now
  function formatLocalTimestamp(utcString) {
    const date = new Date(utcString);
    // Example: "2025-11-17 14:59"
    return date.toLocaleString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }
  const [pastDuration, setPastDuration] = useState("1d");


  const pastDurationOptions = [
    { key: "15m", text: "Last 15 minutes", value: "15m", seconds: 15 * 60 },
    { key: "30m", text: "Last 30 minutes", value: "30m", seconds: 30 * 60 },
    { key: "1h",  text: "Last 1 hour",     value: "1h",  seconds: 1 * 60 * 60 },
    { key: "3h",  text: "Last 3 hours",    value: "3h",  seconds: 3 * 60 * 60 },
    { key: "12h", text: "Last 12 hours",   value: "12h", seconds: 12 * 60 * 60 },
    { key: "1d",  text: "Last 1 day",      value: "1d",  seconds: 24 * 60 * 60 },
    { key: "3d",  text: "Last 3 days",     value: "3d",  seconds: 3 * 24 * 60 * 60 },
    { key: "7d",  text: "Last 7 days",     value: "7d",  seconds: 7 * 24 * 60 * 60 },
    { key: "custom", text: "Custom", value: "custom", seconds: null },
  ];
  useEffect(() => {
    if (!pastDuration || pastDuration === "custom") return;
    const item = pastDurationOptions.find(x => x.value === pastDuration);
    if (!item || !item.seconds) return;
    const now = new Date();
    const ms = item.seconds * 1000;
    setEndTs(toLocalDatetime(now));
    setStartTs(toLocalDatetime(new Date(now - ms)));
  }, [pastDuration]);

  // const [startTs, setStartTs] = useState(
  //   new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0,16)
  // );
  // const [endTs, setEndTs] = useState(
  //   new Date().toISOString().slice(0,16)
  // );

  console.log('startTs:', startTs)
  console.log('endTs:', endTs)
  // console.log('selectedLog:', selectedLog)

  // TODO: edit it
  const [ logsQueryBase, setLogsQueryBase ] = useState('*')

  // useEffect(() => {
  //   let q = logsQuery
  //   if (levelFilter) {
  //     q += ` AND level:${levelFilter}`
  //   } else {
  //     q.replace(` AND level:${levelFilter}`, '')
  //   }
  //   if (nameFilter) {
  //     q += ` AND name:${nameFilter}`;
  //   } else {
  //     q.replace(` AND name:${nameFilter}`, '')
  //   }
  //   setLogsQuery(q);
  // }, [levelFilter, nameFilter, logsQuery]);

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

  // For AgGridReact
  const [logsColumns, ] = useState([
    // { "field": "@timestamp", filter: true },
    { field: "@timestamp",
      headerName: "Timestamp",
      valueFormatter: (params) => formatLocalTimestamp(params.value),
      filter: true,
    },
    { "field": "level", filter: true },
    { "field": "agentId", filter: true },
    { "field": "archetype", filter: true },
    { "field": "name", filter: true },
    { "field": "message", filter: true },
  ]);

  const [ logsData, setLogsData ] = useState([ ]);
  const [aggs, setAggs] = useState(null);

  // const [ metricsData, setMetricsData ] = useState([]);
  // console.log('metricsData:', metricsData)

  const [timeRange, setTimeRange] = useState({
    // start: new Date(Math.floor(Date.now() / 1000) - 60 * 60),
    // end: new Date(),

    // pastDuration: "30m"

    // TODO: make setting
    pastDuration: "3h"
  });
  // TODO: make setting
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
    setQuerying(true)
    try {
      const res = await axios.get(`${conf.api.url}/logs?skip=${conf.logs.skip}&limit=${conf.logs.limit}&q=${logsQuery}&startTs=${new Date(startTs).toISOString()}&endTs=${new Date(endTs).toISOString()}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      // console.log('res:', res)
      console.log('res.data:', res.data)
      setLogsData(res.data.logsData)
      setAggs(res.data.aggs)
    } catch (err) {
      console.error('fetch logs error:', err);
      return setResponseError(err?.response?.data?.message || t('Error fetching logs.'))
    } finally {
      setLoading(false)
      setQuerying(false)
    }
  }

  // const fetchMetrics = async () => {
  //   setQuerying(true)
  //   try {
  //     const res = await axios.get(`${conf.api.url}/logs/metrics?query=${metricsQuery}`, {
  //       headers: { 'Content-Type': 'application/json' },
  //       withCredentials: true,
  //     })
  //     // console.log('res:', res)
  //     console.log('res.data:', res.data)
  //     const points = transformPrometheusRange(res.data.metrics);
  //     setMetricsData(toNivoLineData(points))
  //   } catch (err) {
  //     console.error('fetch metrics error:', err);
  //     return setResponseError(err?.response?.data?.message || t('Error fetching metrics.'))
  //   } finally {
  //     setQuerying(false)
  //   }
  // }

  useEffect(() => {
    fetchLogs()
    // fetchMetrics()
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
          menuItem: 'Logs',
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
                <Input
                  loading={querying}
                  iconPosition='left'
                  type='text'
                  placeholder='Query...'
                  action
                  fluid
                  value={logsQuery}
                  onChange={e => setLogsQuery(e.target.value)}
                >
                  <Icon name='terminal' />
                  <input
                    style={{
                      fontFamily: `"Fira Code", "JetBrains Mono", "Source Code Pro", monospace`,
                      fontSize: "14px",
                      letterSpacing: "0.3px",
                    }}
                  />
                  <Button
                    icon
                    // iconPosition='left'
                    labelPosition='right'
                    color={conf.style.color0}
                    onClick={fetchLogs}
                  >
                    Query
                    <Icon name='search' />
                  </Button>
                </Input>

                <div
                  style={{ height: '0.1rem'}}
                />

                {' '}
                <Icon name='filter' color='grey'/>
                <Dropdown
                  placeholder="Level"
                  selection
                  clearable
                  options={aggs?.levels?.buckets?.map(l => ({ key: l.key, text: l.key, value: l.key })) || []}
                  value={levelFilter}
                  onChange={(e, { value }) => {
                    let q = logsQuery
                    q = q.replace(` AND level:${levelFilter}`, '')
                    if (value) {
                      q += ` AND level:${value}`;
                    }
                    setLevelFilter(value)
                    setLogsQuery(q)
                  }}
                />

                {' '}
                <Dropdown
                  placeholder="Name"
                  selection
                  clearable
                  options={aggs?.names?.buckets?.map(s => ({ key: s.key, text: s.key, value: s.key })) || []}
                  value={nameFilter}
                  onChange={(e, { value }) => {
                    let q = logsQuery
                    q = q.replace(` AND name:${nameFilter}`, '')
                    if (value) {
                      q += ` AND name:${value}`;
                    }
                    setNameFilter(value)
                    setLogsQuery(q)
                  }}
                />

                {' '}
                <Icon name='calendar alternate outline' color='grey'/>
                <Input
                  type="datetime-local"
                  label="Start"
                  value={startTs || ""}
                  onChange={(e) => { setStartTs(e.target.value); setPastDuration('custom') }}
                  style={{ marginRight: "10px" }}
                />
                <Input
                  type="datetime-local"
                  label="End"
                  value={endTs || ""}
                  onChange={(e) => { setEndTs(e.target.value); setPastDuration('custom') }}
                  style={{ marginRight: "10px" }}
                />
                <Dropdown
                  placeholder="Past duration"
                  label="Dur"
                  selection
                  options={pastDurationOptions}
                  value={pastDuration}
                  onChange={(e, { value }) => setPastDuration(value)}
                />

                {aggs && (
                  <LogsHistogram buckets={aggs.per_minute.buckets} />
                )}

                <AgGridReact
                  rowData={logsData}
                  columnDefs={logsColumns}
                  theme={theme}
                  pagination
                  paginationPageSize={500}
                  paginationPageSizeSelector={[200, 500, 1000]}

                  cacheBlockSize={500}
                  // rowModelType="infinite"
                  onRowClicked={(e) => { console.log('e:', e); console.log('e.data:', e.data); setSelectedLog(e.data); setModalOpen(true); }}
                />

                <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                  <Modal.Header>Log Detail</Modal.Header>
                  <Modal.Content>
                    <JsonEditor
                      data={selectedLog || {}}
                      viewOnly
                      rootName=''
                    />
                  </Modal.Content>
                </Modal>

              </div>
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
                                dashboardResource={prometheusDashboard}
                                datasourceApi={prometheusDatasourceApi}
                              >
                                <DataQueriesProvider
                                  definitions={metricsQueries.map(mq => ({
                                    kind: "PrometheusTimeSeriesQuery",
                                    spec: { query: mq },
                                  }))}
                                >
                                  <Panel
                                    panelOptions={{
                                      hideHeader: true,
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
