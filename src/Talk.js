import React, { useState, useEffect, useRef } from 'react'
import {Helmet} from "react-helmet"
 import axios from 'axios'
import {
  Container,
  Loader,
} from 'semantic-ui-react'
import Menubar from './components/Menubar'
import conf from './conf'

const Talk = () => {
  const [ loading, setLoading ] = useState(true)
  const [ converseRoot, setConverseRoot ] = useState(null)
  const [ credentials, setCredentials ] = useState(null)

  useEffect(async () => {
    const response = await axios.post(`${conf.api.url}/xmpp/credentials`, { }, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      crossOrigin: { mode: 'cors' },
    })
    // console.log('response:', response);
    const { user, password } = response.data
    setCredentials({ user, password })
    // console.log('user:', user, ', password:', password)
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

            // bosh_service_url: `https://${conf.xmpp.host}:5281/bosh/`,
            discover_connection_methods: false,
            websocket_url: `wss://${conf.xmpp.host}:5281/xmpp-websocket`,
            auto_reconnect: true,

            authentication: 'login',
            auto_login: true,

            jid: `${credentials.user}@${conf.xmpp.host}`,
            password: credentials.password,
            allow_logout: false,

            // TODO: experiment with:
            // credentials_url: `${conf.api.url}/talk/user`,
            // prebind_url: '',

            // view_mode: 'fullscreen',
            // view_mode: 'embedded',
            view_mode: 'overlayed',
            // view_mode: 'mobile',

            // show_controlbox_by_default: true,

            auto_join_on_invite: true,
            auto_join_rooms: [{'jid': `team@conference.${conf.xmpp.host}`, 'nick': credentials.user, 'minimized': true }],
            auto_join_private_chats: [`alice@${conf.xmpp.host}`, `bob@${conf.xmpp.host}`],
          }
          // console.log('converseOptions:', converseOptions)
          converse.initialize(converseOptions)
        } catch (err) {
          console.error('xmpp/credentials error:', err)
        } finally {
          setLoading(false)
        }
      });
    }
  }, [converseRoot, credentials])


  return (
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

    </Container>
  )
}

export default Talk
