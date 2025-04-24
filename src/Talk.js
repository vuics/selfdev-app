import React, { useState, useEffect, useRef } from 'react'
import {Helmet} from "react-helmet"
 import axios from 'axios'
import {
  Container,
  Loader,
  Message,
  Segment,
  Button,
  Icon,
} from 'semantic-ui-react'
import { ErrorBoundary } from "react-error-boundary";
import Iframe from 'react-iframe'

import Menubar from './components/Menubar'
import conf from './conf'
import { useWindowDimensions } from './helper.js'


function ErrorFallback({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

const logError = (error: Error, info: { componentStack: string }) => {
  // Do something with the error, e.g. log to an external API
  console.error("Talk Error Boundary:", error, ', info:', info)
}

export function Pane ({ panel, width, height }) {
  // console.log('panel:', panel, ', width:', width, ', height:', height)
  return (
    <>
    { panel === 'flow' && (
      <Iframe url={conf.flow.url}
              width={width}
              height={height - conf.iframe.topOffset - conf.iframe.bottomOffset }
              id="flow-frame"
              className=""
              display="block"
              position="relative"/>
    )}
    { panel === 'node' && (
      <Iframe url={conf.node.url}
              width={width}
              height={height - conf.iframe.topOffset - conf.iframe.bottomOffset}
              id="node-frame"
              className=""
              display="block"
              position="relative"/>
    )}
    </>
  )
}

export default function Talk () {
  const { height, width } = useWindowDimensions();

  const [ loading, setLoading ] = useState(true)
  const [ responseError, setResponseError ] = useState('')
  const [ converseRoot, setConverseRoot ] = useState(null)
  const [ credentials, setCredentials ] = useState(null)
  // const [ panels, setPanels ] = useState(["node", "flow"])
  const [ panels, setPanels ] = useState([])

  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(window.innerWidth / 2);
  const [isResizing, setIsResizing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const startResizing = () => setIsResizing(true);
  const stopResizing = () => setIsResizing(false);

  const resize = (mouseMoveEvent) => {
    if (isResizing && containerRef.current) {
      const newLeftWidth = mouseMoveEvent.clientX;
      setLeftWidth(newLeftWidth);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => resize(e);
    const handleMouseUp = () => stopResizing();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const dividerWidth = isResizing ? 8 : (isHovering ? 2 : 1);
  const dividerColor = isResizing ? "#eee" : (isHovering ? "#ddd" : "#bbb");

  useEffect(() =>{
    async function fetchCredentials () {
      try {
        const response = await axios.post(`${conf.api.url}/xmpp/credentials`, { }, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          crossOrigin: { mode: 'cors' },
        })
        // console.log('response:', response);
        const { user, password } = response.data
        setCredentials({ user, password })
        // console.log('setCredentials> user:', user, ', password:', password)
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
              // console.log('this._converse:', this._converse)
              this._converse.api.listen.on('callButtonClicked', function(data) {
                console.log('callButtonClicked data:', data)
                // console.log('Strophe connection is', data.connection);
                // console.log('Bare buddy JID is', data.model.get('jid'));
              });

              // Node-RED function "Process Data": On Message
              //
              // let name = msg.payload.name || 'Guest';
              // const prompt = msg.payload.prompt
              // msg.payload = {
              //   message: `Hello, ${name}!`,
              //   action: "",
              //   prompt,
              // };
              // if (prompt.includes('/hide')) {
              //     msg.payload.action += "[[synthetic-ui:hide()]]"
              // } else {
              //     if (prompt.includes('/show flow')) {
              //         msg.payload.action += "[[synthetic-ui:show('flow')]]"
              //     }
              //     if (prompt.includes('/show node')) {
              //         msg.payload.action += "[[synthetic-ui:show('node')]]"
              //     }
              // }
              // return msg;
              //
              this._converse.api.listen.on('message', function (data) {
                console.log('converse api message> data:', data)
                if (data && data.stanza) {
                  console.log('data.attrs:', data.attrs)
                  const { body } = data.attrs
                  if (!body) {
                    return
                  }
                  if (body.includes("[[synthetic-ui:hide()]]")) {
                    setPanels([])
                  }
                  if (body.includes("[[synthetic-ui:hide('flow')]]")) {
                    setPanels(prevPanels => prevPanels.filter(panel => panel !== 'flow'));
                  }
                  if (body.includes("[[synthetic-ui:hide('node')]]")) {
                    setPanels(prevPanels => prevPanels.filter(panel => panel !== 'node'));
                  }
                  if (body.includes("[[synthetic-ui:show('flow')]]")) {
                    setPanels(prevPanels => [...prevPanels, 'flow'])
                  }
                  if (body.includes("[[synthetic-ui:show('node')]]")) {
                    setPanels(prevPanels => [...prevPanels, 'node'])
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

            // TODO: experiment with:
            // prebind_url: '',

            // view_mode: 'fullscreen',
            // view_mode: 'embedded',
            view_mode: 'overlayed',
            // view_mode: 'mobile',

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
            // allow_message_corrections: 'last',
            allow_message_corrections: false,
            allow_message_retraction: 'own',
            hide_offline_users: false,
            clear_messages_on_reconnection: false,
            // muc_disable_slash_commands: ['nick', 'register', 'destroy', 'mute', 'voice', 'kick', 'ban'],
            // modtools_disable_assign: ['owner', 'admin', 'member', 'outcast', 'none', 'moderator', 'participant', 'visitor'],
            // modtools_disable_query: ['owner', 'admin', 'member', 'outcast', 'none', 'moderator', 'participant', 'visitor'],
            visible_toolbar_buttons: {
              call: true,
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

            whitelisted_plugins: ['synthetic-ui-plugin'],
          }

          // console.log('converseOptions:', converseOptions)
          converse.initialize(converseOptions)

          // await converse.initialize(converseOptions)

          // TODO: add Jitsi Meet pluging:
          // https://www.npmjs.com/package/@converse-plugins/jitsimeet

          // FIXME: it does not work as shown in examples
          //        https://m.conversejs.org/docs/html/configuration.html#visible-toolbar-buttons
          //
        } catch (err) {
          console.error('converse.initialize error:', err)
          setResponseError('Error initializing converse.')
        } finally {
          setLoading(false)
        }
      });
    }
  }, [converseRoot, credentials])


  console.log('panels:', panels)
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
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


      <div
        ref={containerRef}
        style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden" }}
      >
        <Segment
          style={{ width: leftWidth, height: "100%", margin: 0, borderRadius: 0 }}
        >
          <Pane panel={panels[0]} width={leftWidth - 30} height={height}/>
        </Segment>
        { panels.length > 1 && (
          <>
            <div
              onMouseDown={startResizing}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{ width: dividerWidth, cursor: "col-resize", backgroundColor: dividerColor, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", transition: "width 0.2s, background-color 0.2s" }}
              // style={{ width: 1, cursor: "col-resize", backgroundColor: "#ccc", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Button icon  size="mini" style={{ width: '3px', margin: '0 1px 0 0', padding: '4px 0 4px 0'}}>
                <Icon fitted name="ellipsis vertical" />
              </Button>
            </div>
            <Segment
              style={{ flex: 1, height: "100%", margin: 0, borderRadius: 0 }}
            >
              <Pane panel={panels[1]} width={width - leftWidth - 30 } height={height} />
            </Segment>
          </>
        )}
      </div>

      <div>
        { credentials && (
          <div ref={ (ref) => setConverseRoot(ref) } />
        )}
      </div>
    </ErrorBoundary>
  )
}
