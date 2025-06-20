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

const Footer = () => {
  return (<>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h3'>
                HyperAgency
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
                Info
              </Header>
              <List link inverted>
                <List.Item as='a'>
                  <a href='/'>
                    Home
                  </a>
                </List.Item>
                <List.Item as='a'>
                  <a href='/team'>
                    Team
                  </a>
                </List.Item>
                <List.Item as='a'>
                  <a href='/product'>
                    Product Features
                  </a>
                </List.Item>
                <List.Item as='a'>
                  <a href={conf.docs.url}>
                    Documentation
                  </a>
                </List.Item>
                <List.Item as='a'>
                  <a href='/pricing'>
                    Pricing
                  </a>
                </List.Item>
                <List.Item as='a'>
                  <a href='/security'>
                    Security
                  </a>
                </List.Item>
                <List.Item as='a'>
                  <a href='/mobile'>
                    Mobile apps (iOS/Android/Web)
                  </a>
                </List.Item>
                <List.Item as='a'>
                  <a href='/mission'>
                    Mission
                  </a>
                </List.Item>
                <List.Item as='a'>
                  <a href='/roadmap'>
                    Roadmap
                  </a>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <List link inverted>
                <List.Item as='a'>
                  <p>
                    Self-developing HyperAgency is uniquely tailored to your business needs.
                  </p>
                </List.Item>
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
          <a href="/llm.txt" style={{ color: 'silver' }}>
            LLM
          </a>
        </span>
      </Container>
    </Segment>
  </>)
}
export default Footer
