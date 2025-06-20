/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, {  useState, useEffect, useRef } from 'react'
import { InView } from 'react-intersection-observer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  List,
  Divider,
  Grid,
  Popup,
  // Card,
  // Label,
} from 'semantic-ui-react'
import { motion, useScroll, useTransform } from 'framer-motion';

// FIXME: delete?
// import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
// +    "react-scroll-parallax": "^3.4.5",
// +    "react-spring": "^10.0.1",

import Footer from './components/Footer'
import conf from './conf'
import OctopusSvg from './octopus.svg'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

const HomepageHeading = ({ mobile, available, logIn }) => {
  return (<>
    <div style={{
      padding: '0 2em 0 2em',
      // textAlign: 'center',
    }}>
      <Container
        fluid
        style={{
          height: '90vh',
          backgroundColor: '#ffffff',
          // backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23636363' fill-opacity='0.17' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
          borderLeft: '1px solid #ccc',
          borderRight: '1px solid #ccc',
          boxSizing: 'border-box',
        }}
      >
        <Container
          style={{
            // height: '60vh',
            // backgroundColor: '#ffffff', // Solid white
            // backgroundImage: 'none',    // Remove background image
            // borderLeft: '1px solid #999',
            // borderRight: '1px solid #999',
            // boxSizing: 'border-box',
            padding: '0 1em',
          }}
        >
          {/*
          <div style={{ padding: 1 }}/>
          */}
          <Header
            as='h1'
            style={{
              fontSize: mobile ? '3em' : '3em',
              fontWeight: 'bold',
              paddingTop: '30vh',
            }}
          >
            Open-source Agentic AI<br/> Supercharges Entrepreneurial Dreams
          </Header>
          <Header
            as='h3'
            style={{
              fontSize: mobile ? '1.6em' : '1.7em',
              fontWeight: 'normal',
              // marginTop: mobile ? '0.25em' : '0.5em',
              marginBottom: '1em',
              // color: 'slategray',
            }}
          >
            Autopilot your business. Focus on what you love.
            <br/>
            Powered by Self-developing HyperAgency.
          </Header>
          <Button style={{ marginBottom: '1em', }}
            compact color='black' onClick={() => logIn(false)}
          >
            { available ? "Start for free" : 'Join a whitelist' }
          </Button>
          <Button compact basic as="a" href={conf.contact.github} target="_blank" rel="noreferrer">
            Star on GitHub
          </Button>
        </Container>
      </Container>
    </div>
  </>)
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
        {/*
        <Segment
          textAlign='center'
          style={{
            // minHeight: 700,
            // padding: '1em 0em'
          }}
        >
        */}
          <Menu
            fixed={fixed ? 'top' : null}
            pointing={!fixed}
            secondary={!fixed}
            size='tiny'
          >
            <Container>
              <Menu.Item active>
                <Image avatar alt="logo" src='/images/logo192.png' />
                <Link to='/' style={{ color: 'black', fontSize: '1.9rem' }}>{' '}
                  HyperAgency
                </Link>
              </Menu.Item>
              <Menu.Item position='right'>
                <div style={{ marginRight: '2rem' }}>
                  { conf.contact.github && (
                    <Button icon='github' color='standard' basic circular as="a" href={conf.contact.github} target="_blank" rel="noreferrer" />
                  )}
                  { conf.contact.discord && (
                    <Button icon='discord' color='standard' basic circular as="a" href={conf.contact.discord} target="_blank" rel="noreferrer" />
                  )}
                  { conf.contact.youtube && (
                    <Button icon='youtube' color='standard' basic circular as="a" href={conf.contact.youtube} target="_blank" rel="noreferrer" />
                  )}
                </div>
                { available ? (
                  <>
                    <Button compact basic as='a' onClick={() => logIn(true)} icon labelPosition='left'>
                      <Icon name='sign-in' />
                      Log In
                    </Button>
                    <Button compact as='a' color='black' style={{ marginLeft: '0.5em' }} onClick={() => logIn(false)} icon labelPosition='right'>
                      Sign Up
                      <Icon name='signup' />
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
        {/*
        </Segment>
        */}
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

const WordWithScrollColor = ({ word, index, totalWords, scrollProgress }) => {
  // We compress the transformation range to the first 60% of the scroll
  const scrollStart = (index / totalWords) * 0.6;
  const scrollEnd = ((index + 1) / totalWords) * 0.6;

  const color = useTransform(scrollProgress, [scrollStart, scrollEnd], ['#ccc', '#111']);

  return (
    <motion.span
      style={{
        color,
        marginRight: '0.5em',
        transition: 'color 0.2s ease-out',
        lineHeight: '3rem',
      }}
    >
      {word}
    </motion.span>
  );
};

function Divi () {
  return (
    <div style={{
      height: '1px',
      backgroundColor: '#999',
    }}/>
  )
}

const ColorScrollText = ({ children }) => {
  const stickyRef = useRef(null);
  const words = children.split(' ')
  const totalWords = words.length;

  // Track scroll progress through a long sticky zone
  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ['start center', 'end center'],
  });

  return (<>
    <Divi />
    <div style={{
      padding: '0 2em 0 2em',
      // textAlign: 'center',
    }}>
      <div style={{
        position: 'relative',
        borderLeft: '1px solid #ccc',
        borderRight: '1px solid #ccc',
        boxSizing: 'border-box',
      }}>
        {/* Background */}
        <div
          style={{
            padding: '0 2em 0 2em',
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '397vh',
            backgroundImage: 'radial-gradient(#888 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            // backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23999999' fill-opacity='0.27'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            zIndex: 0,
          }}
        />

        {/* Space before sticky starts */}
        <div style={{ height: '50vh' }} />

        {/* Sticky container (longer to keep text stuck) */}
        <div
          ref={stickyRef}
          style={{
            height: '250vh', // extended scroll duration
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'sticky',
              top: '42vh',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              fontSize: '2rem',
              zIndex: 10,
              textAlign: 'center',
              padding: '0 8rem',
            }}
          >
            {words.map((word, index) => (
              <WordWithScrollColor
                key={index}
                word={word}
                index={index}
                totalWords={totalWords}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        <div style={{ height: '30vh' }} />

        <div style={{
          filter: 'grayscale(100%)',
          transform: 'scale(0.25)', transformOrigin: 'top center',
          height: '310px',
        }}>
          <img src={OctopusSvg} className="App-logo" alt="logo" />
        </div>

        {/* Spacer after sticky */}
        <div style={{ height: '30vh' }} />

        {/* Next section */}
        {/*
        <Divi />
        <div
          style={{
            padding: '4rem 2rem',
            backgroundColor: '#fff',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <h2>Tired of being bogged down in repetitive tasks? Dreaming of scaling your business without the endless grind?</h2>
          <p>HyperAgency makes it possible. We're building a future where intelligent AI agents work alongside you, automating the mundane, amplifying your creativity, and unlocking unprecedented growth.</p>
        </div>
        */}
      </div>
    </div>
  </>);
};

const HomepageLayout = () => {
  const navigate = useNavigate()
  const [available, setAvailable] = useState(true)
  const [activeArchetype, setActiveArchetype] = useState('chat')
  const handleArchetypeClick = (e, { name }) => setActiveArchetype(name)
  const [activeFeature, setActiveFeature] = useState('map')
  const handleFeatureClick = (e, { name }) => setActiveFeature(name)

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

  useEffect(() => {
    // Run only once
    // console.log('conf.api.url:', conf.api.url)
    // console.log(`Getting ${conf.api.url}/available`)

    axios.get(`${conf.api.url}/available`)
      .then((response) => {
        if (response.data.status === 'available') {
          console.log('The API is available. You can log in.')
        } else {
          console.warn('Unknown availability status. Join a Whitelist.')
          setAvailable(false)
        }
      })
      .catch(function (error) {
        console.error('error:', error);
        console.warn('The API is unavailable. Join a Whitelist.')
        setAvailable(false)
      })
  }, []);


  return (
    <ResponsiveContainer logIn={logIn} available={available}>

      <Divi />
      <div style={{
        padding: '0 2rem 0 2rem',
        // textAlign: 'center',
      }}>
        <Container fluid style={{
          // marginTop: "3em", marginBottom: "3em",
          textAlign: 'center',
          borderLeft: '1px solid #ccc',
          borderRight: '1px solid #ccc',
          boxSizing: 'border-box',
        }}>
          <div style={{ padding: 1 }}/>
          <Header as="h1" textAlign="center" style={{ marginBottom: '2rem', marginTop: '2rem' }}>
            Your Toolkit for Building an Autonomous Business
          </Header>
          <Menu secondary compact icon='labeled'>
            <Menu.Item
              name='map'
              active={activeFeature === 'map'}
              onClick={handleFeatureClick}
            >
              <Icon name='sitemap' />
              Map
            </Menu.Item>
            <Menu.Item
              name='hive'
              active={activeFeature === 'hive'}
              onClick={handleFeatureClick}
            >
              <Icon name='cubes' />
              Hive
            </Menu.Item>
            <Menu.Item
              name='chat'
              active={activeFeature === 'chat'}
              onClick={handleFeatureClick}
            >
              <Icon name='chat' />
              Chat
            </Menu.Item>
            <Menu.Item
              name='others'
              active={activeFeature === 'others'}
              onClick={handleFeatureClick}
            >
              <Icon name='th' />
              Many More
            </Menu.Item>
          </Menu>
          <div style={{ padding: '2rem 2rem 2rem 2rem' }}>
            { activeFeature === 'map' && (<>
              <strong>Map:</strong> The Visual Command Center for Agentic Collaboration. Visually orchestrate agents and human resources, design complex workflows, connect prompts, control execution, and create compelling presentations—all within a user-friendly, no-code/low-code environment.
              <br/>
              <br/>
              {/*
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
              */}
              <Image src='/images/screenshots/map.png' fluid />
            </>) }
            { activeFeature === 'hive' && (<>
              <strong>Hive:</strong> Deploy specialized agentic teams with a diverse range of archetypes, tailored to your specific needs:
              <br/>
              <br/>
              <p style={{ textAlign: 'left' }}>
                <List bulleted>
                  <List.Item><em>LLM Power:</em> Chat, RAG (train on your data), Speech-to-text, Text-to-speech</List.Item>
                  <List.Item><em>Creative & Visual:</em> ImageGen, Avatar</List.Item>
                  <List.Item><em>Technical Prowess:</em> Code, Quantum, Storage, Command</List.Item>
                  <List.Item><em>Workflow Integration:</em> LangFlow, Node-RED, Notebook</List.Item>
                </List>
              </p>
              <br />
              {/*
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
              <br />
              */}
              <Image src='/images/screenshots/hive.png' fluid />
            </>) }
            { activeFeature === 'chat' && (<>
              <strong>Chat:</strong> Seamlessly communicate with agents, humans, and mixed teams in private channels and group discussions.
              <br/>
              <br/>
              {/*
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
              */}
              <Image src='/images/screenshots/chat.png' fluid />
            </>) }
            { activeFeature === 'others' && (<>
              <List bulleted size="large">
                <List.Item>
                  <strong>API & CLI:</strong> Access platform features programmatically for advanced customization and seamless integration.
                </List.Item>
                <List.Item>
                  <strong>Mobile & Desktop Apps:</strong> Stay connected and manage your agents on the go with our iOS, Android, macOS, Linux, and Windows apps.
                </List.Item>
                <List.Item>
                  <strong>Docs:</strong> Comprehensive documentation and tutorials to guide you from setup to advanced agentic strategies.
                </List.Item>
              </List>
            </>) }
          </div>
        </Container>
      </div>

      <ColorScrollText>
        {/*
        Autonomous agents empower you to scale twice.
        */}
        Imagine a World Where Your Business Runs Itself
      </ColorScrollText>

      <Divi />
      <div style={{
        padding: '0 2em 0 2em',
        // textAlign: 'center',
      }}>
        <Container
          fluid
          style={{
            // height: '35vh',
            height: 'auto',
            backgroundColor: '#ffffff',
            // backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23636363' fill-opacity='0.17' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ padding: 1 }}/>
          <Header as="h1" textAlign="center" style={{
            // marginTop: '0',
            padding: '2rem',
            paddingBottom: '0',
          }}>
            Tired of being bogged down in repetitive tasks?
          </Header>
          <Header as="h3" textAlign="center" style={{
            // marginTop: '0',
            // padding: '1rem',
          }}>
            Dreaming of scaling your business without the endless grind?
          </Header>
          <p style={{
            fontSize: "1.2em", lineHeight: "1.6em",
            padding: '1rem 2rem 4rem',
            textAlign: 'center',
          }}>
            HyperAgency makes it possible.
            <br/>
            <br/>
            We're building a future where intelligent AI agents work <em>alongside</em> you,
            automating the mundane, amplifying your creativity, and unlocking unprecedented growth.
          </p>
        </Container>
      </div>

      <div style={{
        height: '1px',
        backgroundColor: '#999',
      }}/>
      <div style={{
        padding: '0 2em 0 2em',
        // textAlign: 'center',
      }}>
        <Container
          fluid
          style={{
            height: '20vh',
            backgroundColor: '#ffffff',
            // backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23636363' fill-opacity='0.17' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundImage: 'radial-gradient(#888 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        >
        </Container>
      </div>

      <Divi />
      <div style={{
        padding: '0 2em 0 2em',
        // textAlign: 'center',
      }}>
        <Container
          fluid
          style={{
            // height: '90vh',
            backgroundColor: '#ffffff',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23636363' fill-opacity='0.17' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        >
          <Container
            style={{
              // height: '90vh',
              backgroundColor: '#ffffff', // Solid white
              backgroundImage: 'none',    // Remove background image
              borderLeft: '1px solid #999',
              borderRight: '1px solid #999',
              boxSizing: 'border-box',
              padding: '3rem 1rem 3rem 1rem',
            }}
          >
            <div style={{ padding: 1 }}/>
            {/*
            <Header as="h1" textAlign="center" style={{ marginBottom: '2rem', marginTop: '2rem' }}>
              Imagine a World Where Your Business Runs Itself
            </Header>
            <p style={{ fontSize: "1.2em", lineHeight: "1.6em" }}>
              Tired of being bogged down in repetitive tasks? Dreaming of scaling your business without the endless grind?
              HyperAgency makes it possible. We're building a future where intelligent AI agents work <em>alongside</em> you,
              automating the mundane, amplifying your creativity, and unlocking unprecedented growth.
            </p>
            */}
            <List bulleted size="large" style={{ marginTop: "1.5em" }}>
              <List.Item>
                <strong>Virtual Startup Teams:</strong> Experience unparalleled growth with virtual teams designed to assist
                your business in automating workflows and cutting costs.
              </List.Item>
              <List.Item>
                <strong>Reclaim Your Time:</strong> Delegate tedious tasks to tireless AI agents, freeing you to focus on
                strategic vision and high-impact decisions.
              </List.Item>
              <List.Item>
                <strong>Scale Effortlessly:</strong> Expand your business capabilities without the limitations of traditional
                hiring. Build virtual teams that work 24/7.
              </List.Item>
              <List.Item>
                <strong>Reduce Costs & Maximize Efficiency:</strong> Optimize workflows and eliminate inefficiencies with
                intelligent automation, boosting your bottom line.
              </List.Item>
              <List.Item>
                <strong>Unlock Data-Driven Insights:</strong> Leverage AI-powered analytics to understand your business better
                and make smarter, more informed decisions.
              </List.Item>
              <List.Item>
                <strong>Build the Business of Your Dreams:</strong> Focus on your passion, knowing that HyperAgency is always working
                in the background to support your vision.
              </List.Item>
            </List>

            {/*
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                fill="none"
                stroke="black"
                strokeWidth="2"
              >
                <polygon points="50,10 90,30 50,50 10,30" />
                <polygon points="10,30 10,70 50,90 50,50" />
                <polygon points="90,30 90,70 50,90 50,50" />
              </svg>
            </div>
            */}

          </Container>
        </Container>
      </div>

      <Divi />
      <div style={{
        padding: '0 2em 0 2em',
        // textAlign: 'center',
      }}>
        <Container
          fluid
          style={{
            // height: '90vh',
            backgroundColor: '#ffffff',
            // backgroundImage: `
            //   repeating-linear-gradient(0deg, #ccc, #ccc 1px, transparent 1px, transparent 15px),
            //   repeating-linear-gradient(90deg, #ccc, #ccc 1px, transparent 1px, transparent 15px)
            // `,
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ padding: 1 }}/>

          <Container style={{ paddingTop: "3em", paddingBottom: '3rem' }}>
            <Header as="h2" textAlign="center" style={{ marginBottom: "1rem" }}>
              Meet Your AI Dream Team: Agent Archetypes for Every Task
            </Header>
            <Menu widths={6} attached='top'>
              <Menu.Item
                name='chat'
                active={activeArchetype === 'chat'}
                onClick={handleArchetypeClick}
              >Chat</Menu.Item>
              <Menu.Item
                name='rag'
                active={activeArchetype === 'rag'}
                onClick={handleArchetypeClick}
              >RAG</Menu.Item>
              <Menu.Item
                name='stt-tts'
                active={activeArchetype === 'stt-tts'}
                onClick={handleArchetypeClick}
              >Speech {'< - >'} Text</Menu.Item>
              <Menu.Item
                name='imagegen'
                active={activeArchetype === 'imagegen'}
                onClick={handleArchetypeClick}
              >ImageGen</Menu.Item>
              <Menu.Item
                name='code'
                active={activeArchetype === 'code'}
                onClick={handleArchetypeClick}
              >Code</Menu.Item>
              <Menu.Item
                name='others'
                active={activeArchetype === 'others'}
                onClick={handleArchetypeClick}
              >Many More</Menu.Item>
            </Menu>
            <Segment attached='bottom'>
              { activeArchetype === 'chat' && (<>
                <strong>Chat Agents:</strong> Interact with leading LLMs from OpenAI, Anthropic, Google, and more.
              </>) }
              { activeArchetype === 'rag' && (<>
                <strong>RAG Agents:</strong> Train LLMs on your data to create highly specialized knowledge bases.
              </>) }
              { activeArchetype === 'stt-tts' && (<>
                <strong>Speech-to-Text & Text-to-Speech Agents:</strong> Enable voice-powered workflows and accessibility.
              </>) }
              { activeArchetype === 'imagegen' && (<>
                <strong>Image Generation Agents:</strong> Create stunning visuals with Dalle-2 and Dalle-3.
              </>) }
              { activeArchetype === 'code' && (<>
                <strong>Code Agents:</strong> Automate complex programming tasks and streamline development.
              </>) }
              { activeArchetype === 'others' && (<>
                <strong>And many more!</strong> Quantum, Storage, Command, Langflow, Node-RED, Notebook, Avatar.
              </>) }
            </Segment>
          </Container>
        </Container>
      </div>

      <Divi />
      <div style={{
        padding: '0 2em 0 2em',
        // textAlign: 'center',
      }}>
        <Container
          fluid
          style={{
            height: '10vh',
            backgroundColor: '#ffffff',
            backgroundImage: `
              repeating-linear-gradient(0deg, #ccc, #ccc 1px, transparent 1px, transparent 15px),
              repeating-linear-gradient(90deg, #ccc, #ccc 1px, transparent 1px, transparent 15px)
            `,
            backgroundSize: '20px 20px',
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        >
        </Container>
      </div>

      <Divi />
      <div style={{
        padding: '0 2em 0 2em',
        backgroundColor: '#fafafa',
        // padding: '2rem 2rem 2rem 2rem',
        // textAlign: 'center',
      }}>
        <Container
          fluid
          style={{
            height: 'auto',
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
          }}
        >
          <div style={{
            height: '1rem',
          }}/>
          <Grid celled verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={6} textAlign='center'>
                <Icon size='huge' name='shield' />
                <Header as="h1" textAlign="center">
                  Scale with security
                </Header>
              </Grid.Column>
              <Grid.Column width={10}>
                <p style={{
                  fontSize: "1.8em", lineHeight: "1.6em",
                  padding: '2rem 2rem',
                  textAlign: 'center',
                  color: 'slategray'
                }}>
                  Securely store your API keys and credentials in <strong>Vault</strong> with robust encryption, ensuring the safety of your data and integrations.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div style={{
            height: '1rem',
            // backgroundColor: '#fafafa',
          }}/>
        </Container>
      </div>

      <Divi />
      <div style={{
        padding: '0 2em 0 2em',
        // textAlign: 'center',
      }}>
        <Container
          fluid
          style={{
            height: '10vh',
            backgroundColor: '#ffffff',
            backgroundImage: `
              repeating-linear-gradient(0deg, #ccc, #ccc 1px, transparent 1px, transparent 15px),
              repeating-linear-gradient(90deg, #ccc, #ccc 1px, transparent 1px, transparent 15px)
            `,
            backgroundSize: '20px 20px',
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        >
        </Container>
      </div>

      <Divi />
      <div style={{
        padding: '0 2em 0 2em',
        // textAlign: 'center',
      }}>
        <Container fluid textAlign="center" style={{
          // marginTop: "3em", marginBottom: "3em",
          borderLeft: '1px solid #ccc',
          borderRight: '1px solid #ccc',
          boxSizing: 'border-box',
        }}>
          <div style={{ padding: 1 }}/>
          <div style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
            <Container text style={{ marginTop: "3em", marginBottom: "3em" }}>
              <Header as="h2" style={{ marginBottom: "1rem" }}>
                Start Building Your Autonomous Future Today - It's Free!
              </Header>
              <List bulleted size="large" style={{ marginBottom: "3rem" }}>
                <List.Item>
                  <strong>Open-Source:</strong> Self-host the platform and run unlimited agents for free.
                </List.Item>
                <List.Item>
                  <strong>Free Tier:</strong> Run up to 3 agents simultaneously on our cloud-hosted platform.
                </List.Item>
                <List.Item>
                  <strong>Cloud Deployment:</strong> Hassle-free hosting and management of your HyperAgency platform.
                </List.Item>
              </List>
              <Button compact basic as="a" href={conf.contact.github} target="_blank" rel="noreferrer">
                Star on GitHub
              </Button>
              <Button style={{ marginBottom: '1em', }}
                compact color='black' onClick={() => logIn(false)}
              >
                { available ? "Start for free" : 'Join a whitelist' }
              </Button>
            </Container>
          </div>
        </Container>
      </div>

      <Divi />
      <div style={{
        padding: '0 2em 0 2em',
      }}>
        <Container
          fluid
          style={{
            // height: '90vh',
            backgroundColor: '#ffffff',
            backgroundImage: `
              repeating-linear-gradient(0deg, #ccc, #ccc 1px, transparent 1px, transparent 15px),
              repeating-linear-gradient(90deg, #ccc, #ccc 1px, transparent 1px, transparent 15px)
            `,
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        >
          <Container
            style={{
              // height: '90vh',
              backgroundColor: '#ffffff', // Solid white
              backgroundImage: 'none',    // Remove background image
              borderLeft: '1px solid #999',
              borderRight: '1px solid #999',
              boxSizing: 'border-box',
              // padding: '0 1em',
            }}
          >
            <div style={{ padding: 1 }}/>
            <div style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
              <Container text style={{ marginTop: "3em", marginBottom: "3em" }}>
                <Header as="h2" textAlign="center" style={{ marginBottom: "1rem" }}>
                  Unlock the Full Potential with Our Premium Cloud Offering
                </Header>
                <List bulleted size="large" style={{ marginTop: "1.5em" }}>
                  <List.Item>
                    <strong>Synthetic UI:</strong> Dynamically generated and programmatically controlled user interfaces.
                  </List.Item>
                  <List.Item>
                    <strong>Distributed System:</strong> Connect humans and agents through a server-to-server network.
                  </List.Item>
                  <List.Item>
                    <strong>Social Bridge:</strong> Integrate agents with social networks and messaging platforms.
                  </List.Item>
                  <List.Item>
                    <strong>Phone Integration:</strong> Communicate with agents via phone calls and messages.
                  </List.Item>
                </List>
                <br />
                <Button style={{ marginBottom: '1em', }}
                  compact color='black' onClick={() => logIn(false)}
                >
                  { available ? "Start for free" : 'Join a whitelist' }
                </Button>
                <Button compact basic as="a" href="/pricing">
                  See our plans
                </Button>
              </Container>
            </div>
          </Container>
        </Container>
      </div>

      <Divi />
      <div style={{
        padding: '0 2em 0 2em',
        // textAlign: 'center',
      }}>
        <Container
          fluid
          style={{
            height: '10vh',
            backgroundColor: '#ffffff',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23cccccc' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        >
        </Container>
      </div>

      <Divi />
      <div style={{
        padding: '0 2em 0 2em',
        // textAlign: 'center',
      }}>
        <Container
          fluid
          style={{
            // height: '90vh',
            backgroundColor: '#ffffff',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23cccccc' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        >
          <Container
            style={{
              position: 'relative',
              backgroundImage: `url("/images/sea-stars.png")`,
              backgroundSize: 'cover',              // or 'contain' if you prefer
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              // filter: 'grayscale(100%)',
              borderLeft: '1px solid #999',
              borderRight: '1px solid #999',
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: 1 }}/>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.93)', // semi-transparent white
              zIndex: 1,
            }} />
            <div style={{ paddingTop: '3rem', paddingBottom: '3rem',
              position: 'relative',
              zIndex: 2,
              padding: '3rem 2rem'
            }}>
              <Container text style={{ marginTop: "3em", marginBottom: "3em",
                // opacity: 1,
              }}>
                <Header as="h2" textAlign="center" style={{ marginBottom: "1rem" }}>
                  The Future of HyperAgency: A Glimpse into Tomorrow
                </Header>
                <List bulleted size="large" style={{ marginTop: "1.5em" }}>
                  <List.Item>
                    <strong>Collaboration & Communication:</strong> Meet (Video Conferencing) - Seamlessly connect with agents and humans.
                  </List.Item>
                  <List.Item>
                    <strong>Workflow Automation:</strong> Flow, Node - Design and automate complex workflows visually.
                  </List.Item>
                  <List.Item>
                    <strong>AI Training & Development:</strong> Train, Note, Code - Empower agents with continuous learning.
                  </List.Item>
                  <List.Item>
                    <strong>Business Applications:</strong> Sell (CRM/ERP), E-commerce, Storefront, Bank - Streamline core business functions.
                  </List.Item>
                  <List.Item>
                    <strong>Emerging Technologies:</strong> Blockchain, Smart Contract, VR/AR integrations.
                  </List.Item>
                </List>
              </Container>

              <Divider />

              <Container text textAlign="center" style={{ marginTop: "3em", marginBottom: "3em" }}>
                <Header as="h2" style={{ marginBottom: "1rem" }}>
                  Become a Trailblazer in Agentic AI Innovation!
                </Header>
                <p style={{ fontSize: "1.2em", marginBottom: "1.5rem" }}>
                  HyperAgency is more than just a platform; it's a vibrant community of innovators, entrepreneurs, and developers
                  building the future of work. Connect with like-minded individuals, share ideas, and contribute to the evolution
                  of agentic AI.
                </p>
                <div style={{ margin: "3rem 0 2rem" }}>
                  <Button compact color='black' as="a" href={conf.contact.discord} target="_blank" rel="noreferrer">
                    Join our community
                  </Button>
                </div>
                <Button compact basic as="a" href={conf.docs.url} target="_blank" rel="noreferrer">
                  View Documentation
                </Button>
                <Button compact basic as="a" href={`mailto:${conf.contact.email}`} target="_blank" rel="noreferrer">
                  Contact us
                </Button>
              </Container>
            </div>
          </Container>
        </Container>
      </div>

      <Divi />
      <div style={{
        padding: '0 2em 0 2em',
        // textAlign: 'center',
      }}>
        <Container
          fluid
          style={{
            height: '10vh',
            backgroundColor: '#ffffff',
            // backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23cccccc' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        >
        </Container>
      </div>

      <Divi />
      <div style={{
        padding: '0 2em 0 2em',
        // backgroundColor: '#fafafa',
        // padding: '2rem 2rem 2rem 2rem',
        // textAlign: 'center',
      }}>
        <Container
          fluid
          style={{
            position: 'relative', overflow: 'hidden',
            // height: 'auto',
            // backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23636363' fill-opacity='0.17' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
          }}
        >
          {/* Background Layer */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23636363' fill-opacity='0.17' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 200px)',
              maskImage: 'linear-gradient(to bottom, black 0%, transparent 200px)',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              zIndex: 0,
            }}
          />

          <div style={{
            padding: '6rem 2rem 2rem 2rem',
            textAlign: 'center',
            zIndex: 1,
          }}>
            <Popup
              content={'Cool project. The future belongs to these technologies. It solves the tasks in time.'}
              key={'Alexander Pavlov'}
              header={'Alexander Pavlov'}
              trigger={
                <Image avatar alt="reviewer photo" src='/images/reviewers/AlexanderPavlov.png' />
              }
            />
            <Popup
              content={'The platform allows entrepreneurs to significantly reduce the time spent on supporting current business issues, and most importantly, using new technologies with HiperAgency is easy and does not require a long study of the issue. And even "from scratch" of knowledge and ideas about the benefits of AI in your business, you can start using this platform and programming in a common language. It is great to turn from an individual entrepreneur into a developer for the needs of your business, reducing the time spent on explaining the task to outsourcing contractors. You can do the necessary minimum yourself with the help of this wonderful platform.'}
              key={'Kate Melnikova'}
              header={'Kate Melnikova'}
              trigger={
                <Image avatar alt="reviewer photo" src='/images/reviewers/KateMelnikova.png' />
              }
            />
            <Popup
              content={'The best multifunctional platform I have ever seen. I especially like the structure when you can gather many agents that will perform processes between themselves.'}
              key={'Dmitriy Arakcheev'}
              header={'Dmitriy Arakcheev'}
              trigger={
                <Image avatar alt="reviewer photo" src='/images/reviewers/DmitriyArakcheev.png' />
              }
            />
            <Popup
              content={'It helped to solve tasks.'}
              key={'Aleksey Arakcheev'}
              header={'Aleksey Arakcheev'}
              trigger={
                <Image avatar alt="reviewer photo" src='/images/reviewers/AlekseyArakcheev.png' />
              }
            />
            <Popup
              content={'The service is convenient and easy to use. Everything works great!'}
              key={'Aslan Atemov'}
              header={'Aslan Atemov'}
              trigger={
                <Image avatar alt="reviewer photo" src='/images/reviewers/AslanAtemov.png' />
              }
            />
            <Popup
              content={'I love these agents.'}
              key={'Jonathan Simons'}
              header={'Jonathan Simons'}
              trigger={
                <Image avatar alt="reviewer photo" src='/images/reviewers/JonathanSimons.png' />
              }
            />
            <Popup
              content={'I tried this system in action. Very convenient interface, which allows you to create different options for executing a request. Lots of possibilities with ease of use!'}
              key={'Alexander Labyrich'}
              header={'Alexander Labyrich'}
              trigger={
                <Image avatar alt="reviewer photo" src='/images/reviewers/AlexanderLabyrich.png' />
              }
            />

            <Header as="h1" textAlign="center">
              Empowering the next generation of entrepreneurs.
            </Header>
          </div>
        </Container>
        <Container textAlign='center'
          fluid
          style={{
            // position: 'relative', overflow: 'hidden',
            // height: 'auto',
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
          }}
        >
          <Button style={{ margin: '2rem 0 3rem', }}
            compact color='black' onClick={() => logIn(false)}
          >
            { available ? "Start for free" : 'Join a whitelist' }
          </Button>
        </Container>
      </div>

      <Divi />
      <div style={{
        padding: '0 2em 0 2em',
        textAlign: 'center',
      }}>
        <Container
          fluid
          style={{
            height: '10vh',
            backgroundColor: '#ffffff',
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        >
        </Container>
      </div>

      <div style={{ padding: '0.3rem' }}/>

      <Footer />
    </ResponsiveContainer>
  )
}

export default HomepageLayout
