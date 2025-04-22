const bool = (val) => ['true', '1', true, 1].includes(val)
// const json = (val) => val && JSON.parse(val)
const num = (val) => val ? Number(val) : (val === 0 ? 0 : undefined)
// const arr = (str) => str ? str.split(',') : []

const conf = {
  contact: {
    email: process.env.REACT_APP_CONTACT_EMAIL || 'admin@az1.ai'
  },

  api: {
    url: process.env.REACT_APP_API_URL || 'http://localhost:6369/v1',
  },

  interestForm: {
    url: process.env.REACT_APP_INTEREST_FORM_URL || 'https://forms.gle/kXhRqMe8RquB377J6',
  },

  iframe: {
    topOffset: num(process.env.REACT_APP_IFRAME_TOP_OFFSET || 50),
    // topOffset: num(process.env.REACT_APP_IFRAME_TOP_OFFSET || 0),
  },

  account: {
    start: process.env.REACT_APP_ACCOUNT_START || '/chat',
  },

  chat: {
    enable: bool(process.env.REACT_APP_CHAT_ENABLE || true),
    limit: 5,
  },

  talk: {
    enable: bool(process.env.REACT_APP_TALK_ENABLE || false),
  },

  meet: {
    enable: bool(process.env.REACT_APP_MEET_ENABLE || false),
  },

  hive: {
    enable: bool(process.env.REACT_APP_HIVE_ENABLE || false),
    skip: 0,
    limit: 1000,
  },

  flow: {
    enable: bool(process.env.REACT_APP_FLOW_ENABLE || false),
    url: process.env.REACT_APP_FLOW_URL || 'http://localhost:7860/',

    widget: bool(process.env.REACT_APP_FLOW_WIDGET || false),
    widgetOffset: num(process.env.REACT_APP_FLOW_WIDGET_OFFSET || 50),
    flowId: process.env.REACT_APP_FLOW_FLOW_ID || '0d9fa75c-61f6-4a21-afe6-609975ea4082',
  },

  code: {
    enable: bool(process.env.REACT_APP_CODE_ENABLE || false),
    url: process.env.REACT_APP_CODE_URL || 'http://localhost:9390/',
  },

  build: {
    enable: bool(process.env.REACT_APP_BUILD_ENABLE || false),
    url: process.env.REACT_APP_BUILD_URL || 'http://localhost:9690/',
  },

  open: {
    enable: bool(process.env.REACT_APP_OPEN_ENABLE || false),
    url: process.env.REACT_APP_OPEN_URL || 'http://localhost:9990/',
  },

  note: {
    enable: bool(process.env.REACT_APP_NOTE_ENABLE || false),
    url: process.env.REACT_APP_NOTE_URL || 'http://localhost:8889/lab?token=my-token-abc',
  },

  sell: {
    enable: bool(process.env.REACT_APP_SELL_ENABLE || false),
    url: process.env.REACT_APP_SELL_URL || 'http://localhost:8069',
  },

  train: {
    enable: bool(process.env.REACT_APP_TRAIN_ENABLE || false),
    url: process.env.REACT_APP_TRAIN_URL || 'http://localhost:8180/vnc.html',
  },

  profile: {
    enable: bool(process.env.REACT_APP_PROFILE_ENABLE || true),
  },

  keys: {
    enable: bool(process.env.REACT_APP_KEYS_ENABLE || true),
  },

  subscription: {
    enable: bool(process.env.REACT_APP_SUBSCRIPTION_ENABLE || true),
  },

  xmpp: {
    host: process.env.REACT_APP_XMPP_HOST || 'localhost',
    boshServiceUrl: process.env.REACT_APP_XMPP_BOSH_SERVICE_URL || '',  // 'https://localhost:5281/http-bind/',
    discoverConnectionMethods: bool(process.env.REACT_APP_XMPP_DISCOVER_CONNECTION_METHODS || false),
    websocketUrl: process.env.REACT_APP_XMPP_WEBSOCKET_URL || 'wss://localhost:5281/xmpp-websocket',
    mucHost: process.env.REACT_APP_XMPP_MUC_HOST || 'conference.localhost',
  },

  jitsi: {
    domain: process.env.REACT_APP_JITSI_DOMAIN || 'localhost:8443',
    roomName: process.env.REACT_APP_JITSI_ROOM_NAME || 'selfdev-meet-room',
  },
}

export default conf
