import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Grid,
  Header,
  Image,
  Message,
  Loader,
} from 'semantic-ui-react'
import conf from './conf'

const Logout = () => {
  const navigate = useNavigate()

  const [ responseError, setResponseError ] = useState('')
  const [ loading, setLoading ] = useState(false)

  const logOut = async () => {
    setLoading(true)
    try {
      localStorage.clear()

      const res = await axios.get(`${conf.api.url}/logout`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      // console.log('res:', res)

      navigate('/')
    } catch (err) {
      console.error('logout error:', err);
      return setResponseError(err?.response?.data?.message || 'Error logging out.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    logOut()
  }, [])

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/images/logo192.png' /> Log Out
        </Header>
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
      </Grid.Column>
    </Grid>
  )
}

export default Logout
