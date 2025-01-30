import React, { useEffect, useState } from 'react'
import {
  Container,
} from 'semantic-ui-react'
import Iframe from 'react-iframe'
import Menubar from './components/Menubar'
import conf from './conf.js'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const Code = () => {
  const { height, width } = useWindowDimensions();

  // console.log('width:', width, ' height:', height)
  return (
    <>
      <Container>
        <Menubar />
      </Container>
      <Iframe url={conf.code.ideUrl}
              width={width}
              height={height-conf.code.topOffset}
              id=""
              className=""
              display="block"
              position="relative"/>
    </>
  )
}

export default Code

// AI! I want to have a terminal in the browser in my React.js application that I build. When user opens the Code.js component it sees the terminal window in the browser and can type commands. Every command that the user types goes to the backend API that is executed inside of the Docker container. The terminal is attached to the bash that is executed inside of the docker container. Commands that user inputs in the web terminal gets executed inside of the docker containers on backend. User sees the output of those commands in the browser terminal. How would you build such a system? What npm react.js components would you use? How would you develop the backend on Node.js?
