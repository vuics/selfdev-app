import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Form,
  Container,
  Segment,
  Loader,
  Message,
  Header,
  Icon,
  // Button,
  // Divider,
} from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
// import { isEmpty } from 'lodash'

import Menubar from './components/Menubar'
import conf from './conf'

export default function Tokens () {
  const { t } = useTranslation('Tokens')
  const [ responseError, setResponseError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  // const [ address, setAddress ] = useState('')
  const [ account, setAccount ] = useState({})

  const getAccount = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${conf.api.url}/firefly/account`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      // console.log('res:', res)
      console.log('res.data:', res.data)
      // setAddress(res.data.address)
      setAccount(res.data)
    } catch (err) {
      console.error('get settings error:', err);
      return setResponseError(err?.response?.data?.message || t('Error getting user account.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAccount()
  }, [])

  // const postAccount = async (e) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   try {
  //     const res = await axios.post(`${conf.api.url}/firefly/account`, {
  //     }, {
  //       headers: { 'Content-Type': 'application/json' },
  //       withCredentials: true,
  //     })
  //     console.log('res:', res)
  //   } catch (err) {
  //     console.error('post settings error:', err);
  //     return setResponseError(err?.response?.data?.message || t('Error posting user account.'))
  //   } finally {
  //     setLoading(false)
  //   }
  // }

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
          {t('tokens')}
        </Header>

        <Form>
          <Segment stacked>
            <div>
              <b>Address:</b>
              {' '}
              {account?.address}
            </div>
            <br/>

            {/*
            <div>
              IdentityId:
            </div>
            <div>
              {account?.identityId}
            </div>
            <br/>
            */}

            <b>Balance:</b>
            <ul>
            {account?.balances?.map(b => {
              const { pool, tokenIndex, uri } = b
              const foundPool = account?.pools?.find(p => p.id === pool)
              const { symbol, decimals, type } = foundPool
              const amount = decimals
                ? Number(BigInt(b.balance)) / 10 ** decimals
                : b.balance

              return (
                <li key={pool + tokenIndex}>
                  <Icon name={type === 'fungible' ? 'cubes' : 'cube'} />
                  {amount}
                  {' '}
                  {symbol}
                  {' '}
                  { b.uri && (<>
                    {' '}
                      (token index: {tokenIndex}, URI: {uri})
                  </>)}
                </li>
              )
            })}
            </ul>
          </Segment>
        </Form>
      </Segment>
    </Container>
  </>)
}
