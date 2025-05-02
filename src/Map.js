import React, { useState, useRef, useEffect, useCallback, memo } from 'react'
// import { isEmpty, compact, head, sample, times, snakeCase } from 'lodash'
import axios from 'axios'
import {
  Container,
  // Header,
  Loader,
  Message,
  Button,
  Input,
  Icon,
  Card,
  // Grid,
  Dropdown,
  Label,
  Accordion,
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
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  MarkerType,
  NodeResizer,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { client, xml } from '@xmpp/client'

import Menubar from './components/Menubar'
import conf from './conf'
import { generateUUID } from './helper'

const tokenRegex = /(\[\[[A-Za-z0-9_]+\]\])/g;
const unameRegex = /\[\[([A-Za-z0-9_]+)\]\]/;

const ExpandingVariable = memo(({ key, part, allNodes }) => {
  const { fitView } = useReactFlow();

  let uname = part
  const match = part.match(unameRegex);
  // console.log('match:', match)
  if (match) {
    uname = match[1]
  }
  let foundNodes = allNodes.filter((n) => n.data.uname === uname);
  let nodeText
  if (foundNodes.length === 1) {
    nodeText = foundNodes[0].data.text
  } else {
    console.warn('ExpandingVariable> foundNodes for part:', part, 'do not consist of exactly one node, foundNodes:', foundNodes)
    nodeText = '((Not found))'
  }
  const [ active, setActive ] = useState(false)

  return (
    <Accordion styled>
      <Accordion.Title
        styled
        active={active}
        index={0}
        onClick={((e) => {
          e.stopPropagation();
          setActive(active => !active)
        })}
      >
        <Icon name={active ? 'triangle down' : 'triangle right'} />
        {uname}
        {' '}{' '}{' '}{' '}
          <Icon
            color='grey'
            name='external alternate'
            onClick={(e => {
              e.stopPropagation();
              fitView({ nodes: foundNodes });
            })}
          />
      </Accordion.Title>
      <Accordion.Content active={active}>
        <p>
          {nodeText}
        </p>
      </Accordion.Content>
    </Accordion>
  )
})

const NoteNode = memo(({ id, data, isConnectable, selected }) => {
  const { getNodes, setNodes } = useReactFlow();
  const [ newUname, setNewUname ] = useState(data.uname)
  const allNodes = getNodes()

  const smartText = data.text.split(tokenRegex).map((part, i) => {
    if (tokenRegex.test(part)) {
      return (
        <ExpandingVariable key={i} part={part} allNodes={allNodes} />
      )
    } else {
      return (
        <span key={i}>{part}</span>
      )
    }
  } );

  return (
    <Card style={{ width: '100%', maxWidth: '400px' }}>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        isConnectable={isConnectable}
      />
      <Card.Content>
        <Card.Header>
          <Dropdown item simple position='right'
            icon={
             <Icon name='ellipsis vertical' color='grey' />
            }>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setNodes((nodes) =>
                    nodes.map((node) =>
                      node.id === id ? { ...node, data: { ...node.data, editing: !data.editing } } : node
                    )
                  );
                }}
              >
                <Icon name='edit' />
                { data.editing ? 'View' : 'Edit' }
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setNodes((nodes) => nodes.filter((n) => n.id !== id));
                }}
              >
                <Icon name='delete' />
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          { !data.renaming? (
            <Button
              size='mini'
              onClick={() => {
                setNodes((nodes) =>
                  nodes.map((node) =>
                    node.id === id ? { ...node, data: { ...node.data, renaming: !data.renaming} } : node
                  )
                );
              }}
            >
              <Icon name='map pin' />{data.uname}
            </Button>
          ) : (
            <Input
              size='mini'
              iconPosition='left'
              placeholder='Unique name...'
              value={newUname}
              onChange={(e) => setNewUname(e.target.value)}
              className="nodrag"
            >
              <Icon name='map pin' />
              <input
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setNodes((nodes) => {
                      const isDuplicate = nodes.some((node) => node.id !== id && node.data.uname === newUname);
                      if (isDuplicate) { alert('The name is not unique'); return nodes; }
                      return nodes.map((node) => node.id === id ? { ...node, data: { ...node.data, uname: newUname, renaming: false } } : node);
                    });
                  }
                }}
              />
            </Input>
          ) }
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Loader active={data.waitRecipient} inline='centered' />
        { data.waitRecipient && (
          <>
            <br />
            Waiting for a reply from:{' '}
            <Button compact size='mini'>
              <Icon name='at' />{data.waitRecipient}
            </Button>
          </>
        ) }

        { data.editing ? (
          <TextareaAutosize
            value={data.text}
            onChange={(e) => {
              setNodes((nodes) =>
                nodes.map((node) =>
                  node.id === id ? { ...node, data: { ...node.data, text: e.target.value } } : node
                )
              );
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey)) {
                e.preventDefault();
                setNodes((nodes) =>
                  nodes.map((node) =>
                    node.id === id ? { ...node, data: { ...node.data, editing: !data.editing } } : node
                  )
                )
              }
            }}
            className="nodrag"
            minRows={1}
            // maxRows={12}
            style={{ width: '100%', height: '100%' }}
            useCacheForDOMMeasurements
          />
        ) : (
          <div
            onClick={() => {
              setNodes((nodes) =>
                nodes.map((node) =>
                  node.id === id ? { ...node, data: { ...node.data, editing: !data.editing } } : node
                )
              );
            }}
            style={{ cursor: 'pointer', whiteSpace: 'pre-wrap' }}
          >
            {smartText}
          </div>
        ) }
      </Card.Content>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
    </Card>
  );
})

const RequestEdge = memo(({ id, sourceX, sourceY, targetX, targetY, data, markerEnd }) => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY, offsetX, offsetY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />
      <EdgeLabelRenderer>
        <Button.Group icon compact size='mini'
          className="nodrag nopan"
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          <Button
            compact
            size='mini'
            onClick={() => {
              window.alert(`${data.recipient} has been clicked!`);
            }}
          >
            <Icon name='at' />
            {data.recipient}
          </Button>
          <Button compact size='mini'
            onClick={() => {
              // Below, it deletes the edge
              setEdges((es) => es.filter((e) => e.id !== id));
            }}
          >
            <Icon name='trash' />
          </Button>
        </Button.Group>
      </EdgeLabelRenderer>
    </>
  );
})

const nodeTypes = {
  NoteNode: NoteNode,
};

const edgeTypes = {
  RequestEdge: RequestEdge,
};

let id = 0;
const getNodeId = () => `${id++}`;
const getUname = (id) => `Note_${id}`


function Map () {
  const [ loading, setLoading ] = useState(true)
  const [ responseError, setResponseError ] = useState('')
  const [ credentials, setCredentials ] = useState(null)
  // const [ prompt, setPrompt ] = useState('Tell me a new random joke. Give a short and concise one sentence answer. And print a random number at the end.')
  // const [ room, setRoom ] = useState('matrix')
  const [ recipient, setRecipient ] = useState('morpheus')  // FIXME: select none
  const [ roster, setRoster ] = useState([])
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
            setRoster(items.map(({ attrs }) => { return {
              jid: attrs.jid,
              name: attrs.jid.split('@')[0],
              key: attrs.jid,
              // value: attrs.jid,
              value: attrs.jid.split('@')[0],
              // text: attrs.name,
              text: attrs.jid.split('@')[0],
              // text: attrs.jid,
            }}))
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
        setNodes(nodes => {
          const updated = [...nodes];
          for (const [i, node] of updated.entries()) {
            // console.log('setNodes i:', i, ', node:', node)
            if (node.type === 'NoteNode' && node.data.waitRecipient === from.split('@')[0]) {
              updated[i] = { ...node, data: { ...node.data, text: body, waitRecipient: undefined } };
              console.log('updated[i]:', updated[i])
              break;
            }
          }
          return updated;
        });

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

  const sendPersonalMessage = async ({ credentials, recipient, prompt }) => {
    if (!recipient || !prompt || !credentials) {
      return console.error('Error sending personal message> credentials:', credentials, ', recipient:', recipient, ', prompt:', prompt)
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

  const joinRoom = async ({ roomJid }) => {
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

  const sendRoomMessage = async ({ room, recipient, prompt }) => {
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
        // FIXME should it be? try! uri: `xmpp:${roomJid}/${nickname}`
        uri: `xmpp:${nickname}@${conf.xmpp.mucHost}/${nickname}`
      })
    );
    await xmppRef.current.send(message);
    console.log('Message with mention sent, body:', body, ', roomJid:', roomJid);
  }

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition, getNodes } = useReactFlow();
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const addNote = useCallback(() => {
    const id = getNodeId()
    const newNode = {
      id,
      position: {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
      },
      data: {
        uname: getUname(id),
        // text: 'Tell me a new random joke. Give a short and concise one sentence answer. And print a random number at the end.',
        text: 'Hello World!',
        editing: true,
        renaming: false,
      },
      type: "NoteNode",
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  useEffect(() =>{
    addNote()
  }, [])

  const onConnectEnd = useCallback(async (event, connection) => {
    console.log('onConnectEnd connection:', connection)

    // when a connection is dropped on the pane it's not valid
    if (connection.isValid) {
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === connection.toNode.id ? {
            ...node,
            data: {
              ...node.data,
              text: node.data.text + `\n\[[${connection.fromNode.data.uname}]]`,
            }
          } : node
        )
      );
    } else {
      if (!recipient) {
        return alert('Please select recipient')
      }
      if (!connection.fromNode.data.text) {
        return alert('Please write note / prompt')
      }

      // we need to remove the wrapper bounds, in order to get the correct position
      const id = getNodeId();
      const { clientX, clientY } = 'changedTouches' in event ? event.changedTouches[0] : event;
      const newNode = {
        id,
        position: screenToFlowPosition({ x: clientX, y: clientY, }),
        data: {
          uname: getUname(id),
          text: '',
          editing: false,
          renaming: false,
          waitRecipient: recipient,
        },
        // origin: [0.5, 0.0],
        type: "NoteNode",
      };
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === connection.fromNode.id ? { ...node, data: { ...node.data, editing: false } } : node
        ).concat(newNode)
      );
      setEdges((edges) =>
        edges.concat({
          id: `${connection.fromNode.id}->${id}`,
          source: connection.fromNode.id,
          target: id,
          type: "RequestEdge",
          data: { recipient },
          markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, },
        }),
      );

      const allNodes = getNodes()
      const smartText = connection.fromNode.data.text.split(tokenRegex).map((part, i) => {
        if (tokenRegex.test(part)) {
          let uname = part
          const match = part.match(unameRegex);
          // console.log('match:', match)
          if (match) {
            uname = match[1]
          }
          let foundNodes = allNodes.filter((n) => n.data.uname === uname);
          let nodeText
          if (foundNodes.length === 1) {
            nodeText = foundNodes[0].data.text
          } else {
            console.warn('smartText> foundNodes for part:', part, 'do not consist of exactly one node, foundNodes:', foundNodes)
            nodeText = ''
          }
          return nodeText
        } else {
          return part
        }
      } ).join('\n');
      console.log('smartText:', smartText)

      await sendPersonalMessage({ credentials, recipient, prompt: smartText });
    }
  }, [screenToFlowPosition, credentials, recipient]);


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
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          fitView
          fitViewOptions={{ padding: 2 }}
          // nodeOrigin={nodeOrigin}

          panOnScroll={true}
          selectionOnDrag={true}
          // panOnDrag={panOnDrag}
          selectionMode={SelectionMode.Partial}
        >
          <Controls />
          <MiniMap pannable zoomable position='top-left' />
          <Background variant="dots" gap={12} size={1} />
          <Panel position="top-right">
            <Dropdown
              compact
              fluid
              selection
              clearable
              multiple={false}
              search={true}
              options={roster}
              value={recipient}
              placeholder="Recipient"
              onChange={(e, { value }) => setRecipient(value)}
              loading={roster.length === 0}
            />
            <br />
            <Button onClick={addNote} >Add Note</Button>
            <br />
            {/*
            <Input
              iconPosition='left' placeholder='room...' size='mini'
              value={room}
              onChange={e => setRoom(e.target.value)}
            ><Icon name='group' /><input /></Input>
            <Button basic size='mini'
              onClick={async () => {
                await sendRoomMessage({ room, recipient, prompt });
              }}
            >Groupchat</Button>
            <Input
              iconPosition='left' placeholder='prompt...' size='mini'
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
            ><Icon name='edit outline' /><input /></Input>
            */}
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
