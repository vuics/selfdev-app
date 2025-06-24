import React, { useState, } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { InView } from 'react-intersection-observer'
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Segment,
  Sidebar,
  // Image,
  // List,
  // Divider,
  // Grid,
  // Popup,
  // Card,
  // Label,
} from 'semantic-ui-react'

import conf from '../conf'
import Logo from './Logo'
import { MediaContextProvider, Media, useIsMobile } from './Media'
import {
  Outter,
  // Divi, Inner, Empty
} from './Design'
import { useIndexContext } from '../index'

const HomeHeading = ({ children }) => {
  const isMobile = useIsMobile()
  const { available, logIn } = useIndexContext()

  // console.log('HomeHeading isMobile:', isMobile)

  return (<>
    <Outter wrapper style={{
      height: isMobile ? 'auto': '90vh',
    }}>
      <Container
        style={{
          padding: isMobile ? '0 0.1rem 0' : '0 1rem 3rem',
          textAlign: isMobile ? 'center' : 'left',
        }}
      >
        <Header
          as='h1'
          style={{
            fontSize: isMobile ? '2rem' : '3rem',
            fontWeight: 'bold',
            paddingTop: isMobile ? '3rem' : '30vh',
          }}
        >
          Open-source Agentic AI<br/> Supercharges Entrepreneurial Dreams
        </Header>
        <Header
          as='h3'
          style={{
            fontSize: isMobile ? '1.3em' : '1.7em',
            fontWeight: 'normal',
            marginBottom: isMobile ? '3rem' : '1rem',
          }}
        >
          Autopilot your business. Focus on what you love.
          <br/>
          Powered by Self-developing HyperAgency.
        </Header>
        <div
          style={{ paddingBottom: '3em', }}
        >
          <Button
            compact color='black'
            onClick={() => logIn(false)}
          >
            { available ? "Start for free" : 'Join a whitelist' }
          </Button>
          <Button
            compact basic as="a"
            href={conf.contact.github}
            target="_blank" rel="noreferrer"
          >
            Star on GitHub
          </Button>
          { children }
        </div>
      </Container>
    </Outter>
  </>)
}

HomeHeading.propTypes = {
  children: PropTypes.node,
}

const DesktopContainer = ({ children }) => {
  const { available, logIn } = useIndexContext()
  const { pathname } = useLocation()
  const [ fixed, setFixed ] = useState(false)

  return (
    <Media greaterThan='mobile'>
      <InView onChange={(inView) => setFixed(!inView)}>
        <Menu
          fixed={fixed ? 'top' : null}
          pointing={!fixed}
          secondary={!fixed}
          size='tiny'
        >
          <Container>
            <Menu.Item active={pathname==='/'}>
              <Logo size='mini' gray />
              <Link to='/' style={{ marginLeft: '1rem', color: 'black', fontSize: '1.9rem' }}>{' '}
                HyperAgency
              </Link>
            </Menu.Item>
            <Menu.Item active={pathname==='/pricing'}>
              <Link to='/pricing' style={{ marginLeft: '1rem', color: 'black', fontSize: '1.4rem' }}>{' '}
                Pricing
              </Link>
            </Menu.Item>
            <Menu.Item position='right'>
              <div style={{ marginRight: '2rem' }}>
                { conf.contact.github && (
                  <Button icon='github' basic circular as="a" href={conf.contact.github} target="_blank" rel="noreferrer" />
                )}
                { conf.contact.discord && (
                  <Button icon='discord' basic circular as="a" href={conf.contact.discord} target="_blank" rel="noreferrer" />
                )}
                { conf.contact.youtube && (
                  <Button icon='youtube' basic circular as="a" href={conf.contact.youtube} target="_blank" rel="noreferrer" />
                )}
              </div>
              { available ? (
                <>
                  <Button
                    compact basic as='a'
                    onClick={() => logIn(true)}
                    icon labelPosition='left'
                  >
                    <Icon name='sign-in' />
                    Log In
                  </Button>
                  <Button
                    compact as='a' color='black'
                    style={{ marginLeft: '0.5em' }}
                    onClick={() => logIn(false)}
                    icon labelPosition='right'
                  >
                    Sign Up
                    <Icon name='user plus' />
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
        { pathname==='/' && (
          <HomeHeading />
        )}
      </InView>

      {children}
    </Media>
  )
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const MobileContainer = ({ children }) => {
  const { pathname } = useLocation()
  const { available, logIn } = useIndexContext()
  const [ sidebarOpened, setSidebarOpened ] = useState(false)

  return (
    <Media as={Sidebar.Pushable} at='mobile'>
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={() => setSidebarOpened(false)}
          vertical
          visible={sidebarOpened}
          width='thin'
        >
          <Menu.Item active>
            <Link to='/' style={{ color: 'white', fontSize: '1.3rem' }}>{' '}
              <Logo size='tiny' gray />
              HyperAgency
            </Link>
          </Menu.Item>
          { available ? (
            <>
              <Menu.Item as='a' onClick={() => logIn(true)}>
                <Icon name='sign-in' />
                Log In
              </Menu.Item>
              <Menu.Item as='a' onClick={() => logIn(false)}>
                <Icon name='user plus' />
                Sign Up
              </Menu.Item>
            </>
          ) : (
            <Menu.Item onClick={() => logIn(false)}>
              { available ? 'Get Started' : 'Join a Whitelist' }
            </Menu.Item>
          )}
          <Menu.Item as="a" href={'/pricing'}>
            <Icon name='tags' />
            Pricing
          </Menu.Item>
          <Menu.Item as="a" href={'/mobile'}>
            <Icon name='mobile alternate' />
            Mobile App
          </Menu.Item>
          <Menu.Item as="a" href={conf.docs.url}>
            <Icon name='book' />
            Documentation
          </Menu.Item>
          { conf.contact.github && (
            <Menu.Item as="a" href={conf.contact.github} target="_blank" rel="noreferrer">
              <Icon name='github' />
              GitHub
            </Menu.Item>
          )}
          { conf.contact.discord && (
            <Menu.Item as="a" href={conf.contact.discord} target="_blank" rel="noreferrer">
              <Icon name='discord' />
              Discord
            </Menu.Item>
          )}
          { conf.contact.youtube && (
            <Menu.Item as="a" href={conf.contact.youtube} target="_blank" rel="noreferrer">
              <Icon name='YouTube' />
              YouTube
            </Menu.Item>
          )}
          { conf.contact.email && (
            <Menu.Item as="a" href={`mailto:${conf.contact.email}`} target="_blank" rel="noreferrer">
              <Icon name='mail' />
              Contact Us
            </Menu.Item>
          )}
          <Menu.Item
            onClick={() => setSidebarOpened(false)}
          >
            <Icon name='close' />
            Close Sidebar
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            textAlign='center'
            style={{
              // minHeight: 350,
              padding: '1em 0 0'
            }}
            vertical
          >
            <Container>
              <Menu pointing secondary size='large'>
                <Menu.Item onClick={() => setSidebarOpened(true)}>
                  <Icon size='big' name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  { available ? (
                    <>
                      <Button
                        basic as='a'
                        onClick={() => logIn(true)}
                      >
                        Log In
                      </Button>
                      <Button
                        as='a' color='black'
                        style={{ marginLeft: '0.5em' }}
                        onClick={() => logIn(false)}
                      >
                        Sign Up
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
            { pathname==='/' && (
              <HomeHeading />
            )}
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Media>
  )
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

export default function ResponsiveContainer ({ children }) {
  return (<>
    {/* Heads up!
     * For large applications it may not be best option to put all page into these containers at
     * they will be rendered twice for SSR.
     */}
    <MediaContextProvider>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </MediaContextProvider>
  </>)
}

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

