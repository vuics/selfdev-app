import React from 'react'
import {
  Container,
} from 'semantic-ui-react'
import Iframe from 'react-iframe'
import Menubar from './components/Menubar'
import conf from './conf.js'
import { useWindowDimensions } from './helper.js'

export function ChatWidget({ className }) {
  return (
    <div className={className}>
      <langflow-chat
        chat_inputs='{"your_key":"value"}'
        chat_input_field="your_chat_key"
        window_title="Flow Widget"
        flow_id={conf.flow.flowId}
        host_url={conf.flow.url}
      ></langflow-chat>
    </div>
  );
}

export default function Flow () {
  const { height, width } = useWindowDimensions();

  // console.log('width:', width, ' height:', height)
  return (
    <>
      <Container>
        <Menubar />
      </Container>

      { conf.flow.widget && (
        <ChatWidget className={''} />
      )}

      <Iframe url={conf.flow.url}
              width={width}
              height={height - conf.iframe.topOffset -
                        (conf.flow.widget ? conf.flow.widgetOffset : 0)}
              id="flow-frame"
              className=""
              display="block"
              position="relative"/>
    </>
  )
}

