import React from 'react'
import {
  Segment,
  Container,
  Grid,
  Header,
  List,
} from 'semantic-ui-react'

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
              <List link inverted>
                <List.Item as='a'>
                  <a href='mailto:admin@vuics.com'>
                    Contact Us
                  </a>
                </List.Item>
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
        <span>
          <a href="/privacy" style={{ color: 'silver' }}>
            Privacy Policy
          </a>
        </span>
      </Container>
    </Segment>
  </>)
}
export default Footer
