import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import {
  Container,
  Divider,
  Segment,
  Message,
  Loader,
} from 'semantic-ui-react'
import parse from 'html-react-parser'
import Favicon from 'react-favicon'
import conf from './conf'

const Landing = () => {
  const { id } = useParams()

  const [ landing, setLanding ] = useState([])
  const [ responseError, setResponseError ] = useState('')
  const [ responseMessage, setResponseMessage ] = useState('')
  const [ loading, setLoading ] = useState(false)

  const getLandings = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${conf.api.url}/landing/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('landings get res:', res)
      setLanding(res?.data || '')
    } catch (err) {
      console.error('logout error:', err);
      return setResponseError(err?.response?.data?.message || 'Error getting user profile.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getLandings()
  }, [])

  useEffect(() => {
    if (landing.title) {
      document.title = String(landing.title)
    }
  }, [landing]);

  console.log('landing.title:', landing?.title)
  console.log('landing.body:', landing?.body)
  console.log('landing.favicon:', landing?.favicon)
  return (
    <>
      { landing.favicon &&
          <Favicon url={String(landing.favicon)} />
      }

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
      { responseMessage &&
        <Message
          positive
          style={{ textAlign: 'left'}}
          icon='info circle'
          header='Info'
          content={responseMessage}
          onDismiss={() => setResponseMessage('')}
        />
      }

      { parse(String(landing.body)) }
    </>
  )
}

export default Landing
