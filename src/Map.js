import React, {
  useState, useRef, useEffect, useCallback, memo, createContext, useContext,
} from 'react'
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
  // Label,
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
import safeRegex from "safe-regex";
import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
import { nanoid } from 'nanoid'

import Menubar from './components/Menubar'
import conf from './conf'
import { parseRegexString, sleep, useWindowDimensions } from './helper.js'
import { QCMarkdown } from './components/Text'


const MapContext = createContext({});
const useMapContext = () => useContext(MapContext);

const tokenRegex = /(\[\[[A-Za-z0-9_-]+\]\])/g;
const unameRegex = /\[\[([A-Za-z0-9_-]+)\]\]/;

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
          name='linkify'
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
  const { presenceMap } = useMapContext();

  const smartText = data.text.split(tokenRegex).map((part, i) => {
    if (tokenRegex.test(part)) {
      return (
        <ExpandingVariable key={i} part={part} allNodes={allNodes} />
      )
    } else {
      return (
        <QCMarkdown key={i}>{part}</QCMarkdown>
      )
    }
  } );

  return (
    <Card style={{ width: '100%', maxWidth: '600px' }}>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        isConnectable={isConnectable}
        style={{ width: '1em', height: '0.75em', background: '#bbb' }}
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
        <Loader active={data.waitRecipient} inline='centered' size='mini' />
        { data.waitRecipient && (
          <>
            <br />
            Waiting for a reply from:{' '}
            <Button compact size='mini'>
              <Icon name='user' color={ presenceMap[data.waitRecipient] ? 'green' : 'red' }/>
              {data.waitRecipient}
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
            style={{ width: '570px' }}
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
        style={{ width: '1em', height: '0.75em', background: '#aaa' }}
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
  const { presenceMap } = useMapContext();

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
              window.alert(`${data.recipient || 'The user'} has been clicked!`);
            }}
          >
            <Icon
              name={ data.recipient !== null ? 'user' : 'user outline'}
              color={ data.recipient ? (presenceMap[data.recipient] ? 'green' : 'red' ) : 'grey' }
            />
            {data.recipient}
          </Button>
          <Button
            compact
            size='mini'
            onClick={() => {
              window.alert(`Condition "${data.condition}" has been ${ data.satisfied !== null ? (data.satisfied ? 'satisfied' : 'unsatisfied') : 'unknown'}. The regular expression is ${ data.safe !== null ? (data.safe ? 'safe' : 'unsafe') : 'unknown' }.`);
            }}
          >
            { data.safe !== null && (
              <Icon
                color={ data.satisfied ? 'green' : 'red' }
                name={ data.safe ? 'usb' : 'warning sign' }
              />
            )}
            {data.condition}
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

const getNodeId = () => nanoid(9)
const getUname = (id) => `Note_${id}`


function Map () {
  const { height, width } = useWindowDimensions();
  const [ loading, setLoading ] = useState(true)
  const [ responseError, setResponseError ] = useState('')
  const [ credentials, setCredentials ] = useState(null)
  // const [ prompt, setPrompt ] = useState('Tell me a new random joke. Give a short and concise one sentence answer. And print a random number at the end.')
  // const [ room, setRoom ] = useState('matrix')
  const [ recipient, setRecipient ] = useState('morpheus')  // FIXME: select none
  const [ condition, setCondition ] = useState('')
  const [ roster, setRoster ] = useState([])
  const [ presenceMap, setPresenceMap ] = useState({});
  const [ maps, setMaps ] = useState([])
  const [ title, setTitle ] = useState('example-map')
  const [ renaming, setRenaming ] = useState(false)
  const [ mapId, setMapId ] = useState('')
  const [ opener, setOpener ] = useState(false)
  const [ openerSearch, setOpenerSearch ] = useState('')
  const fileInputRef = useRef(null);
  const xmppRef = useRef(null);

  const reactFlowWrapper = useRef(null);
  const [ nodes, setNodes, onNodesChange ] = useNodesState([]);
  const [ edges, setEdges, onEdgesChange ] = useEdgesState([]);
  const { screenToFlowPosition, getNodes, setViewport } = useReactFlow();
  const [ rfInstance, setRfInstance ] = useState(null);

  // console.log('title:', title)
  // console.log('condition:', condition)
  // console.log('presenceMap:', presenceMap)
  console.log('openerSearch:', openerSearch)

  function getMap(mapId) {
    return maps.filter(({ _id }) => _id === mapId)[0]
  }

  const indexMaps = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${conf.api.url}/map?skip=${conf.map.skip}&limit=${conf.map.limit}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('maps index res:', res)
      setMaps(res?.data || [])
      setMapId(res?.data[0]?._id)
      setTitle(res?.data[0]?.title)
      setNodes(res?.data[0]?.flow.nodes);
      setEdges(res?.data[0]?.flow.edges);
      setViewport(res?.data[0]?.flow.viewport);
    } catch (err) {
      console.error('indexMaps error:', err);
      return setResponseError(err?.response?.data?.message || 'Error getting maps.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    indexMaps()
  }, [])

  const postMap = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`${conf.api.url}/map`, {
        title: `Untitled: (${faker.commerce.productName()})`,
        flow: {
          nodes: [],
          edges: [],
          viewport: { x: 0, y: 0, zoom: 1 },
        },
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('post map res:', res)
      // setResponseMessage(`Map created successfully`)
      setMaps(maps => [res.data, ...maps])
      setMapId(res.data._id)
      setTitle(res.data.title)
      setNodes(res.data.flow.nodes);
      setEdges(res.data.flow.edges);
      setViewport(res.data.flow.viewport);
      console.log('mapId:', res.data._id)
    } catch (err) {
      console.error('post map error:', err);
      return setResponseError(err.toString() || 'Error posting map.')
    } finally {
      setLoading(false)
    }
  }

  const putMap = async () => {
    setLoading(true)
    try {
      if (!mapId) {
        return await postMap()
      }
      if (!rfInstance) {
        throw new Error('ReactFlow instance is not defined.')
      }
      const flow = rfInstance.toObject();
      console.log('put mapId:', mapId)
      const res = await axios.put(`${conf.api.url}/map/${mapId}`, {
        ...getMap(mapId),
        title: title,
        flow: flow,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('map put res:', res)
      // setResponseMessage(`Map updated successfully`)
      setMaps(maps.map(a => a._id === res.data._id ? res.data : a))
    } catch (err) {
      console.error('put map error:', err);
      return setResponseError(err.toString() || 'Error putting map.')
    } finally {
      setLoading(false)
    }
  }

  const deleteMap = async () => {
    setLoading(true)
    try {
      const res = await axios.delete(`${conf.api.url}/map/${mapId}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        crossOrigin: { mode: 'cors' },
      })
      console.log('map delete res:', res)
      // setResponseMessage(`Map deleted successfully`)
      const newMaps = maps.filter(obj => obj._id !== mapId)
      setMaps(newMaps)
      if (newMaps.length > 0) {
        setMapId(newMaps[0]._id)
        setTitle(newMaps[0].title)
        setNodes(newMaps[0].flow.nodes);
        setEdges(newMaps[0].flow.edges);
        setViewport(newMaps[0].flow.viewport);
      } else {
        await postMap()
      }
    } catch (err) {
      console.error('delete map error:', err);
      return setResponseError(err.toString() || 'Error deleting map.')
    } finally {
      setLoading(false)
    }
  }

  const downloadMap = () => {
    setLoading(true)
    try {
      if (!rfInstance) {
        throw new Error('ReactFlow instance is not defined.')
      }
      const flow = rfInstance.toObject();
      const data = {
        title,
        flow,
      }
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title}.azone.json`;
      link.click();
      URL.revokeObjectURL(url); // Clean up
    } catch (err) {
      console.error('download map error:', err);
      return setResponseError(err.toString() || 'Error downloading map.')
    } finally {
      setLoading(false)
    }
  };

  const uploadMap = (event) => {
    setLoading(true)
    try {
      const file = event.target.files[0];
      if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            await postMap()
            const parsedMap = JSON.parse(e.target.result);
            setTitle(parsedMap?.title)
            const { x = 0, y = 0, zoom = 1 } = parsedMap.flow.viewport;
            setNodes(parsedMap.flow.nodes || []);
            setEdges(parsedMap.flow.edges || []);
            setViewport({ x, y, zoom });
            console.log(`Map ${parsedMap?.title} loaded with flow:`, parsedMap.flow);
            // console.log('mapId:', mapId)
            // await putMap()
          } catch (err) {
            alert('Invalid JSON file.');
          }
        };
        reader.readAsText(file);
      } else {
        alert('Please upload a valid JSON file.');
      }
    } catch (err) {
      console.error('delete map error:', err);
      return setResponseError(err.toString() || 'Error downloading map.')
    } finally {
      setLoading(false)
    }
  };

  const uploadMapInit = () => {
    fileInputRef.current.click(); // triggers hidden input
  };

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

      if (stanza.is('iq') && stanza.attrs.type === 'result') {
        const query = stanza.getChild('query', 'jabber:iq:roster');
        if (query) {
          const items = query.getChildren('item');
          if (items && items.length) {
            const updatedRoster = items.map(({ attrs }) => {
              const username = attrs.jid.split('@')[0];
              return {
                jid: attrs.jid,
                name: username,
                key: attrs.jid,
                value: username,
                text: username,
                content: (
                  <>
                    <Icon name='user' color={presenceMap[username] ? 'green' : 'grey'} />
                    {username}
                  </>
                ),
              };
            });
            setRoster(updatedRoster);
          }
        }
      } else if (stanza.is('presence')) {
        const from = stanza.attrs.from;
        const type = stanza.attrs.type;
        // const jid = from.split('/')[0];
        const username = from.split('@')[0];

        setPresenceMap(prev => {
          const updated = { ...prev, [username]: type !== 'unavailable' };
          // Update roster with new presence info
          setRoster(prevRoster => {
            // console.log('prevRoster:', prevRoster)
            return prevRoster.map(user => {
              if (user.name !== username) return user; // No change
              const isOnline = updated[user.name];
              return {
                ...user,
                content: (
                  <>
                    <Icon name='user' color={isOnline ? 'green' : 'grey'} />
                    {user.name}
                  </>
                ),
              };
            })
          });
          return updated;
        });
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
        id: uuidv4()
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
        id: uuidv4(),
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

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
  // const onConnect = useCallback((params) => {
  //   const requestEdge = {
  //     ...params,
  //     id: `${params.source}->${params.target}`,
  //     type: 'RequestEdge',
  //     data: {
  //       recipient: null,
  //       condition: condition,
  //       safe: null,      // FIXME: get this params from onConnectEnd
  //       satisfied: null, // FIXME: get this params from onConnectEnd
  //     },
  //     markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, },
  //   };
  //   console.log('onConnect requestEdge:', requestEdge, ', params:', params)
  //   setEdges((eds) => addEdge(requestEdge, eds));
  // }, [condition, setEdges]);

  const addNote = useCallback(() => {
    const id = getNodeId()
    const newNode = {
      id,
      position: screenToFlowPosition({ x: width*3/4, y: height/3, }),
      data: {
        uname: getUname(id),
        text: '',
        editing: true,
        renaming: false,
      },
      type: "NoteNode",
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  // useEffect(() =>{
  //   addNote()
  // }, [])

  const onConnectEnd = useCallback(async (event, connection) => {
    console.log('onConnectEnd event:', event, ', connection:', connection)

    // const allNodes = getNodes()
    // const smartText = connection.fromNode.data.text.split(tokenRegex).map((part, i) => {
    //   if (tokenRegex.test(part)) {
    //     let uname = part
    //     const match = part.match(unameRegex);
    //     // console.log('match:', match)
    //     if (match) {
    //       uname = match[1]
    //     }
    //     let foundNodes = allNodes.filter((n) => n.data.uname === uname);
    //     let nodeText
    //     if (foundNodes.length === 1) {
    //       nodeText = foundNodes[0].data.text
    //     } else {
    //       console.warn('smartText> foundNodes for part:', part, 'do not consist of exactly one node, foundNodes:', foundNodes)
    //       nodeText = ''
    //     }
    //     return nodeText
    //   } else {
    //     return part
    //   }
    // } ).join('\n');
    // console.log('smartText:', smartText)

    // let satisfied = true
    // let safe = true
    // if (condition) {
    //   const { pattern, flags } = parseRegexString(condition);
    //   console.log('pattern:', pattern, ', flags:', flags)
    //   safe = safeRegex(pattern)
    //   if (safe) {
    //     const safeRegex = new RegExp(pattern, flags);
    //     satisfied = safeRegex.test(smartText)
    //   }
    // }
    // console.log('condition:', condition, ', satisfied:', satisfied, ', safe:', safe)

    // when a connection is dropped on the pane it's not valid
    if (connection.isValid) {
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === connection.toNode.id ? {
            ...node,
            data: {
              ...node.data,
              // text: node.data.text + (satisfied ? `\n[[${connection.fromNode.data.uname}]]` : ''),
              text: node.data.text + `\n[[${connection.fromNode.data.uname}]]`,
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

      let satisfied = true
      let safe = true
      if (condition) {
        const { pattern, flags } = parseRegexString(condition);
        console.log('pattern:', pattern, ', flags:', flags)
        safe = safeRegex(pattern)
        if (safe) {
          const safeRegex = new RegExp(pattern, flags);
          satisfied = safeRegex.test(smartText)
        }
      }
      console.log('condition:', condition, ', satisfied:', satisfied, ', safe:', safe)

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
          waitRecipient: satisfied ? recipient : undefined,
        },
        // origin: [0.5, 0.0],
        type: "NoteNode",
      };
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === connection.fromNode.id ? { ...node, data: { ...node.data, editing: false } } : node
        ).concat(newNode)
      );

      const newEdge = {
        id: `${connection.fromNode.id}->${id}`,
        source: connection.fromNode.id,
        target: id,
        type: "RequestEdge",
        data: {
          recipient,
          condition,
          safe,
          satisfied,
        },
        markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, },
      }
      setEdges((edges) =>
        edges.concat(newEdge),
      );

      if (satisfied) {
        await sendPersonalMessage({ credentials, recipient, prompt: smartText });
      }
    }
  }, [screenToFlowPosition, credentials, recipient, condition]);

  return (
    <MapContext.Provider value={{ presenceMap }}>
      <Container>
        <Menubar />
      </Container>

      <div style={{ marginLeft: '1em', marginTop: '0.3em' , marginBottom: '0.3em' }}>
        {/*
        <Dropdown
          style={{ marginRight: '1em' }}
          // compact
          // fluid
          selection
          // clearable
          // trigger={
          //   <span>
          //     {recipient}
          //   </span>
          // }
          multiple={false}
          search={true}
          searchInput={{ type: 'string' }}
          options={maps}
          value={recipient}
          placeholder="Map Title"
          onChange={(e, { value }) => setRecipient(value)}
          loading={roster.length === 0}
        />
        */}

        <Button.Group>
          <Button icon onClick={postMap}>
            <Icon name='file' />
          </Button>
          <Button icon onClick={putMap}>
            <Icon name='save' />
          </Button>
          <Button icon onClick={deleteMap}>
            <Icon name='trash alternate' />
          </Button>
          <Button icon onClick={downloadMap}>
            <Icon name='download' />
          </Button>
          <Button icon onClick={uploadMapInit}>
            <Icon name="upload" />
            <input
              type="file"
              accept="application/json"
              ref={fileInputRef}
              onChange={uploadMap}
              style={{ display: 'none' }} // hide input
            />
          </Button>
          <Button icon onClick={() => {setRenaming(renaming => !renaming)}}>
            <Icon name='text cursor' />
          </Button>
        </Button.Group>

        <span style={{ marginLeft: '1em' }} />
        { renaming && (
          <>
            <Input
              iconPosition='left'
              placeholder='Title...'
              value={title}
              onChange={e => setTitle(e.target.value)}
            ><Icon name='map' /><input /></Input>
            <Button.Group>
              <Button icon positive onClick={() => {setRenaming(renaming => !renaming)}}>
                <Icon name='check' />
              </Button>
              <Button.Or />
              <Button icon
                onClick={() => {
                  setRenaming(renaming => !renaming)
                  setTitle(getMap(mapId).title)
                }}
              >
                <Icon name='cancel' />
              </Button>
            </Button.Group>
          </>
        )}
        { !renaming && (
          <>
          <Icon name='folder open outline' />
          <Dropdown text={title} icon='caret down' open={opener} onClick={() => setOpener(!opener)}>
            <Dropdown.Menu>
              <Input
                icon='search' iconPosition='left' className='search'
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setOpenerSearch(e.target.value)}
              />
              <Dropdown.Header icon='map' content='Maps:' />
              <Dropdown.Menu scrolling>
                {maps
                  .filter(({ title }) => title.includes(openerSearch))
                  .map(({ _id, title }) => (
                    <Dropdown.Item
                      key={_id} value={_id} text={title}
                      active={_id === mapId}
                      onClick={(e, { value }) => {
                        setMapId(value)
                        const map = getMap(value)
                        setTitle(map?.title)
                        const { x = 0, y = 0, zoom = 1 } = map.flow.viewport;
                        setNodes(map.flow.nodes || []);
                        setEdges(map.flow.edges || []);
                        setViewport({ x, y, zoom });
                        console.log(`Map ${map?.title} loaded with flow:`, map.flow);
                      } }
                    />
                  ))
                }
              </Dropdown.Menu>
            </Dropdown.Menu>
          </Dropdown>
          </>
        )}
      </div>

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
        style={{ width: width, height: height - conf.iframe.topOffset - conf.iframe.bottomOffset }}
      >
        <ReactFlow
          style={{ backgroundColor: "#F7F9FB" }}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onInit={setRfInstance}
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
              trigger={
                <span>
                  <Icon name='user' color={ presenceMap[recipient] ? 'green' : 'grey' }/>
                  {recipient}
                </span>
              }
              multiple={false}
              search={true}
              options={roster}
              value={recipient}
              placeholder="Recipient"
              onChange={(e, { value }) => setRecipient(value)}
              loading={roster.length === 0}
            />
            <Input
              iconPosition='left'
              placeholder='Condition...'
              value={condition}
              onChange={e => setCondition(e.target.value)}
            ><Icon name='usb' /><input /></Input>
            <br/> <br/>
            <Button onClick={addNote} fluid>
              <Icon name='add' />
              Add Note
            </Button>
            <br/> <br/>
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
    </MapContext.Provider>
  )
}

export default function MapProvider () {
  return (
    <ReactFlowProvider>
      <Map />
    </ReactFlowProvider>
  )
};
