import React, { useState, useRef, useEffect, useCallback } from 'react'
// import { has } from 'lodash'
import { Helmet } from "react-helmet"
import axios from 'axios'
import {
  Container,
  Loader,
  Message,
  // Segment,
  Button,
  Input,
  Icon,
} from 'semantic-ui-react'
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  SelectionMode,
  // Handle, Position, NodeToolbar,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { client, xml } from '@xmpp/client'

import Menubar from './components/Menubar'
import conf from './conf'
import { generateUUID } from './helper'

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
const panOnDrag = [1, 2];


export default function Map () {
  const [ loading, setLoading ] = useState(true)
  const [ responseError, setResponseError ] = useState('')
  // const [ converseRoot, setConverseRoot ] = useState(null)
  const [ credentials, setCredentials ] = useState(null)
  const [ prompt, setPrompt ] = useState('Tell me a new random joke. Give a short and concise one sentence answer. And print a random number at the end.')
  const [ room, setRoom ] = useState('matrix')
  const [ recipient, setRecipient ] = useState('morpheus')
  const xmppRef = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  useEffect(() =>{
    async function fetchCredentials () {
      try {
        const response = await axios.post(`${conf.api.url}/xmpp/credentials`, { }, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          crossOrigin: { mode: 'cors' },
        })
        console.log('fetchCredentials response:', response)
        const { user, password, jid } = response.data
        setCredentials({ user, password, jid })
      } catch (err) {
        console.error('xmpp/credentials error:', err)
        setResponseError(err?.response?.data?.message || 'Error retrieving credentials.')
        setLoading(false)
      }
    }
    fetchCredentials()
  }, [])

  useEffect(() => {
    if (!credentials || !credentials.user || !credentials.password || !credentials.jid) {
      return console.error("No credentials error")
    }

    // Initialize XMPP client
    const xmpp = client({
      service: conf.xmpp.websocketUrl,
      domain: conf.xmpp.host,
      username: credentials.user,
      password: credentials.password,
      tls: {
        rejectUnauthorized: false
      }
    });
    xmppRef.current = xmpp;

    // Handle online event
    xmpp.on('online', async (jid) => {
      console.log(`Connected as ${jid.toString()}`);

      // Get roster (contact list)
      await xmpp.send(xml('iq', { type: 'get', id: 'roster_1' },
        xml('query', { xmlns: 'jabber:iq:roster' })
      ));
      console.log('Requested roster');

      // Send initial presence to let the server know we're online
      xmpp.send(xml('presence'));
      console.log('Sent initial presence');

      setLoading(false)
    });

    // Handle errors
    xmpp.on('error', (err) => {
      setLoading(false)
      console.error('XMPP error:', err);
      setResponseError(`XMPP error: ${err}`)
    });

    // Handle disconnection
    xmpp.on('close', () => {
      setLoading(false)
      console.log('Connection closed');
    });

    // Handle incoming stanzas
    xmpp.on('stanza', (stanza) => {
      // console.log('Got stanza:', stanza.toString());

      // Handle roster responses
      if (stanza.is('iq') && stanza.attrs.type === 'result') {
        const query = stanza.getChild('query', 'jabber:iq:roster');
        if (query) {
          const items = query.getChildren('item');
          if (items && items.length) {
            console.log('Roster received, contacts:', items.length);
          }
        }
      }

      // Skip non-message stanzas
      if (!stanza.is('message')) return;

      const body = stanza.getChildText('body');
      if (!body) return;

      const from = stanza.attrs.from;
      const type = stanza.attrs.type;

      // Handle personal messages
      if (type === 'chat' || type === 'normal' || !type) {
        console.log(`Personal message response from ${from}: ${body}`);
      }
      // Handle group chat messages
      else if (type === 'groupchat') {
        // Skip our own messages
        if (from.includes(`/${credentials.user}`)) return;

        // Skip historical messages
        const delay = stanza.getChild('delay');
        if (delay) return;

        console.log(`Group chat message from ${from}: ${body}`);
      }
    });

    xmpp.start().catch(console.error);
  }, [credentials])

  async function sendPersonalMessage({ recipient, prompt }) {
    if (!recipient || !prompt) {
      return
    }
    const to = recipient.includes("@") ? recipient : `${recipient}@${conf.xmpp.host}`
    const message = xml('message', {
        type: 'chat',
        to,
        from: credentials.jid,
        id: generateUUID()
      },
      xml('active', { xmlns: 'http://jabber.org/protocol/chatstates' }),
      xml('body', {}, prompt)
    );
    await xmppRef.current.send(message);
    console.log('Personal message sent, prompt:', prompt, ', to:', to);
  }

  async function joinRoom({ roomJid }) {
    console.log(`Joining group chat ${roomJid} as ${credentials.user}...`);
    const presence = xml(
      'presence',
      { to: `${roomJid}/${credentials.user}` },
      xml('x', { xmlns: 'http://jabber.org/protocol/muc' },
        xml('history', { maxstanzas: '0', maxchars: '0' })
      )
    );
    await xmppRef.current.send(presence);
    console.log('Joined group chat');
    // await new Promise(resolve => setTimeout(resolve, 2000));
  }

  async function sendRoomMessage({ room, recipient, prompt }) {
    const roomJid = room.includes("@") ? room: `${room}@${conf.xmpp.mucHost}`
    await joinRoom({ roomJid })
    const nickname = recipient.split('@')[0];
    const body = `@${nickname} ${prompt}`;
    const message = xml('message', {
        type: 'groupchat',
        to: roomJid,
        id: generateUUID(),
        'xml:lang': 'en',
      },
      xml('body', {}, body),
      xml('reference', {
        xmlns: 'urn:xmpp:reference:0',
        type: 'mention',
        begin: '0',
        end: nickname.length + 1,
        uri: `xmpp:${nickname}@${conf.xmpp.mucHost}/${nickname}`
      })
    );
    await xmppRef.current.send(message);
    console.log('Message with mention sent, body:', body, ', roomJid:', roomJid);
  }

  // useEffect(() => {
  //   if (converseRoot && credentials) {
  //     console.log('converseRoot:', converseRoot)
  //     window.addEventListener("converse-loaded", async (event) => {
  //       const { converse } = event.detail;
  //       console.log('converse:', converse)
  //       try {
  //         // converse.plugins.add('synthetic-ui-plugin', {
  //         //   initialize: function () {
  //         //     this._converse.api.listen.on('callButtonClicked', function(data) {
  //         //       console.log('callButtonClicked data:', data)
  //         //     });

  //         //     this._converse.api.listen.on('message', function (data) {
  //         //       console.log('converse api message> data:', data)
  //         //       if (data && data.stanza) {
  //         //         console.log('data.attrs:', data.attrs)
  //         //         const { body } = data.attrs
  //         //         if (!body) {
  //         //           return
  //         //         }
  //         //       }
  //         //     });
  //         //   },
  //         // });

  //         converse.plugins.add("messaging-plugin", {
  //           initialize() {
  //             const { Strophe, $msg } = converse.env;

  //             // const messageText = 'Hello World! Whare are you from? Give a short one phrase answer.';
  //             // const messageText = 'How do you use phone line? Give a short one phrase answer.';
  //             // const messageText = 'In what relationship are you with architect? Give a short one phrase answer.';
  //             const messageText = 'In what relationship are you with the oracle? Give a short one phrase answer.';

  //             const sendToRecipient = true
  //             const recipientJID = 'morpheus@selfdev-prosody.dev.local';

  //             const sendToRoom = true
  //             const roomJID = 'matrix@conference.selfdev-prosody.dev.local';
  //             const recipientNick = 'morpheus';
  //             const recipientMention = `@${recipientNick}`
  //             const groupMessageText = `${recipientMention} ${messageText}`
  //             console.log('recipientMention:', recipientMention, ', length:', recipientMention.length)

  //             this._converse.once('connected', () => {
  //               if (sendToRecipient) {
  //                 this._converse.api.send(
  //                   $msg({
  //                     to: recipientJID,
  //                     type: 'chat'
  //                   }).c('body').t(messageText)
  //                 );
  //               }

  //               if (sendToRoom) {
  //                 const stanza = $msg({
  //                   to: roomJID,
  //                   type: 'groupchat',
  //                   // id: this._converse.connection.getUniqueId()
  //                 })
  //                 .c('body').t(groupMessageText).up()
  //                 .c('reference', {
  //                   xmlns: 'urn:xmpp:reference:0',
  //                   type: 'mention',
  //                   begin: 0,
  //                   end: recipientMention.length,
  //                   uri: `xmpp:${recipientJID}/${recipientNick}`
  //                 });
  //                 this._converse.api.send(stanza);
  //               }

  //               // this._converse.api.rooms.open(roomJID, {
  //               //   nick: 'artem_nickname',   // e.g., 'artem'
  //               //   auto_join: true
  //               // }).then(room => {
  //               //   room.sendMessage(messageText);
  //               // });

  //               // const chatbox = this._converse.api.chats.open(recipientJID, { auto_focus: true });
  //               // chatbox.then(chat => {
  //               //   chat.messages.create({
  //               //     // msgid: this._converse.env.crypto.randomUUID?.() || Date.now().toString(),
  //               //     msgid: 'msg-' + Date.now().toString() + '-' + Math.floor(Math.random() * 1000),
  //               //     // message: messageText,
  //               //     body: messageText,
  //               //     direction: 'outgoing', // 'incoming' for received messages
  //               //     time: new Date(),
  //               //     type: 'chat'
  //               //   });
  //               //   chat.sendMessage(messageText);
  //               // });
  //             });

  //             this._converse.api.listen.on('message', (data) => {
  //               console.log('converse api message> data:', data)
  //               if (data && data.stanza) {
  //                 console.log('data.attrs:', data.attrs)
  //                 const { body, type, from } = data.attrs
  //                 console.log('body:', body, ', type:', type, ', from:', from)
  //                 if (body && type === 'chat' && from === recipientJID) {
  //                   console.log(`Received response from ${from}: ${body}`);
  //                   // You can add custom logic here, such as responding or triggering other actions
  //                 }
  //                 if (body && type === 'groupchat' && from.startsWith(roomJID)) {
  //                   console.log(`Received message from room: ${from}, text: ${body}`);
  //                 }
  //               }
  //             });
  //           }
  //         });

  //         const converseOptions = {
  //           root: converseRoot,

  //           loglevel: 'info',
  //           // loglevel: 'debug',

  //           bosh_service_url: conf.xmpp.boshServiceUrl,
  //           discover_connection_methods: conf.xmpp.discoverConnectionMethods,
  //           websocket_url: conf.xmpp.websocketUrl,
  //           auto_reconnect: true,
  //           stanza_timeout: 300000, // 5m
  //           keepalive: true,

  //           authentication: 'login',
  //           // reuse_scram_keys: true, // what if credentials updated on server?
  //           jid: `${credentials.user}@${conf.xmpp.host}`,
  //           password: credentials.password,
  //           auto_login: true,
  //           allow_logout: false,
  //           clear_cache_on_logout: true,

  //           view_mode: 'overlayed',

  //           i18n: 'en',
  //           show_controlbox_by_default: true,
  //           show_client_info: false,
  //           sticky_controlbox: false, // control box will not be closeable
  //           allow_registration: false,
  //           allow_url_history_change: false,
  //           allow_adhoc_commands: false,
  //           allow_bookmarks: true,
  //           allow_non_roster_messaging: true,
  //           theme: 'concord',
  //           dark_theme: 'concord', // drakula',
  //           play_sounds: false,
  //           allow_message_corrections: false,
  //           allow_message_retraction: 'own',
  //           hide_offline_users: false,
  //           clear_messages_on_reconnection: false,
  //           visible_toolbar_buttons: {
  //             // call: true,  // TODO: enable and attach to Jitsi Meet
  //             spoiler: true,
  //             emoji: true,
  //             toggle_occupants: true
  //           },

  //           auto_join_on_invite: true,
  //           auto_subscribe: true,
  //           domain_placeholder: conf.xmpp.host,
  //           default_domain: conf.xmpp.host,
  //           // locked_domain: conf.xmpp.host,
  //           muc_domain: conf.xmpp.mucHost,
  //           // locked_muc_domain: 'hidden',
  //           muc_nickname_from_jid: true,
  //           auto_join_rooms: [
  //             // { jid: `all@${conf.xmpp.mucHost}`, minimized: false },
  //           ],
  //           auto_list_rooms: true,
  //           auto_register_muc_nickname: 'unregister',
  //           // muc_respect_autojoin: false,
  //           // auto_join_private_chats: [`alice@${conf.xmpp.host}`, `bob@${conf.xmpp.host}`],

  //           // Status
  //           idle_presence_timeout: 300, // 5m
  //           csi_waiting_time: 600, // 10m
  //           auto_away: 3600,  // 1h
  //           auto_xa: 24*3600, // 24h

  //           whitelisted_plugins: [
  //             "messaging-plugin",
  //           ],

  //           allow_non_roster_messaging: true,
  //         }

  //         // console.log('converseOptions:', converseOptions)
  //         converse.initialize(converseOptions)
  //       } catch (err) {
  //         console.error('converse.initialize error:', err)
  //         setResponseError('Error initializing converse.')
  //       } finally {
  //         setLoading(false)
  //       }
  //     });
  //   }
  // }, [converseRoot, credentials])


  // console.log('panels:', panels)
  return (
    <>
      { credentials && (
        <Helmet>
          <link rel="stylesheet" type="text/css" media="screen" href="/dist/converse.min.css" />
          <script src="/dist/converse.min.js" charset="utf-8"></script>
        </Helmet>
      )}

      <Container>
        <Menubar />
      </Container>

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

      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          panOnScroll={true}
          selectionOnDrag={true}
          panOnDrag={panOnDrag}
          selectionMode={SelectionMode.Partial}
        >
          <Controls />
          <MiniMap pannable zoomable position='top-left' />
          <Background variant="dots" gap={12} size={1} />
          <Panel position="top-right">
            <Input
              iconPosition='left' size='mini' placeholder='jid | user | mention'
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
            ><Icon name='at' /><input /></Input>
            <br />
            <Input
              iconPosition='left' placeholder='room...' size='mini'
              value={room}
              onChange={e => setRoom(e.target.value)}
            ><Icon name='group' /><input /></Input>
            <br />
            <Input
              iconPosition='left' placeholder='prompt...' size='mini'
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
            ><Icon name='edit outline' /><input /></Input>
            <br />
            <br />
            <Button basic size='mini'
              onClick={async () => {
                await sendPersonalMessage({ recipient, prompt });
              }}
            >Chat</Button>
            <Button basic size='mini'
              onClick={async () => {
                await sendRoomMessage({ room, recipient, prompt });
              }}
            >Groupchat</Button>
            <br />
          </Panel>
        </ReactFlow>
      </div>

      {/*
      <div>
        { credentials && (
          <div ref={ (ref) => setConverseRoot(ref) } />
        )}
      </div>
      */}
    </>
  )
}
