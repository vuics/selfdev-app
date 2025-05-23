/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import React from 'react'
import {
  Container,
  Header,
  Image,
  Segment,
  Card,
  Embed,
  Grid,
  Divider,
  Icon,
} from 'semantic-ui-react'
import Footer from './components/Footer'

const Product = () => (
  <>
    <br />
    <Container>
      <Segment padded textAlign="center" inverted color='blue'>
        <Header as="h1">
          Selfdev
        </Header>
      </Segment>
    </Container>
    <br/>

    <Container>
      <Segment padded textAlign="center">
        <Header as="h2">
          Description
        </Header>
        <Image src='/images/logo192.png' centered />
        <br />
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Selfdev is a distributed Agent-as-a-Service platform that empowers forward-thinking teams to automate operations and accelerate execution saving time and money. Build and run intelligent agentic workflows with any API, model, or database — effortlessly.
        </p>
        <p style={{ fontSize: '1.3em', textAlign: 'center' }}>
          Seamlessly connect agents and humans across all channels — web, mobile, desktop, video calls, virtual reality, command line, social media and messangers, and even phone lines and sms.
        </p>
        <Divider />
        <Header as="h2" id="toc">
          Features and Functions
        </Header>
        <ol style={{ textAlign: 'left', fontSize: '1.4em', lineHeight: '1.5' }}>
          <li>
            <a href="#chat">
              <b>Chat</b> — communicate to people and virtual agents through private channels and group chats.
            </a>
          </li>
          {/*
          <li>
            <a href="#talk">
              <b>Talk</b> — communicate to agents and agentic teams.
            </a>
          </li>
          */}
          <li>
            <a href="#map">
              <b>Map</b> — coordinate agents on a visual map focusing on agentic content and problem solving.
            </a>
          </li>
          <li>
            <a href="#meet">
              <b>Meet</b> — meet in video conference with humans and agents.
            </a>
          </li>
          <li>
            <a href="#hive">
              <b>Hive</b> — create and deploy agentic teams.
            </a>
          </li>
          <li>
            <a href="#flow">
              <b>Flow</b> — assemble agentic workflows using APIs, models, databases.
            </a>
          </li>
          <li>
            <a href="#node">
              <b>Node</b> — build automation flows that collect, transform and visualize data.
            </a>
          </li>
          <li>
            <a href="#train">
              <b>Train</b> — train agents by demonstrating browser interactions.
            </a>
          </li>
          <li>
            <a href="#note">
              <b>Note</b> — prototype and experiment with agents using Jupyter notebooks.
            </a>
          </li>
          <li>
            <a href="#code">
              <b>Code</b> — program using web IDE and architect and coder agents.
            </a>
          </li>
          {/*
          <li>
            <a href="#build">
              <b>Build</b> — build and organize agentic teams with visual editor.
            </a>
          </li>
          */}
          <li>
            <a href="#open">
              <b>Open</b> — communicate with deployed open-source and OpenAI models.
            </a>
          </li>
          <li>
            <a href="#sell">
              <b>Sell</b> — manage sales and operations with web CRM and ERP apps.
            </a>
          </li>
          <li>
            <a href="#ecommerce">
              <b>E-commerce</b> — create fully tailored backend for online stores.
            </a>
          </li>
          <li>
            <a href="#storefront">
              <b>Storefront</b> — create fully customizable, high-performance online shopping experiences.
            </a>
          </li>
          <li>
            <a href="#bank">
              <b>Bank</b> — manage, and scale core banking and digital financial services.
            </a>
          </li>
          <li>
            <a href="#blockchain">
              <b>Blockchain</b> — build blockchain apps with distributed networks, databases, and messaging systems.
            </a>
          </li>
          <li>
            <a href="#contract">
              <b>Smart Contract</b> — execute smart contracts to automate and enforce business logic among multiple parties.
            </a>
          </li>
          <li>
            <a href="#synthetic">
              <b>Synthetic UI</b> — experience dynamically generated or controlled programmatically user interface.
            </a>
          </li>
          <li>
            <a href="#api">
              <b>API</b> — access platform features programmatically through application-programming interface.
            </a>
          </li>
          <li>
            <a href="#cli">
              <b>CLI</b> — interact with API via command-line interface in your terminal.
            </a>
          </li>
          <li>
            <a href="#mobile">
              <b>Mobile App</b> — communicate with agents on iOS and Android devices.
            </a>
          </li>
          <li>
            <a href="#desktop">
              <b>Desktop App</b> — interact with agents on macOS, Linux and Windows.
            </a>
          </li>
          <li>
            <a href="#distributed">
              <b>Distributed System</b> — connect humans and agents through a server-to-server network.
            </a>
          </li>
          <li>
            <a href="#bridge">
              <b>Social Bridge</b> — connect agents with social networks and messangers.
            </a>
          </li>
          <li>
            <a href="#phone">
              <b>Phone</b> — communicate with agents on phone calls and messages.
            </a>
          </li>
          <li>
            <a href="#vr">
              <b>VR / AR</b> — talk to agents in virtual reality or agumented reality.
            </a>
          </li>
          <li>
            <a href="#quantum">
              <b>Quantum Computing</b> — perform quantum computing on simulators and real quantum hardware.
            </a>
          </li>
          <li>
            <a href="#docs">
              <b>Docs</b> — learn, build, and succeed with clear and actionable guidance.
            </a>
          </li>
        </ol>
      </Segment>
    </Container>

    <Container>
      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="chat" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Chat
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Include humans, agents and human-agentic collaborative teams to your workflows. Bridge human expertise with AI intelligence, making workflows smarter and more effective.
        </p>
        <br />
        <Card.Group key="card-group-chat" centered items={[ {
            header: 'Seamless Human-Agent Collaboration',
            description: 'Effortlessly integrate AI agents and humans in chats to enhance teamwork and decision-making.',
          }, {
            header: 'Flexible Communication Channels',
            description: 'Organize personal or group chats with both human and agent participants for structured collaboration.',
          }, {
            header: 'Real-Time AI Assistance',
            description: 'Leverage agentic AI to automate tasks, provide insights, and streamline workflows instantly.',
          }, {
            header: 'Secure & Scalable Messaging',
            description: 'Built on the Prosody XMPP server, ensuring reliable, private, and scalable communication.',
          }, {
            header: 'Enhanced Productivity',
            description: 'Reduce manual effort with AI-driven automation, testing, and integration processes.',
          }, {
            header: 'Adaptive Workflows',
            description: 'Customize chat interactions to fit your team’s needs, enhancing efficiency across projects.',
          } ]} />
        <br/>
        <Image src='/images/screenshots/chat.png' fluid bordered rounded />
        <br/>
      </Segment>

      {/*
      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="talk" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Talk
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Chat with agents and agentic teams. Interact with agents through the Synthetic UI on all-in-one platform.
        </p>
        <br />
        <Card.Group key="card-group-talk" centered items={[ {
            header: 'Hyper-Personalized Experiences',
            description: 'Customers get UI elements (dashboards, forms, graphs, documents) tailored in real time to their specific needs and context, eliminating the friction of rigid interfaces.',
          }, {
            header: 'Intelligent Automation & Agentic Assistance',
            description: 'Users interact with AI agents that work proactively, automating tasks, surfacing insights, and adapting to their goals without manual setup.',
          }, {
            header: 'All-in-One Platform',
            description: 'A self-developing, self-selling, and self-funding ecosystem means minimal effort on the customer’s part to maintain or scale the system.',
          }, {
            header: 'Effortless Integration',
            description: 'The agents work inside the customer’s existing tools (e.g., Salesforce), ensuring a seamless experience without switching platforms.',
          }, {
            header: 'Continuous Optimization',
            description: 'The system evolves dynamically, ensuring that customers always have the most effective and relevant UI for their needs.',
          }, {
            header: '',
            description: '',
          } ]} />
        <br/>
        <Image src='/images/screenshots/talk.png' fluid bordered rounded />
        <br/>
      </Segment>
      */}

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="map" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Map
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Coordinate agents through an interactive visual interface centered on agentic content and collaborative problem-solving. It allows users to visualize agents' activities, strategies, and objectives on a shared map, facilitating intuitive spatial organization and task alignment. The system supports the use of smart text or an agentic coordination language, enabling agents to reference and substitute variables dynamically—enhancing adaptability, context-awareness, and the ability to programmatically align behaviors based on evolving goals or environmental inputs.
        </p>
        <br />
        <Card.Group key="card-group-map" centered items={[ {
            header: 'Visual Agent Coordination',
            description: 'Coordinate agents spatially on an interactive map for clear, intuitive task management and alignment.',
          }, {
            header: 'Context-Aware Problem Solving',
            description: 'Empower agents with dynamic variables and smart text to adapt strategies based on real-time data.',
          }, {
            header: 'Transparency at Scale',
            description: 'Gain insight into agent actions and logic, helping teams make informed decisions with confidence.',
          }, {
            header: 'Streamlined Complexity Management',
            description: 'Simplify multi-agent systems with spatial representations that clarify workflows and interactions.',
          }, {
            header: 'Customizable Coordination Logic',
            description: 'Use agentic coordination languages to program flexible, evolving behavior tailored to your needs.',
          }, {
            header: 'Collaborative Multi-Agent Workflows',
            description: 'Enable teams to co-design, monitor, and refine agent strategies for scalable, shared outcomes.',
        } ]} />
        <br/>
        <Image src='/images/screenshots/map.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h1' textAlign='center' id="meet" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Meet
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Meet with humans and virtual agents that have talking faces through video conferencing. Use chat, breakout rooms, whiteboard, collaboraition documents. Record sessions.
        </p>
        <br/>
        <Card.Group key="card-group-meet" centered items={[ {
            header: 'Immersive & Engaging Meetings',
            description: 'The inclusion of talking virtual agents enhances interaction, making meetings more dynamic and visually engaging.',
          }, {
            header: 'Enhanced Collaboration & Productivity',
            description: 'With integrated chat, breakout rooms, whiteboards, and collaborative documents, teams can work seamlessly within a single platform.',
          }, {
            header: 'AI-Powered Assistance',
            description: 'Virtual agents can provide real-time support, summarize discussions, take notes, and answer queries, reducing manual effort.',
          }, {
            header: 'Efficient Knowledge Retention',
            description: 'Session recording ensures important discussions, decisions, and insights are preserved for future reference and training.',
          }, {
            header: 'Seamless Hybrid Communication',
            description: 'Bringing together humans and AI-powered agents in meetings allows for a more interactive and data-driven communication experience.',
          }, {
            header: 'Scalability & Accessibility',
            description: 'Virtual agents can assist in multiple conversations, making large-scale collaboration and knowledge sharing more efficient across organizations.',
          } ]} />
        <br/>
        <Embed
          icon='right circle arrow'
          // placeholder='/images/screenshots/meet.png'
          url='/images/screenshots/meet.mp4'
        />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h1' textAlign='center' id="hive" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Hive
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Create and deploy virtual agents using JSON format. There are agents of such archetypes as: Chat, RAG, Notebook, Command, Langflow. The agents can talk in private conversations or join rooms to communicate with group conosisting of humans and agents.
        </p>
        <br/>
        <Card.Group key="card-group-hive" centered items={[ {
            header: 'Automation & Efficiency',
            description: 'Customers can streamline workflows by deploying virtual agents that handle tasks, answer questions, and assist in group conversations.',
          }, {
            header: 'Seamless Human-Agent Collaboration',
            description: 'The ability for agents to join rooms and interact with both humans and other agents enhances teamwork and productivity.',
          }, {
            header: 'Flexible AI Deployment',
            description: 'Users can create different types of agents (Chat, RAG, Notebook) tailored to their specific needs, such as conversational AI, retrieval-augmented generation, or structured data handling.',
          }, {
            header: 'Enhanced Knowledge Sharing',
            description: 'RAG agents can fetch and deliver relevant information in real-time, improving decision-making and reducing manual research.',
          }, {
            header: 'Scalability & Adaptability',
            description: 'JSON-based agent configurations allow for easy customization and deployment, enabling businesses to scale AI solutions efficiently.',
          }, {
            header: 'Privacy & Control',
            description: 'Private conversations ensure sensitive discussions remain confidential while still benefiting from AI assistance.',
          } ]} />
        <br/>
        <Image src='/images/screenshots/hive.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h1' textAlign='center' id="flow" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Flow
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Use Langflow as a low-code visual editor to build powerful AI agents and workflows that can use any API, model, or database.
        </p>
        <br/>
        <Card.Group key="card-group-flow" centered items={[ {
            header: 'Visual Simplicity with Low-Code Power',
            description: 'Quickly assemble sophisticated AI workflows without heavy coding. Flow’s visual editor empowers non-engineers and speeds up prototyping across teams.',
          }, {
            header: 'API and Toolchain Flexibility',
            description: 'Integrate any API, model, or database effortlessly—ensuring your agents and workflows align with your existing stack and evolving needs.',
          }, {
            header: 'Reusable and Modular Workflows',
            description: 'Build once, reuse everywhere. Create modular components and templates to accelerate development and ensure consistent best practices.',
          }, {
            header: 'Scalable AI Agent Design',
            description: 'Design agents from simple automations to complex, autonomous systems with memory, feedback, and tools—scaling as your ambitions grow.',
          }, {
            header: 'Real-Time Testing and Debugging',
            description: 'Iterate fast with live testing and inspection. Inject data, observe outputs, and refine logic on the fly for better performance and reliability.',
          }, {
            header: 'Collaboration and Shareability',
            description: 'Share, clone, and co-edit workflows across your team. Flow makes collaboration seamless and promotes reuse of successful agent designs.',
          } ]} />
        <br/>
        <Image src='/images/screenshots/flow.png' fluid bordered rounded />
        <br/>
      </Segment>


      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h1' textAlign='center' id="node" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Node
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Node empowers users to design and execute sophisticated automation flows that seamlessly collect, transform, and visualize data. By integrating Node-RED — a popular flow-based development tool — users can rapidly orchestrate complex data-driven workflows with minimal coding effort.
        </p>
        <br/>
        <Card.Group key="card-group-node" centered items={[
          {
            header: 'Visual Flow-Based Automation',
            description: 'Design and deploy powerful data workflows through an intuitive, visual editor powered by Node-RED—making complex automations accessible to everyone.',
          }, {
            header: 'Seamless Agent-Driven Triggers',
            description: 'Initiate flows instantly with our integrated agent that triggers Node-RED webhooks and processes responses in real time, enabling dynamic, reactive systems.',
          }, {
            header: 'Flexible Data Collection and Transformation',
            description: 'Connect to APIs, databases, and services effortlessly. Collect raw data, transform it into actionable insights, and prepare it for visualization or further processing.',
          }, {
            header: 'Real-Time Response Handling',
            description: 'Capture and utilize real-time responses from automation flows to drive decisions, trigger downstream actions, and keep your operations agile and informed.',
          }, {
            header: 'Modular and Reusable Workflows',
            description: 'Build scalable, modular components that can be reused across projects—speeding up automation development and ensuring consistency in your operations.',
          }, {
            header: 'Team Collaboration and Sharing',
            description: 'Collaborate easily by sharing flows, templates, and best practices across teams, fostering innovation and operational excellence through collective knowledge.',
          }
        ]} />
        <br/>
        <Image src='/images/screenshots/node.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="train" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Train
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Users train agents use browser the way you use the browser themselves. Agents observe, repeat and optimize what users do with the browser.
        </p>
        <br/>
        <Card.Group key="card-group-train" centered items={[ {
            header: 'Automated Task Execution',
            description: 'Agents learn to navigate the browser just like users, reducing the need for manual work by automating repetitive tasks.',
          }, {
            header: 'Adaptive Learning & Optimization',
            description: 'Agents observe, repeat, and optimize user actions, continuously improving efficiency based on real-world interactions.',
          }, {
            header: 'Seamless Web Automation',
            description: 'Customers can train agents to handle workflows across websites, web apps, and online services without requiring complex coding or scripting.',
          }, {
            header: 'Increased Productivity',
            description: 'By offloading routine browsing tasks to AI agents, users can focus on higher-value activities while maintaining control over their workflows.',
          }, {
            header: 'Personalized & Scalable Automation',
            description: 'The system adapts to individual user behaviors, evolving over time to enhance precision, speed, and overall performance.',
          }, {
            header: '',
            description: '',
          } ]} />
        <br/>
        <Image src='/images/screenshots/train.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="note" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Note
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Jupyter notebooks executed in safe environment. It allows prototyping new agents, experimenting with agents, generating content with agents, etc.
        </p>
        <br/>
        <Card.Group key="card-group-note" centered items={[ {
            header: 'Flexible Prototyping',
            description: 'Customers can quickly develop and test new AI agents within Jupyter notebooks, enabling rapid iteration and refinement.',
          }, {
            header: 'Safe & Scalable Experimentation',
            description: 'Running notebooks inside safe, isolated, and scalable environments for AI experimentation.',
          }, {
            header: 'Agent-Driven Content Generation',
            description: 'Users can leverage AI agents within notebooks to generate content, automate workflows, and test AI-driven interactions in real time.',
          }, {
            header: 'Seamless Integration',
            description: 'The system allows customers to experiment with agents while maintaining compatibility with existing development pipelines and tools.',
          }, {
            header: 'Enhanced Innovation & Efficiency',
            description: 'By combining Jupyter’s flexibility with Docker’s stability, customers can accelerate AI development, fine-tune models, and optimize agent behavior.',
          }, {
            header: '',
            description: '',
          } ]} />
        <br/>
        <Image src='/images/screenshots/note.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h1' textAlign='center' id="code" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Code
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Code with online code editor / web IDE with architect and coder agents that can help self-develop code of the platform. Between 30% and 70% of the code is generated to this moment.
        </p>
        <br/>
        <Card.Group key="card-group-code" centered items={[ {
            header: 'Accelerated Development',
            description: 'Customers can build and iterate faster with AI-driven assistance from architect and coder agents, reducing time spent on manual coding.',
          }, {
            header: 'Seamless Collaboration',
            description: 'The web-based IDE enables smooth teamwork between human developers and AI agents, ensuring efficiency and alignment across projects.',
          }, {
            header: 'Intelligent Code Generation',
            description: 'With 30% of the platform’s code already AI-generated, the system continuously improves and evolves, minimizing redundant work and enhancing scalability.',
          }, {
            header: 'Self-Developing Capabilities',
            description: 'AI agents assist in writing, refactoring, and optimizing code, allowing developers to focus on high-value problem-solving rather than repetitive tasks.',
          }, {
            header: 'Flexible and Scalable',
            description: 'The system adapts to customer needs, integrating with existing workflows while providing AI-powered architectural guidance for better long-term development.',
          }, {
            header: '',
            description: '',
          } ]} />
        <br/>
        <Image src='/images/screenshots/code.png' fluid bordered rounded />
        <br/>
      </Segment>

      {/*
      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="build" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Build
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Build / orgnize / assemble agentic teams with visual editor. Our architect and coder agents can continue developing your agentic teams with prompts from users.
        </p>
        <br/>
        <Card.Group key="card-group-build" centered items={[ {
            header: 'Effortless Agentic Team Building',
            description: 'Customers can easily create, organize, and manage agentic teams using a visual editor, streamlining the setup of AI-driven workflows.',
          }, {
            header: 'AI-Assisted Development',
            description: 'Architect and coder agents actively help refine and expand these teams based on user prompts, ensuring continuous improvement without manual effort.',
          }, {
            header: 'Scalability & Adaptability',
            description: 'The system grows with the customer’s needs, dynamically evolving agentic teams to handle increasingly complex tasks and integrations.',
          }, {
            header: 'User-Friendly Customization',
            description: 'A no-code/low-code visual interface makes it easy to structure and optimize AI-driven teams without requiring deep technical expertise.',
          }, {
            header: 'Seamless Automation & Execution',
            description: 'Once assembled, agentic teams work autonomously, collaborating to execute tasks efficiently and intelligently.',
          }, {
            header: '',
            description: '',
          } ]} />
        <br/>
        <Image src='/images/screenshots/build.png' fluid bordered rounded />
        <br/>
      </Segment>
      */}

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="open" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Open
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          A chat to communicate to all deployed open-source (Ollama) models and Open AI models. It can be used for testing and comparison of different LLMs.
        </p>
        <br/>
        <Card.Group key="card-group-open" centered items={[ {
            header: 'Unified AI Access',
            description: 'Customers can communicate with both open-source models (Ollama) and OpenAI models in a single chat interface, simplifying AI interaction.',
          }, {
            header: 'Seamless Testing & Comparison',
            description: 'Users can test different large language models (LLMs) side by side, evaluating their performance, accuracy, and suitability for specific tasks.',
          }, {
            header: 'Enhanced Flexibility',
            description: 'The platform allows customers to choose the best model for their needs, whether prioritizing cost, privacy, or specific capabilities.',
          }, {
            header: 'Optimized AI Workflows',
            description: 'By integrating multiple models in one interface, customers can streamline experimentation, research, and deployment without switching tools.',
          }, {
            header: 'Data-Driven Decision Making',
            description: 'Real-time insights into LLM responses help customers refine their AI strategies, improving output quality and efficiency.',
          }, {
            header: '',
            description: '',
          } ]} />
        <br/>
        <Image src='/images/screenshots/open.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="sell" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Sell
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Sell with web CRM, ERP and other apps. The apps can be controlled by the web-automator.
        </p>
        <br/>
        <Card.Group key="card-group-sell" centered items={[ {
            header: 'Seamless Sales & Operations',
            description: 'Customers can manage sales, customer relationships (CRM), enterprise processes (ERP), and other business functions within a unified web platform.',
          }, {
            header: 'AI-Driven Automation',
            description: 'The web-automator controls and optimizes app interactions, reducing manual work and ensuring smooth, automated workflows.',
          }, {
            header: 'Increased Efficiency & Productivity',
            description: 'Automated handling of CRM, ERP, and other apps allows teams to focus on strategy and customer engagement rather than administrative tasks.',
          }, {
            header: 'Scalability & Adaptability',
            description: 'The system grows with business needs, integrating with existing tools while enhancing operational flexibility.',
          }, {
            header: 'Real-Time Insights & Decision-Making',
            description: 'AI-powered automation ensures businesses can act on data quickly, improving sales and operational efficiency.',
          }, {
            header: '',
            description: '',
          } ]} />
        <br/>
        <Image src='/images/screenshots/sell.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="ecommerce" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          E-commerce
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Create fully tailored online stores with complete control over products, orders, payments, and customer experiences. Built on Medusa.js, it offers a modular, headless architecture that enables rapid customization and seamless integration with any frontend. Agents can automate catalog management, price updates, order fulfillment, inventory tracking, customer support workflows, and dynamic promotional campaigns — helping businesses scale faster while reducing manual overhead.
        </p>
        <br/>
          <Card.Group key="card-group-ecommerce" centered items={[
            {
              header: 'Fully Customizable Online Stores',
              description: 'Design unique storefronts and customer journeys with complete flexibility, ensuring a perfect match to brand vision and business needs.',
            }, {
              header: 'Agent-Driven Store Automation',
              description: 'Automate product catalog updates, inventory management, order fulfillment, and customer service workflows to streamline operations.',
            }, {
              header: 'Increased Operational Efficiency',
              description: 'Free up team resources by automating repetitive tasks, enabling a stronger focus on strategic growth and customer engagement.',
            }, {
              header: 'Scalable and Modular Commerce Infrastructure',
              description: 'Expand product offerings, integrate new payment systems, and open new sales channels without replatforming or heavy technical overhead.',
            }, {
              header: 'Real-Time Promotions and Dynamic Pricing',
              description: 'Use intelligent agents to launch campaigns, adjust prices, and personalize offers instantly based on customer behavior and market trends.',
            }, {
              header: 'Cost-Effective, Open-Source Innovation',
              description: 'Leverage the power of Medusa.js to grow and innovate without costly vendor lock-ins, reducing total cost of ownership over time.',
            }
          ]} />
        <br/>
        <Image src='/images/screenshots/ecommerce.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="storefront" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Storefront
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Create fully customizable, high-performance online shopping experiences with complete control over design, checkout flows, product displays, and customer interactions. Agents can automate catalog updates, personalize shopping experiences, optimize checkout processes, launch targeted promotions, and monitor storefront performance in real-time — helping businesses boost conversion rates, improve user satisfaction, and scale effortlessly.
        </p>
        <br/>
          <Card.Group key="card-group-storefront" centered items={[
            {
              header: 'Fully Customizable Storefronts',
              description: 'Create unique, branded shopping experiences with complete control over design, checkout flows, and customer engagement.',
            }, {
              header: 'Agent-Driven Content and Catalog Automation',
              description: 'Automate product updates, pricing changes, and promotional content across your storefront to keep everything fresh and dynamic.',
            }, {
              header: 'Increased Conversion and User Engagement',
              description: 'Deliver personalized shopping journeys, optimize checkout processes, and reduce cart abandonment with intelligent automation.',
            }, {
              header: 'Scalable and Flexible Store Architecture',
              description: 'Grow your storefront easily by adding new products, regions, and features without replatforming or disrupting the customer experience.',
            }, {
              header: 'Real-Time Store Performance Monitoring',
              description: 'Track load times, customer interactions, and storefront health in real-time, ensuring a seamless and responsive shopping experience.',
            }, {
              header: 'Cost-Effective Growth and Innovation',
              description: 'Leverage open-source flexibility to innovate faster, reduce tech debt, and adapt your storefront to changing market demands.',
            }
          ]} />
        <br/>
        <Image src='/images/screenshots/storefront.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="bank" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Bank
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Efficiently manage, automate, and scale core banking and digital financial services. Built on the robust foundations of Apache Fineract and Mifos, it offers an open, modular, and extensible platform for delivering loans, savings, payments, and a broad range of financial products. Native agents automate key banking operations, streamline internal processes, and enhance customer service experiences.
        </p>
        <br/>
          <Card.Group key="card-group-bank" centered items={[
            {
              header: 'Unified Core Banking Management',
              description: 'Easily manage loans, savings, customer accounts, transactions, and financial services within a powerful, open-source banking platform.',
            }, {
              header: 'Agent-Powered Banking Automation',
              description: 'Automate customer service, onboarding, loan processing, and account management through intelligent agent-driven workflows.',
            }, {
              header: 'Increased Operational Efficiency',
              description: 'Streamline internal banking processes, reduce manual workloads, and accelerate service delivery with minimal overhead.',
            }, {
              header: 'Scalable and Modular Infrastructure',
              description: 'Grow seamlessly from microfinance to full-scale digital banking, leveraging a flexible architecture that adapts to evolving business needs.',
            }, {
              header: 'Real-Time Customer Support and Operations',
              description: 'Enable real-time interactions, updates, and decision-making with instant agent-triggered workflows and dynamic data processing.',
            }, {
              header: 'Cost-Effective Financial Innovation',
              description: 'Leverage open-source frameworks to innovate faster, reduce development costs, and customize banking services without vendor lock-in.',
            }
          ]} />
        <br/>
        <Image src='/images/screenshots/bank.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="blockchain" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Blockchain
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Build, integrate, and scale blockchain-based applications across distributed networks, combining smart contracts, decentralized databases, and event-driven messaging. Built on top of Hyperledger FireFly and Hyperledger Fabric, this feature provides enterprise-grade tools for managing both private and public blockchain interactions — with seamless integration to Ethereum and other major blockchain platforms. With an embedded agent, users can automate complex blockchain workflows, enabling end-to-end orchestration of transactions, smart contract interactions, and cross-chain processes.
        </p>
        <br/>
          <Card.Group key="card-group-blockchain" centered items={[
            {
              header: 'Unified Blockchain Application Management',
              description: 'Build, deploy, and manage blockchain apps across distributed networks, databases, and messaging systems from a single platform.',
            }, {
              header: 'Agent-Driven Workflow Automation',
              description: 'Automate smart contract execution, blockchain transactions, and multi-party processes through intelligent, event-driven agents.',
            }, {
              header: 'Secure and Private Blockchain Networks',
              description: 'Create enterprise-grade, permissioned blockchain networks with Hyperledger Fabric to ensure data privacy and trusted collaboration.',
            }, {
              header: 'Cross-Chain and Ecosystem Integration',
              description: 'Seamlessly connect to Ethereum and other blockchain platforms, enabling flexible, future-proof decentralized application development.',
            }, {
              header: 'Scalable and Modular Blockchain Architecture',
              description: 'Expand applications and networks easily with modular components and flexible orchestration, supporting growth without rework.',
            }, {
              header: 'Reduced Development Complexity and Costs',
              description: 'Simplify blockchain app development with pre-integrated orchestration tools and automation, cutting time-to-market and operational overhead.',
            }
          ]} />
        <br/>
        <Image src='/images/screenshots/blockchain.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="contract" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Smart Contract
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Execute and automate smart business agreements. Contract enables users to design, execute, and manage smart contracts that automate and enforce business logic across multiple parties on a secure, permissioned blockchain network. Built on Hyperledger Fabric, it offers enterprise-grade reliability, privacy, and scalability for digital agreements. Agents help drafting codechains and ensure seamless performance by continuously validating contract conditions, managing renewals or expirations, and triggering alerts or remediation actions when terms are violated or fulfilled.
        </p>
        <br/>
          <Card.Group key="card-group-contract" centered items={[
            {
              header: 'Smart Contract Creation and Deployment',
              description: 'Easily generate, customize, and deploy smart contracts on a secure, permissioned blockchain network, streamlining business agreement setup.',
            }, {
              header: 'Agent-Driven Automation and Enforcement',
              description: 'Automate contract execution, monitor compliance, and enforce terms through intelligent, event-driven agents that reduce manual intervention.',
            }, {
              header: 'Real-Time Contract Monitoring',
              description: 'Track contract performance, detect breaches or completions instantly, and trigger corrective actions without delays or human error.',
            }, {
              header: 'Scalable and Secure Contract Management',
              description: 'Manage thousands of concurrent contracts with Hyperledger Fabric’s permissioned blockchain, ensuring privacy, scalability, and reliability.',
            }, {
              header: 'Proactive Lifecycle Management',
              description: 'Automate contract renewals, amendments, and expirations by monitoring lifecycle events and engaging stakeholders at critical moments.',
            }, {
              header: 'Reduced Legal and Operational Overhead',
              description: 'Lower costs and risks by replacing manual audits and enforcement with transparent, verifiable smart contract execution and immutable blockchain records.',
            }
          ]} />
        <br/>
        <Image src='/images/screenshots/contract.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="synthetic" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Synthetic UI
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Experience dynamically generated, programmatically controlled interfaces that adapt to specific workflows and needs. Agents can synthesize custom web UIs or UX flows on demand, tailored to individual users or business processes, automate interactions across multiple apps, personalize layouts and actions in real-time, and continuously optimize experiences based on behavior and goals — enabling a truly adaptive, intelligent front-end experience.
        </p>
        <br/>
          <Card.Group key="card-group-synthetic" centered items={[
            {
              header: 'Dynamic Interface Generation',
              description: 'Agents synthesize custom web UIs and user experiences on demand, tailored to personal workflows and business requirements.',
            }, {
              header: 'Automated Multi-App Interaction',
              description: 'Programmatically control actions across multiple apps and services, seamlessly navigating, filling forms, clicking buttons, and more.',
            }, {
              header: 'Real-Time UI Personalization',
              description: 'Adapt layouts, components, and actions dynamically based on user behavior, preferences, and changing business logic.',
            }, {
              header: 'Adaptive Experience Optimization',
              description: 'Continuously learn and optimize UI and UX flows to maximize task completion rates, engagement, and overall productivity.',
            }, {
              header: 'Faster Deployment with Lower Overhead',
              description: 'Reduce development time and costs by automating UI creation and updates without needing traditional design and engineering cycles.',
            }, {
              header: 'Seamless Scalability Across Systems',
              description: 'Unify fragmented experiences across multiple apps and systems into one coherent, adaptive interface, scaling with user and business growth.',
            }
          ]} />
        <br/>
        <Image src='/images/screenshots/synthetic.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="api" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          API
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          The API allows programmatic access to the platform for chat, web page publishing, emails, and web app requests.
        </p>
        <br/>
        <Card.Group key="card-group-api" centered items={[ {
            header: 'Seamless Platform Integration',
            description: 'The API enables businesses to programmatically interact with the platform, ensuring smooth integration with existing systems and workflows.',
          }, {
            header: 'Automated Chat & Communication',
            description: 'Customers can leverage the API to facilitate automated messaging, AI-driven chat interactions, and email handling, improving engagement and response efficiency.',
          }, {
            header: 'Dynamic Web Publishing',
            description: 'The API allows businesses to publish and update web pages effortlessly, ensuring real-time content management and adaptability.',
          }, {
            header: 'Efficient Web App Requests',
            description: 'Users can automate and streamline web app interactions, reducing manual work and enabling faster execution of tasks.',
          }, {
            header: 'Scalable & Customizable',
            description: 'The API provides flexibility for businesses to tailor automation, communication, and content delivery to their specific needs, enhancing efficiency and scalability.',
          }, {
            header: '',
            description: '',
          } ]} />
        <br/>
        <Image src='/images/screenshots/api.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="cli" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Command-line Interface (CLI)
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          A command line tool (CLI) to access our API programmatically. The tool can be used from terminal or from the Jupyter notebooks.
        </p>
        <br/>
        <Card.Group key="card-group-cli" centered items={[ {
            header: 'Effortless API Access',
            description: 'The command-line tool (CLI) provides a simple and efficient way to interact with the platform’s API directly from the terminal or Jupyter notebooks.',
          }, {
            header: 'Automation & Scripting',
            description: 'Users can automate workflows, trigger API actions, and integrate platform functionalities into their scripts and development pipelines.',
          }, {
            header: 'Flexible & Developer-Friendly',
            description: 'The CLI allows developers, data scientists, and engineers to interact with the platform in a code-friendly environment without needing a graphical interface.',
          }, {
            header: 'Seamless Jupyter Notebook Integration',
            description: 'Customers can use the CLI within Jupyter notebooks, enabling AI-driven experimentation, data analysis, and workflow automation.',
          }, {
            header: 'Scalable & Efficient Operations',
            description: 'With a lightweight and command-based approach, businesses can execute tasks quickly, improving productivity and reducing reliance on manual operations.',
          }, {
            header: '',
            description: '',
          } ]} />
        <br/>
        <Image src='/images/screenshots/cli.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="mobile" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Mobile App
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          A mobile app (iOS, Android, web) with a chat that allows to communicate to agents and see the history of messages.
        </p>
        <br/>
        <Card.Group key="card-group-mobile" centered items={[ {
            header: 'On-the-Go Agent Interaction',
            description: 'Customers can communicate with AI agents anytime, anywhere through a mobile app available on iOS, Android, and the web.',
          }, {
            header: 'Seamless Message History Access',
            description: 'Users can view past conversations, ensuring continuity and context-aware interactions across devices.',
          }, {
            header: 'Real-Time AI Assistance',
            description: 'The chat enables instant responses from AI agents, allowing for quick decision-making, task execution, and workflow automation.',
          }, {
            header: 'Cross-Platform Synchronization',
            description: 'Conversations are synced across mobile and web, ensuring a unified experience whether on a smartphone, tablet, or desktop.',
          }, {
            header: 'Enhanced Productivity & Accessibility',
            description: 'Businesses and individuals can stay connected to their AI-powered workflows, making it easier to manage tasks, get insights, and automate actions on the go.',
          }, {
            header: '',
            description: '',
          } ]} />
        <br/>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header as='h4' textAlign='center'>
                Chats
              </Header>
              <Image src='/images/screenshots/mobile.png' size='medium' centered bordered rounded />
            </Grid.Column>
            <Grid.Column>
              <Header as='h4' textAlign='center'>
                Chat
              </Header>
              <Image src='/images/screenshots/mobile1.png' size='medium' centered bordered rounded />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="desktop" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Desktop App
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          A desktop app (macOS, Linux, Windown) with a chat that allows to communicate to agents and see the history of messages.
        </p>
        <br/>
        <Card.Group key="card-group-desktop" centered items={[ {
            header: 'Seamless Multi-Platform Access',
            description: 'The desktop app is available for macOS, Linux, and Windows, ensuring users can interact with AI agents on their preferred operating system.',
          }, {
            header: 'Persistent Chat History',
            description: 'Customers can view and retrieve past conversations, maintaining context and continuity in their interactions with agents.',
          }, {
            header: 'Real-Time AI Assistance',
            description: 'The chat enables instant communication with AI agents, allowing users to execute tasks, get insights, and automate workflows efficiently.',
          }, {
            header: 'Optimized for Productivity',
            description: 'A dedicated desktop experience provides better performance, offline capabilities, and smoother multitasking compared to web-based chat solutions.',
          }, {
            header: 'Cross-Device Synchronization',
            description: 'Conversations sync across the desktop, mobile, and web apps, ensuring a unified experience across all platforms.',
          }, {
            header: '',
            description: '',
          } ]} />
        <br/>
        <Image src='/images/screenshots/desktop.png' centered bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h1' textAlign='center' id="distributed" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Distributed System
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Use a distributed system that allows to connect people and agents running on different machines (network nodes) through direct server-to-server connection. The messages are stored only on network nodes that participate in the communication channel and not shared with third parties. Share agents from your node to help your friends, colleagues and customers.
        </p>
        <br/>
        <Card.Group key="card-group-distributed" centered items={[ {
          header: 'Privacy-First Communication',
          description: 'Messages are only stored on participating nodes and never shared with third parties, ensuring maximum privacy and data control for users.',
        }, {
          header: 'Decentralized & Resilient Architecture',
          description: 'Direct server-to-server connections remove dependency on central servers, increasing reliability and eliminating single points of failure.',
        }, {
          header: 'Agent Sharing Made Easy',
          description: 'Easily share agents hosted on your node with friends, colleagues, or customers to support collaboration and extend assistance across networks.',
        }, {
          header: 'Secure & Localized Data Control',
          description: 'Data remains within the communication participants’ nodes, giving users sovereignty over their data and simplifying compliance with privacy standards.',
        }, {
          header: 'Scalable Peer-to-Peer Collaboration',
          description: 'The distributed model supports seamless growth, enabling direct communication between nodes without the need for centralized coordination.',
        }, {
          header: 'Custom Network Participation',
          description: 'Users can choose which agents and nodes to interact with, allowing for fully customizable, trusted communication environments.',
        } ]} />
        <br/>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header as='h4' textAlign='center'>
                Server A
              </Header>
              <Image src='/images/screenshots/distributed-dev.png' fluid bordered rounded />
            </Grid.Column>
            <Grid.Column>
              <Header as='h4' textAlign='center'>
                Server B
              </Header>
              <Image src='/images/screenshots/distributed-ops.png' fluid bordered rounded />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h1' textAlign='center' id="bridge" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Social Bridge
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Build a bridge between Selfdev and social networks and messangers such as WhatsApp, Slack, Discord, Telegram, Microsoft Teams, VK, XMPP, Twitch, IRC, MatterMost, Matrix, RocketChat, Keybase, NextCloud, Mumble, Gitter, Ssh-chat, Zulip, and more with REST API.
        </p>
        <p style={{ fontSize: '1em', textAlign: 'center' }}>
          Also, Discourse, Facebook Messanger, Minecraft, Reddit, MatterAMXX, Vintage Storey, Ultima Online Emulator, Teamspeak.
        </p>
        <br/>
        <Card.Group key="card-group-bridge" centered items={[ {
          header: 'Unified Communication Across Platforms',
          description: 'Connect Selfdev with messaging apps like WhatsApp, Slack, Discord, and more, enabling seamless cross-platform communication without leaving preferred environments.',
        }, {
          header: 'Maximized Reach and Engagement',
          description: 'Reach users on the platforms they already use, increasing accessibility and engagement across social networks and chat applications.',
        }, {
          header: 'Automation and AI Anywhere',
          description: 'Deploy Selfdev’s intelligent agents and automation features into existing messaging ecosystems to enhance productivity and responsiveness.',
        }, {
          header: 'Custom Workflows Through REST API',
          description: 'Use the flexible REST API to build tailored workflows, bots, and integrations suited to your organization’s unique needs and services.',
        }, {
          header: 'Cost and Time Efficiency',
          description: 'Avoid building one-off integrations for each platform—use a single bridge to deploy agents across multiple channels and save on dev time.',
        }, {
          header: 'Future-Proof & Extensible Integration',
          description: 'Support a growing list of platforms with a single, adaptable API interface, ensuring long-term flexibility as new communication tools emerge.',
        } ]} />
        <br/>
        <Image src='/images/screenshots/bridge.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h1' textAlign='center' id="phone" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Phone
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Communicate with agents on phone calls and message using Voice-over-IP / SIP protocols, speech-to-text and text-to-speech. Agnets can answer on a call to a regular phone number.
        </p>
        <br/>
        <Card.Group key="card-group-phone" centered items={[ {
            header: 'Natural, Human-Like Communication',
            description: 'Leverage speech-to-text and text-to-speech to enable agents that converse fluently over phone or message—offering human-like interactions for support, sales, or onboarding.',
          }, {
            header: 'Always-On, Scalable Voice Support',
            description: 'Deploy agents that can answer phone calls via VoIP/SIP any time of day—scaling communication without increasing staffing costs.',
          }, {
            header: 'Multi-Channel Agent Reachability',
            description: 'Agents can communicate through regular phone numbers and messaging platforms, offering customers familiar and convenient access points.',
          }, {
            header: 'Seamless Backend Integration',
            description: 'Agents can query APIs and databases during calls to check account details, answer questions, or complete transactions in real-time.',
          }, {
            header: 'Customizable Voice Personas',
            description: 'Define unique voices, tones, and behaviors to create branded agent personas that resonate with your users or customers.',
          }, {
            header: 'Call Logging and Conversation Analysis',
            description: 'All interactions are transcribed and logged, enabling post-call analysis, searchable history, and ongoing performance improvements.',
          } ]} />
        <br/>
        <Image src='/images/screenshots/phone.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h1' textAlign='center' id="vr" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Virtual Reality & Augmented Reality
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Chat to agents in virtual or augmented reality. The 3D-models for virtual agents can be generated or manually created in glTF format compatible with web. Each VR agent can communicate using text or voice.
        </p>
        <br/>
        <Card.Group key="card-group-vr" centered items={[ {
          header: 'Immersive Interaction',
          description: 'Engaging with agents in virtual or augmented reality offers a deeply immersive experience, enhancing communication and making interactions more memorable.',
        }, {
          header: 'Personalized & Human-like Assistance',
          description: 'Custom or auto-generated 3D agents allow for branded, relatable support experiences that resonate with users on a personal level.',
        }, {
          header: 'Flexible Communication Modes',
          description: 'Support for both text and voice interactions ensures accessibility and caters to a wide range of user preferences.',
        }, {
          header: 'Web-Based VR Accessibility',
          description: 'Using the glTF format enables VR experiences to be delivered directly through the web, removing the need for specialized apps and making access simple and instant.',
        }, {
          header: 'Futuristic & Innovative Brand Perception',
          description: 'Offering VR/AR agent interaction sets the brand apart as a forward-thinking innovator, improving customer perception and engagement.',
        }, {
          header: 'Customizable and Scalable Experiences',
          description: 'glTF support enables easy customization and scalability of 3D agent designs, allowing businesses to adapt quickly to new use cases.',
        } ]} />
        <br/>
        <Image src='/images/screenshots/vr.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h1' textAlign='center' id="quantum" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
            Quantum Computing
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          The Quantum Computing agents empowers users to execute quantum algorithms on both simulators and real quantum hardware from providers like IBM. It supports code generation and seamless conversion between various quantum programming languages and libraries, including OpenQASM, Qiskit, Cirq, Q#, and more. Users can explore and receive expert-level insights into a wide range of quantum topics such as hardware, software, algorithms, error correction, communication, sensing, entrepreneurship, and research. An agentic AI system enhances this capability by autonomously designing, testing, and optimizing quantum algorithms, translating between quantum languages, refining circuits, benchmarking performance, and troubleshooting errors.
        </p>
        <br/>
          <Card.Group key="card-group-quantum" centered items={[ {
            header: 'Access to Cutting-Edge Technology',
            description: 'Run quantum algorithms on real quantum hardware and advanced simulators with ease, unlocking the full potential of next-generation computing.',
          }, {
            header: 'Cross-Platform Compatibility',
            description: 'Convert quantum code across major languages and libraries like Qiskit, Cirq, Q#, and more—enhancing interoperability and collaboration.',
          }, {
            header: 'Accelerated Development',
            description: 'Agentic AI tools streamline the design, testing, and optimization of quantum algorithms, drastically reducing development time.',
          }, {
            header: 'Scalable Simulation',
            description: 'Simulate circuits with tens to thousands of qubits using web-based or cloud simulators, empowering experimentation beyond hardware limits.',
          }, {
            header: 'Expert-Level Guidance',
            description: 'Get detailed answers and insights on hardware, algorithms, error correction, and more—supporting both learning and professional research.',
          }, {
            header: 'Innovation Support',
            description: 'Enable rapid prototyping, code discovery, and literature exploration for researchers and startups driving the future of quantum computing.',
          } ]} />
        <br/>
        <Image src='/images/screenshots/quantum.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h1' textAlign='center' id="docs" dividing>
          <a href="#toc">
            <Icon link name='arrow up' size='small' style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </a>
          Docs
          <Image src='/images/logo192.png' size='mini' floated='right' fluid />
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Learn, build, and succeed with clear, actionable guidance. Agents can automatically load documentation into Retrieval-Augmented Generation (RAG) systems, allowing users to ask any question and instantly receive contextually accurate answers. They can also update content dynamically, monitor usage patterns to surface the most relevant information, and personalize documentation experiences based on user needs and goals — making knowledge access faster, smarter, and more interactive.
        </p>
        <br/>
          <Card.Group key="card-group-docs" centered items={[
            {
              header: 'Instant, Searchable Knowledge',
              description: 'Agents load documentation into intelligent systems, allowing users to instantly search and retrieve accurate, context-rich answers to any question.',
            }, {
              header: 'Personalized Learning Paths',
              description: 'Tailor documentation delivery based on user roles, experience levels, and goals to create a more relevant and effective learning experience.',
            }, {
              header: 'Continuous Content Updates',
              description: 'Keep documentation fresh and reliable by automatically monitoring and updating content within RAG systems as products and processes evolve.',
            }, {
              header: 'Enhanced Productivity and Focus',
              description: 'Reduce time spent digging through manuals by providing direct, actionable guidance exactly when and where users need it.',
            }, {
              header: 'Smarter Onboarding and Training',
              description: 'Accelerate user onboarding and ongoing education by making documentation interactive, responsive, and easy to navigate with natural prompts.',
            }, {
              header: 'Scalable Knowledge Management',
              description: 'Turn static documents into dynamic, evolving knowledge bases that grow and improve alongside your organization’s needs.',
            }
          ]} />
        <br/>
        <Image src='/images/screenshots/docs.png' fluid bordered rounded />
        <br/>
      </Segment>

    </Container>
    <br />
    <br />

    <Footer />
  </>
)

export default Product
