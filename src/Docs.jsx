import React from 'react'
import {
  Container,
} from 'semantic-ui-react'
import Iframe from 'react-iframe'
import Menubar from './components/Menubar'
import conf from './conf.js'
import { useWindowDimensions } from './helper.js'
import i18n from './i18n'

export default function Node () {
  const { height, width } = useWindowDimensions();

  // console.log('width:', width, ' height:', height)
  return (<>
    <Container fluid>
      <Menubar />
    </Container>

    <Iframe url={`${conf.docs.url}${conf.docs.i18n[i18n.language]}`}
            width={width}
            height={height - conf.iframe.topOffset}
            id="docs-frame"
            className=""
            display="block"
            position="relative"/>
  </>)
}

