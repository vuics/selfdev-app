// import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {/*
        // <Button as={Link} to='/home'>
        */}
        <Button to='/home'>
          To homepage
        </Button>

      </header>
    </div>
  );
}

export default App;
