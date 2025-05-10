import {
  Container,
  Divider,
  Segment,
  Header,
  HeaderSubheader,
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
          Team Members
          <Divider />
          <HeaderSubheader>
            We are a diverse multi-national team of three co-founders with very strong business, technology, psychology background.
          </HeaderSubheader>
        </Header>
        <br/>
        <Card.Group centered>
          {/*
          <Card>
            <Image src='/images/team/hal-casteel.jpg' wrapped />
            <Card.Content>
              <Card.Header>
                Hal Casteel
              </Card.Header>
              <Card.Meta>
                Co-founder, CEO, COO
              </Card.Meta>
              <Card.Description>
                Hal Casteel builds and scales high-growth startups as a serial entrepreneur and SaaS expert. With deep expertise in AI, enterprise software, and healthcare IT, he transforms industries through digital innovation and enterprise-grade solutions.
              </Card.Description>
            </Card.Content>
            <Card.Content extra textAlign='center'>
              <a href="https://www.linkedin.com/in/hal-casteel-1a044530/">
                <Icon size='big' name='linkedin'/>
              </a>
              <a href="https://github.com/halcasteel">
                <Icon size='big' name='github' />
              </a>
            </Card.Content>
          </Card>
          */}
          <Card>
            <Image src='/images/team/artem-arakcheev.jpg' wrapped />
            <Card.Content>
              <Card.Header>
                Artem Arakcheev, PhD, DBA
              </Card.Header>
              <Card.Meta>
                {/*
                Co-founder, CTO, co-CEO
                */}
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
          {/*
          <Card>
            <Image src='/images/team/will-mckinley.jpg' wrapped />
            <Card.Content>
              <Card.Header>
                Will McKinley
              </Card.Header>
              <Card.Meta>
                Co-founder, Chief AI/UX Officer
              </Card.Meta>
              <Card.Description>
                Will McKinley excels as a UI/UX engineer and AI innovator, specializing in generative AI, RAG-enabled chatbots, and enterprise software. He bridges user experience with engineering to create scalable, high-impact solutions.
              </Card.Description>
            </Card.Content>
            <Card.Content extra textAlign='center'>
              <a href="https://www.linkedin.com/in/willmckinley/">
                <Icon size='big' name='linkedin'/>
              </a>
              <a href="https://gitlab.com/wmckinley">
                <Icon size='big' name='github' />
              </a>
            </Card.Content>
          </Card>
          */}
        </Card.Group>
      </Segment>
    </Container>

    <Footer />
  </>
)
export default Team

