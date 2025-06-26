import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import axios from 'axios'
import {
  Form,
  Container,
  Segment,
  List,
  Loader,
  Button,
  Icon,
} from 'semantic-ui-react'
import { TextAuto, QCMarkdown } from './components/Text'
import Menubar from './components/Menubar'
import conf from './conf'

export default function Talk () {
  const name = localStorage.getItem('user.firstName') + ' ' +
    localStorage.getItem('user.lastName')

  const [ prompt, setPrompt ] = useState('')
  const [ promptError, setPromptError ] = useState('')
  const [ messages, setMessages ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ markdown, setMarkdown ] = useState(true)
  const [ skip, setSkip ] = useState(0)
  const [ loadDisabled, setLoadDisabled ] = useState(false)

  const handleSubmit = async () => {
    if (isEmpty(prompt)) {
      return setPromptError('Please enter a text')
    } else {
      setPromptError('')
    }

    messages.unshift({
      text: prompt,
      response: false
    })
    setMessages(messages)
    setLoading(true)
    setPrompt('')

    try {
      const response = await axios.post(`${conf.api.url}/ask`, {
        prompt
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('response:', response);
      messages.unshift({
        text: response.data.reply,
        response: true,
      })
      setMessages(messages)
      setSkip(skip + 1)
    } catch (err) {
      console.error('handleSubmit error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLoad = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${conf.api.url}/dialog`, {
        params: { limit: conf.talk.limit, skip },
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      // console.log('response:', response)
      for (let dialog of response.data) {
        // console.log('dialog:', dialog)
        messages.push({
          text: dialog.reply,
          response: true,
        })
        messages.push({
          text: dialog.prompt,
          response: false
        })
      }
      setMessages(messages)
      setSkip(skip + response?.data?.length)
      if (response?.data?.length < conf.talk.limit) {
        setLoadDisabled(true)
      }
    } catch (err) {
      console.error('handleLoad error:', err)
      if (err?.response?.status === 416) { // Range Not Satisfiable
        setLoadDisabled(true)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleLoad()
  }, [])

  return (
    <Container>
      <Menubar />

      <Segment secondary>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Field
              control={TextAuto}
              placeholder="Send a message"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
                  handleSubmit()
                }
              }}
              onChange={e => setPrompt(e.target.value )}
              value={prompt}
              error={ !isEmpty(promptError) && {
                content: promptError,
                pointing: 'above',
              }}
              required
              width={16}
            />
          </Form.Group>
          <Form.Group inline>
            <Form.Checkbox
              label='Markdown'
              checked={markdown}
              onChange={(e, data) => setMarkdown(data.checked)}
            />
            <Form.Button
              icon='send'
              content='Send'
              labelPosition='right'
            />
            <Form.Field style={{ fontSize: 9 }}>
              <i>⎇+↵ to send</i>
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>

      <Loader active={loading} inline='centered' />
      <List divided selection>
        {messages.map(({ text, response }, index) => (
          <List.Item key={index}>
            <List.Icon name={ response ? 'server' : 'user' } size='big' />
            <List.Content>
              <List.Header as='a'>{ response ? 'Selfdev' : `${name}` || '<USER>' }
              </List.Header>
              <List.Description>
                { markdown ?
                  <QCMarkdown>{text}</QCMarkdown>
                  : text
                }
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>

      <Button
        size='mini' fluid basic icon labelPosition='right'
        onClick={() => handleLoad()}
        disabled={loadDisabled}
      >
        Load Older Messages
        <Icon name='angle down' />
      </Button>

    </Container>
  )
}
