import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
  }, [])

  return (
    <Container>
      <Menubar />

      <Segment secondary>
      </Segment>

      <Loader active={loading} inline='centered' />

    </Container>
  )
}

export default Talk
