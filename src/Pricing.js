import {
  Divider,
  Header,
  Container,
  // Segment,
  // Card,
  // Icon,
  // Image,
} from 'semantic-ui-react'

import ResponsiveContainer from './components/ResponsiveContainer'
import Footer from './components/Footer'
import { Divi, Outter, Inner, Empty } from './components/Design'
import { squaresInSquaresPattern, } from './components/patterns'

export default function Pricing () {
  return (<>
    <ResponsiveContainer>

      <Outter style={{
        height: '10vh',
      }}/>

      <Divi />
      <Outter style={{
        // height: '10vh',
        textAlign: 'center'
      }}>
        <Container style={{ paddingTop: "3em", paddingBottom: '3rem' }}>
          <Header as="h1">
            From zero to IPO
          </Header>
          <p>
            Designed for every stage of your journey. Start today, no credit card required.
          </p>
        </Container>
      </Outter>

      <Divi />
      <Outter style={{
        height: '10vh',
      }}/>

      <Divi />
      <Outter style={{
        // backgroundImage: diagonalsPattern,
        backgroundImage: squaresInSquaresPattern,
      }}>
        <Inner>
          <div style={{ padding: '6rem 6rem 6rem 6rem' }}>
            <Header as='h1' textAlign='center'>
              Pricing
              <Divider />
            </Header>
            <br/>
            <p>
            </p>
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
  </>)
}
