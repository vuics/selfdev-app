import React, { useState, useEffect, useRef } from 'react'
import {Helmet} from "react-helmet"
 import axios from 'axios'
import {
  Container,
  Loader,
  Message,
} from 'semantic-ui-react'
import { ErrorBoundary } from "react-error-boundary";
import Menubar from './components/Menubar'
import conf from './conf'


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

const Talk = () => {
  const [ loading, setLoading ] = useState(true)
  const [ responseError, setResponseError ] = useState('')
  const [ converseRoot, setConverseRoot ] = useState(null)
  const [ credentials, setCredentials ] = useState(null)

  useEffect(async () => {
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
  }, [])

  useEffect(() => {
    if (converseRoot && credentials) {
      console.log('converseRoot:', converseRoot)
      window.addEventListener("converse-loaded", async (event) => {
        const { converse } = event.detail;
        console.log('converse:', converse)
        try {
          const converseOptions = {
            root: converseRoot,

            loglevel: 'info',
            // loglevel: 'debug',

            // bosh_service_url: `https://${conf.xmpp.host}:5281/bosh/`,
            discover_connection_methods: false,
            websocket_url: `wss://${conf.xmpp.host}:5281/xmpp-websocket`,
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
            sticky_controlbox: true, // control box will not be closeable
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
            locked_domain: conf.xmpp.host,
            muc_domain: `conference.${conf.xmpp.host}`,
            locked_muc_domain: 'hidden',
            muc_nickname_from_jid: true,
            auto_join_rooms: [
              { jid: `team@conference.${conf.xmpp.host}`, minimized: false },
              { jid: `a-suite@conference.${conf.xmpp.host}`, minimized: false },
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

          }
          // console.log('converseOptions:', converseOptions)
          converse.initialize(converseOptions)

          // FIXME: it does not work as shown in examples
          //        https://m.conversejs.org/docs/html/configuration.html#visible-toolbar-buttons
          //
          // converse.listen.on('callButtonClicked', function(data) {
          //     console.log('Strophe connection is', data.connection);
          //     console.log('Bare buddy JID is', data.model.get('jid'));
          //     // ... Third-party library code ...
          // });

          console.log('after converse:', converse)
        } catch (err) {
          console.error('converse.initialize error:', err)
          setResponseError('Error initializing converse.')
        } finally {
          setLoading(false)
        }
      });
    }
  }, [converseRoot, credentials])


  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <Container>
        { credentials && (
          <Helmet>
            <link rel="stylesheet" type="text/css" media="screen" href="/dist/converse.min.css" />
            <script src="/dist/converse.min.js" charset="utf-8"></script>
          </Helmet>
        )}

        <Menubar />

        <div>
          { credentials && (
            <div ref={ (ref) => setConverseRoot(ref) } />
          )}
        </div>

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

      </Container>
    </ErrorBoundary>
  )
}

export default Talk
