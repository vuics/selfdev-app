# Definitions

# Map

{
  _id: String,   // MongoDB id
  title: String, // map name
  flow: {
    nodes: [ NoteNode | GroupNode ],  // array of nodes,
    edges: [ RequestEdge ],           // array of edges,
    viewport: {                       // ReactFlow's viewport
      x: Number,
      y: Number,
      zoom: Number,
    },
  },
}

# NoteNode:

{
  id,                          // mongodb id
  type: String,                // node type, always 'NoteNode'
  position: {
    x: Number,                 // x position on the map
    y: Number,                 // y position on the map
  },
  data: {
    uname: String,             // unique node name
    text: String,              // note text
    editing: Boolean,          // editing/viewing mode switch
    renaming: Boolean,         // true when user renaming the note to show name input
    color: String,             // text color
    backgroundColor: String,   // background color
  },
  width: Number,               // note width
  height: Number | undefined,  // note height
}

data: {
  editing: Boolean, // switch note between editing or viewing modes
}

# GroupNode:

{
  id: String,                  // mongodb id
  position: {
    x: Number,                 // x position on the map
    y: Number,                 // y position on the map
  },
  data: {
    uname: String,             // unique group name
    renaming: Boolean,         // true when user renaming the group to show name input
    color: String,             // text color
    backgroundColor: String,   // background color
    and: Boolean,              // AND (all expressions safisfied) if true otherwise OR (any expression satisfied) loop exit condition

    //  text: String,              // note text
    //  editing: Boolean,          // editing/viewing mode switch
  },
  style: {
    width: x1 - (x || 0),
    height: y1 - (y || 0),
  },
  type: 'group',
}

# RequestEdge:

{
  id: String,            // edge id in format `${sourceNodeId}->${targetNodeId}`
  type: 'RequestEdge',   // edge type, always 'RequestEdge'
  data: {
    condition,
    stroke,
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: stroke
  },
  animated: true,
};


Need to define functions:
getNodes()
setNodes()
getEdges()
setEdges()
