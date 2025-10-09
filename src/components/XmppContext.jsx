import React, {
  useEffect, useState, useRef, createContext, useContext
} from 'react'
import axios from 'axios'
import lodash from 'lodash'
const { isEmpty } = lodash

import { initXmppClient } from '../map/mapper'
import conf from '../conf'

export const XmppContext = createContext({});
export const useXmppContext = () => useContext(XmppContext);

export function XmppProvider({ children }) {
  const [ credentials, setCredentials ] = useState(null)
  const [ roster, setRoster ] = useState([])
  const [ presence, setPresence ] = useState({});
  const xmppRef = useRef(null);

  useEffect(() =>{
    async function fetchCredentials () {
      try {
        const response = await axios.post(`${conf.api.url}/xmpp/credentials`, { }, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          crossOrigin: { mode: 'cors' },
        })
        console.log('fetchCredentials response:', response)
        const { user, password, jid } = response.data
        setCredentials({ user, password, jid })
      } catch (err) {
        console.error('xmpp/credentials error:', err)

        // TODO: uncommment?
        // setResponseError(err?.response?.data?.message || t('Error retrieving credentials.'))
        // setLoading(false)
      }
    }
    fetchCredentials()
  }, [])

  const [ loading, setLoading ] = useState(true)
  const [ responseError, setResponseError ] = useState('')

  useEffect(() => {
    if (!credentials || xmppRef.current) return;   // prevent re-init

    const initXmpp = async () => {
      try {
        xmppRef.current = await initXmppClient({
          credentials,
          service: conf.xmpp.websocketUrl,
          domain: conf.xmpp.host,
          setLoading, setResponseError, setRoster, setPresence,
        })
        console.log('XMPP initialized:', xmppRef.current);
      } catch (err) {
        console.error('Failed to init XMPP:', err);
      }
    };

    initXmpp();
  }, [credentials]) // `presense` should not be supplied because it should only connect once

  return <XmppContext.Provider value={{
    xmppRef: xmppRef.current, credentials, roster, presence,
  }}>{children}</XmppContext.Provider>;
}

export function ConditionalXmppProvider({ children, user }) {
  if (!user || isEmpty(user) || !user.email ) {
    return children;
  }

  return (<XmppProvider>{children}</XmppProvider>);
}
