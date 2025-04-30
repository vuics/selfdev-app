import React, { useState, useRef, useEffect, useCallback } from 'react'
// import { has } from 'lodash'
import { Helmet } from "react-helmet"
import axios from 'axios'
import {
  Container,
  Loader,
  Message,
  Button,
  Input,
  Icon,
  Card,
} from 'semantic-ui-react'
import TextareaAutosize from "react-textarea-autosize";
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
  useReactFlow,
  ReactFlowProvider,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { client, xml } from '@xmpp/client'

import Menubar from './components/Menubar'
import conf from './conf'
import { generateUUID } from './helper'


function NoteNode({ id, data, isConnectable }) {
  const { getNodes, setNodes } = useReactFlow();
  const [note, setNote] = useState(data.note || '');

  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setNote(newNote);

    // Update the note in the React Flow global state
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, note: newNote } } : node
      )
    );
  };

  return (
    <Card style={{ width: '15em' }}>
      <Card.Content header={data.header} />
      <Card.Content>
        <TextareaAutosize
          value={note}
          onChange={handleNoteChange}
          className="nodrag"
          minRows={1}
          maxRows={12}
          style={{ width: '100%' }}
          useCacheForDOMMeasurements
        />
      </Card.Content>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
    </Card>
  );
}

function ResponseNode({ data, isConnectable }) {
  const [ response, setResponse ] = useState('Tell me a new random joke. Give a short and concise one sentence answer. And print a random number at the end.')
  const [ loading, setLoading ] = useState(true)
  console.log('ResponseNode data:', data)

  return (
    <Card style={{ width: '15em' }}>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        isConnectable={isConnectable}
      />
      <Card.Content header={data.header} />
      <Card.Content>
        <Loader active={loading} inline='centered' />
        {data.sourceNote}
        {/*
        {response}

        <TextareaAutosize
          defaultValue="Just a single line..."
          minRows={1}
          maxRows={12}
          className="nodrag"
          value={response}
          onChange={e => setResponse(e.target.value)}
          style={{ width: '100%' }}
          useCacheForDOMMeasurements
        />
        */}
      </Card.Content>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
    </Card>
  );
}

const nodeTypes = {
  NoteNode: NoteNode,
  ResponseNode: ResponseNode,
};

const initialNodes = [ {
  id: '0',
  type: 'NoteNode',
  data: { header: 'Node 0', note: 'Tell me a new random joke. Give a short and concise one sentence answer. And print a random number at the end.' },
  position: { x: 0, y: 50 },
} ];

let id = 1;
const getId = () => `${id++}`;
const nodeOrigin = [0.5, 0];


function Map () {
  const [ loading, setLoading ] = useState(true)
  const [ responseError, setResponseError ] = useState('')
  const [ credentials, setCredentials ] = useState(null)
  const [ prompt, setPrompt ] = useState('Tell me a new random joke. Give a short and concise one sentence answer. And print a random number at the end.')
  const [ room, setRoom ] = useState('matrix')
  const [ recipient, setRecipient ] = useState('morpheus')
  const xmppRef = useRef(null);

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
            console.log('Roster received, contacts:', items.length, ', items:', items);
          }
        }
      }

      // Skip non-message stanzas
      if (!stanza.is('message')) return;

      const body = stanza.getChildText('body');
      if (!body) return;

      const from = stanza.attrs.from;
      const type = stanza.attrs.type;

      if (type === 'chat' || type === 'normal' || !type) {
        console.log(`Personal message response from ${from}: ${body}`);
      } else if (type === 'groupchat') {
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
    //
    // TODO: remember joined rooms and do not join if joined
    //
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

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges],
  // );

  const onConnectEnd = useCallback((event, connectionState) => {
    console.log('onConnectEnd connectionState:', connectionState)
    // when a connection is dropped on the pane it's not valid
    if (!connectionState.isValid) {
      // we need to remove the wrapper bounds, in order to get the correct position
      const id = getId();
      const { clientX, clientY } = 'changedTouches' in event ? event.changedTouches[0] : event;
      const newNode = {
        id,
        position: screenToFlowPosition({ x: clientX, y: clientY, }),
        data: { header: `Response ${id}`, sourceNote: connectionState.fromNode.data.note },
        origin: [0.5, 0.0],
        type: "ResponseNode",
      };
      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) =>
        eds.concat({ id, source: connectionState.fromNode.id, target: id }),
      );
    }
  }, [screenToFlowPosition],);


  return (
    <>
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

      <div
        className="wrapper" ref={reactFlowWrapper}
        style={{ width: '100vw', height: '100vh' }}
      >
        <ReactFlow
          style={{ backgroundColor: "#F7F9FB" }}
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          fitView
          fitViewOptions={{ padding: 2 }}
          nodeOrigin={nodeOrigin}

          panOnScroll={true}
          selectionOnDrag={true}
          // panOnDrag={panOnDrag}
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
    </>
  )
}

export default function MapProvider () {
  return (
    <ReactFlowProvider>
      <Map />
    </ReactFlowProvider>
  )
};
