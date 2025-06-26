import {
  Divider,
  Header,
  Card,
  Icon,
  Image,
  Segment,
  // Container,
} from 'semantic-ui-react'

import ResponsiveContainer from './components/ResponsiveContainer'
import Footer from './components/Footer'
import { Divi, Outter, Inner, Empty } from './components/Design'
import {
  texturePattern,
  jigsawPattern,
} from './components/patterns'

export default function Team () {
  return (
    <ResponsiveContainer>
      <Empty />
      <Outter style={{
        height: '10vh',
        backgroundImage: texturePattern,
      }}/>

      <Divi />
      <Outter style={{
        backgroundImage: jigsawPattern
      }}>
        <Inner>
          <div style={{ padding: '1rem 1rem' }}>
            <Header as='h1' icon textAlign='center'>
              <Icon name='group' circular />
              <Header.Content>
                Team
                <Header.Subheader>
                  A diverse leadership team with deep expertise across business, technology, and psychology.
                </Header.Subheader>
              </Header.Content>
            </Header>

            <Divider />

            <Segment basic>
              <Card.Group centered>
                <Card>
                  <Image src='/images/team/artem-arakcheev.jpg' wrapped />
                  <Card.Content>
                    <Card.Header>
                      Artem Arakcheev, PhD, DBA
                    </Card.Header>
                    <Card.Meta>
                      Founder, CTO
                    </Card.Meta>
                    <Card.Description>
                      Artem Arakcheev drives innovation as a technology leader and entrepreneur, specializing in AI, quantum computing, and SaaS/PaaS startups. He architects cutting-edge solutions, excelling in smart contracts, cloud, and full-stack development.
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra textAlign='center'>
                    <a href="https://www.linkedin.com/in/artem-arakcheev/">
                      <Icon size='big' name='linkedin'/>
                    </a>
                    <a href="https://github.com/alphara">
                      <Icon size='big' name='github' />
                    </a>
                  </Card.Content>
                </Card>
                <Card>
                  <Image src='/images/team/kate-melnikova.jpg' wrapped />
                  <Card.Content>
                    <Card.Header>
                      Kate Melnikova
                    </Card.Header>
                    <Card.Meta>
                      HR Director
                    </Card.Meta>
                    <Card.Description>
                      Kate Melnikova leads with empathy and vision, bringing together expertise in psychology, human capital strategy, and art direction. She cultivates a strong team culture and actively represents the company at industry events, building meaningful connections.
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra textAlign='center'>
                    <a href="">
                      <Icon size='big' name='star outline' color='grey' disabled/>
                    </a>
                    {/*
                    <a href="">
                      <Icon size='big' name='linkedin'/>
                    </a>
                    <a href="">
                      <Icon size='big' name='github' />
                    </a>
                    */}
                  </Card.Content>
                </Card>
              </Card.Group>
            </Segment>
          </div>
        </Inner>
      </Outter>

      <Divi />
      <Outter style={{
        height: '10vh',
        backgroundImage: texturePattern,
      }}/>

      <Empty />

      <Footer />
    </ResponsiveContainer>
  )
}
