import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import conf from './conf.js'

// import App from './App'
import Home from './Home'
import Terms from './Terms'
import Privacy from './Privacy'
import Signup from './Signup'
import Login from './Login'
import Forgot from './Forgot'
import Reset from './Reset'
import Logout from './Logout'
import Chat from './Chat'
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
  }, [])
  return children
}

const root = ReactDOM.createRoot(document.getElementById('root'));

const Index = () => {
  const loc = useLocation()
  return (
  <>
    <Routes>
      <Route path="/" element={<Home />}/>
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
