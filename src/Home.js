/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, {  useState, useEffect, useRef, useMemo } from 'react'
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
  // Label,
} from 'semantic-ui-react'
import { motion, useScroll, useTransform } from 'framer-motion';

// FIXME: delete?
// import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
// +    "react-scroll-parallax": "^3.4.5",
// +    "react-spring": "^10.0.1",

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
            { available ? "Start for Free" : 'Join a Whitelist' }
          </Button>
          <Button compact basic as="a" href="https://github.com/vuics/hyperagency" target="_blank" rel="noreferrer">
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
                <Link to='/' style={{ color: 'black' }}>{' '}
                  HyperAgency
                </Link>
              </Menu.Item>
              <Menu.Item position='right'>
                { available ? (
                  <>
                    <Button basic as='a' onClick={() => logIn(true)} >
                      Log In
                    </Button>
                    <Button basic as='a' primary={fixed} style={{ marginLeft: '0.5em' }} onClick={() => logIn(false)} >
                      Sign Up
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
    <div style={{
      height: '1px',
      backgroundColor: '#999',
    }}/>
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
            height: '360vh',
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

        {/* Spacer after sticky */}
        <div style={{ height: '60vh' }} />

        {/* Next section */}
        {/*
        <div style={{
          height: '1px',
          backgroundColor: '#999',
        }}/>
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

      <ColorScrollText>
        {/*
        Autonomous agents empower you to scale twice.
        */}
        Imagine a World Where Your Business Runs Itself
      </ColorScrollText>

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
            height: '90vh',
            backgroundColor: '#ffffff',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23636363' fill-opacity='0.17' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        >
          <Container
            style={{
              height: '90vh',
              backgroundColor: '#ffffff', // Solid white
              backgroundImage: 'none',    // Remove background image
              borderLeft: '1px solid #999',
              borderRight: '1px solid #999',
              boxSizing: 'border-box',
              padding: '0 1em',
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
            height: '90vh',
            backgroundColor: '#ffffff',
            backgroundImage: 'radial-gradient(#888 1px, transparent 1px)',
            backgroundSize: '15px 15px',
            // backgroundImage: `
            //   repeating-linear-gradient(0deg, #ccc, #ccc 1px, transparent 1px, transparent 40px),
            //   repeating-linear-gradient(90deg, #ccc, #ccc 1px, transparent 1px, transparent 40px)
            // `,
            // backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23999999' fill-opacity='0.27'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            // backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%23999999' fill-opacity='0.4' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E")`,
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        >
          <Container
            style={{
              height: '90vh',
              backgroundColor: '#ffffff', // Solid white
              backgroundImage: 'none',    // Remove background image
              borderLeft: '1px solid #999',
              borderRight: '1px solid #999',
              boxSizing: 'border-box',
              padding: '0 1em',
            }}
          >
            <div style={{ padding: 1 }}/>
            <Header as="h1" textAlign="center" style={{ marginBottom: '2rem', marginTop: '2rem' }}>
              Key Features: Your Toolkit for Building an Autonomous Business
            </Header>
            <List bulleted size="large" style={{ marginTop: "1.5em" }}>
              <List.Item>
                <strong>Chat:</strong> Seamlessly communicate with agents, humans, and mixed teams in private channels and group discussions.
              </List.Item>
              <List.Item>
                <strong>Hive:</strong> Deploy specialized agentic teams with a diverse range of archetypes, tailored to your specific needs:
                <List.List bulleted>
                  <List.Item><em>LLM Power:</em> Chat, RAG (train on your data), Speech-to-text, Text-to-speech</List.Item>
                  <List.Item><em>Creative & Visual:</em> ImageGen, Avatar</List.Item>
                  <List.Item><em>Technical Prowess:</em> Code, Quantum, Storage, Command</List.Item>
                  <List.Item><em>Workflow Integration:</em> LangFlow, Node-RED, Notebook</List.Item>
                </List.List>
              </List.Item>
              <List.Item>
                <strong>Map:</strong> The Visual Command Center for Agentic Collaboration. Visually orchestrate agents and human resources, design complex workflows, connect prompts, control execution, and create compelling presentations—all within a user-friendly, no-code/low-code environment.
              </List.Item>
              {/*
              <List.Item>
                <strong>Vault:</strong> Securely store your API keys and credentials with robust encryption, ensuring the safety of your data and integrations.
              </List.Item>
              */}
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

          </Container>
        </Container>
      </div>
      <div
        style={{
          height: '1px',
          backgroundColor: '#999',
        }}
      />

      <Container style={{ marginTop: "3em", marginBottom: "3em" }}>
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

      <div style={{
        height: '1px',
        backgroundColor: '#999',
      }}/>
      <div style={{
        padding: '0 2em 0 2em',
        backgroundColor: '#fafafa',
        // padding: '2rem 2rem 2rem 2rem',
        // textAlign: 'center',
      }}>
        <Container
          fluid
          style={{
            // height: '50vh',
            height: 'auto',
            // backgroundColor: '#eee',
            // backgroundColor: '#fafafa',
            // backgroundColor: '#999',
            // backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23636363' fill-opacity='0.17' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
            // backgroundImage: 'radial-gradient(#888 1px, transparent 1px)',
            // backgroundSize: '20px 20px',
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            // boxSizing: 'border-box',
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
      <div style={{
        height: '1px',
        backgroundColor: '#999',
      }}/>

          <Segment placeholder>
            <Header icon>
              <Icon name='pdf file outline' />
              No documents are listed for this customer.
            </Header>
            <Button primary>Add Document</Button>
          </Segment>

      <div style={{
        height: '1px',
        backgroundColor: '#999',
      }}/>

      {/* Free Tier Section */}
      <Container text textAlign="center" style={{ marginTop: "3em", marginBottom: "3em" }}>
        <Header as="h2" style={{ marginBottom: "1rem" }}>
          Start Building Your Autonomous Future Today - It's Free!
        </Header>
        <List bulleted size="large" style={{ marginBottom: "2rem" }}>
          <List.Item>
            <strong>Free Tier:</strong> Run up to 3 agents simultaneously on our cloud-hosted platform.
          </List.Item>
          <List.Item>
            <strong>Open-Source:</strong> Self-host the platform and run unlimited agents.
          </List.Item>
          <List.Item>
            <strong>Freemium Limits:</strong> Web app code is open-source; mobile and desktop app code is closed.
          </List.Item>
        </List>
        <Button primary size="large" style={{ marginRight: "1rem" }}>
          Sign Up for Free (No Credit Card Required)
        </Button>
        <Button secondary size="large" as="a" href="https://github.com/hyperagency" target="_blank" rel="noreferrer">
          Star on GitHub
        </Button>
      </Container>

      <Divider />

      {/* Premium Cloud Section */}
      <Container text style={{ marginTop: "3em", marginBottom: "3em" }}>
        <Header as="h2" textAlign="center" style={{ marginBottom: "1rem" }}>
          Unlock the Full Potential with Our Premium Cloud Offering
        </Header>
        <List bulleted size="large" style={{ marginTop: "1.5em" }}>
          <List.Item>
            <strong>Cloud Deployment:</strong> Hassle-free hosting and management of your HyperAgency platform.
          </List.Item>
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
      </Container>

      <Divider />

      {/* Future Section */}
      <Container text style={{ marginTop: "3em", marginBottom: "3em" }}>
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

      {/* Community Section */}
      <Container text textAlign="center" style={{ marginTop: "3em", marginBottom: "3em" }}>
        <Header as="h2" style={{ marginBottom: "1rem" }}>
          Become a Trailblazer in Agentic AI Innovation!
        </Header>
        <p style={{ fontSize: "1.2em", marginBottom: "1.5rem" }}>
          HyperAgency is more than just a platform; it's a vibrant community of innovators, entrepreneurs, and developers
          building the future of work. Connect with like-minded individuals, share ideas, and contribute to the evolution
          of agentic AI.
        </p>
        <Button primary size="large" style={{ marginBottom: "1rem" }} as="a" href="/community" >
          Join Our Community
        </Button>
        <div>
          <a href="/docs" style={{ marginRight: "1.5rem" }}>
            View Documentation
          </a>
          <a href="/contact">Contact Us</a>
        </div>
      </Container>

      <div style={{
        height: '1px',
        backgroundColor: '#999',
      }}/>
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
              // WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100px)',
              maskImage: 'linear-gradient(to bottom, black 0%, transparent 100px)',
              // WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              zIndex: 0,
            }}
          />

          <div style={{
            padding: '2rem 2rem 2rem 2rem',
            textAlign: 'center',
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
              content={'...'}
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
              content={'...'}
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
            <Header as="h1" textAlign="center">
              Empowering the next generation of entrepreneurs.
            </Header>
          </div>
        </Container>
      </div>
      <div style={{
        height: '1px',
        backgroundColor: '#999',
      }}/>

      <div className="dot-background" style={{
        width: '100%',
        height: '100vh',
        backgroundImage: 'radial-gradient(#888 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />

      <div style={{
        width: '100%',
        height: '100vh',
        backgroundImage: `repeating-linear-gradient(
          75deg,
          #bbb,
          #bbb 1px,
          transparent 1px,
          transparent 20px
        )`,
      }} />

      <div
        style={{
          width: '100%',
          height: '100vh',
          backgroundImage: `
            repeating-linear-gradient(0deg, #ccc, #ccc 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(90deg, #ccc, #ccc 1px, transparent 1px, transparent 40px)
          `,
        }}
      />

      <div style={{
        height: '100vh',
        backgroundColor: '#ffffff',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23999999' fill-opacity='0.27'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}>
        <h1 style={{ padding: 40 }}>Hero Pattern Background: Squares?</h1>
      </div>

      <div style={{
        height: '100vh',
        backgroundColor: '#ffffff',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='2' fill='%23D1D5DB'/%3E%3C/svg%3E")`,
      }}>
        <h1 style={{ padding: 40 }}>Hero Pattern Background: Polka Dots</h1>
      </div>

      <div style={{
        height: '100vh',
        backgroundColor: '#ffffff',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23636363' fill-opacity='0.17' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}>
        <h1 style={{ padding: 40 }}>Hero Pattern Background: Diagonal Lines</h1>
      </div>

      <div style={{
        height: '100vh',
        backgroundColor: '#ffffff',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%23999999' fill-opacity='0.4' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E")`,
      }}>
        <h1 style={{ padding: 40 }}>Hero Pattern Background: Circuit Board</h1>
      </div>


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

      <div>
        <div style={{
          position: 'realtive',
        }}>
          <Image
            alt="logo"
            src="/images/human-agent-network-1200x800.png"
            fluid
            style={{
              height: 'auto',
              width: '100%',
              zIndex: 1,
              position: 'relative',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.2))',
            }}
            centered
          />
          <div style={{
              // zIndex: 2,
              // position: 'absolute',
              textAlign: 'center',
              top: '8em',
            }}
          >
            <Container fluid textAlign='center' style={{ padding: '8em 5em' }}>
            </Container>
          </div>
        </div>
      </div>
      <br />

      <Footer />
    </ResponsiveContainer>
  )
}

export default HomepageLayout
