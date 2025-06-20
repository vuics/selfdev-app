import React from 'react'
import {
  Segment,
  Container,
  Grid,
  Header,
  List,
  Icon,
} from 'semantic-ui-react'

import conf from '../conf.js'
import Logo from './Logo'

const Footer = () => {
  return (<>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h3' style={{ margin: 0 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textAlign: 'left',
                }}>
                  <Logo size='milli' gray />
                  <Header.Content style={{ display: 'flex', flexDirection: 'column' }}>
                    HyperAgency
                  </Header.Content>
                </div>
              </Header>
              { conf.contact.email && (
                <List link inverted>
                  <List.Item as='a'>
                    <a href={`mailto:${conf.contact.email}`}>
                      <Icon link inverted color='grey' name='mail' />
                      Contact Us
                    </a>
                  </List.Item>
                </List>
              )}
              <List link inverted>
                { conf.contact.github && (
                  <List.Item as='a'>
                    <a href={conf.contact.github}>
                      <Icon link inverted color='grey' name='github' />
                      GitHub
                    </a>
                  </List.Item>
                )}
                { conf.contact.linkedin && (
                  <List.Item as='a'>
                    <a href={conf.contact.linkedin}>
                      <Icon link inverted color='grey' name='linkedin' />
                      LinkedIn
                    </a>
                  </List.Item>
                )}
                { conf.contact.discord && (
                  <List.Item as='a'>
                    <a href={conf.contact.discord}>
                      <Icon link inverted color='grey' name='discord' />
                      Discord
                    </a>
                  </List.Item>
                )}
                { conf.contact.youtube && (
                  <List.Item as='a'>
                    <a href={conf.contact.youtube}>
                      <Icon link inverted color='grey' name='youtube' />
                      YouTube
                    </a>
                  </List.Item>
                )}
                { conf.contact.x && (
                  <List.Item as='a'>
                    <a href={conf.contact.x}>
                      <Icon link inverted color='grey' name='twitter' />
                      X
                    </a>
                  </List.Item>
                )}
              </List>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header inverted as='h4'>
                <Header.Content>
                  <Icon inverted color='grey' name='info circle' />
                  Info
                </Header.Content>
              </Header>
              <List link inverted>
                <List.Item as='a'>
                  <a href='/'>
                    <Icon link inverted color='grey' name='home' />
                    Home
                  </a>
                </List.Item>
                <List.Item as='a'>
                  <a href={conf.docs.url}>
                    <Icon link inverted color='grey' name='book' />
                    Documentation
                  </a>
                </List.Item>
                <List.Item as='a'>
                  <a href='/pricing'>
                    <Icon link inverted color='grey' name='tags' />
                    Pricing
                  </a>
                </List.Item>
                <List.Item as='a'>
                  <a href='/security'>
                    <Icon link inverted color='grey' name='shield' />
                    Security
                  </a>
                </List.Item>
                <List.Item as='a'>
                  <a href='/mobile'>
                    <Icon link inverted color='grey' name='mobile alternate' />
                    Mobile apps
                  </a>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header inverted as='h4'>
                <Header.Content>
                  <Icon inverted color='grey' name='university' />
                  About Us
                </Header.Content>
                <Header.Subheader style={{ color: 'gray' }}>
                  Self-developing HyperAgency is uniquely tailored to your business needs.
                </Header.Subheader>
              </Header>
              <List link inverted>
                <List.Item as='a'>
                  <p>
                  </p>
                </List.Item>
                { conf.team.enable && (
                  <List.Item as='a'>
                    <a href='/team'>
                      <Icon link inverted color='grey' name='group' />
                      Team
                    </a>
                  </List.Item>
                )}
                <List.Item as='a'>
                  <a href='/mission'>
                    <Icon link inverted color='grey' name='globe' />
                    Mission
                  </a>
                </List.Item>
                { conf.roadmap.enable && (
                  <List.Item as='a'>
                    <a href='/roadmap'>
                      <Icon link inverted color='grey' name='map outline' />
                      Roadmap
                    </a>
                  </List.Item>
                )}
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
    <Segment inverted vertical style={{ padding: '1em 0em 1em', backgroundColor: '#121212' }}>
      <Container textAlign="center" style={{ color: 'gray' }}>
        <span>© 2024-2025 Vuics LLC. All rights reserved.</span>
        <span style={{ margin: '0 1.5em' }}>
          <a href="/terms" style={{ color: 'silver' }}>
            Terms of Service
          </a>
        </span>
        <span style={{ margin: '0 1em' }}>
          <a href="/privacy" style={{ color: 'silver' }}>
            Privacy Policy
          </a>
        </span>
        <span style={{ margin: '0 1em' }}>
          <a href="/llms.txt" style={{ color: 'silver' }}>
            LLMs
          </a>
        </span>
      </Container>
    </Segment>
  </>)
}
export default Footer
