import React, { useState, useEffect, useRef } from 'react'
import {Helmet} from "react-helmet"
// import { isEmpty } from 'lodash'
// import axios from 'axios'
import {
  Container,
  Segment,
  Loader,
  // List,
  // Button,
  // Form,
  // Icon,
} from 'semantic-ui-react'
import Menubar from './components/Menubar'
import conf from './conf'

const Talk = () => {
  // const name = localStorage.getItem('user.firstName') + ' ' +
  //   localStorage.getItem('user.lastName')

  const [ loading, setLoading ] = useState(true)

  const [ converseRoot, setConverseRoot ] = useState(null)

  // TODO: Uncomment? Use this Converse or defined in index.html?
  //
  useEffect(() => {
    console.log('converseRoot:', converseRoot)
    window.addEventListener("converse-loaded", function(event) {
      const { converse } = event.detail;
      console.log('converse:', converse)
      converse.initialize({
        root: converseRoot,

        // bosh_service_url: 'https://selfdev-prosody.dev.local:5281/bosh/',
        discover_connection_methods: false,
        websocket_url: 'wss://selfdev-prosody.dev.local:5281/xmpp-websocket',
        auto_reconnect: true,

        // FIXME: hardcodded:
        authentication: 'login',
        auto_login: true,
        jid: 'art@selfdev-prosody.dev.local',
        password: '123',
        allow_logout: false,

        // TODO: experiment with:
        // credentials_url: '',
        // prebind_url: '',

        // view_mode: 'fullscreen',
        // view_mode: 'embedded',
        view_mode: 'overlayed',
        // view_mode: 'mobile',

        show_controlbox_by_default: true,

      });
      setLoading(false)
    });
  }, [converseRoot])


  return (
    <Container>
      {/* TODO: Uncomment? Use this Converse or defined in index.html?
      */}
      <Helmet>
        <link rel="stylesheet" type="text/css" media="screen" href="/dist/converse.min.css" />
        <script src="/dist/converse.min.js" charset="utf-8"></script>
      </Helmet>

      <Menubar />

      <Segment secondary>
        {/*
          TODO: For embedding with script placed in index.html
        */}
        <converse-root></converse-root>

        {/*
          TODO: For overlay or fullscreen view defined in this file
        */}
        <div ref={ (ref) => setConverseRoot(ref) } />
      </Segment>

      <Loader active={loading} inline='centered' />

    </Container>
  )
}

export default Talk
