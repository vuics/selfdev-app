import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Container,
  Segment,
  Loader,
  Message,
  Header,
  Input,
  Button,
  Icon,
  List,
  Label,
  Confirm,
  // Checkbox,
  // Form,
  // Table,
  // Popup,
  // Dropdown,
  // Divider,
} from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
// import { isEmpty } from 'lodash'

import Menubar from './components/Menubar'
import conf from './conf'
// import { sleep } from './helper'

export default function Dash () {
  const { t } = useTranslation('Dash')
  const [ responseError, setResponseError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ bridges, setBridges ] = useState([])

  const getBridges = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${conf.api.url}/bridge`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      // console.log('res:', res)
      console.log('res.data:', res.data)
      // setAddress(res.data.address)
      setBridges(res.data)
    } catch (err) {
      console.error('get bridges error:', err);
      return setResponseError(err?.response?.data?.message || t('Error getting bridges.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBridges()
  }, [])

  return (<>
    <Container fluid>
      <Menubar />
    </Container>

    <Container style={{ marginTop: '1rem' }}>

      <Loader active={loading} inline='centered' />
      { responseError &&
        <Message
          negative
          style={{ textAlign: 'left'}}
          icon='exclamation circle'
          header={t('error')}
          content={responseError}
          onDismiss={() => setResponseError('')}
        />
      }

      <Segment secondary>
        <Header as='h3'>
          {t('Omni-channel')}
        </Header>

      </Segment>
    </Container>
  </>)
}
