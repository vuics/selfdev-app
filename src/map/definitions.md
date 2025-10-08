# Definitions

The Map defines a workflow for agent orchestration and coordination. It defines what message a recipient (agent or human) receives. The messages that will be send to a recipient are text and file attachments from source notes. The response from recipient gets saved as text and file attachments in the destination edges. The execution (sending messages to recipients) is according to the order of the edges in the edges array. The execution starts from the first edge, goes through all the edges, edge-by-edge, then stops when there is not more edges left in the array.


# Map

Definition of the Map is below:

```json
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
```

## NoteNode

Definition of the NoteNode is below:

```json
{
  id: String,                          // mongodb id
  type: String,                // node type, always 'NoteNode'
  position: {
    x: Number,                 // x position on the map
    y: Number,                 // y position on the map
  },
  data: {
    uname: String,             // unique node name

    text: String,                           // note text. The text can be smart text when it contains [[node_uname]], then the subsctring [[node_uname]] is substituted with the text of the node_uname. It is possible to disable the smart text substitution by commenting it as [/*[node_uname]*/]. The subsctitution is nested if the node_uname also contains the [[other_node_uname]]. Multiple [[uname1]], [[uname2]], etc. inside one text get all substituted with the texts of those nodes.
    attachments: [String] | undefined,      // list of urls of attached files
    stash: String | undefined,              // note stash for text (used for diff text and stash)
    stashAttachments: [String] | undefined, //  list of urls of attached files in stash

    waitRecipient: String | undefined, // xmpp address of the recipient to which we sent a message and waiting for reply
    kind: String | undefined,  // kind the node content, one of values: 'markdown', 'code', 'raw' or `undefined` (plain)
    editing: Boolean,          // editing/viewing mode switch
    diffing: Boolean,          // if the note is in the diff mode (diff of text and stash with their attachemnts)
    renaming: Boolean,         // true when user renaming the note to show name input
    slide: Boolean,            // if the note is slide in the deck
    slideIndex: Number,        // number of the slide in the deck

    color: String,             // text color
    backgroundColor: String,   // background color
  },
  style: {
    width: Number,             //
    height: Number,            //
  },
  width: Number,               // note width
  height: Number | undefined,  // note height

  parentId: String | undefined, // id of a GroupNode

  measured: {                  // The section gets added by ReactFlow
    width: Number,
    height: Number,
  },
}
```

## GroupNode

Definition of the GroupNode is below:

```json
{
  id: String,                  // mongodb id
  type: String,                // always 'group'
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
    width: Number,             //
    height: Number,            //
  },
}
```

GroupNode has child node ids.
The GroupNode organizes the execution loops considers the following types of edges:
* init edges: init loop variables but do not participate in a loop.
* inner edges: repeats continuously unil one of the exit edges conditinos get satisfied starting with the first edge in array.
* exit edges: allow exit loop if one of the edge's conditions get satisfied.
* loop edges:  loop through all inner and exit edges.


## RequestEdge

Definition of the GroupNode is below:

```json
{
  id: String,            // edge id in format `${sourceNodeId}->${targetNodeId}`
  type: 'RequestEdge',   // edge type, always 'RequestEdge'
  source: String,        // source node id,
  target: String,        // target node id,
  data: {
    recipient: String,   // the agent name, xmpp address of the agent, e.g. agentname@username.x.hyag.ru
    condition: String,   // regular expresson, the edge gets executed (message send to recipient if the condition is satisfied when applied to the source edge before sending the message to the recipient
    stroke: String,      // Stroke line color

    satisfied: Boolean,  // if condition is satisfied by applying the condition regex to the source node smart text
    safe: Boolean,       // if the condition regex is safe

    expecting: Boolean | undefined,  // execution is expected, colors edge label yellow
    cursor: Boolean | undefinded,    // if this edge is being executed (message send to a recipient and waiting for the answer), colors edge label to olive
    reordering: Boolean | undefined, // if in reordering mode, colors edge label to blue
    sequence: Number,    // order number of the edge
  },
  style: {
   ..
  },
  markerEnd: {
    type: String,        // Set to MarkerType.ArrowClosed from ReactFlow
    width: Number,       // Mostly 20
    height: Number,      // Mostly 20
    color: String,       // Stroke line color
  },
  animated: Boolean,     // Mostly true
  selected: Boolean,     // true if the node is selected
  sourceX: Number,       // x coordinate of the source point
  sourceY: Number,       // y coordinate of the source point
  targetX: Number,       // x coordinate of the target point
  targetY: Number,       // y coordinate of the target point
};
```

## Example

Here is an example JSON:
```json
{"title":"mapper-test","flow":{"nodes":[{"id":"gv36xJg1-","type":"NoteNode","position":{"x":435,"y":323.75390625},"data":{"uname":"hey-","text":"Hey!","editing":false,"renaming":false,"color":"#000000","backgroundColor":"#ffffff","stash":""},"width":600,"measured":{"width":600,"height":91},"selected":false},{"id":"cfZblaUjS","position":{"x":434,"y":534.75390625},"data":{"uname":"hello","text":"Hey there! How’s it going? What would you like to do today? I can help with questions, explanations, coding, writing, brainstorming, planning, or just chat. Tell me what you’re curious about or what you need help with.","editing":false,"renaming":false,"color":"#000000","backgroundColor":"#ffffff"},"type":"NoteNode","measured":{"width":600,"height":131},"width":600,"selected":false},{"id":"PO5Z_M8j9","type":"NoteNode","position":{"x":529.947867341595,"y":1281.68069167274},"data":{"uname":"answer","text":"Nice intro. It’s friendly and lets people know what you can do. Here are a few quick thoughts and some ready-to-use variants you can drop in depending on the tone you want.\n\nWhat I like\n- Clear, approachable opening.\n- Concrete list of capabilities.\n- Easy call to action with “tell me what you’d like to do” or “surprise me.”\n\nA few light tweaks (optional)\n- Make it a bit more concise and parallel in structure.\n- Consider a version tailored to your audience (casual, professional, developer, student).\n- If you’re using this in a UI, you might want a shorter single-line version as well.\n\nVariant 1 — concise and friendly\nHi there! I can explain concepts, draft or edit messages, brainstorm ideas, help with coding, summarize or translate text, plan projects, and write short stories, poems, or code snippets. Tell me what you’d like to do, or say “surprise me.”\n\nVariant 2 — slightly more formal\nHello. I can help explain topics, draft or edit documents, brainstorm ideas, assist with coding, summarize or translate text, plan schedules, and generate short stories, poems, or code. How may I assist you today? Or you can request a surprise.\n\nVariant 3 — developer/audience-focused\nHey—I’m here to help with explanations, drafting/editing code and docs, brainstorming features, debugging, summarizing/translating, planning roadmaps, and generating sample code or prose. What would you like to tackle? Or say “surprise me.”\n\nWould you like me to tailor this to a specific audience (students, professionals, developers, etc.) or a particular tone? If you share your context, I can draft a version that fits. And if you have a sample message or document you want to start with, I can help draft or edit it right away.","editing":false,"renaming":false,"color":"#000000","backgroundColor":"#ffffff","attachments":[]},"width":600,"measured":{"width":600,"height":757},"selected":false,"dragging":false},{"id":"du9gKfrM6","type":"NoteNode","position":{"x":550.124998090789,"y":953.824214912951},"data":{"uname":"question","text":"Do you like it? In your message explicitly say yes or no.\n[[hello]]","editing":false,"renaming":false,"color":"#000000","backgroundColor":"#ffffff","stash":"","attachments":[]},"width":600,"measured":{"width":600,"height":181},"selected":false,"dragging":false}],"edges":[{"id":"gv36xJg1--\u003EcfZblaUjS","source":"gv36xJg1-","target":"cfZblaUjS","type":"RequestEdge","data":{"recipient":"gpt-5-nano@artemarakcheev.selfdev-prosody.dev.local","condition":"","stroke":"#999999","satisfied":true,"safe":true},"markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#999999"}},{"source":"cfZblaUjS","sourceHandle":"a","target":"du9gKfrM6","targetHandle":"a","id":"cfZblaUjS-\u003Edu9gKfrM6","type":"RequestEdge","data":{"condition":"","stroke":"#999999","satisfied":true,"safe":true,"cursor":true},"markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#999999"},"animated":true},{"source":"du9gKfrM6","sourceHandle":"a","target":"PO5Z_M8j9","targetHandle":"a","id":"du9gKfrM6-\u003EPO5Z_M8j9","type":"RequestEdge","data":{"condition":"","stroke":"#999999","satisfied":true,"safe":true,"recipient":"gpt-5-nano@artemarakcheev.selfdev-prosody.dev.local"},"markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#999999"},"selected":false}],"viewport":{"x":-123.700075140911,"y":-160.061449120636,"zoom":1.10102049116937}}}
```

## Agentic Design

```markdown
Design an agent workflow in the described json format. There will be 2 agents: morpheus and neo. The morpheus asks neo what pill would you like to take red or blue, and neo decides and replies. The morpheus gives neo the pill that he wants. Output the json of the map. Validate the json that it satisfies the described format.
```


## ChatGPT **Concept: Workflow Design Agent**

**Goal:** User gives a prompt like:
*"Create a workflow where Morpheus asks Neo which pill he wants, Neo answers, and Morpheus gives him the pill."*
The agent generates a **Map JSON** fully compatible with your format.

---

### **High-Level Architecture**

1. **Input:** User prompt (natural language).

2. **Agent Steps:**

   * **Parse intent**: Identify actors (agents/humans), actions, and message sequence.
   * **Define nodes**: For each “message” or action, create a `NoteNode`.
   * **Define edges**: Connect nodes sequentially, set `RequestEdge` with recipient(s).
   * **Add metadata**: Optional fields for UI (`selected`, `measured`) and execution (`satisfied`, `safe`).
   * **Output Map JSON**.

3. **Optional enhancements:**

   * **Conditional logic**: Use regex in `RequestEdge.condition` if user specifies choices.
   * **Loops / branching**: GroupNodes with AND/OR logic for complex flows.
   * **Attachments**: Include files if user specifies.

---

### **Implementation Approach**

1. **LLM-based design agent**

   * Use an LLM (like GPT-5, Gemini, Ollama) as the core reasoning engine.
   * Provide **prompt template**:

```text
You are a Workflow Design Agent.
Input: Natural language description of a workflow.
Output: JSON Map with nodes and edges using the following structure: [insert your JSON schema here].
Ensure all required fields are filled. Add optional UI fields as needed.
```

2. **Stepwise generation inside the agent**

   * **Extract participants:** e.g., Morpheus, Neo. The list of deployed agents can be supplied to the design agent.
   * **Extract messages / actions:** e.g., ask, reply, give.
   * **Generate nodes** for each message/action.
   * **Generate edges** connecting nodes with proper `recipient`.
   * **Generate viewport** automatically (optional: simple layout algorithm).

3. **Validation layer**

   * After generating JSON, validate:

     * Each node has unique `id`.
     * All `RequestEdge.source` and `.target` exist.
     * Required fields filled (`type`, `position`, `data`, `width`, `height`).

---

### **Example Prompt → Generated Workflow**

**User Prompt:**
*"Create a workflow where Morpheus asks Neo which pill he wants, Neo replies with red or blue, and Morpheus gives him that pill."*

**Generated JSON Map:**

```json
{
  "title": "Morpheus-Neo Pill Choice",
  "flow": {
    "nodes": [
      { "id": "node1", "type": "NoteNode", "position": { "x":100,"y":100 }, "data": { "uname":"morpheus-ask", "text":"Which pill would you like: red or blue?", "editing":false,"renaming":false,"color":"#000000","backgroundColor":"#ffffff" }, "width":600, "height":100 },
      { "id": "node2", "type": "NoteNode", "position": { "x":100,"y":300 }, "data": { "uname":"neo-reply", "text":"","editing":false,"renaming":false,"color":"#000000","backgroundColor":"#ffffff" }, "width":600, "height":100 },
      { "id": "node3", "type": "NoteNode", "position": { "x":100,"y":500 }, "data": { "uname":"morpheus-give", "text":"","editing":false,"renaming":false,"color":"#000000","backgroundColor":"#ffffff" }, "width":600, "height":100 }
    ],
    "edges": [
      { "id":"node1->node2","source":"node1","target":"node2","type":"RequestEdge","data":{"recipient":"neo@agents.matrix","condition":"","stroke":"#999999"},"markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#999999"},"animated":true },
      { "id":"node2->node3","source":"node2","target":"node3","type":"RequestEdge","data":{"recipient":"morpheus@agents.matrix","condition":"","stroke":"#999999"},"markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#999999"},"animated":true }
    ],
    "viewport":{"x":0,"y":0,"zoom":1}
  }
}
```

---

### **Tech Stack Options**

* **LLM:** GPT-5 or other instruction-tuned LLM.
* **Execution Layer (optional):** Can simulate workflow before saving JSON.
* **Front-end:** ReactFlow for visual editing.
* **Back-end:** Node.js / Python agent server.



