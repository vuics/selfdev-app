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

  useEffect(() => {
    console.log('converseRoot:', converseRoot)
    window.addEventListener("converse-loaded", function(event) {
      const { converse } = event.detail;
      console.log('converse:', converse)
      converse.initialize({
        root: converseRoot,
        // view_mode: 'fullscreen',
        // view_mode: 'embedded',
        view_mode: 'overlayed',
        // view_mode: 'mobile',
        show_controlbox_by_default: true,
        // Other settings go here...
      });
      setLoading(false)
    });
  }, [converseRoot])


  return (
    <Container>
      <Helmet>
        <link rel="stylesheet" type="text/css" media="screen" href="/converse/v10.1.8/converse.min.css" />
        <script src="/converse/v10.1.8/converse.min.js" charset="utf-8"></script>
      </Helmet>

      <Menubar />

      <Segment secondary>
        {/*
        <converse-root></converse-root>
        */}
        <div ref={ (ref) => setConverseRoot(ref) } />
      </Segment>

      <Loader active={loading} inline='centered' />


    </Container>
  )
}

export default Talk
