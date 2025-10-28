import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Loader, } from 'semantic-ui-react'

import conf from './conf.js'
import './i18n'
import { IndexContext, usePersistentState, useIndexContext } from './components/IndexContext'
import { ConditionalXmppProvider } from './components/XmppContext'
import CookieBanner from './components/CookieBanner'
import UnamiLoader from './components/UnamiLoader'
import TawkLoader from './components/TawkLoader'
import TiledeskLoader from './components/TiledeskLoader'

// import App from './App'
import Home from './Home'

import Terms from './Terms'
import Privacy from './Privacy'
import Cookies from './Cookies'
import Disclaimer from './Disclaimer'
import Acceptable from './Acceptable'

import Signup from './Signup'
import Login from './Login'
import Forgot from './Forgot'
import Reset from './Reset'
import Logout from './Logout'

import Pricing from './Pricing'
import Security from './Security'
import Mobile from './Mobile'
import Team from './Team'
import Mission from './Mission'
import Roadmap from './Roadmap'

import Chat from './Chat'
import Talk from './Talk'
import Map from './Map'
import Meet from './Meet'
import Hive from './Hive'
import Apps from './Apps'
import Flow from './Flow'
import Node from './Node'
import Code from './Code'
import Note from './Note'
import Sell from './Sell'
import Train from './Train'
import Docs from './Docs'
import Error from './Error'
import Profile from './Profile'
import Keys from './Keys'
import Vault from './Vault'
import Subscription from './Subscription'
import Subscribe from './Subscribe'
import Wallet from './Wallet'
import Settings from './Settings'
import Landing from './Landing'

import Admin from './Admin'

import reportWebVitals from './reportWebVitals';

const Test = () => (<div>Test</div>)

const Private = ({ children }) => {
  const { user } = useIndexContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || !user.email) {
      console.error('Unauthorized. Redirecting to /login')
      navigate('/login', { replace: true })
    }
  }, [user, navigate])

  if (!user || !user.email) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'  // full viewport height
      }}>
        <Loader active inline='centered' size='large' />
      </div>
    )
  }

  return children
}

const Secret = ({ children }) => {
  const { user } = useIndexContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || !user.roles.includes('admin')) {
      console.error('Unauthorized. Redirecting to /login')
      navigate('/login', { replace: true })
    }
  }, [user, navigate])

  if (!user || !user.roles.includes('admin')) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'  // full viewport height
      }}>
        <Loader active inline='centered' size='large' />
      </div>
    )
  }

  return children
}

const root = ReactDOM.createRoot(document.getElementById('root'));

function Index () {
  const navigate = useNavigate()
  const [available, setAvailable] = useState(true)
  const [user, setUser, clearUser] = usePersistentState('user', {});
  const [country, setCountry, clearCountry] = usePersistentState('country', '');
  const [cookieConsent, setCookieConsent] = usePersistentState('cookieConsent', null)

  const logIn = (openLogin) => {
    if (available) {
      if (openLogin) {
        navigate('/login')
      } else {
        navigate('/signup')
      }
    } else {
      console.log('navigate to interestForm')
      window.open(conf.interestForm.url, '_blank')
    }
  }

  useEffect(() => {
    // Run only once
    // console.log('conf.api.url:', conf.api.url)
    // console.log(`Getting ${conf.api.url}/available`)

    axios.get(`${conf.api.url}/available`)
      .then((response) => {
        if (response.data.status === 'available') {
          console.log('The API is available. You can log in.')
        } else {
          console.warn('Unknown availability status. Join a Whitelist.')
          setAvailable(false)
        }
      })
      .catch(function (error) {
        console.error('error:', error);
        console.warn('The API is unavailable. Join a Whitelist.')
        setAvailable(false)
      })
  }, []);

  useEffect(() => {
    if (conf.protocol.enable && ("registerProtocolHandler" in navigator)) {
      try {
        navigator.registerProtocolHandler(
          conf.protocol.proto,
          `${window.location.origin}/apps?uri=%s`,
          "HyperAgency AgentOS Apps Installer"
        );
        console.log("Protocol handler registered!");
      } catch (err) {
        console.warn("Protocol handler registration failed:", err);
      }
    }
  }, []);

  return (
  <IndexContext.Provider value={{
    available, logIn,
    user, setUser, clearUser,
    country, setCountry, clearCountry,
    cookieConsent, setCookieConsent,
  }}>
    <ConditionalXmppProvider user={user}>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/test" element={<Test />}/>

        <Route path="/terms" element={<Terms />}/>
        <Route path="/privacy" element={<Privacy />}/>
        <Route path="/cookies" element={<Cookies />}/>
        <Route path="/disclaimer" element={<Disclaimer />}/>
        <Route path="/acceptable" element={<Acceptable />}/>

        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/forgot" element={<Forgot />}/>
        <Route path="/reset" element={<Reset />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="/landing/:id" element={<Landing />}/>

        { conf.pricing.enable && (
          <Route path="/pricing" element={<Pricing />}/>
        )}
        { conf.security.enable && (
          <Route path="/security" element={<Security />}/>
        )}
        { conf.mobile.enable && (
          <Route path="/mobile" element={<Mobile />}/>
        )}

        { conf.team.enable && (
          <Route path="/team" element={<Team />}/>
        )}
        { conf.mission.enable && (
          <Route path="/mission" element={<Mission />}/>
        )}
        { conf.roadmap.enable && (
          <Route path="/roadmap" element={<Roadmap />}/>
        )}

        { conf.chat.enable && (
          <Route path="/chat" element={(<Private> <Chat /> </Private>)}/>
        )}
        { conf.talk.enable && (
          <Route path="/talk" element={(<Private> <Talk /> </Private>)}/>
        )}
        { conf.map.enable && (
          <Route path="/map" element={(<Private> <Map /> </Private>)}/>
        )}
        { conf.meet.enable && (
          <Route path="/meet" element={(<Private> <Meet /> </Private>)}/>
        )}
        { conf.hive.enable && (
          <Route path="/hive" element={(<Private> <Hive/> </Private>)}/>
        )}
        { conf.apps.enable && (
          <Route path="/apps" element={(<Private> <Apps/> </Private>)}/>
        )}
        { conf.flow.enable && (
          <Route path="/flow" element={(<Private> <Flow /> </Private>)}/>
        )}
        { conf.node.enable && (
          <Route path="/node" element={(<Private> <Node /> </Private>)}/>
        )}
        { conf.code.enable && (
          <Route path="/code" element={(<Private> <Code /> </Private>)}/>
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
        { conf.docs.enable && (
          <Route path="/docs" element={(<Private> <Docs /> </Private>)}/>
        )}

        { conf.profile.enable && (
          <Route path='/profile' element={(<Private> <Profile /> </Private>)}/>
        )}
        { conf.keys.enable && (
          <Route path='/keys' element={(<Private> <Keys /> </Private>)}/>
        )}
        { conf.vault.enable && (
          <Route path='/vault' element={(<Private> <Vault /> </Private>)}/>
        )}
        { conf.subscription.enable && (<>
          <Route path='/subscription' element={(<Private> <Subscription/> </Private>)}/>
        </>)}
        { conf.subscribe.enable && (<>
          <Route path='/subscribe' element={(<Private> <Subscribe/> </Private>)}/>
        </>)}
        { conf.wallet.enable && (<>
          <Route path='/wallet' element={(<Private> <Wallet/> </Private>)}/>
        </>)}
        { conf.settings.enable && (<>
          <Route path='/settings' element={(<Private> <Settings/> </Private>)}/>
        </>)}

        { conf.admin.enable && (<>
          <Route path='/admin' element={(<Private><Secret> <Admin/> </Secret></Private>)}/>
        </>)}

        <Route path="*" element={<Error />}/>
      </Routes>
    </ConditionalXmppProvider>

    { conf.cookie.banner && (
      <CookieBanner />
    )}
    <UnamiLoader />
    <TawkLoader />
    <TiledeskLoader />
  </IndexContext.Provider>
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
