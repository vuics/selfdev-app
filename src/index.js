import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import conf from './conf.js'

// import App from './App'
import Home from './Home'
import Team from './Team'
import Product from './Product'
import Terms from './Terms'
import Privacy from './Privacy'
import Signup from './Signup'
import Login from './Login'
import Forgot from './Forgot'
import Reset from './Reset'
import Logout from './Logout'
import Chat from './Chat'
import Talk from './Talk'
import Code from './Code'
import Build from './Build'
import Open from './Open'
import Note from './Note'
import Sell from './Sell'
import Train from './Train'
import Error from './Error'
import Profile from './Profile'
import Keys from './Keys'
import Subscription from './Subscription'
import Landing from './Landing'

import reportWebVitals from './reportWebVitals';

const Test = () => (<div>Test</div>)

const Private = ({ children }) => {
  const navigate = useNavigate()
  useEffect(() => {
    console.log('Checking authentication')
    if(!localStorage.getItem('user.email')) {
      console.error('Unauthorized. Redirect to /')
      navigate('/login')
    }
  })
  return children
}

const root = ReactDOM.createRoot(document.getElementById('root'));

const Index = () => {
  return (
  <>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/team" element={<Team />}/>
      <Route path="/product" element={<Product />}/>
      <Route path="/test" element={<Test />}/>
      <Route path="/terms" element={<Terms />}/>
      <Route path="/privacy" element={<Privacy />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/forgot" element={<Forgot />}/>
      <Route path="/reset" element={<Reset />}/>
      <Route path="/logout" element={<Logout />}/>
      <Route path="/landing/:id" element={<Landing />}/>

      { conf.chat.enable && (
        <Route path="/chat" element={(<Private> <Chat /> </Private>)}/>
      )}
      { conf.talk.enable && (
        <Route path="/talk" element={(<Private> <Talk /> </Private>)}/>
      )}
      { conf.code.enable && (
        <Route path="/code" element={(<Private> <Code /> </Private>)}/>
      )}
      { conf.build.enable && (
        <Route path="/build" element={(<Private> <Build /> </Private>)}/>
      )}
      { conf.open.enable && (
        <Route path="/open" element={(<Private> <Open /> </Private>)}/>
      )}
      { conf.note.enable && (
        <Route path="/note" element={(<Private> <Note /> </Private>)}/>
      )}
      { conf.sell.enable && (
        <Route path="/sell" element={(<Private> <Sell /> </Private>)}/>
      )}
      { conf.train.enable && (
        <Route path="/train" element={(<Private> <Train /> </Private>)}/>
      )}

      { conf.profile.enable && (
        <Route path='/profile' element={(<Private> <Profile /> </Private>)}/>
      )}
      { conf.keys.enable && (
        <Route path='/keys' element={(<Private> <Keys /> </Private>)}/>
      )}
      { conf.subscription.enable && (
        <Route path='/subscription' element={(<Private> <Subscription/> </Private>)}/>
      )}
      <Route path="*" element={<Error />}/>
    </Routes>
  </>
  )
}
root.render(
  <BrowserRouter>
    <Index/>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
