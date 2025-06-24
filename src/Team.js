import {
  Divider,
  Header,
  Card,
  Icon,
  Image,
  // Container,
  // Segment,
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
            <Header as='h1' textAlign='center'>
              Team
              <Divider />
              <Header.Subheader>
                A solo-founder with very strong business, technology, psychology background.
              </Header.Subheader>
            </Header>
            <br/>
            <Card.Group centered>
              <Card>
                <Image src='/images/team/artem-arakcheev.jpg' wrapped />
                <Card.Content>
                  <Card.Header>
                    Artem Arakcheev, PhD, DBA
                  </Card.Header>
                  <Card.Meta>
                    Founder
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
            </Card.Group>
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
