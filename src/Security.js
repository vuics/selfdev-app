import {
  Divider,
  Header,
  // Container,
  // Segment,
  // Card,
  // Icon,
  // Image,
} from 'semantic-ui-react'

import Footer from './components/Footer'
import { Divi, Outter, Inner, Empty } from './components/Design'
import {
  bricksPattern,
} from './components/patterns'

export default function Pricing () {
  return (<>
    <Empty />
    <Outter style={{
      height: '10vh',
    }}/>

    <Divi />
    <Outter style={{
      backgroundImage: bricksPattern,
    }}>
      <Inner>
        <div style={{ padding: '6rem 6rem 6rem 6rem' }}>
          <Header as='h1' textAlign='center'>
            Security
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
  </>)
}
