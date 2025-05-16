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
  Checkbox,
  Modal,
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
  useNodesData,
  // reconnectEdge,
  // NodeResizer,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { client, xml } from '@xmpp/client'
import safeRegex from "safe-regex";
import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
import { nanoid } from 'nanoid'
import Dagre from '@dagrejs/dagre';

import Menubar from './components/Menubar'
import conf from './conf'
import { parseRegexString, useWindowDimensions, sleep } from './helper.js'
import { MarkdownMermaid } from './components/Text'


const MapContext = createContext({});
const useMapContext = () => useContext(MapContext);

const tokenRegex = /(\[\[[A-Za-z0-9_-]+\]\])/g;
const unameRegex = /\[\[([A-Za-z0-9_-]+)\]\]/;

function buildSmartText({ text, getNodes }) {
  const allNodes = getNodes()
  const smartText = text.split(tokenRegex).map((part, i) => {
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
  return smartText
}

function checkCondition({ condition, text }) {
  let satisfied = true
  let safe = true
  if (condition) {
    const { pattern, flags } = parseRegexString(condition);
    console.log('pattern:', pattern, ', flags:', flags)
    safe = safeRegex(pattern)
    if (safe) {
      const safeRegex = new RegExp(pattern, flags);
      satisfied = safeRegex.test(text)
    }
  }
  console.log('condition:', condition, ', satisfied:', satisfied, ', safe:', safe)
  return [ satisfied, safe ]
}

async function playRequestEdge ({
  text, condition, getNodes, setNodes, setEdges,
  sendPersonalMessage, credentials, recipient,
  edgeId, targetId,
}) {
  const smartText = buildSmartText({ text, getNodes })
  // console.log('smartText:', smartText)
  const [ satisfied, safe ] = checkCondition({ condition, text: smartText })
  // console.log('condition:', condition, ', satisfied:', satisfied, ', safe:', safe)

  setNodes((nodes) =>
    nodes.map((node) =>
      node.id === targetId ? { ...node, data: { ...node.data,
        waitRecipient: (smartText && satisfied) ? recipient : undefined, text: '' }
      } : node
    )
  )
  setEdges((edges) =>
    edges.map((edge) =>
      edge.id === edgeId ? { ...edge, data: { ...edge.data, satisfied, safe, cursor: true } } : edge
    )
  )

  if (smartText && satisfied) {
    await sendPersonalMessage({ credentials, recipient: recipient, prompt: smartText });
  }
}

function unlinkEdge({ edge, getNodes, setNodes }) {
  const nodes = getNodes()
  const sourceNode = nodes.find(node => node.id === edge.source)
  setNodes((nodes) =>
    nodes.map((node) =>
      node.id === edge.target ? { ...node, data: { ...node.data,
        text: node.data.text.replace(`[[${sourceNode.data.uname}]]`, '') }
      } : node
    )
  )
}

const ExpandingVariable = memo(({ key, part, allNodes, color, backgroundColor }) => {
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
    <Accordion styled style={{ color, backgroundColor, }} >
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
  const { getNodes, setNodes, getEdges } = useReactFlow();
  const [ newUname, setNewUname ] = useState(data.uname)
  const { presenceMap } = useMapContext();
  const [ text, setText ] = useState(data.text)
  const allNodes = getNodes()
  // console.log('id:', id, ', data.text:', data.text, ', text:', text, ', setText:', setText)

  useEffect(() => {
    setNewUname(data.uname);
  }, [data.uname]);

  useEffect(() => {
    setText(data.text);
  }, [data.text]);

  const applyText = useCallback(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, text, editing: !data.editing } } : node
      )
    )
  }, [setNodes, data.editing, text, id])

  const cancelText = useCallback(() => {
    setText(data.text)
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, editing: !data.editing } } : node
      )
    )
  }, [setText, setNodes, data.editing, data.text, id])

  const renameUname = useCallback(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, renaming: !data.renaming} } : node
      )
    );
  }, [setNodes, data.renaming, id])

  const applyNewUname = useCallback(() => {
    let isDuplicate = false
    setNodes((nodes) => {
      isDuplicate = nodes.some((node) => node.id !== id && node.data.uname === newUname);
      if (isDuplicate) { alert('The name is not unique'); return nodes; }
      const updatedNodes = nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, uname: newUname, renaming: false } } : node
      );

      getEdges().forEach((edge) => {
        if(edge.source === id) {
          setNodes((nodes) =>
            nodes.map((node) =>
              node.id === edge.target ? { ...node, data: { ...node.data,
                text: node.data.text.replace(`[[${data.uname}]]`, `[[${newUname}]]`) }
              } : node
            )
          )
        }
      });
      return updatedNodes
    });
  }, [setNodes, getEdges, data.uname, newUname, id])

  const cancelNewUname = useCallback(() => {
    setNodes((nodes) => {
      return nodes.map((node) => node.id === id ? { ...node, data: { ...node.data, renaming: false } } : node);
    });
    setNewUname(data.uname);
  }, [setNodes, data.uname, id, setNewUname])

  const interactiveText = data.text.split(tokenRegex).map((part, i) => {
    if (tokenRegex.test(part)) {
      return (
        <ExpandingVariable
          key={i} part={part} allNodes={allNodes}
          color={data.color}
          backgroundColor={data.backgroundColor}
        />
      )
    } else {
      // return (
      //   <span key={i}>{part}</span>
      // )
      return (
        <MarkdownMermaid key={i}>{part}</MarkdownMermaid>
      )
    }
  } );

  const copyText = useCallback(async () => {
    try {
      const smartText = buildSmartText({ text, getNodes })
      await navigator.clipboard.writeText(smartText)
      // alert('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [text, getNodes])

  const pasteText = useCallback(async () => {
    try {
      const pastedText = await navigator.clipboard.readText()
      // console.log('pastedText:', pastedText)
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, text: pastedText } } : node
        )
      )
    } catch (err) {
      console.error('Paste failed:', err);
    }
  }, [setNodes, id])

  // NOTE: Remove the resizeObserver error
  useEffect(() => {
    const errorHandler = (e: any) => {
      if (e.message.includes("ResizeObserver loop completed with undelivered notifications" || "ResizeObserver loop limit exceeded")) {
        const resizeObserverErr = document.getElementById("webpack-dev-server-client-overlay");
        if (resizeObserverErr) {
          resizeObserverErr.style.display = "none";
        }
      }
    };
    window.addEventListener("error", errorHandler);
    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  return (
    <Card
      style={{
        width: '100%', maxWidth: '600px',
        borderStyle: selected ? 'solid' : undefined,
        borderColor: selected ? 'violet' : undefined,
        backgroundColor: data.backgroundColor,
        color: data.color,
      }}
    >
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
                onClick={copyText}
              >
                <Icon name='copy' />
                Copy
              </Dropdown.Item>
              <Dropdown.Item
                onClick={pasteText}
              >
                <Icon name='paste' />
                Paste
              </Dropdown.Item>
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
                onClick={renameUname}
              >
                <Icon name='i cursor' />
                Rename
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
              onClick={renameUname}
            >
              <Icon name='map pin' />{data.uname}
            </Button>
          ) : (
            <>
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
                    applyNewUname()
                  }
                  if (e.key === 'Escape') {
                    cancelNewUname()
                  }
                }}
              />
            </Input>
            {' '}
            <Button.Group>
              <Button icon positive onClick={applyNewUname} >
                <Icon name='check' />
              </Button>
              <Button.Or />
              <Button icon onClick={cancelNewUname} >
                <Icon name='cancel' />
              </Button>
            </Button.Group>
            </>
          ) }
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Loader active={!!data.waitRecipient} inline='centered' size='mini' />
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
          <>
            <TextareaAutosize
              value={text}
              onChange={(e) => {
                setText(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey)) {
                  e.preventDefault();
                  applyText()
                }
                if (e.key === 'Escape') {
                  e.preventDefault();
                  cancelText()
                }
              }}
              className="nodrag"
              minRows={1}
              // maxRows={12}
              style={{
                width: '570px', height: '100%',
                color: data.color || '',
                backgroundColor: data.backgroundColor || '',
              }}
            />
            <Button.Group floated='right'>
              <Button
                compact positive
                icon labelPosition='left'
                onClick={applyText}
              >
                <Icon name='check' />
                Apply
              </Button>
              <Button.Or />
              <Button
                compact
                icon labelPosition='right'
                onClick={cancelText}
              >
                <Icon name='cancel' />
                Cancel
              </Button>
            </Button.Group>

          </>
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
            {interactiveText}
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
      {/*
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      */}
    </Card>
  );
})

const OrderControl = memo(({ id, expecting, sequence, cursor, reordering }) => {
  const { setEdges } = useMapContext();

  const moveEdge = useCallback(({ step }) => {
    setEdges((edges) => {
      const index = edges.findIndex(edge => edge.id === id);
      if (index === -1) return edges; // Edge not found
      const newIndex = index + step
      if (newIndex < 0 || newIndex >= edges.length) return edges; // Out of bounds
      const updatedEdges = [...edges];
      const [movedEdge] = updatedEdges.splice(index, 1); // Remove the edge
      updatedEdges.splice(newIndex, 0, movedEdge); // Insert at new position

      let sequence = 1
      return updatedEdges.map((edge, i) => ({
        ...edge,
        data: {
          ...edge.data,
          // sequence: edge.type === 'RequestEdge' ? sequence++ : undefined,
          sequence: sequence++
        }
      }));
    });
  }, [id, setEdges])

  return (
    <>
    { reordering && (
      <Button compact size='mini' onClick={() => { moveEdge({ step: 1 }) }} >
        <Icon name='caret up' />
      </Button>
    )}
    { sequence && (
      <Button color={ cursor ? 'olive' : (expecting ? 'yellow' : (reordering ? 'blue' : 'green')) }>
        [{sequence}]:{' '}
      </Button>
    )}
    { reordering && (
      <Button compact size='mini' onClick={() => { moveEdge({ step: -1 }) }} >
        <Icon name='caret down' />
      </Button>
    )}
    </>
  )
})

const RequestEdge = memo(({
  id, data, source, target, style, selected,
  sourceX, sourceY, targetX, targetY, markerEnd,
}) => {
  // const { setEdges, setNodes, getNodes } = useReactFlow();
  const { setNodes, getNodes } = useReactFlow();
  const [edgePath, labelX, labelY, offsetX, offsetY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  const { presenceMap } = useMapContext();
  // const nodesData = useNodesData([source, target])
  const [ sourceNode, targetNode ] = useNodesData([source, target])
  // console.log('sourceNode:', sourceNode, ', targetNode:', targetNode)

  const {
    credentials, recipient, sendPersonalMessage,
    condition, reordering, orderEdges, setEdges,
  } = useMapContext();

  return (
    <>
      <BaseEdge
        id={id} path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: data.stroke,
          strokeWidth: selected ? 3 : 1,
        }}
      />
      <EdgeLabelRenderer>
        <Button.Group icon compact size='mini'
          className='nodrag nopan'
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          <OrderControl
            id={id}
            expecting={data.expecting}
            sequence={data.sequence}
            cursor={data.cursor}
            reordering={reordering}
          />

          <Button
            compact
            size='mini'
            onClick={async () => {
              console.log('source:', source, ', target:', target)
              await playRequestEdge({
                text: sourceNode.data.text, condition: data.condition,
                getNodes, setNodes, setEdges, sendPersonalMessage,
                credentials, recipient: data.recipient,
                edgeId: id, targetId: targetNode.id,
              })
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
              const smartText = buildSmartText({ text: sourceNode.data.text, getNodes })
              const [ satisfied, safe ] = checkCondition({ condition: data.condition, text: smartText })
              setEdges((edges) =>
                edges.map((edge) =>
                  edge.id=== id ? { ...edge, data: { ...edge.data, satisfied, safe } } : edge
                )
              )
              window.alert(`Condition "${data.condition}" has been ${ satisfied !== null ? (satisfied ? 'satisfied' : 'unsatisfied') : 'unknown'}. The regular expression is ${ safe !== null ? (safe ? 'safe' : 'unsafe') : 'unknown' }.`);
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

          <Button compact size='mini'>
            <Dropdown item simple position='right'
              icon={
               <Icon name='ellipsis vertical' color='grey' />
              }>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setEdges((edges) =>
                      edges.map((edge) =>
                        edge.id=== id ? { ...edge, data: { ...edge.data, recipient } } : edge
                      )
                    );
                  }}
                >
                  <Icon name='user plus' />
                  Set recipient
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    const smartText = buildSmartText({ text: sourceNode.data.text, getNodes })
                    // console.log('smartText:', smartText)
                    const [ satisfied, safe ] = checkCondition({ condition, text: smartText })
                    // console.log('condition:', condition, ', satisfied:', satisfied, ', safe:', safe)
                    setEdges((edges) =>
                      edges.map((edge) =>
                        edge.id=== id ? { ...edge, data: { ...edge.data, condition, satisfied, safe } } : edge
                      )
                    )
                  }}
                >
                  <Icon name='usb' />
                  Set condition
                </Dropdown.Item>
                <Dropdown.Item onClick={orderEdges}>
                  <Icon name='sort' />
                  Reorder
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setEdges((es) => es.filter((e) => e.id !== id));
                  }}
                >
                  <Icon name='delete' />
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Button>

        </Button.Group>
      </EdgeLabelRenderer>
    </>
  );
})

const VariableEdge = memo(({
  id, data, source, target, style, selected,
  sourceX, sourceY, targetX, targetY, markerEnd,
}) => {
  const [edgePath, labelX, labelY, offsetX, offsetY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const {
    setEdges, getNodes, setNodes, reordering, orderEdges,
  } = useMapContext();

  return (
    <>
      <BaseEdge
        id={id} path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: data.stroke,
          strokeWidth: selected ? 3 : 1,
        }}
      />
      <EdgeLabelRenderer>
        <Button.Group icon compact size='mini'
          className='nodrag nopan'
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          <OrderControl
            id={id}
            expecting={data.expecting}
            sequence={data.sequence}
            cursor={data.cursor}
            reordering={reordering}
          />

          <Button compact size='mini'>
            <Dropdown item simple position='right'
              icon={
               <Icon name='ellipsis vertical' color='grey' />
              }>
              <Dropdown.Menu>
                <Dropdown.Item onClick={orderEdges}>
                  <Icon name='sort' />
                  Reorder
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setEdges((es) => es.filter((e) => {
                      if (e.id === id) {
                        unlinkEdge({ edge: e, getNodes, setNodes })
                      }
                      return e.id !== id
                    }));
                  }}
                >
                  <Icon name='unlinkify' />
                  Unlink
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setEdges((es) => es.filter((e) => e.id !== id));
                  }}
                >
                  <Icon name='delete' />
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
  VariableEdge: VariableEdge,
};

const getNodeId = () => nanoid(9)
const getUname = (id) => `Note_${id}`


const getLayoutedElements = (nodes, edges, options) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: options.direction });
  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    }),
  );
  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;
      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const defaultColor = '#000000'
const defaultBackgroundColor = '#ffffff'
const defaultStroke = '#999999'
const hiddenConfirm = {
  open: false,
  header: 'Confirm',
  message: 'Are you sure?',
  func: () => {},
}

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
  const [ autosave, setAutosave ] = useState(true)
  const [ reordering, setReordering ] = useState(false)
  const [ color, setColor ] = useState(defaultColor)
  const [ backgroundColor, setBackgroundColor ] = useState(defaultBackgroundColor)
  const [ stroke, setStroke ] = useState(defaultStroke)
  const [ confirm, setConfirm ] = useState(hiddenConfirm)
  const fileInputRef = useRef(null);
  const xmppRef = useRef(null);

  const [ playing, setPlaying ] = useState(false)
  const [ pausing, setPausing ] = useState(false)
  const playingRef = useRef(false)
  const pausingRef = useRef(false)
  playingRef.current = playing
  pausingRef.current = pausing

  const reactFlowWrapper = useRef(null);
  const [ nodes, setNodes, onNodesChange ] = useNodesState([]);
  const [ edges, setEdges, onEdgesChange ] = useEdgesState([]);
  const {
    screenToFlowPosition, getNodes, getEdges, setViewport, fitView
  } = useReactFlow();
  const [ rfInstance, setRfInstance ] = useState(null);

  // console.log('title:', title)
  // console.log('condition:', condition)
  // console.log('presenceMap:', presenceMap)
  // console.log('openerSearch:', openerSearch)
  // console.log('color:', color, 'backgroundColor:', backgroundColor)

  const getMap = useCallback((mapId) => {
    return maps.filter(({ _id }) => _id === mapId)[0]
  }, [maps])

  const indexMaps = useCallback(async () => {
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
  }, [setLoading, setMaps, setMapId, setTitle, setNodes, setEdges, setViewport, setResponseError])

  useEffect(() => {
    indexMaps()
  }, [indexMaps])

  const postMap = useCallback(async ({ duplicate = false } = {}) => {
    setLoading(true)
    try {
      if (!rfInstance) {
        throw new Error('ReactFlow instance is not defined.')
      }
      const flow = rfInstance.toObject();
      const res = await axios.post(`${conf.api.url}/map`, {
        title: `${duplicate ? title : 'Untitled'}: (${faker.commerce.productName()})`,
        flow: duplicate ? flow : {
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
  }, [rfInstance, title, setLoading, getMap, mapId, setMaps, setMapId, setTitle, setNodes, setEdges, setViewport, setResponseError])

  const putMap = useCallback(async ({ loader = true } = {}) => {
    if (loader) {
      setLoading(true)
    }
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
        // timeout: 10000,
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
      if (loader) {
        setLoading(false)
      }
    }
  }, [mapId, setLoading, setResponseError, maps, setMaps, getMap, rfInstance, postMap, title])

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
      link.download = `${title}.sd.json`;
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

  useEffect(() => {
    const interval = setInterval(async () => {
      if (autosave) {
         console.log("Autosave");
         await putMap({ loader: false })
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [autosave, putMap]);

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

  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   [],
  // );
  //
  // const onConnect = useCallback((params) => {
  //   const requestEdge = {
  //     ...params,
  //     id: `${params.source}->${params.target}`,
  //     type: 'RequestEdge',
  //     data: {
  //       recipient: null,
  //       condition: condition,
  //       // safe: null,      // FIXME: get this params from onConnectEnd
  //       // satisfied: null, // FIXME: get this params from onConnectEnd
  //     },
  //     markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, },
  //   };
  //   console.log('onConnect requestEdge:', requestEdge, ', params:', params)
  //   setEdges((eds) => addEdge(requestEdge, eds));
  // }, [condition, setEdges]);

  const onConnect = useCallback((params) => {
    const variableEdge = {
      ...params,
      id: `${params.source}->${params.target}`,
      type: 'VariableEdge',
      data: {
        stroke,
      },
      markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: stroke },
      animated: true,
    };
    // console.log('onConnect variableEdge:', variableEdge, ', params:', params)
    setEdges((eds) => addEdge(variableEdge, eds));
  }, [setEdges, stroke]);

  // const onReconnect = useCallback(
  //   (oldEdge, newConnection) =>
  //     setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
  //   [],
  // );

  const onEdgesDelete = (deletedEdges) => {
    console.log('Deleted edges:', deletedEdges);
    deletedEdges.forEach((edge) => {
      unlinkEdge({ edge, getNodes, setNodes })
    });
  };

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
        color,
        backgroundColor,
      },
      type: 'NoteNode',
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes, width, height, screenToFlowPosition, color, backgroundColor]);

  const onConnectEnd = useCallback(async (event, connection) => {
    console.log('onConnectEnd event:', event, ', connection:', connection)

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
      // if (!connection.fromNode.data.text) {
      //   return alert('Please write note / prompt')
      // }

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
          color,
          backgroundColor,
        },
        type: 'NoteNode',
      };
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === connection.fromNode.id ? { ...node, data: { ...node.data, editing: false } } : node
        ).concat(newNode)
      );

      const edgeId = `${connection.fromNode.id}->${id}`
      const newEdge = {
        id: edgeId,
        source: connection.fromNode.id,
        target: id,
        type: 'RequestEdge',
        data: {
          recipient,
          condition,
          stroke,
        },
        markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: stroke },
      }
      setEdges((edges) =>
        edges.concat(newEdge),
      );

      await playRequestEdge({
        text: connection.fromNode.data.text, condition,
        getNodes, setNodes, setEdges, sendPersonalMessage,
        credentials, recipient,
        edgeId, targetId: id,
      })
    }
  }, [screenToFlowPosition, credentials, recipient, condition, getNodes, setNodes, setEdges, color, backgroundColor, stroke]);


  const playMap = useCallback(async () => {
    console.log('playMap')
    setPlaying(true)
    setPausing(false)
    setReordering(false)
    let sequence = 1
    setEdges((edges) =>
      edges.map((edge) => {
        // edge.type === 'RequestEdge' ? { ...edge, data: { ...edge.data, sequence: sequence++, expecting: true } } : edge
        return { ...edge, data: { ...edge.data, sequence: sequence++, expecting: true } }
      })
    );
    const edges = getEdges()
    // console.log('edges:', edges)

    for (let edge of edges) {
      if (edge.type === 'RequestEdge') {
        await sleep(100) // NOTE: this sleep is need in case if the VariableEdge just updated the NoteNode

        // console.log('edge:', edge)
        // console.log('edge.source:', edge.source, ', edge.target:', edge.target)
        const nodes = getNodes()
        // console.log('nodes:', nodes)
        const sourceNode = nodes.find(node => node.id === edge.source)
        // const targetNode = nodes.find(node => node.id === edge.target)
        // console.log('sourceNode:', sourceNode)
        // console.log('targetNode:', targetNode)

        await playRequestEdge({
          text: sourceNode.data.text, condition: edge.data.condition,
          getNodes, setNodes, setEdges, sendPersonalMessage,
          credentials, recipient: edge.data.recipient,
          edgeId: edge.id, targetId: edge.target,
        })

        while (playingRef.current) {
          await sleep(1000)
          const nodes1 = getNodes()
          // console.log('nodes1:', nodes1)
          // console.log('edge.target:', edge.target)
          const targetNode1 = nodes1.find(node1 => node1.id === edge.target)
          // console.log('targetNode1:', targetNode1)
          if (!targetNode1) {
            break
          }
          // console.log('targetNode1.data.waitRecipient:', targetNode1.data.waitRecipient)
          if (targetNode1.data.waitRecipient === undefined) {
            setEdges((edges1) =>
              edges1.map((edge1) =>
                edge1.id === edge.id ? { ...edge1, data: { ...edge1.data, expecting: undefined, cursor: undefined } } : edge1
              )
            );
            break
          }
        }
      } else if (edge.type === 'VariableEdge') {
        const nodes = getNodes()
        const sourceNode = nodes.find(node => node.id === edge.source)
        setNodes((nodes) =>
          nodes.map((node) => {
            if (node.id === edge.target) {
              if (!node.data.text.includes(`[[${sourceNode.data.uname}]]`)) {
                return { ...node, data: { ...node.data, text: node.data.text + `\n[[${sourceNode.data.uname}]]`, } }
                    // text: node.data.text + (satisfied ? `\n[[${connection.fromNode.data.uname}]]` : ''),
              }
            }
            return node
          })
        );
        setEdges((edges1) =>
          edges1.map((edge1) =>
            edge1.id === edge.id ? { ...edge1, data: { ...edge1.data, expecting: undefined } } : edge1
          )
        );
      }

      if (!playingRef.current) {
        break
      }
      while (pausingRef.current) {
        await sleep(1000)
      }
    }

    // stopMap()
    setPlaying(false)
    setPausing(false)
  }, [setPlaying, setPausing, setReordering, setEdges, credentials, getNodes, setNodes, getEdges])

  const pauseMap = useCallback(() => {
    setPausing(pausing => !pausing)
    setReordering(false)
    console.log('pauseMap')
  }, [setPausing, setReordering])

  const stopMap = useCallback(() => {
    setPlaying(false)
    setPausing(false)
    setReordering(false)
    console.log('stopMap')
    setEdges((edges) =>
      edges.map((edge) => { return { ...edge, data: { ...edge.data, sequence: undefined, expecting: undefined } } } )
    );
  }, [setPlaying, setPausing, setReordering, setEdges])

  const orderEdges = useCallback(() => {
    setReordering(reordering => {
      let sequence = 1
      setEdges((edges) =>
        edges.map((edge) => {
          // edge.type === 'RequestEdge' ? { ...edge, data: { ...edge.data, sequence: !reordering ? sequence++ : undefined } } : edge
          return { ...edge, data: { ...edge.data, sequence: !reordering ? sequence++ : undefined } }
        })
      );
      return !reordering
    })
  }, [setEdges])

  // useEffect(() => {
  //   console.log('Current edges state:', edges);
  // }, [edges]);

  const onLayout = useCallback((direction) => {
    console.log(nodes);
    const layouted = getLayoutedElements(nodes, edges, { direction });
    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);
    fitView();
  }, [nodes, edges, setNodes, setEdges, fitView]);

  return (
    <MapContext.Provider value={{
      presenceMap, credentials, recipient, sendPersonalMessage,
      condition, reordering, setEdges, getNodes, setNodes,
      orderEdges
    }}>
      <Container>
        <Menubar />
      </Container>

      <Modal
        closeIcon
        open={confirm.open}
        onClose={() => setConfirm(hiddenConfirm)}
      >
        <Modal.Header>{confirm.header}</Modal.Header>
        <Modal.Content>{confirm.message}</Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setConfirm(hiddenConfirm)}>
            Cancel
          </Button>
          <Button positive onClick={() => {
            setConfirm(hiddenConfirm)
            confirm.func()
          }}>
            Delete
          </Button>
        </Modal.Actions>
      </Modal>

      <div style={{ marginLeft: '1em', marginTop: '0.3em' , marginBottom: '0.3em' }}>
        <Button.Group>
          <Button icon onClick={postMap}>
            <Icon name='file' />
          </Button>
          <Button icon onClick={putMap}>
            <Icon name='save' />
          </Button>
          <Button icon onClick={() => postMap({ duplicate: true })}>
            <Icon name='clone' />
          </Button>
          <Button icon onClick={() => {
            setConfirm({
              open: true,
              header: 'Confirm Map Delete',
              message: 'Are you sure you want to delete your map?',
              func: deleteMap,
            })
          } }>
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
        {' '}

        <span style={{ marginLeft: '1em' }} />
        { renaming && (
          <>
            <Input
              iconPosition='left'
              placeholder='Title...'
              value={title}
              onChange={e => setTitle(e.target.value)}
            ><Icon name='map' /><input /></Input>
            {' '}
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
        {' '}
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

        {' '}
        <Checkbox
          label='Autosave'
          onChange={(e, data) => setAutosave(data.checked)}
          checked={autosave}
        />

        {' '}
        <Button.Group>
          <Button icon basic onClick={() => onLayout('TB')}>
            <Icon name='grid layout' />
          </Button>
          <Button icon basic onClick={() => onLayout('LR')}>
            <Icon name='list layout' />
          </Button>
        </Button.Group>

        {' '}
        <Icon name='font' color='grey' onClick={() => {
          setNodes((nodes) =>
            nodes.map((node) =>
              node.selected ? { ...node, data: { ...node.data, color } } : node
            )
          )
        }} />
        <input
          className="nodrag"
          type="color"
          onChange={(e) => {
            console.log('color:', e.target.value)
            setColor(e.target.value)
            setNodes((nodes) =>
              nodes.map((node) =>
                node.selected ? { ...node, data: { ...node.data, color: e.target.value } } : node
              )
            )
          } }
          value={color}
        />
        {' '}
        <Icon name='paint brush' color='grey' onClick={() => {
          setNodes((nodes) =>
            nodes.map((node) =>
              node.selected ? { ...node, data: { ...node.data, backgroundColor } } : node
            )
          )
        }} />
        <input
          className="nodrag"
          type="color"
          onChange={(e) => {
            setBackgroundColor(e.target.value)
            setNodes((nodes) =>
              nodes.map((node) =>
                node.selected ? { ...node, data: { ...node.data, backgroundColor: e.target.value } } : node
              )
            )
          } }
          value={backgroundColor}
        />
        {' '}
        <Icon name='linkify' color='grey' onClick={() => {
          setEdges((edges) =>
            edges.map((edge) =>
              edge.selected ? { ...edge, data: { ...edge.data, stroke }, markerEnd: { ...edge.markerEnd, color: stroke } } : edge
            )
          );
        }} />
        <input
          className="nodrag"
          type="color"
          onChange={(e) => {
            setStroke(e.target.value)
            setEdges((edges) =>
              edges.map((edge) =>
                edge.selected ? { ...edge, data: { ...edge.data, stroke: e.target.value }, markerEnd: { ...edge.markerEnd, color: stroke } } : edge
              )
            );
          } }
          value={stroke}
        />
        {' '}
        <Icon name='history' color='grey' onClick={() => {
          setColor(defaultColor)
          setBackgroundColor(defaultBackgroundColor)
          setStroke(defaultStroke)
        }} />

        {' '}
        <Button.Group>
          <Button icon basic onClick={orderEdges}>
            <Icon name='sort' color={ reordering ? 'blue' : 'grey' } />
          </Button>
        </Button.Group>
        {' '}
        <Button.Group>
          {playing ? (
            <>
              {pausing ? (
                <Button icon basic onClick={pauseMap}>
                  <Icon name='play' color='yellow' />
                </Button>
              ) : (
                <Button icon basic onClick={pauseMap}>
                  <Icon name='pause' color='yellow' />
                </Button>
              )}
              <Button icon basic onClick={stopMap}>
                <Icon name='stop' color='red' />
              </Button>
            </>
          ) : (
            <Button icon basic onClick={playMap}>
              <Icon name='play' color='green' />
            </Button>
          )}
        </Button.Group>

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
          onEdgesDelete={onEdgesDelete}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onInit={setRfInstance}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          // onReconnect={onReconnect}
          fitView
          fitViewOptions={{ padding: 2 }}
          // nodeOrigin={nodeOrigin}

          panOnScroll={true}
          selectionOnDrag={true}
          selectionMode={SelectionMode.Partial}
          panOnDrag={[1, 2]}
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
              <Icon name='sticky note outline' />
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
