import React, { useState, useEffect, useRef } from 'react'
// import axios from 'axios'
import {
  Container,
  Loader,
  Message,
} from 'semantic-ui-react'
import Menubar from './components/Menubar'
import conf from './conf'

const Hive = () => {
  const [ loading, setLoading ] = useState(true)
  const [ responseError, setResponseError ] = useState('')

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

    </>
  )
}

export default Hive
