import {
  Divider,
  Header,
  Image,
  Segment,
  Icon,
  Button,
  // Container,
  // Card,
} from 'semantic-ui-react'

import conf from './conf'
import ResponsiveContainer from './components/ResponsiveContainer'
import Footer from './components/Footer'
import { Divi, Outter, Inner, Empty } from './components/Design'
import { texturePattern, } from './components/patterns'
import { useIsMobile } from './components/Media'

export default function Mobile () {
  const isMobile = useIsMobile()
  return (
    <ResponsiveContainer>
      <Empty />
      <Outter style={{
        height: '10vh',
      }}/>

      <Divi />
      <Outter style={{
        backgroundImage: texturePattern,
      }}>
        <Inner>
          <div style={{
            padding: isMobile ? '3rem 1rem' : '6rem 6rem',
          }}>
            <Header as='h1' textAlign='center'>
              Mobile Apps
              <Divider />
            </Header>

            <Segment basic>
              <Header as='h3'>
                Install via Expo
              </Header>
              <p>
                You can experience our mobile app instantly using <strong>Expo Go</strong>. First, download the Expo Go app from the app store:
              </p>
              <Button
                color='black'
                icon
                labelPosition='left'
                as='a'
                href='https://expo.dev/client'
                target='_blank'
                rel='noopener noreferrer'
                style={{ marginBottom: '1em' }}
              >
                <Icon name='external alternate' />
                Get Expo Go
              </Button>

              <p>
                Then scan the QR code below to open our app in Expo:
              </p>

              <Image src='/images/qr/eas-update.svg' size='small' centered />
              <p style={{ textAlign: 'center' }}>
                <strong>Runtime Version:</strong> 1.0.0<br />
                <strong>Published:</strong> May 24, 2025 – 4:37 PM
              </p>
            </Segment>

            <Divider section />

            <Segment basic>
              <Header as='h3'>
                Mobile Web Version
              </Header>
              <p>
                You can also use our fully responsive mobile web app, accessible directly in your browser:
              </p>
              <Button
                color='blue'
                icon='mobile alternate'
                content='Open Mobile Web App'
                as='a'
                href={conf.mobile.webAppUrl}
                target='_blank'
                rel='noopener noreferrer'
              />
            </Segment>
          </div>
        </Inner>
      </Outter>

      <Divi />
      <Outter style={{
        height: '10vh',
      }}/>

      <Empty />
      <Footer />
    </ResponsiveContainer>
  )
}
