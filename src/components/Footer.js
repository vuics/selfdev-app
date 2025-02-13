import React from 'react'
import {
  Segment,
  Container,
  Grid,
  Header,
  List,
} from 'semantic-ui-react'

const Footer = () => {
  return (
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
  )
}
export default Footer
