import React from 'react'
import {
  Container,
} from 'semantic-ui-react'
import Iframe from 'react-iframe'
import Menubar from './components/Menubar'
import conf from './conf.js'
import { useWindowDimensions } from './helper.js'

const Note = () => {
  const { height, width } = useWindowDimensions();

  // console.log('width:', width, ' height:', height)
  return (
    <>
      <Container>
        <Menubar />
      </Container>
      <Iframe url={conf.note.url}
              width={width}
              height={height - conf.note.topOffset}
              id="note-frame"
              className=""
              display="block"
              position="relative"/>
    </>
  )
}

export default Note

