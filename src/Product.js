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
  Divider,
} from 'semantic-ui-react'
import Footer from './components/Footer'

const Product = () => (
  <>
    <br />
    <Container>
      <Segment padded textAlign="center" inverted color='blue'>
        <Header as="h1">
          AZ1 Product
        </Header>
      </Segment>
    </Container>
    <br/>

    <Container>
      <Segment padded textAlign="center">
        <Header as="h2">
          Product Description
        </Header>
        <br />
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          An Agent-as-a-Service platform with web, mobile and desktop applications.
        </p>
        <Divider />
        <Header as="h2">
          Features and Functions
        </Header>
        <ol style={{ textAlign: 'left', fontSize: '1.4em', lineHeight: '1.5' }}>
          <li>
            <a href="#chat">
              <b>Chat</b> — communicate to agents and agentic teams.
            </a>
          </li>
          <li>
            <a href="#talk">
              <b>Talk</b> — include humans, agents and human-agentic collaborative teams to your workflows.
            </a>
          </li>
          <li>
            <a href="#meet">
              <b>Meet</b> — video conference with humans and agents.
            </a>
          </li>
          <li>
            <a href="#hive">
              <b>Hive</b> — create and deploy agentic teams.
            </a>
          </li>
          <li>
            <a href="#code">
              <b>Code</b> — program using web IDE and architect and coder agents.
            </a>
          </li>
          <li>
            <a href="#build">
              <b>Build</b> — build and organize agentic teams with visual editor.
            </a>
          </li>
          <li>
            <a href="#open">
              <b>Open</b> — communicate with deployed open-source and OpenAI models.
            </a>
          </li>
          <li>
            <a href="#note">
              <b>Note</b> — prototype and experiment with agents using Jupyter notebooks.
            </a>
          </li>
          <li>
            <a href="#sell">
              <b>Sell</b> — manage sales and operations with web CRM and ERP apps.
            </a>
          </li>
          <li>
            <a href="#train">
              <b>Train</b> — train agents by demonstrating browser interactions.
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
        </ol>
      </Segment>
    </Container>

    <Container>
      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="chat" dividing>
          Chat
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Chat with agents and agentic teams. Interact with agents through the Synthetic UI on all-in-one platform.
        </p>
        <br />
        <Card.Group key="card-group-chat" centered items={[ {
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
        <Image src='/images/screenshots/chat.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="talk" dividing>
          Talk
          <br />
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Include humans, agents and human-agentic collaborative teams to your workflows. Bridge human expertise with AI intelligence, making workflows smarter and more effective.
        </p>
        <br />
        <Card.Group key="card-group-talk" centered items={[ {
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
        <Image src='/images/screenshots/talk.png' fluid bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h1' textAlign='center' id="meet" dividing>
          Meet
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
          placeholder='/images/screenshots/meet.png'
          url='/images/screenshots/meet.mp4'
        />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h1' textAlign='center' id="hive" dividing>
          Hive
        </Header>
        <p style={{ fontSize: '1.6em', textAlign: 'center' }}>
          Create and deploy virtual agents using JSON format. There are 3 types of agents: Chat, RAG and Notebook. The agents can talk in private conversations or join rooms to communicate with group conosisting of humans and agents.
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
        <Header as='h1' textAlign='center' id="code" dividing>
          Code
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

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="build" dividing>
          Build
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

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="open" dividing>
          Open
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
        <Header as='h2' textAlign='center' id="note" dividing>
          Note
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
        <Header as='h2' textAlign='center' id="sell" dividing>
          Sell
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
        <Header as='h2' textAlign='center' id="train" dividing>
          Train
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
        <Header as='h2' textAlign='center' id="api" dividing>
          API
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
          Command-line Interface (CLI)
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
          Mobile App
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
        <Image src='/images/screenshots/mobile.png' size='medium' centered bordered rounded />
        <br/>
      </Segment>

      <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
        <Header as='h2' textAlign='center' id="desktop" dividing>
          Desktop App
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
    </Container>
    <br />
    <br />

    <Footer />
  </>
)

export default Product
