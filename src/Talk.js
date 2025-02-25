import React, { useState, useEffect } from 'react'
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
// import { converse } from './converse/v10.1.8/converse.js'
// import './converse/v10.1.8/converse.js'
// import './converse/v10.1.8/converse.css'
// import './converse/v10.1.8/converse.min.js'
// import './converse/v10.1.8/converse.min.css'

export const useScript = (url, name) => {

  const [lib, setLib] = useState({})

  useEffect(() => {
    const script = document.createElement('script')

    script.src = url
    script.async = true
    script.onload = () => setLib({ [name]: window[name] })

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [url])

  return lib

}

const Talk = () => {
  // const name = localStorage.getItem('user.firstName') + ' ' +
  //   localStorage.getItem('user.lastName')

  const [ loading, setLoading ] = useState(true)

  // const { Stripe } = useScript('https://js.stripe.com/v2/', 'Stripe')

  // root

  useEffect(() => {
    // window.converse && window.converse.initialize({
    //   bosh_service_url: 'https://conversejs.org/http-bind/', // Please use this connection manager only for testing purposes
    //   show_controlbox_by_default: true
    // });
  }, [])

  return (
    <Container>
        {/*
      <Helmet>
        <link rel="stylesheet" type="text/css" media="screen" href="/converse/v10.1.8/converse.min.css" />
        <script src="/converse/v10.1.8/converse.min.js" charset="utf-8"></script>
        <script>
          converse.initialize({
            // "bosh_service_url": 'https://conversejs.org/http-bind/', // Please use this connection manager only for testing purposes
            // 'show_controlbox_by_default': true
          });
        </script>
      </Helmet>
        */}

      <Menubar />

      <Segment secondary>
      </Segment>

      <Loader active={loading} inline='centered' />

    </Container>
  )
}

export default Talk
