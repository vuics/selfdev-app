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
import { useWindowDimensions } from './helper.js'
import { useIndexContext } from './components/IndexContext'


const Meet = () => {
  const { user } = useIndexContext()
  const [ loading, setLoading ] = useState(true)
  const [ responseError, setResponseError ] = useState('')
  const { height, width } = useWindowDimensions();
  console.log('width:', width, ' height:', height)

  const displayName = `${user.firstName} ${user.lastName}`

  // useEffect(async () => {
  // }, [])

  return (
    <>
      <Container>
        <Menubar />

        { loading &&
          <Loader active={loading} inline='centered' />
        }

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

      <JitsiMeeting
        domain = { conf.jitsi.domain }
        roomName = { conf.jitsi.roomName }
        configOverwrite = {{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,

          // FIXME: this does not work to hide Jitsi logo
          // disableDeepLinking: true,
          // watermark: {
          //   enabled: false,
          //   logo: ''
          // },
          // brandingRoomAlias: false
        }}
        interfaceConfigOverwrite = {{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,

          // FIXME: this does not work to hide Jitsi logo
          // HIDE_INVITE_MORE_HEADER: true
          // SHOW_WATERMARK_FOR_GUESTS: false,
          // SHOW_JITSI_WATERMARK: false,
          // SHOW_WATERMARK: false,
          // DEFAULT_LOGO_URL: '',
          // HIDE_DEEP_LINKING_LOGO: true,
          // SHOW_BRAND_WATERMARK: false,
        }}
        userInfo = {{
          displayName
        }}
        onApiReady = { (externalApi) => {
          // here you can attach custom event listeners to the Jitsi Meet External API
          // you can also store it locally to execute commands
          setLoading(false)
        }}
        getIFrameRef = { (iframeRef) => {
          iframeRef.style.height = `${height}px`
        }}
      />
    </>
  )
}

export default Meet
