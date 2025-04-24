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
  if (panel === 'chat') {
    return
  } else if (panel === 'meet') {
    return
  } else if (panel === 'hive') {
    return
  } else {
    for (const frame of conf.synthetic.frames) {
      if (panel === frame) {
        return (
          <Iframe url={conf[frame].url}
                  width={width}
                  height={height - conf.iframe.topOffset - conf.iframe.bottomOffset }
                  id={`${frame}-frame`}
                  className=""
                  display="block"
                  position="relative"/>
        )
      }
    }
  }

  return (
    <>
    </>
  )
}

export function SplitLayout ({ panels }) {
  const { height, width } = useWindowDimensions();

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

  if (!panels || panels.length === 0) {
    return
  }
  if (panels.length === 1) {
    return (
      <Pane panel={panels[0]} width={width} height={height}/>
    )
  }

  return (
    <>
      <div
        ref={containerRef}
        style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden" }}
      >
        <Segment
          style={{
            width: leftWidth,
            height: "100%",
            margin: '0 0 0 0',
            padding: '0 0 0 0',
            borderRadius: 0
          }}
        >
          <Pane panel={panels[0]} width={panels.length > 1 ? leftWidth : width} height={height} />
        </Segment>
        { panels.length > 1 && (
          <>
            <div
              onMouseDown={startResizing}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{
                width: dividerWidth,
                cursor: "col-resize",
                backgroundColor: dividerColor,
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "width 0.2s, background-color 0.2s"
              }}
            >
              <Button icon  size="mini" style={{
                width: '3px',
                  margin: '0 1px 0 0',
                  padding: '4px 0 4px 0'
              }}>
                <Icon fitted name="ellipsis vertical" />
              </Button>
            </div>
            <Segment
              style={{
                flex: 1,
                height: "100%",
                margin: '0 0 0 0',
                padding: '0 0 0 0',
                borderRadius: 0
              }}
            >
              <Pane panel={panels[1]} width={width - leftWidth - 1} height={height} />
            </Segment>
          </>
        )}
      </div>
    </>
  )
}

export default function Talk () {
  const [ loading, setLoading ] = useState(true)
  const [ responseError, setResponseError ] = useState('')
  const [ converseRoot, setConverseRoot ] = useState(null)
  const [ credentials, setCredentials ] = useState(null)
  // const [ panels, setPanels ] = useState(["node", "flow"])
  const [ panels, setPanels ] = useState([])

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

              // NOTE: The Synthetic UI depends on the system components
              //
              // Hive agent:
              // {
              //   "name": "synthetic-ui-executor",
              //   "description": "Triggers actions to synthesize UI elements by sending commands: /show docs, /show flow, /show hive, /hide flow, /hide all",
              //   "joinRooms": [
              //     "synthetic-ui"
              //   ],
              //   "loaders": [],
              //   "webhook": {
              //     "method": "POST",
              //     "route": "/synthetic-ui-webhook",
              //     "payload": {
              //       "prompt": ""
              //     },
              //     "parseJson": true,
              //     "promptKey": "prompt"
              //   }
              // }
              //
              // Node workflow:
              //
              //   Node-RED http in "Receive Webhook": POST /synthetic-ui-webhook
              //   Node-RED http out "Send HTTP Response"
              //   Node-RED function "Process Data": On Message:
              //
              // const prompt = msg.payload.prompt
              // msg.payload = ""
              // const arr = (str) => str ? str.split(',') : []
              // const components = arr('chat,meet,hive,flow,node,code,build,open,note,sell,train,docs')
              // if (prompt.includes('/hide all')) {
              //     msg.payload += "[[synthetic-ui:hide('all')]]"
              // } else {
              //     for (const component of components) {
              //         if (prompt.includes(`/hide ${component}`)) {
              //             msg.payload += `[[synthetic-ui:hide('${component}')]]`
              //         } else if (prompt.includes(`/show ${component}`)) {
              //             msg.payload += `[[synthetic-ui:show('${component}')]]`
              //         }
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
                  if (body.includes("[[synthetic-ui:hide('all')]]")) {
                    setPanels([])
                  } else {
                    for (const component of conf.synthetic.components) {
                      if (body.includes(`[[synthetic-ui:hide('${component}')]]`)) {
                        setPanels(prevPanels => prevPanels.filter(panel => panel !== component));
                      } else if (body.includes(`[[synthetic-ui:show('${component}')]]`)) {
                        setPanels(prevPanels => [...prevPanels, component])
                      }
                    }
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

              // FIXME: possible to enable?
              //
              // "download-dialog",
              // "stickers",
              // "toolbar-utilities",
              // "search",
              // "directory",
              // "muc-directory",
              // "diagrams",
              // "vmsg",
              // "screencast",
              // "jitsimeet",
              // "location",
              // "http-auth",
              // "actions",
              // "voicechat",
              // "galene",
              // "mastodon",
              // "adaptive-cards"
              //
              //
              // "muc-presence-probe",
              // "converse-oauth",
              // "polls",
            ],

            // FIXME: possible to enable?
            //
            // galene_url: "https://selfdev-web.dev.local:3690/community-plugins/packages/galene",
            // galene_host: 'selfdev-web.dev.local',
            //
            // jitsimeet_modal: false,
            // jitsimeet_url: 'https://meet.jit.si',
            //
            // mastodon: {
            //   url: "https://toot.igniterealtime.org",
            //   token: "(TBS)",
            //   toolbar: true,
            //   limit: 25,
            //   check: 15,
            //   title: "Mastodon Feed"
            // },
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


  console.log('panels:', panels)
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      { credentials && (
        <Helmet>
          <link rel="stylesheet" type="text/css" media="screen" href="/dist/converse.min.css" />
          <script src="/dist/converse.min.js" charset="utf-8"></script>

                                      {/*
                                      FIXME: Remove?
                                      <link rel="stylesheet" type="text/css" media="screen" href="/community-plugins/dist/converse.min.css" />
                                      <script src="/community-plugins/dist/converse.min.js" charset="utf-8"></script>
                                      */}

                                      {/*
                                      FIXME: Remove?


                                      <script src="/community-plugins/packages/actions/actions.js" charset="utf-8"></script>

                                      <script src="/community-plugins/packages/adaptive-cards/adaptivecards.min.js" charset="utf-8"></script>

                                      <script src="/community-plugins/packages/diagrams/abcjs.js" charset="utf-8"></script>
                                      <script src="/community-plugins/packages/diagrams/mermaid.min.js" charset="utf-8"></script>
                                      <script src="/community-plugins/packages/diagrams/diagrams.js" charset="utf-8"></script>

                                      <link rel="stylesheet" type="text/css" media="screen" href="/community-plugins/packages/directory/directory.css" />
                                      <script src="/community-plugins/packages/directory/directory.js" charset="utf-8"></script>

                                      <script src="/community-plugins/packages/download-dialog/dist/download-dialog.js" charset="utf-8"></script>

                                      <link rel="stylesheet" type="text/css" href="/community-plugins/packages/galene/common.css"/>
                                      <link rel="stylesheet" type="text/css" href="/community-plugins/packages/galene/galene.css"/>
                                      <link rel="stylesheet" type="text/css" href="/community-plugins/packages/galene/external/fontawesome/css/fontawesome.min.css"/>
                                      <link rel="stylesheet" type="text/css" href="/community-plugins/packages/galene/external/fontawesome/css/solid.min.css"/>
                                      <link rel="stylesheet" type="text/css" href="/community-plugins/packages/galene/external/fontawesome/css/regular.min.css"/>
                                      <link rel="stylesheet" type="text/css" href="/community-plugins/packages/galene/external/toastify/toastify.css"/>
                                      <link rel="stylesheet" type="text/css" href="/community-plugins/packages/galene/external/contextual/contextual.css"/>
                                      <script src="/community-plugins/packages/galene/galene.js" charset="utf-8"></script>
                                      <script src="/community-plugins/packages/galene/protocol.js"></script>
                                      <script src="/community-plugins/packages/galene/stophe.min.js"></script>
                                      <script src="/community-plugins/packages/galene/galene-socket.js"></script>
                                      <script src="/community-plugins/packages/galene/external/toastify/toastify.js"></script>
                                      <script src="/community-plugins/packages/galene/external/contextual/contextual.js"></script>
                                      <script src="/community-plugins/packages/galene/galene-ui.js"></script>

                                      <script src="/community-plugins/packages/http-auth/http-auth.js" charset="utf-8"></script>

                                      <script src="/community-plugins/packages/jitsimeet/jitsimeet.js" charset="utf-8"></script>

                                      <script src="/community-plugins/packages/location/location.js" charset="utf-8"></script>

                                      <script src="/community-plugins/packages/mastodon/mastodon.js" charset="utf-8"></script>

                                      <link rel="stylesheet" type="text/css" href="/community-plugins/packages/muc-directory/muc-directory.css"/>
                                      <script src="/community-plugins/packages/muc-directory/muc-directory.js" charset="utf-8"></script>

                                      <script src="/community-plugins/packages/muc-presence-probe/src/muc-presence-probe.js" charset="utf-8"></script>

                                      <link rel="stylesheet" type="text/css" href="/community-plugins/packages/oauth/styles.scss"/>
                                      <script src="/community-plugins/packages/oauth/index.js" charset="utf-8"></script>

                                      <link rel="stylesheet" type="text/css" href="/community-plugins/packages/polls/polls.css"/>
                                      <script src="/community-plugins/packages/polls/lit-html.min.js" charset="utf-8"></script>
                                      <script src="/community-plugins/packages/polls/polls.js" charset="utf-8"></script>

                                      <script src="/community-plugins/packages/screencast/screencast.js" charset="utf-8"></script>

                                      <link rel="stylesheet" type="text/css" href="/community-plugins/packages/search/search.css"/>
                                      <script src="/community-plugins/packages/search/jspdf.debug.js" charset="utf-8"></script>
                                      <script src="/community-plugins/packages/search/jspdf.plugin.autotable.js" charset="utf-8"></script>
                                      <script src="/community-plugins/packages/search/search.js" charset="utf-8"></script>

                                      <script src=" " charset="utf-8"></script>
                                      */}

                                      {/*
                                      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                                      <link rel="shortcut icon" type="image/ico" href="favicon.ico"/>
                                      <link type="text/css" rel="stylesheet" media="screen" href="./dist/converse.css" />
                                      */}
                                      {/*
                                      <script src="https://conversejs.org/3rdparty/libsignal-protocol.min.js"></script>
                                      */}
                                      {/*
                                      <script src="./dist/converse.js"></script>
                                      */}

          {/*
          FIXME: Is there a way to fix it?

          <script src="packages/download-dialog/dist/download-dialog.js"></script>
          <script src="packages/toolbar-utilities/toolbar-utilities.js"></script>
          <script src="packages/location/location.js"></script>
          <script src="packages/jitsimeet/jitsimeet.js"></script>
          <script src="packages/screencast/screencast.js"></script>
          <script src="packages/vmsg/vmsg.js"></script>

          <link type="text/css" rel="stylesheet" media="screen" href="packages/stickers/stickers.css" />
          <script src="packages/stickers/stickers.js"></script>

          <script src="packages/muc-directory/muc-directory.js"></script>
          <link type="text/css" rel="stylesheet" media="screen" href="packages/muc-directory/muc-directory.css" />

          <link type="text/css" rel="stylesheet" media="screen" href="packages/search/search.css" />
          <script src="packages/search/jspdf.debug.js"></script>
          <script src="packages/search/jspdf.plugin.autotable.js"></script>
          <script src="packages/search/search.js"></script>

          <link type="text/css" rel="stylesheet" media="screen" href="packages/directory/directory.css" />
          <script src="packages/directory/directory.js"></script>

          <script src="packages/diagrams/mermaid.min.js"></script>
          <script src="packages/diagrams/diagrams.js"></script>
          <script src="packages/diagrams/abcjs.js"></script>

          <script src="packages/http-auth/http-auth.js"></script>
          <script src="packages/actions/actions.js"></script>

          <link type="text/css" rel="stylesheet" media="screen" href="packages/voicechat/voicechat.css" />
          <script src="packages/voicechat/hark.js"></script>
          <script src="packages/voicechat/jquery-3.5.1.min.js"></script>
          <script src="packages/voicechat/lib-jitsi-meet.min.js"></script>
          <script src="packages/voicechat/voicechat.js"></script>

          <link type="text/css" rel="stylesheet" media="screen" href="packages/adaptive-cards/adaptivecards.css" />
          <script src="packages/adaptive-cards/adaptivecards.min.js"></script>
          <script src="packages/adaptive-cards/markdown-it.min.js"></script>
          <script src="packages/adaptive-cards/adaptive-cards.js"></script>

          <link type="text/css" rel="stylesheet" media="screen" href="packages/polls/polls.css" />
          <script src="packages/polls/polls.js"></script>

          <script src="packages/galene/protocol.js"></script>
          <script src="packages/galene/galene-socket.js"></script>
          <script src="packages/galene/galene.js"></script>

          <script src="packages/mastodon/timeago.min.js"></script>
          <script src="packages/mastodon/mastodon.js"></script>
          */}

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

      <SplitLayout panels={panels} />

      <div>
        { credentials && (
          <div ref={ (ref) => setConverseRoot(ref) } />
        )}
      </div>
    </ErrorBoundary>
  )
}
