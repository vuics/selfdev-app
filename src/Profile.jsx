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
  Divider,
} from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import Menubar from './components/Menubar'
import conf from './conf'

const Profile = () => {
  const { t } = useTranslation('Profile')

  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ line1, setLine1 ] = useState('')
  const [ line2, setLine2 ] = useState('')
  const [ city, setCity ] = useState('')
  const [ state, setState ] = useState('')
  const [ postalCode, setPostalCode ] = useState('')
  const [ country, setCountry ] = useState('')

  const [ firstNameError, setFirstNameError ] = useState('')
  const [ lastNameError, setLastNameError ] = useState('')
  const [ emailError, setEmailError ] = useState('')
  const [ phoneError, setPhoneError ] = useState('')
  const [ line1Error, setLine1Error ] = useState('')
  const [ line2Error, setLine2Error ] = useState('')
  const [ cityError, setCityError ] = useState('')
  const [ stateError, setStateError ] = useState('')
  const [ postalCodeError, setPostalCodeError ] = useState('')
  const [ countryError, setCountryError ] = useState('')

  const [ responseError, setResponseError ] = useState('')
  const [ loading, setLoading ] = useState(false)

  const getProfile = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${conf.api.url}/profile`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('res:', res)
      setFirstName(res?.data?.firstName || '<User>')
      setLastName(res?.data?.lastName || '')
      setEmail(res?.data?.email || '')
      setPhone(res?.data?.phone || '')
      setLine1(res?.data?.address?.line1 || '')
      setLine2(res?.data?.address?.line2 || '')
      setCity(res?.data?.address?.city || '')
      setState(res?.data?.address?.state || '')
      setPostalCode(res?.data?.address?.postalCode || '')
      setCountry(res?.data?.address?.country || '')
    } catch (err) {
      console.error('get profile error:', err);
      return setResponseError(err?.response?.data?.message || t('Error getting user profile.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  const postProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`${conf.api.url}/profile`, {
        email,
        firstName,
        lastName,
        phone,
        address: {
          line1,
          line2,
          city,
          state,
          postalCode,
          country,
        },
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      console.log('res:', res)
    } catch (err) {
      console.error('post profile error:', err);
      return setResponseError(err?.response?.data?.message || t('Error posting user profile.'))
    } finally {
      setLoading(false)
    }
  }

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
          header={t('Error')}
          content={responseError}
          onDismiss={() => setResponseError('')}
        />
      }

      <Segment secondary>
        <Header as='h3'>
          {t('Profile')}
        </Header>

        <Form onSubmit={postProfile}>
          <Segment stacked>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
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
              />
            </Form.Group>

            <Form.Group widths='equal'>
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
              />
            </Form.Group>

            <Divider />

            <p>{t('Address')}:</p>

            <Form.Input
              fluid
              icon='home'
              iconPosition='left'
              placeholder={t('line1')}
              name='line1'
              value={line1}
              onChange={e => setLine1(e.target.value)}
              error={ !isEmpty(line1Error) && {
                content: line1Error,
                pointing: 'above',
              }}
            />

            <Form.Input
              fluid
              icon='building outline'
              iconPosition='left'
              placeholder={t('line2')}
              name='line2'
              value={line2}
              onChange={e => setLine2(e.target.value)}
              error={ !isEmpty(line2Error) && {
                content: line2Error,
                pointing: 'above',
              }}
            />

            <Form.Group widths='equal'>
              <Form.Input
                fluid
                icon='map marker alternate'
                iconPosition='left'
                placeholder={t('city')}
                name='city'
                value={city}
                onChange={e => setCity(e.target.value)}
                error={ !isEmpty(cityError) && {
                  content: cityError,
                  pointing: 'above',
                }}
              />
              <Form.Input
                fluid
                icon='flag'
                iconPosition='left'
                placeholder={t('state')}
                name='state'
                value={state}
                onChange={e => setState(e.target.value)}
                error={ !isEmpty(stateError) && {
                  content: stateError,
                  pointing: 'above',
                }}
              />
            </Form.Group>

            <Form.Group widths='equal'>
              <Form.Input
                fluid
                icon='envelope'
                iconPosition='left'
                placeholder={t('postalCode')}
                name='postalCode'
                value={postalCode}
                onChange={e => setPostalCode(e.target.value)}
                error={ !isEmpty(postalCodeError) && {
                  content: postalCodeError,
                  pointing: 'above',
                }}
              />
              <Form.Input
                fluid
                icon='globe'
                iconPosition='left'
                placeholder={t('country')}
                name='country'
                value={country}
                onChange={e => setCountry(e.target.value)}
                error={ !isEmpty(countryError) && {
                  content: countryError,
                  pointing: 'above',
                }}
              />
            </Form.Group>

            <Divider />

            <Button icon labelPosition='left' type='submit'>
              <Icon name='save' />
              {t('Save')}
            </Button>
          </Segment>
        </Form>

      </Segment>
    </Container>
  </>)
}

export default Profile
