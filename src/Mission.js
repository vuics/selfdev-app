import {
  Divider,
  Header,
  Segment,
  Icon,
  // Container,
  // Card,
  // Image,
} from 'semantic-ui-react'

import conf from './conf'
import ResponsiveContainer from './components/ResponsiveContainer'
import Footer from './components/Footer'
import { Divi, Outter, Inner, Empty } from './components/Design'
import { useIsMobile } from './components/Media'
import {
  diagonalsPattern,
} from './components/patterns'

export default function Mission () {
  const isMobile = useIsMobile()
  return (
    <ResponsiveContainer>
      <Empty />
      <Outter style={{
        height: '10vh',
        backgroundImage: diagonalsPattern,
      }}/>

      <Divi />
      <Outter style={{
        backgroundImage: diagonalsPattern,
      }}>
        <Inner>
          <div style={{
            padding: isMobile ? '3rem 1rem' : '6rem 6rem',
          }}>
            <Header as='h1' icon textAlign='center'>
              <Icon name='bullseye' circular />
              <Header.Content>
                Mission Statement
              </Header.Content>
            </Header>
            <Divider />
            <Segment basic>
              <p>
                At <strong>{conf.app.name}</strong>, our mission is to empower humanity by providing an autonomous agentic platform that operates businesses 24/7, generating revenue and granting more time to human owners for strategic decision-making.
              </p>
            </Segment>
          </div>
        </Inner>
      </Outter>

      <Divi />
      <Outter style={{
        height: '10vh',
        backgroundImage: diagonalsPattern,
      }}/>

      <Divi />
      <Outter style={{
        backgroundImage: diagonalsPattern,
      }}>
        <Inner>
          <div style={{
            padding: isMobile ? '3rem 1rem' : '6rem 6rem',
          }}>
            <Header as='h1' icon textAlign='center'>
              <Icon name='eye' circular />
              <Header.Content>
                Visionary Foundations
              </Header.Content>
            </Header>
            <Divider />
            <Segment basic>
              <p>
                Envision a future where intelligent agentic teams drive business forward — teams that are <strong>self-developing, self-selling, and self-finding</strong>.
              </p>
              <p>
                Built on these three foundational pillars, our platform empowers agentic AI to collaborate on every aspect of business development — from discovering and funding startups to marketing, sales, research, development, and administration. These teams work alongside humans, learning from human creativity, behavior, and strategy — with the ultimate goal of autonomously evolving to handle the full spectrum of business operations.
              </p>
            </Segment>
          </div>
        </Inner>
      </Outter>

      <Divi />
      <Outter style={{
        height: '10vh',
        backgroundImage: diagonalsPattern,
      }}/>

      <Empty />

      <Footer />
    </ResponsiveContainer>
  )
}
