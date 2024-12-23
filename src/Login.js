import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isEmpty } from 'lodash'
import axios from 'axios'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon,
  Loader,
  Divider,
} from 'semantic-ui-react'
import conf from './conf'

const requestLogin = async ({ email, password, rememberme }) => {
  try {
    const res = await axios.post(`${conf.api.url}/login`, {
      email,
      password,
      rememberme,
    }, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      crossOrigin: { mode: 'cors' },
    })
    // console.log('res:', res)
    localStorage.setItem('user.firstName', res.data.user.firstName)
    localStorage.setItem('user.lastName', res.data.user.lastName)
    localStorage.setItem('user.email', res.data.user.email)
    localStorage.setItem('user.phone', res.data.user.phone)
    localStorage.setItem('user.roles', res.data.user.roles)
  } catch (err) {
    throw err
  }
}

const Login = () => {
  const navigate = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ emailError, setEmailError ] = useState('')
  const [ passwordError, setPasswordError ] = useState('')
  // const [ rememberme, setRememberme ] = useState(false)
  const [ responseError, setResponseError ] = useState('')
  const [ loading, setLoading ] = useState(false)

  const handleSubmit = async () => {
    let valid = true
    if (isEmpty(email)) {
      valid = false
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
    if (isEmpty(password)) {
      valid = false
      setPasswordError('Please enter a valid password')
    } else {
      setPasswordError('')
    }
    if (!valid) {
      return
    }

    setLoading(true)
    try {
      await requestLogin({ email, password, rememberme: false })
      navigate(conf.account.start)
    } catch (err) {
      console.error('login error:', err);
      return setResponseError(err?.response?.data?.message || 'Error logging in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/images/logo192.png' /> Log-in to your account
        </Header>
        <Loader active={loading} inline='centered' style={{ marginBottom: '1em' }}/>
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

        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
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
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={ !isEmpty(passwordError) && {
                content: passwordError,
                pointing: 'above',
              }}
              required
            />
            {/* FIXME: fix on API server
            <Form.Checkbox
              label='Remember Me'
              checked={rememberme}
              onChange={(e, data) => setRememberme(data.checked)}
            />
            */}

            <Button color='teal' fluid size='large' onClick={handleSubmit}>
              <Icon name='sign-in' />
              {' '}Login{' '}
            </Button>
          </Segment>
        </Form>
        <Message>
          <label style={{ textAlign: 'left' }}>
            <a href="/forgot">Forgot password?</a>
          </label>
          <Divider />
          New to us?{' '}
          <Button color='grey' size='mini' onClick={() => navigate('/signup')}>
            Sign Up{' '}
            <Icon name='right arrow' />
          </Button>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export { requestLogin }
export default Login
