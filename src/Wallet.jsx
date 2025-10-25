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
  Button,
  // Divider,
} from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
// import { isEmpty } from 'lodash'

import Menubar from './components/Menubar'
import { sleep } from './helper'
import conf from './conf'

export default function Wallet () {
  const { t } = useTranslation('Wallet')
  const [ responseError, setResponseError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  // const [ address, setAddress ] = useState('')
  const [ account, setAccount ] = useState({})
  const [ transferData, setTransferData ] = useState(null)

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
      console.error('get account error:', err);
      return setResponseError(err?.response?.data?.message || t('Error getting account.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAccount()
  }, [])

  const transfer = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { pool, to, tokenIndex, amount } = transferData
      const res = await axios.post(`${conf.api.url}/firefly/transfer`, {
        pool, to, tokenIndex, amount
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      console.log('res:', res)
      await sleep(1000)
      await getAccount()
    } catch (err) {
      console.error('transfer error:', err);
      return setResponseError(err?.response?.data?.message || t('Error transferring tokens.'))
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
          header={t('error')}
          content={responseError}
          onDismiss={() => setResponseError('')}
        />
      }

      <Segment secondary>
        <Header as='h3'>
          {t('Wallet')}
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
              const { pool, balance, tokenIndex, uri } = b
              const foundPool = account?.pools?.find(p => p.id === pool)
              const { symbol, decimals, type } = foundPool
              const amount = decimals
                ? Number(BigInt(balance)) / 10 ** decimals
                : balance

              return (
                <li key={pool + tokenIndex}>
                  <Icon name={type === 'fungible' ? 'cubes' : 'cube'} />
                  {amount}
                  {' '}
                  {symbol}
                  {' '}
                  { tokenIndex && (<>
                    {' '}
                      (token index: {tokenIndex}, URI: {uri})
                  </>)}
                  {' '}
                  <Button
                    compact
                    icon
                    onClick={() => setTransferData({
                      pool,
                      symbol,
                      type,
                      to: '',
                      amount: type === 'fungible' ? '' : balance,
                      balance,
                      tokenIndex: tokenIndex || '',
                    })}
                  >
                    <Icon name='send' />
                    Transfer
                  </Button>
                </li>
              )
            })}
            </ul>
          </Segment>

          { transferData && (
            <Segment>
              <Header as='h3'>
                {t('Transfer Tokens')}
              </Header>
              <Form>
                <Form.Group>
                  <Form.Input
                    width='2'
                    placeholder='Pool'
                    name='pool'
                    value={transferData.symbol}
                    onChange={(e, { name, value }) => setTransferData(d => ({ ...d, [name]: value }))}
                    readOnly
                  />
                  <Form.Input
                    width='8'
                    fluid
                    placeholder='Amount'
                    name='amount'
                    value={transferData.amount}
                    onChange={(e, { name, value }) => setTransferData(d => ({ ...d, [name]: value }))}
                    disabled={transferData.type !== 'fungible'}
                  />
                  <Form.Button
                    width='2'
                    fluid
                    type="button"
                    onClick={() => setTransferData(d => ({ ...d, amount: d.balance }))}
                    disabled={transferData.type !== 'fungible'}
                  >
                    Max
                  </Form.Button>
                  <Form.Input
                    width='6'
                    fluid
                    placeholder='Token Index'
                    name='tokenIndex'
                    value={transferData.tokenIndex}
                    // onChange={(e, { name, value }) => setTransferData(d => ({ ...d, [name]: value }))}
                    disabled={transferData.type !== 'nonfungible'}
                    readOnly
                  />
                </Form.Group>
                <Form.Input
                  placeholder='Token Recipient'
                  name='to'
                  value={transferData.to}
                  onChange={(e, { name, value }) => setTransferData(d => ({ ...d, [name]: value }))}
                />
                <Form.Group>
                </Form.Group>
                <Button.Group>
                  <Button type='button' positive icon
                   onClick={transfer}
                  >
                    <Icon name='send' />
                    Submit
                  </Button>
                  <Button.Or/>
                  <Button type='button' negative icon
                    onClick={() => setTransferData(null)}
                  >
                    <Icon name='cancel' />
                    Cancel
                  </Button>
                </Button.Group>
              </Form>

            </Segment>
          )}
        </Form>
      </Segment>
    </Container>
  </>)
}
