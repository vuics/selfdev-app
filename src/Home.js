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
  List,
  Menu,
  Segment,
  Sidebar,
  Label
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
    <Container text>
      <Image alt="logo" style={{height: '300px'}} src='/images/logo512.png' centered />
      <Header
        as='h1'
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginTop: mobile ? '0' : '0',
        }}
      >
        <span style={{color: 'gray'}}>az1</span>
      </Header>
      <Header
        as='h2'
        style={{
          fontSize: mobile ? '1.1em' : '2.2em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.25em' : '0.5em',
          marginBottom: '2em',
        }}
      >
        <span style={{color: 'dimgray'}}>Self-developing AI</span>
      </Header>
      <Button
        style={{
          marginBottom: '5em',
        }}
        primary size='huge' onClick={() => logIn(false)}
      >
        { available ? 'Chat to AI' : 'Join a Whitelist' }
        <Icon name='right arrow' />
      </Button>
    </Container>
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
                <Image avatar alt="logo" src='/images/logo192.png' />
                <Link to='/'> {' '} Home</Link>
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
        <Segment padded="very" textAlign="center" style={{ background: '#f9f9f9' }}>
          <Header as="h1" dividing>
            Welcome to AZ1.AI!
          </Header>
          <Header as="h3" color="blue">
            Empowering Innovation Through AI-Driven Collaboration
          </Header>
          <Icon name='users' size='massive' color='blue' inverted bordered />
          <br/>
          <br/>
          <br/>
          <div>
            <Label>
              Explainable
            </Label>
            <Label>
              Trusted
            </Label>
            <Label>
              Secure
            </Label>
            <Label>
              Compliant
            </Label>
          </div>
        </Segment>

        <Segment padded>
          <Header as="h2" textAlign="center" dividing>
            Our Mission
          </Header>
          <p>
            At AZ1.AI, we design and deliver cutting-edge agentic AI collaboration platforms tailored for entrepreneurs and their investors. Our mission is to enable measurable growth, amplify human potential, and drive sustainable, high-impact business innovation.
          </p>
        </Segment>

        <Segment padded>
          <Header as="h2" textAlign="center" dividing>
            Our Vision
          </Header>
          <p>
            Imagine a future where work and entrepreneurship are shaped by advanced technology, allowing human potential to flourish and business innovation to thrive. We envision a world where all stakeholders benefit from sustainable growth driven by AI-powered collaboration.
          </p>
        </Segment>

        <Segment padded>
          <Header as="h2" textAlign="center" dividing>
            The Solution: Transformative AI Collaboration Platforms
          </Header>
          <Grid divided='vertically' columns={3}>
            <Grid.Row>
              {[
                {
                  icon: 'id badge',
                  color: 'red',
                  title: "Seamless Integration of Human and AI Capabilities",
                  offer: "What We Offer: Harmonious partnerships between human teams and AI agents.",
                  benefit: "The Benefit: Streamlined workflows and enhanced decision-making lead to amplified creativity.",
                },
                {
                  icon: 'travel',
                  color: 'orange',
                  title: "Maximizing Returns on Human and Financial Capital",
                  offer: "What We Offer: Automation of repetitive tasks.",
                  benefit: "The Benefit: Teams can focus on strategic and creative activities, driving operational efficiency and investor returns.",
                },
                {
                  icon: 'earlybirds',
                  color: 'yellow',
                  title: "Empowering Entrepreneurs and Investors",
                  offer: "What We Offer: Insightful tools and metrics that support scalable ventures.",
                  benefit: "The Benefit: Entrepreneurs can swiftly identify growth opportunities, while investors gain real-time transparency on their capital impacts.",
                },
                {
                  icon: 'dna',
                  color: 'green',
                  title: "Driving Innovation and Unlocking Growth",
                  offer: "What We Offer: AI-driven insights and predictive analytics that adapt to business needs.",
                  benefit: "The Benefit: Breakthrough results with scalable solutions that foster sustainable growth.",
                },
                {
                  icon: 'conversation',
                  color: 'violet',
                  title: "Ensuring Ethical, Inclusive, and Sustainable AI Solutions",
                  offer: "What We Offer: A commitment to fairness, transparency, and accountability in our AI designs.",
                  benefit: "The Benefit: Trust-building solutions that prioritize long-term societal and environmental impacts.",
                },
                {
                  icon: 'rocket',
                  color: 'purple',
                  title: "Enhancing Workforce Skills and AI Literacy",
                  offer: "What We Offer: Comprehensive training programs that cultivate AI knowledge and upskilling.",
                  benefit: "The Benefit: A workforce adept at leveraging AI technologies fosters innovation and elevates overall organizational competency.",
                },
              ].map((item, index) => (
                <Grid.Column key={index} width={5} textAlign="center">
                  <br/>
                  <Icon name={item.icon} size='massive' color={item.color} fitted circular />
                  <Header as="h4">{item.title}</Header>
                  <p>{item.offer}</p>
                  <p>{item.benefit}</p>
                  <br/>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment padded>
          <Header as="h2" textAlign="center" dividing>
            Expected Outcomes
          </Header>
          <List relaxed>
            <List.Item>Enhanced Operational Efficiency: Reduce by up to 50% the time spent on repetitive tasks.</List.Item>
            <List.Item>Increased Revenue and ROI: Achieve 10-30% improvements in profitability.</List.Item>
            <List.Item>Scalability and Growth: Expand dynamically into new markets.</List.Item>
            <List.Item>Empowered Human Potential: Shift focus towards strategic and impactful work.</List.Item>
            <List.Item>Sustainability and Trust: Aligning solutions with societal and environmental goals.</List.Item>
          </List>
        </Segment>

        <Segment padded textAlign="center" style={{ background: '#f9f9f9' }}>
          <Header as="h2" dividing>
            Join Us in Shaping the Future of Work
          </Header>
          <p>Are you ready to amplify your potential, drive innovation, and foster sustainable growth? Join us at AZ1.AI and discover a new realm of collaboration where AI enhances human capability.</p>
          <Button
            style={{
              marginTop: '1em',
              marginBottom: '1em',
            }}
            primary size='huge' onClick={() => logIn(false)}
          >
            { available ? 'Get Started Today!' : 'Join a Whitelist' }
            <Icon name='right arrow' />
          </Button>
        </Segment>

        <Segment textAlign="center" style={{ padding: '5em 0' }}>
          <Header as="h2">
            Elevate your entrepreneurial journey with AZ1.AI — where AI meets human innovation for a brighter, sustainable future.
          </Header>
        </Segment>
        <br />
        <br />
      </Container>

      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='About' />
                <List link inverted>
                  <List.Item as='a'>
                    <a href='mailto:2@az1.ai'>
                      Contact Us
                    </a>
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={5}>
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
