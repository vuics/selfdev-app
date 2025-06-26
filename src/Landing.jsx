import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { isEmpty } from 'lodash'
import {
  Container,
  Divider,
  Message,
  Loader,
  Button,
  Icon,
  Form,
  FormGroup,
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

  const [ email, setEmail ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ emailError, setEmailError ] = useState('')
  const [ firstNameError, setFirstNameError ] = useState('')
  const [ lastNameError, setLastNameError ] = useState('')

  const handleSubmit = async () => {
    let valid = true
    if (isEmpty(email)) {
      valid = false
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
    if (isEmpty(firstName)) {
      valid = false
      setFirstNameError('Please enter a first name')
    } else {
      setFirstNameError('')
    }
    if (isEmpty(lastName)) {
      valid = false
      setLastNameError('Please enter a first name')
    } else {
      setLastNameError('')
    }
    if (!valid) {
      return
    }
    setLoading(true)
    try {
      console.log('post interest:', {
        landingId: id,
        email,
        firstName,
        lastName,
      })
      const res = await axios.post(`${conf.api.url}/interest`, {
        landingId: id,
        email,
        firstName,
        lastName,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('interest post res:', res)
      setEmail('')
      setFirstName('')
      setLastName('')
    } catch (err) {
      console.error('interest post error:', err);
      return setResponseError(err?.response?.data?.message || 'Error submitting.')
    } finally {
      setLoading(false)
    }
  }

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
      return setResponseError(err?.response?.data?.message || 'Error getting landing page.')
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
  console.log('landing.interestForm:', landing?.interestForm)

  return (
    <Container>
      { landing.favicon && <Favicon url={String(landing.favicon)} /> }

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

      { landing.interestForm && (
        <>
          <Divider />
          <br/>
          <Form size='large'>
            <FormGroup widths={3}>
              <Form.Input
                icon='at'
                iconPosition='left'
                placeholder='E-mail address'
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={ !isEmpty(emailError) && {
                  content: emailError,
                  pointing: 'above',
                }}
                required
              />
              <Form.Input
                icon='user'
                iconPosition='left'
                placeholder='First name'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                error={ !isEmpty(firstNameError) && {
                  content: firstNameError,
                  pointing: 'above',
                }}
                required
              />
              <Form.Input
                icon='users'
                iconPosition='left'
                placeholder='Last name'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                error={ !isEmpty(lastNameError) && {
                  content: lastNameError,
                  pointing: 'above',
                }}
                required
              />
            </FormGroup>
            <Button color='teal' size='large' onClick={handleSubmit}>
              <Icon name='send' />
              {' '}I am interested{' '}
            </Button>
          </Form>
          <br/>
          <Divider />
        </>
      )}

    </Container>
  )
}

export default Landing
