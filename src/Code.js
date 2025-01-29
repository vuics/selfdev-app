import React from 'react'
import {
  Container,
  Divider,
  Header,
  Segment
} from 'semantic-ui-react'
import Menubar from './components/Menubar'

const Code = () => {
  return (
    <Container>
      <Menubar />
      <Divider hidden />
      <Segment>
        <Header as='h1'>Code</Header>
        <p>This is the Code page content.</p>
      </Segment>
      <Divider hidden />
    </Container>
  )
}

export default Code
