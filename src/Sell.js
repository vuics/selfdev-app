import React from 'react'
import {
  Container,
} from 'semantic-ui-react'
import Iframe from 'react-iframe'
import Menubar from './components/Menubar'
import conf from './conf.js'
import { useWindowDimensions } from './helper.js'

const Sell = () => {
  const { height, width } = useWindowDimensions();

  const iframe = document.querySelector('sell-frame');
  if(iframe) {
    iframe.onload = function() {
      // Get the current URL of the iframe
      const currentURL = iframe.contentWindow.location.href;
      console.log('iframe loaded:', currentURL);
    }
  };

  // console.log('width:', width, ' height:', height)
  return (
    <>
      <Container>
        <Menubar />
      </Container>
      <Iframe url={conf.sell.url}
              width={width}
              height={height - conf.sell.topOffset}
              id="sell-frame"
              className=""
              display="block"
              position="relative"
              />
    </>
  )
}

export default Sell

