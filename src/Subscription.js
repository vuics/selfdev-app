import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import axios from 'axios'
import {
  Container,
  Segment,
  Loader,
  Message,
  Button,
  Icon,
  Header,
  Card,
  List,
} from 'semantic-ui-react'
import Menubar from './components/Menubar'
import conf from './conf'

const dotAmount = (amount) => {
  const s = String(amount)
  return s.slice(0, -2) + "." + s.slice(-2)
}

const amountToPlan = {
  1999: 'Starter',
  6999: 'Advanced',
}

const Subscription = () => {
  const [ sessions, setSessions ] = useState([])
  const [ amounts, setAmounts ] = useState([])
  const [ responseError, setResponseError ] = useState('')
  // const [ responseMessage, setResponseMessage ] = useState('')
  const [ loading, setLoading ] = useState(false)

  const loadSessions = () => {
    (async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${conf.api.url}/subscriptions/sessions/active`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          crossOrigin: { mode: 'cors' },
        })
        // console.log('response:', response);
        // console.log('response.data:', response.data);
        setSessions(response.data)
        setAmounts(response.data?.map(({ amount_total }) => amount_total))
      } catch (err) {
        console.error('handleSubmit error:', err)
      } finally {
        setLoading(false)
      }
    })()
  }

  useEffect(() => {
    loadSessions()
  }, [])

  console.log('sessions:', sessions)
  console.log('amounts:', amounts)
  return (
    <Container>
      <Menubar />

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
      {/*
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
      */}

      { true && (
        <Segment secondary>
          <Header as='h3'>Subscription Plans</Header>
          <Card.Group centered>
            <Card>
              <Card.Content>
                <Card.Header as='h1' textAlign='center'>
                  <Icon name='circle outline'/>
                  Free
                </Card.Header>
                <Card.Meta>USD $0 / month</Card.Meta>
                <Card.Description>
                  For people getting started:
                  <br />
                  <List>
                    <List.Item>
                      <List.Icon name='checkmark box' />
                      <List.Content>Unlimited Messages</List.Content>
                    </List.Item>
                  </List>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button basic color='grey' disabled>
                    { isEmpty(amounts) ? 'Your current plan' : 'Upgraded'}
                  </Button>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content>
                <Card.Header as='h1' textAlign='center'>
                  <Icon name='plus circle'/>
                  Starter
                </Card.Header>
                <Card.Meta>USD $19.99 / month</Card.Meta>
                <Card.Description>
                  Everything in Free, and:
                  <br />
                  <List>
                    <List.Item>
                      <List.Icon name='checkmark box' />
                      <List.Content>Virtual Salesperson</List.Content>
                    </List.Item>
                  </List>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <form action={`${conf.api.url}/subscriptions/session/create`} method="POST">
                  <div className='ui two buttons'>
                    <input type="hidden" name="lookup_key" value='starter-plan' />
                    <Button basic as='button' type="submit" id="checkout-and-portal-button"
                      color={amounts.includes(1999) ? 'blue' : 'green'}
                      disabled={amounts.includes(1999)}>
                      { amounts.includes(1999) ? 'Your current plan' : 'Subscribe' }
                    </Button>
                  </div>
                </form>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content>
                <Card.Header as='h1' textAlign='center'>
                  <Icon name='exclamation circle'/>
                  Advanced
                </Card.Header>
                <Card.Meta>USD $69.99 / month</Card.Meta>
                <Card.Description>
                  Everything in Starter, and:
                  <br />
                  <List>
                    <List.Item>
                      <List.Icon name='checkmark box' />
                      <List.Content>Get 30 mins consultation</List.Content>
                    </List.Item>
                  </List>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <form action={`${conf.api.url}/subscriptions/session/create`} method="POST">
                  <div className='ui two buttons'>
                    <input type="hidden" name="lookup_key" value='advanced-plan' />
                    <Button basic as='button' type="submit" id="checkout-and-portal-button"
                      color={amounts.includes(6999) ? 'blue' : 'green'}
                      disabled={amounts.includes(6999)}>
                      { amounts.includes(6999) ? 'Your current plan' : 'Subscribe' }
                    </Button>
                  </div>
                </form>
              </Card.Content>
            </Card>
          </Card.Group>
        </Segment>
      ) }

      <Loader active={loading} inline='centered' />

      { !isEmpty(sessions) && (
        <Segment secondary>
          <Header as='h3'>Subscriptions</Header>
          <Card.Group>
          { sessions.map(({ id, subscription, created, expires_at, amount_total, currency }) => {
            return (
              <Card fluid key={id}>
                <Card.Content>
                  <Card.Header>"{amountToPlan[amount_total]}"</Card.Header>
                  <Card.Meta>
                    Created: {new Date(created*1000).toLocaleDateString()},{' '}
                    expires or renews: {new Date(expires_at*1000).toLocaleDateString()},{' '}
                    price: USD ${dotAmount(amount_total)} / month</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <form action={`${conf.api.url}/subscriptions/session/manage`} method="POST">
                      <input
                        type="hidden"
                        id="session-id"
                        name="session_id"
                        value={id}
                      />
                      <Button basic color='blue' as='button' id="manage-billing-button" type="submit">
                        Manage
                      </Button>
                    </form>
                  </div>
                </Card.Content>
              </Card>
            )
          } )}
          </Card.Group>
        </Segment>
      ) }

    </Container>
  )
}

export default Subscription
