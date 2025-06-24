import {
  Divider,
  Header,
  Container,
  Segment,
  Icon,
  // Card,
  // Image,
} from 'semantic-ui-react'

import ResponsiveContainer from './components/ResponsiveContainer'
import Footer from './components/Footer'
import { Divi, Outter, Inner, Empty } from './components/Design'
import {
  texturePattern,
} from './components/patterns'
import { useIsMobile } from './components/Media'

export default function Pricing () {
  const isMobile = useIsMobile()
  return (
    <ResponsiveContainer>

      <Outter style={{
        height: '10vh',
        backgroundImage: texturePattern,
      }}/>

      <Divi />
      <Outter style={{
        // height: '10vh',
        textAlign: 'center'
      }}>
        <Container style={{ paddingTop: "3em", paddingBottom: '3rem' }}>
          <Header as='h1' icon textAlign='center'>
            <Icon name='line graph' circular />
            <Header.Content>
              From zero to IPO
            </Header.Content>
          </Header>
          <Segment basic>
            <p>
              Designed for every stage of your journey. Start today, no credit card required.
            </p>
          </Segment>
        </Container>
      </Outter>

      <Divi />
      <Outter style={{
        height: '10vh',
        backgroundImage: texturePattern,
      }}/>

      <Divi />
      <Outter style={{
        backgroundImage: texturePattern,
      }}>
        <Inner>
          <div style={{
            padding: isMobile ? '3rem 1rem' : '6rem 6rem',
          }}>
            <Header as='h1' icon textAlign='center'>
              <Icon name='tags' circular />
              <Header.Content>
                Pricing
              </Header.Content>
            </Header>
            <Divider />
            <Segment basic>
              <p>
                ...
              </p>
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
