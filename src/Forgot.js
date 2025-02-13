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
} from 'semantic-ui-react'
import { validateEmail  } from './validation'
import conf from './conf'

const Forgot = () => {
  const navigate = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ emailError, setEmailError ] = useState('')
  const [ responseError, setResponseError ] = useState('')
  const [ responseMessage, setResponseMessage ] = useState('')
  const [ loading, setLoading ] = useState(false)

  const handleSubmit = async () => {
    setResponseError('')
    let valid = true
    if (!validateEmail(email)) {
      valid = false
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
    if (!valid) {
      return
    }

    setLoading(true)
    try {
      let res
      res = await axios.post(`${conf.api.url}/forgot`, {
        email,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      // console.log('forgot res:', res)
      setResponseMessage(res.data.message)
    } catch (err) {
      console.error('forgot error:', err);
      return setResponseError(err?.response?.data?.message  || 'Error sending a reset link.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/images/logo192.png' /> Forgot Password?
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

        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              icon='at'
              iconPosition='left'
              placeholder='E-mail address'
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={ !isEmpty(emailError) && {
                content: emailError,
                pointing: 'above',
              }}
              required
            />

            <Button color='teal' fluid size='large' onClick={handleSubmit}>
              <Icon name='mail' />
              {' '}Email Me Reset Password Link{' '}
            </Button>
          </Segment>
        </Form>
        <Message>
          Remember password?{' '}
          <Button color='grey' size='mini' onClick={() => navigate('/login')}>
            Log In{' '}
            <Icon name='right arrow' />
          </Button>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default Forgot
