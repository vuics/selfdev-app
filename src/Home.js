/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, {  useState, useEffect } from 'react'
import { InView } from 'react-intersection-observer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Label,
} from 'semantic-ui-react'
import Footer from './components/Footer'
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
              Supercharge Your Productivity with Selfdev
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
            <Button
              style={{
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
                <Image avatar alt="logo" style={{ height: '60px', width: '60px' }} src='/images/logo192.png' />
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

const FEATURE_ITEMS = [
  {
    icon: 'id badge',
    color: 'red',
    title: "Agent-Staffed Workflows",
    li1: "Seamless integration of human and AI capabilities.",
    li2: "Grow your business on our platform.",
    li3: "Unleash company knowledge with AI-driven search."
  },
  {
    icon: 'travel',
    color: 'orange',
    title: "Maximizing Team Productivity", 
    li1: "Automate tasks saving time and money.",
    li2: "Auto-generate business intelligence and documentation.",
    li3: "Enhance decision-making with AI."
  },
  {
    icon: 'earlybirds',
    color: 'yellow',
    title: "Empowering Entrepreneurs",
    li1: "Scale faster with less head count.",
    li2: "Automate competitive intelligence.", 
    li3: "Analyze and find new market opportunities.",
  },
  {
    icon: 'dna',
    color: 'green',
    title: "All-in-One Platform",
    li1: "Use agents in all your web or desktop apps.",
    li2: "Integrate with APIs and third-party tools and services.",
    li3: "Adapt the platform to your business.",
  },
  {
    icon: 'conversation',
    color: 'violet',
    title: "No-code and Code Agents",
    li1: "Explainable AI in all agentic steps and processes with clean and understandable audit trail.",
    li2: "Automate repetitive tasks with multiple applications and large language models.",
    li3: 'Train agent once and run.'
  },
  {
    icon: 'rocket',
    color: 'purple',
    title: "Cloud-based: No Infrastructure Needed",
    li1: "Drag-and-drop agents: no-code solutions available for businesses without IT resources.",
    li2: "Sophisticated SDK for complex IT requirements all running in your browser.",
    li3: "Compliant and secure."
  },
]

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

  useEffect(() => {
    // Run only once
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
      <br />
      <br />
      <Container>
        <Segment padded="very" textAlign="center" style={{ background: 'rgba(148,185,224,0.1)' }}>
          <Header as="h1" style={{ fontSize: '3em' }}>
            Empowering Innovation Through AI-Driven Collaboration
          </Header>
          <p style={{ fontSize: '2em'}}>
            Our mission is to enable measurable growth, amplify human potential, and empower sustainable, high-impact businesses.
          </p>
          <p style={{ fontSize: '2em'}}>
            Selfdev imagines a future where work and entrepreneurship are shaped by advanced technology, allowing human potential to flourish and business innovation to thrive.
          </p>
          <p style={{ fontSize: '2em', fontWeight: 'bold' }}>
            The future is now.
          </p>
          <div>
            <Label size="massive" basic color='red'>
              Explainable
            </Label>
            <Label size="massive" basic color='yellow'>
              Trusted
            </Label>
            <Label size="massive" basic color='green'>
              Secure
            </Label>
            <Label size="massive" basic color='blue'>
              Compliant
            </Label>
          </div>
        </Segment>

        <Segment padded>
          <Header as="h2" textAlign="center" dividing>
            The Solution: Transformative AI Collaboration Platform
          </Header>
          <Grid divided='vertically' columns={3}>
            <Grid.Row>
              {FEATURE_ITEMS.map((item, index) => (
                <Grid.Column key={index} width={5} textAlign="center">
                  <br/>
                  <Icon name={item.icon} size='huge' color={item.color} fitted circular />
                  <Header as="h4" style={{ fontSize: '1.5em' }}>{item.title}</Header>
                  <ul style={{ fontSize: '1.3em', textAlign: 'left' }}>
                    <li>{item.li1}</li>
                    <li>{item.li2}</li>
                    <li>{item.li3}</li>
                  </ul>
                  <br/>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
      <br />

      <Container>
        <Segment padded textAlign="center" style={{ background: '#f9f9f9' }}>
          <Header as="h2" dividing>
            Join Us in Shaping the Future of Work
          </Header>
          <p>Are you ready to amplify your potential, drive innovation, and foster sustainable growth? Join us at Selfdev.AI and discover a new realm of collaboration where AI enhances human capability.</p>
          <Button
            style={{
              marginTop: '1em',
              marginBottom: '1em',
            }}
            primary size='huge' onClick={() => logIn(false)}
          >
            { available ? "Let's Go" : 'Join a Whitelist' }
            <Icon name='right arrow' />
          </Button>
        </Segment>
      </Container>
      <br />
      <br />

      <Footer />
    </ResponsiveContainer>
  )
}

export default HomepageLayout
