/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, {  useState } from 'react'
import { InView } from 'react-intersection-observer'
import { Link, useNavigate } from 'react-router-dom'
import {
  Button,
  Container,
  Grid,
  Header,
  HeaderSubheader,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  CardGroup,
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  Divider,
} from 'semantic-ui-react'
import conf from './conf'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

const HomepageHeading = ({ mobile, available, logIn }) => {
  return (
    <div>
      <div style={{
        position: 'realtive',
      }}>
        <Image alt="logo" style={{
            height: '800px',
            zIndex: 1,
            position: 'relative',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.2))',
          }}
          src='/images/human-agent-network-1200x800.png'
          centered
        />
        <div style={{
            zIndex: 2,
            position: 'absolute',
            textAlign: 'center',
            top: '8em',
          }}
        >
          <Container fluid textAlign='center' style={{ padding: '1em 5em' }}>
            <Header
              as='h1'
              style={{
                fontSize: mobile ? '3em' : '6em',
                fontWeight: 'bold',
                color: 'rgb(35,68,123)',
              }}
            >
              Supercharge Your Productivity with AZ1
            </Header>
            <Header
              as='h3'
              style={{
                fontSize: mobile ? '1.6em' : '3.2em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.25em' : '0.5em',
                marginBottom: '1em',
                color: 'gray',
              }}
            >
              Agents-as-a-Service plaform for businesses to effortlessly deploy collaborative teams of 24/7 AI agents.
            </Header>
            {/* TODO: Make the button bigger */}
            <Button
              style={{
                // marginTop: '1em',
                marginBottom: '1em',
              }}
              primary size='massive' onClick={() => logIn(false)}
            >
              { available ? "Let's Go" : 'Join a Whitelist' }
              <Icon name='right arrow' />
            </Button>
            <Header
              as='h2'
              style={{
                fontSize: mobile ? '1.6em' : '3em',
                fontWeight: 'bold',
                marginTop: mobile ? '0.25em' : '0.5em',
                marginBottom: '2em',
                color: 'rgb(35,68,123)',
              }}
            >
              Understand | Automate | Optimize
            </Header>
            <br />
          </Container>
        </div>
      </div>
    </div>
  )
}

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
  available: PropTypes.bool.isRequired,
  logIn: PropTypes.func.isRequired,
}

const DesktopContainer = ({ children, available, logIn }) => {
  const [ fixed, setFixed ] = useState(false)

  return (
    <Media greaterThan='mobile'>
      <InView onChange={(inView) => setFixed(!inView)}>
        <Segment
          textAlign='center'
          style={{ minHeight: 700, padding: '1em 0em' }}
        >
          <Menu
            fixed={fixed ? 'top' : null}
            pointing={!fixed}
            secondary={!fixed}
            size='large'
          >
            <Container>
              <Menu.Item active>
                <Image avatar alt="logo" style={{ height: '60px', width: '60px' }} src='/images/az1-logomark.png' />
              </Menu.Item>
              <Menu.Item position='right'>
                { available ? (
                  <>
                    <Button as='a' onClick={() => logIn(true)} >
                      Log In
                    </Button>
                    <Button as='a' primary={fixed} style={{ marginLeft: '0.5em' }} onClick={() => logIn(false)} >
                      Sign up
                    </Button>
                  </>
                ) : (
                  <Button onClick={logIn}>
                    Join a Whitelist
                  </Button>
                )}
              </Menu.Item>
            </Container>
          </Menu>
          <HomepageHeading available={available} logIn={logIn}/>
        </Segment>
      </InView>

      {children}
    </Media>
  )
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
  available: PropTypes.bool.isRequired,
  logIn: PropTypes.func.isRequired,
}

const MobileContainer = ({ children, available, logIn }) => {
  const [ sidebarOpened, setSidebarOpened ] = useState(false)

  return (
    <Media as={Sidebar.Pushable} at='mobile'>
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation='overlay'
          onHide={() => setSidebarOpened(false)}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item active>
            <Link to='/'>Home</Link>
          </Menu.Item>
          { available ? (
            <>
              <Menu.Item as='a' onClick={() => logIn(true)}>
                Log In
              </Menu.Item>
              <Menu.Item as='a' onClick={() => logIn(false)}>
                Sign up
              </Menu.Item>
            </>
          ) : (
            <Menu.Item onClick={() => logIn(false)}>
              { available ? 'Get Started' : 'Join a Whitelist' }
            </Menu.Item>
          )}
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu pointing secondary size='large'>
                <Menu.Item onClick={() => setSidebarOpened(true)}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  { available ? (
                    <>
                      <Button as='a' onClick={() => logIn(true)}>
                        { available ? 'Log In' : 'Join a Whilelist' }
                      </Button>
                      <Button as='a' style={{ marginLeft: '0.5em' }} onClick={() => logIn(false)}>
                        { available ? 'Sign up': 'Join a Whitelist' }
                      </Button>
                    </>
                  ) : (
                    <Button onClick={logIn}>
                      Join a Whitelist
                    </Button>
                  ) }
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile available={available} logIn={logIn}/>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Media>
  )
}

MobileContainer.propTypes = {
  children: PropTypes.node,
  available: PropTypes.bool.isRequired,
  logIn: PropTypes.func.isRequired,
}

const ResponsiveContainer = ({ children, available, logIn }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer available={available} logIn={logIn}>{children}</DesktopContainer>
    <MobileContainer available={available} logIn={logIn}>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
  available: PropTypes.bool,
  logIn: PropTypes.func,
}

const HomepageLayout = () => {
  const navigate = useNavigate()
  const [available, setAvailable] = useState(true)

  const logIn = (openLogin) => {
    if (available) {
      // navigate('/chat')
      if (openLogin) {
        navigate('/login')
      } else {
        navigate('/signup')
      }
    } else {
      console.log('navigate to interestForm')
      window.open(conf.interestForm.url, '_blank')
    }
  }


  return (
    <ResponsiveContainer logIn={logIn} available={available}>
      <Container>
        {/*
        <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
          <Header as='h1' textAlign='center'>
            Chat
            <Divider />
            <HeaderSubheader>
              Chat with agents and agentic teams. Interact with agents through the Synthetic UI on all-in-one platform.
            </HeaderSubheader>
          </Header>
          <br/>
          <Image src='/images/screenshots/chat.png' fluid bordered rounded />
          <br/>
          <CardGroup>
            <Card>
              <CardContent>
                <CardHeader>
                  Hyper-Personalized Experiences
                </CardHeader>
                <CardDescription>
                  Customers get UI elements (dashboards, forms, graphs, documents) tailored in real time to their specific needs and context, eliminating the friction of rigid interfaces.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <CardHeader>
                  Intelligent Automation & Agentic Assistance
                </CardHeader>
                <CardDescription>
                  Users interact with AI agents that work proactively, automating tasks, surfacing insights, and adapting to their goals without manual setup.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <CardHeader>
                  All-in-One Platform
                </CardHeader>
                <CardDescription>
                  A self-developing, self-selling, and self-funding ecosystem means minimal effort on the customer’s part to maintain or scale the system.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <CardHeader>
                  Effortless Integration
                </CardHeader>
                <CardDescription>
                  The agents work inside the customer’s existing tools (e.g., Salesforce), ensuring a seamless experience without switching platforms.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <CardHeader>
                  Continuous Optimization
                </CardHeader>
                <CardDescription>
                  The system evolves dynamically, ensuring that customers always have the most effective and relevant UI for their needs.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <CardHeader>
                </CardHeader>
                <CardDescription>
                </CardDescription>
              </CardContent>
            </Card>
          </CardGroup>
        </Segment>

        <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
          <Header as='h1' textAlign='center'>
            Code
            <Divider />
            <HeaderSubheader>
              Code with online code editor / web IDE with architect and coder agents that can help self-develop code of the platform. Between 30% and 70% of the code is generated to this moment.
            </HeaderSubheader>
          </Header>
          <br/>
          <Image src='/images/screenshots/code.png' fluid bordered rounded />
          <br/>
          <CardGroup>
            <Card>
              <CardContent>
                <CardHeader>
                </CardHeader>
                <CardDescription>
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <CardHeader>
                </CardHeader>
                <CardDescription>
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <CardHeader>
                </CardHeader>
                <CardDescription>
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <CardHeader>
                </CardHeader>
                <CardDescription>
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <CardHeader>
                </CardHeader>
                <CardDescription>
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <CardHeader>
                </CardHeader>
                <CardDescription>
                </CardDescription>
              </CardContent>
            </Card>
          </CardGroup>
          <CardGroup key="card-group-code" items={[ {
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
        </Segment>

        <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
          <Header as='h1' textAlign='center'>
            Build
            <Divider />
            <HeaderSubheader>
              Build / orgnize / assemble agentic teams with visual editor. Our architect and coder agents can continue developing your agentic teams with prompts from users.
            </HeaderSubheader>
          </Header>
          <br/>
          <Image src='/images/screenshots/build.png' fluid bordered rounded />
          <br/>
          <CardGroup key="card-group-build" items={[ {
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
        </Segment>

        <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
          <Header as='h1' textAlign='center'>
            Open
            <Divider />
            <HeaderSubheader>
              A chat to communicate to all deployed open-source (Ollama) models and Open AI models. It can be used for testing and comparison of different LLMs.
            </HeaderSubheader>
          </Header>
          <br/>
          <Image src='/images/screenshots/open.png' fluid bordered rounded />
          <br/>
          <CardGroup key="card-group-open" items={[ {
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
        </Segment>

        <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
          <Header as='h1' textAlign='center'>
            Note
            <Divider />
            <HeaderSubheader>
              Jupyter notebooks executed in safe environment. It allows prototyping new agents, experimenting with agents, generating content with agents, etc.
            </HeaderSubheader>
          </Header>
          <br/>
          <Image src='/images/screenshots/note.png' fluid bordered rounded />
          <br/>
          <CardGroup key="card-group-note" items={[ {
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
        </Segment>

        <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
          <Header as='h1' textAlign='center'>
            Sell
            <Divider />
            <HeaderSubheader>
              Sell with web CRM, ERP and other apps. The apps can be controlled by the web-automator.
            </HeaderSubheader>
          </Header>
          <br/>
          <Image src='/images/screenshots/sell.png' fluid bordered rounded />
          <br/>
          <CardGroup>
            <Card>
              <CardContent>
                <CardHeader>
                </CardHeader>
                <CardDescription>
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <CardHeader>
                </CardHeader>
                <CardDescription>
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <CardHeader>
                </CardHeader>
                <CardDescription>
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <CardHeader>
                </CardHeader>
                <CardDescription>
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <CardHeader>
                </CardHeader>
                <CardDescription>
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <CardHeader>
                </CardHeader>
                <CardDescription>
                </CardDescription>
              </CardContent>
            </Card>
          </CardGroup>
          <CardGroup key="card-group-sell" items={[ {
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
        </Segment>

        <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
          <Header as='h1' textAlign='center'>
            Train
            <Divider />
            <HeaderSubheader>
              Users train agents use browser the way you use the browser themselves. Agents observe, repeat and optimize what users do with the browser.
            </HeaderSubheader>
          </Header>
          <br/>
          <Image src='/images/screenshots/train.png' fluid bordered rounded />
          <br/>
          <CardGroup key="card-group-train" items={[ {
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
        </Segment>

        <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
          <Header as='h1' textAlign='center'>
            API
            <Divider />
            <HeaderSubheader>
              The API allows programmatic access to the platform for chat, web page publishing, emails, and web app requests.
            </HeaderSubheader>
          </Header>
          <br/>
          <CardGroup key="card-group-api" items={[ {
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
        </Segment>

        <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
          <Header as='h1' textAlign='center'>
            Command-line Interface (CLI)
            <Divider />
            <HeaderSubheader>
              A command line tool (CLI) to access our API programmatically. The tool can be used from terminal or from the Jupyter notebooks.
            </HeaderSubheader>
          </Header>
          <br/>
          <Image src='/images/screenshots/cli.png' fluid bordered rounded />
          <br/>
          <CardGroup key="card-group-cli" items={[ {
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
        </Segment>

        <Segment style={{  margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
          <Header as='h1' textAlign='center'>
            Mobile App
            <Divider />
            <HeaderSubheader>
              A mobile app (iOS, Android, web) with a chat that allows to communicate to agents and see the history of messages.
            </HeaderSubheader>
          </Header>
          <br/>
          <Image src='/images/screenshots/mobile.png' size='medium' centered bordered rounded />
          <br/>
          <CardGroup key="card-group-mobile" items={[ {
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
        </Segment>
        */}
      </Container>
      <br />
      <br />

      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='About' />
                <List link inverted>
                  <List.Item as='a'>
                    <a href='mailto:admin@az1.ai'>
                      Contact Us
                    </a>
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={5}>
                  {/*
                <Header inverted as='h4' content='Services' />
                <List link inverted>
                  <List.Item as='a'>
                    <a href='https://qc.vuics.com/' target='_blank' rel='noopener noreferrer'>
                      Quantum Copilot
                    </a>
                  </List.Item>
                  <List.Item as='a'>
                    <a href='https://vuics.com' target='_blank' rel='noopener noreferrer'>
                      Voice User Interfaces
                    </a>
                  </List.Item>
                </List>
                  */}
              </Grid.Column>
              <Grid.Column width={7}>
                <List link inverted>
                  <List.Item as='a'>
                    <p>
                      Self-developing AI is uniquely tailored to your business needs.
                    </p>
                  </List.Item>
                  <List.Item as='a'>
                    <p>
                      © 2024-2025 az1.ai. All rights reserved.
                    </p>
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </ResponsiveContainer>
  )
}

export default HomepageLayout
