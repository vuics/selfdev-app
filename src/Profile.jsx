import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import axios from 'axios'
import {
  Form,
  Container,
  Segment,
  Loader,
  Message,
  Button,
  Icon,
  Header,
} from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import Menubar from './components/Menubar'
import conf from './conf'

const Profile = () => {
  const { t } = useTranslation('Profile')
  const [ firstName, setFirstName ] = useState(localStorage.getItem('user.firstName'))
  const [ lastName, setLastName ] = useState(localStorage.getItem('user.lastName'))
  const [ email, setEmail ] = useState(localStorage.getItem('user.email'))
  const [ phone, setPhone ] = useState(localStorage.getItem('user.phone'))
  const [ firstNameError, setFirstNameError ] = useState('')
  const [ lastNameError, setLastNameError ] = useState('')
  const [ emailError, setEmailError ] = useState('')
  const [ phoneError, setPhoneError ] = useState('')
  const [ responseError, setResponseError ] = useState('')
  const [ loading, setLoading ] = useState(false)

  const getUserStatus = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${conf.api.url}/login/status`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      // console.log('res:', res)
      setFirstName(res?.data?.user?.firstName || '<User>')
      setLastName(res?.data?.user?.lastName || '')
      setEmail(res?.data?.user?.email || '')
      setPhone(res?.data?.user?.phone || '')

    } catch (err) {
      console.error('get profile error:', err);
      return setResponseError(err?.response?.data?.message || t('Error getting user profile.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserStatus()
  }, [])

  const handleSubmit = async () => {
  }

  return (
    <Container>
      <Menubar />

      <Loader active={loading} inline='centered' />
      { responseError &&
        <Message
          negative
          style={{ textAlign: 'left'}}
          icon='exclamation circle'
          header={t('Error')}
          content={responseError}
          onDismiss={() => setResponseError('')}
        />
      }

      <Segment secondary>
        <Header as='h3'>
          {t('Profile')}
        </Header>

        <Form onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input fluid
              icon='user'
              iconPosition='left'
              placeholder={t('First Name')}
              name='firstName'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              error={ !isEmpty(firstNameError) && {
                content: firstNameError,
                pointing: 'above',
              }}
              required
              readOnly
            />
            <Form.Input
              fluid
              icon='user outline'
              iconPosition='left'
              placeholder={t('Last Name')}
              name='lastName'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              error={ !isEmpty(lastNameError) && {
                content: lastNameError,
                pointing: 'above',
              }}
              required
              readOnly
            />
            <Form.Input
              fluid
              icon='at'
              iconPosition='left'
              placeholder={t('E-mail address')}
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={ !isEmpty(emailError) && {
                content: emailError,
                pointing: 'above',
              }}
              required
              readOnly
            />
            <Form.Input
              fluid
              icon='phone'
              iconPosition='left'
              placeholder={t('Phone (optionally)')}
              name='phone'
              value={phone}
              onChange={e => setPhone(e.target.value)}
              error={ !isEmpty(phoneError) && {
                content: phoneError,
                pointing: 'above',
              }}
              readOnly
            />
            <Button
              icon labelPosition='left'
              onClick={handleSubmit}
              disabled
            >
              <Icon name='save' />
              {t('Save')}
            </Button>
          </Segment>
        </Form>
      </Segment>
    </Container>
  )
}

export default Profile
