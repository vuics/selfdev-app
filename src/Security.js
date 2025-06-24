import {
  Divider,
  Header,
  List,
  Segment,
  Icon,
  Button,
  // Container,
  // Card,
  // Image,
} from 'semantic-ui-react'

import conf from './conf'
import ResponsiveContainer from './components/ResponsiveContainer'
import Footer from './components/Footer'
import { Divi, Outter, Inner, Empty } from './components/Design'
import {
  bricksPattern,
} from './components/patterns'
import { useIsMobile } from './components/Media'

export default function Security () {
  const isMobile = useIsMobile()
  return (
    <ResponsiveContainer>
      <Empty />
      <Outter style={{
        height: '10vh',
        backgroundImage: bricksPattern,
      }}/>

      <Divi />
      <Outter style={{
        backgroundImage: bricksPattern,
      }}>
        <Inner>
          <div style={{
            padding: isMobile ? '3rem 1rem' : '6rem 6rem',
          }}>

            <Header as='h1' icon textAlign='center'>
              <Icon name='shield alternate' circular />
              <Header.Content>
                Security at HyperAgency
              </Header.Content>
            </Header>

            <Segment basic>
              <p>
                At <strong>HyperAgency</strong>, the security and privacy of our platform, our users, and your data are our highest priorities. 
                We are committed to building agentic AI systems that are not only powerful and autonomous, but also safe and resilient.
              </p>

              <Divider section />

              <Header as='h2'>Responsible Disclosure</Header>
              <p>
                We deeply appreciate researchers, developers, and users who help us keep HyperAgency secure. If you discover a vulnerability,
                we encourage responsible disclosure.
              </p>
              <p>
                <strong>Email us:</strong>{' '}
                <a href={`mailto:${conf.contact.email}`}>{conf.contact.email}</a>
              </p>

              <Header as='h4'>Please include, if possible:</Header>
              <List bulleted>
                <List.Item>Steps to reproduce the issue or a working proof-of-concept (PoC).</List.Item>
                <List.Item>Any tools or libraries used, including version numbers.</List.Item>
                <List.Item>Tool output or logs related to the vulnerability.</List.Item>
              </List>

              <Divider section />

              <Header as='h2'>Commitment to Security</Header>
              <List bulleted>
                <List.Item>Secure software development lifecycle (SSDLC).</List.Item>
                <List.Item>Regular dependency scanning and patching.</List.Item>
                <List.Item>Penetration testing and third-party security audits.</List.Item>
                <List.Item>Principle of least privilege across infrastructure.</List.Item>
                <List.Item>Encryption at rest and in transit.</List.Item>
              </List>

              <Divider section />

              <Header as='h2'>Open Source Security</Header>
              <p>
                For vulnerabilities in our open-source components, please refer to our GitHub repositories. 
                Many have <code>SECURITY.md</code> files with further guidance.
              </p>

              <Button
                color='black'
                icon='github'
                content='Visit GitHub'
                as='a'
                href={conf.contact.github}
                target='_blank'
                rel='noopener noreferrer'
                style={{ marginBottom: '0.5em' }}
              />
              <br />
              <Button
                basic
                icon='file alternate'
                content='Read SECURITY.md'
                as='a'
                href={`${conf.contact.github}/blob/main/SECURITY.md`}
                target='_blank'
                rel='noopener noreferrer'
              />

              <Divider section />

              <Header as='h2'>Contact</Header>
              <p>
                Have questions or concerns about security at HyperAgency? Reach out at{' '}
                <a href={`mailto:${conf.contact.email}`}>{conf.contact.email}</a>
              </p>
            </Segment>

          </div>
        </Inner>
      </Outter>

      <Divi />
      <Outter style={{
        height: '10vh',
        backgroundImage: bricksPattern,
      }}/>

      <Empty />
      <Footer />
    </ResponsiveContainer>
  )
}
