import {
  Divider,
  Header,
  Image,
  Segment,
  Icon,
  Button,
  List,
  // Container,
  // Card,
} from 'semantic-ui-react'

import conf from './conf'
import ResponsiveContainer from './components/ResponsiveContainer'
import Footer from './components/Footer'
import { Divi, Outter, Inner, Empty } from './components/Design'
import {
  dotsPattern,
  dotsSize,
} from './components/patterns'
import { useIsMobile } from './components/Media'

export default function Mobile () {
  const isMobile = useIsMobile()
  return (
    <ResponsiveContainer>
      <Empty />
      <Outter style={{
        height: '10vh',
        backgroundImage: dotsPattern,
        backgroundSize: dotsSize,
      }}/>

      <Divi />
      <Outter style={{
        backgroundImage: dotsPattern,
        backgroundSize: dotsSize,
      }}>
        <Inner>
          <div style={{
            padding: isMobile ? '3rem 1rem' : '6rem 6rem',
          }}>
            <Header as='h1' icon textAlign='center'>
              <Icon name='mobile alternate' circular />
              <Header.Content>
                Mobile Apps
              </Header.Content>
            </Header>
            <Segment basic>
              <Header as='h3'>
                Options
              </Header>
              <p>
                There are 2 options for mobile apps available:
              </p>
              <List bulleted>
                <List.Item as='a' href={"#native"}>Native iOS and Android apps.</List.Item>
                <List.Item as='a' href={"#web"}>Mobile web app.</List.Item>
              </List>
            </Segment>

            <Divider section />

            <Segment basic>
              <Header as='h3' id="native">
                Native apps
                <Header.Subheader>
                  Install via Expo
                </Header.Subheader>
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
              <Header as='h3' id="web">
              </Header>
              <Header as='h3'>
                Mobile Web
                <Header.Subheader>
                  Open a Link
                </Header.Subheader>
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
        backgroundImage: dotsPattern,
        backgroundSize: dotsSize,
      }}/>

      <Empty />
      <Footer />
    </ResponsiveContainer>
  )
}
