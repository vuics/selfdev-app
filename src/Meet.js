import React, { useState, useEffect, useRef } from 'react'
import {JitsiMeeting} from "@jitsi/react-sdk"
// import axios from 'axios'
import {
  Container,
  Loader,
  Message,
} from 'semantic-ui-react'
import Menubar from './components/Menubar'
import conf from './conf'


const Meet = () => {
  const [ loading, setLoading ] = useState(true)
  const [ responseError, setResponseError ] = useState('')
  const displayName = localStorage.getItem('user.firstName') + ' ' +
    localStorage.getItem('user.lastName')

  useEffect(async () => {
  }, [])


  return (
    <Container>
      <Menubar />

      <JitsiMeeting
        domain = { conf.jitsi.domain }
        roomName = { conf.jitsi.roomName }
        configOverwrite = {{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false
        }}
        interfaceConfigOverwrite = {{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
        }}
        userInfo = {{
          displayName
        }}
        onApiReady = { (externalApi) => {
          // here you can attach custom event listeners to the Jitsi Meet External API
          // you can also store it locally to execute commands
          setLoading(false)
        } }
        getIFrameRef = { (iframeRef) => { iframeRef.style.height = '800px'; } }
      />

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
  )
}

export default Meet
