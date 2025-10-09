import React, {
  useEffect, useState, useRef, createContext, useContext
} from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import lodash from 'lodash'
const { isEmpty } = lodash

import { initXmppClient, createOnChatMessage, } from '../map/mapper'
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


  // FIXME: remove
  const map = {
    flow: {
      nodes: [],
      edges: [],
    }
  }
  const getNodes = () => map.flow.nodes;
  const setNodes = (updater) => map.flow.nodes = updater(map.flow.nodes);
  // const getEdges = () => map.flow.edges;
  // const setEdges = (updater) => map.flow.edges = updater(map.flow.edges);
  const [ loading, setLoading ] = useState(true)
  const [ responseError, setResponseError ] = useState('')

  useEffect(() => {
    if (!credentials || xmppRef.current) return;   // prevent re-init

    const initXmpp = async () => {
      try {
        const onChatMessage = createOnChatMessage({
          getNodes, setNodes, shareUrlPrefix: conf.xmpp.shareUrlPrefix,
        })
        xmppRef.current = await initXmppClient({
          credentials,
          service: conf.xmpp.websocketUrl,
          domain: conf.xmpp.host,
          setLoading, setResponseError, setRoster, setPresence,
          onChatMessage,
        })
        console.log('XMPP initialized:', xmppRef.current);
      } catch (err) {
        console.error('Failed to init XMPP:', err);
      }
    };

    initXmpp();
  }, [credentials]) // `presense` should not be supplied because it should only connect once

  return <XmppContext.Provider value={{
    // xmppRefCurrent: xmppRef.current,
    credentials, roster, presence, // setRoster, setPresence,
  }}>{children}</XmppContext.Provider>;
}

export function ConditionalXmppProvider({ children, user }) {
  const location = useLocation();
  const shouldUseXmpp = user && !isEmpty(user) // && ["/map", "/hive"].includes(location.pathname);

  if (!shouldUseXmpp) return children;

  return (
    <XmppProvider
      // credentials={user.credentials}
      // service="wss://your-xmpp-service"
      // domain="yourdomain.com"
    >
      {children}
    </XmppProvider>
  );
}
