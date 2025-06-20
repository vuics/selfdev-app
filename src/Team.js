import {
  Container,
  Divider,
  Segment,
  Header,
  Card,
  Icon,
  Image,
} from 'semantic-ui-react'
import Footer from './components/Footer'

const Team = () => (
  <>
    <Container>
      <Segment style={{ margin: '1em 0 1em', padding: '1em 3em 1em' }} placeholder>
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
      </Segment>
    </Container>

    <Footer />
  </>
)
export default Team

