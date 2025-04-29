import React, { useState, useEffect, useCallback } from 'react'
// import { has } from 'lodash'
import { Helmet } from "react-helmet"
import axios from 'axios'
import {
  Container,
  Loader,
  Message,
  // Segment,
  // Button,
  // Icon,
} from 'semantic-ui-react'

import Menubar from './components/Menubar'
import conf from './conf'

import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];


export default function Map () {
  const [ loading, setLoading ] = useState(true)
  const [ responseError, setResponseError ] = useState('')
  const [ converseRoot, setConverseRoot ] = useState(null)
  const [ credentials, setCredentials ] = useState(null)

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  useEffect(() =>{
    async function fetchCredentials () {
      try {
        const response = await axios.post(`${conf.api.url}/xmpp/credentials`, { }, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          crossOrigin: { mode: 'cors' },
        })
        const { user, password } = response.data
        setCredentials({ user, password })
      } catch (err) {
        console.error('xmpp/credentials error:', err)
        setResponseError(err?.response?.data?.message || 'Error retrieving credentials.')
        setLoading(false)
      }
    }
    fetchCredentials()
  }, [])

  useEffect(() => {
    if (converseRoot && credentials) {
      console.log('converseRoot:', converseRoot)
      window.addEventListener("converse-loaded", async (event) => {
        const { converse } = event.detail;
        console.log('converse:', converse)
        try {
          converse.plugins.add('synthetic-ui-plugin', {
            initialize: function () {
              this._converse.api.listen.on('callButtonClicked', function(data) {
                console.log('callButtonClicked data:', data)
              });

              this._converse.api.listen.on('message', function (data) {
                console.log('converse api message> data:', data)
                if (data && data.stanza) {
                  console.log('data.attrs:', data.attrs)
                  const { body } = data.attrs
                  if (!body) {
                    return
                  }
                }
              });
            },
          });

          const converseOptions = {
            root: converseRoot,

            loglevel: 'info',
            // loglevel: 'debug',

            bosh_service_url: conf.xmpp.boshServiceUrl,
            discover_connection_methods: conf.xmpp.discoverConnectionMethods,
            websocket_url: conf.xmpp.websocketUrl,
            auto_reconnect: true,
            stanza_timeout: 300000, // 5m
            keepalive: true,

            authentication: 'login',
            // reuse_scram_keys: true, // what if credentials updated on server?
            jid: `${credentials.user}@${conf.xmpp.host}`,
            password: credentials.password,
            auto_login: true,
            allow_logout: false,
            clear_cache_on_logout: true,

            view_mode: 'overlayed',

            i18n: 'en',
            show_controlbox_by_default: true,
            show_client_info: false,
            sticky_controlbox: false, // control box will not be closeable
            allow_registration: false,
            allow_url_history_change: false,
            allow_adhoc_commands: false,
            allow_bookmarks: true,
            allow_non_roster_messaging: true,
            theme: 'concord',
            dark_theme: 'concord', // drakula',
            play_sounds: false,
            allow_message_corrections: false,
            allow_message_retraction: 'own',
            hide_offline_users: false,
            clear_messages_on_reconnection: false,
            visible_toolbar_buttons: {
              // call: true,  // TODO: enable and attach to Jitsi Meet
              spoiler: true,
              emoji: true,
              toggle_occupants: true
            },

            auto_join_on_invite: true,
            auto_subscribe: true,
            domain_placeholder: conf.xmpp.host,
            default_domain: conf.xmpp.host,
            // locked_domain: conf.xmpp.host,
            muc_domain: conf.xmpp.mucHost,
            // locked_muc_domain: 'hidden',
            muc_nickname_from_jid: true,
            auto_join_rooms: [
              // { jid: `all@${conf.xmpp.mucHost}`, minimized: false },
            ],
            auto_list_rooms: true,
            auto_register_muc_nickname: 'unregister',
            // muc_respect_autojoin: false,
            // auto_join_private_chats: [`alice@${conf.xmpp.host}`, `bob@${conf.xmpp.host}`],

            // Status
            idle_presence_timeout: 300, // 5m
            csi_waiting_time: 600, // 10m
            auto_away: 3600,  // 1h
            auto_xa: 24*3600, // 24h

            whitelisted_plugins: [
              'synthetic-ui-plugin',
            ],
          }

          // console.log('converseOptions:', converseOptions)
          converse.initialize(converseOptions)
        } catch (err) {
          console.error('converse.initialize error:', err)
          setResponseError('Error initializing converse.')
        } finally {
          setLoading(false)
        }
      });
    }
  }, [converseRoot, credentials])


  // console.log('panels:', panels)
  return (
    <>
      { credentials && (
        <Helmet>
          <link rel="stylesheet" type="text/css" media="screen" href="/dist/converse.min.css" />
          <script src="/dist/converse.min.js" charset="utf-8"></script>
        </Helmet>
      )}

      <Container>
        <Menubar />
      </Container>

      <Loader active={loading} inline='centered' />
      { responseError &&
        <Message
          negative
          style={{ textAlign: 'left'}}
          icon='exclamation circle'
          header='Error'
          content={responseError}
          onDismiss={() => setResponseError('')}
        />
      }

      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>

      <div>
        { credentials && (
          <div ref={ (ref) => setConverseRoot(ref) } />
        )}
      </div>
    </>
  )
}
