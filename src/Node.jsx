import React from 'react'
import {
  Container,
} from 'semantic-ui-react'
import Iframe from 'react-iframe'
import Menubar from './components/Menubar'
import conf from './conf.js'
import { useWindowDimensions } from './helper.js'

export default function Node () {
  const { height, width } = useWindowDimensions();

  // console.log('width:', width, ' height:', height)
  return (
    <>
      <Container>
        <Menubar />
      </Container>

      <Iframe url={conf.node.url}
              width={width}
              height={height - conf.iframe.topOffset}
              id="node-frame"
              className=""
              display="block"
              position="relative"/>
    </>
  )
}

