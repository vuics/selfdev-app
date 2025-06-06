const bool = (val) => ['true', '1', true, 1].includes(val)
const json = (val) => val && JSON.parse(val)
const num = (val) => val ? Number(val) : (val === 0 ? 0 : undefined)
// const arr = (str) => str ? str.split(',') : []

const conf = {
  contact: {
    email: process.env.REACT_APP_CONTACT_EMAIL || 'admin@vuics.com'
  },

  api: {
    url: process.env.REACT_APP_API_URL || 'http://localhost:6369/v1',
    // url: process.env.REACT_APP_API_URL || 'https://api.selfdev.vuics.com/v1',
    // url: process.env.REACT_APP_API_URL || 'http://localhost:8080/v1',
  },

  interestForm: {
    url: process.env.REACT_APP_INTEREST_FORM_URL || 'https://forms.gle/927RwUdTpSwc6EbE7',
  },

  synthetic: {
    enable: bool(process.env.REACT_APP_SYNTHETIC_PLUGIN || false),
    components: json(process.env.REACT_APP_SYNTHETIC_COMPONENTS || '{"talk":{},"meet":{},"hive":{},"flow":{"url":"http://localhost:7860/"},"node":{"url":"http://localhost:1880/"},"code":{"url":"http://localhost:8000/"},"note":{"url":"http://localhost:8889/lab?token=my-token-abc"},"sell":{"url":"http://localhost:8059"},"train":{"url":"http://localhost:8180/vnc.html"},"bank":{"url":"http://localhost:4200"},"blockchain":{"url":"http://localhost:5000/ui"},"contract":{"url":"http://localhost:5109"},"blockchain1":{"url":"http://localhost:5001/ui"},"contract1":{"url":"http://localhost:5209"},"blockchain2":{"url":"http://localhost:5002/ui"},"contract2":{"url":"http://localhost:5309"},"ecommerce":{"url":"http://localhost:9012"},"storefront":{"url":"http://localhost:8012"},"docs":{"url":"http://localhost:9188"}}'),
  },

  iframe: {
    topOffset: num(process.env.REACT_APP_IFRAME_TOP_OFFSET || 50),
    bottomOffset: num(process.env.REACT_APP_IFRAME_TOP_OFFSET || 50),
  },

  account: {
    start: process.env.REACT_APP_ACCOUNT_START || '/chat',
  },

  chat: {
    enable: bool(process.env.REACT_APP_CHAT_ENABLE || true),
  },

  talk: {
    enable: bool(process.env.REACT_APP_TALK_ENABLE || false),
    limit: 5,
  },

  map: {
    enable: bool(process.env.REACT_APP_MAP_ENABLE || true),
    skip: 0,
    limit: 100,
  },

  meet: {
    enable: bool(process.env.REACT_APP_MEET_ENABLE || false),
  },

  hive: {
    enable: bool(process.env.REACT_APP_HIVE_ENABLE || false),
    skip: 0,
    limit: 1000,
  },

  // TODO: deprecate the section and related component (replaced with synthetic UI)
  flow: {
    enable: bool(process.env.REACT_APP_FLOW_ENABLE || false),
    url: process.env.REACT_APP_FLOW_URL || 'http://localhost:7860/',

    widget: bool(process.env.REACT_APP_FLOW_WIDGET || false),
    widgetOffset: num(process.env.REACT_APP_FLOW_WIDGET_OFFSET || 50),
    flowId: process.env.REACT_APP_FLOW_FLOW_ID || '0d9fa75c-61f6-4a21-afe6-609975ea4082',
    chatInputs: process.env.REACT_APP_FLOW_CHAT_INPUTS || '{"your_key":"value"}',
    chatInputField: process.env.REACT_APP_FLOW_CHAT_INPUT_FIELD || "your_chat_key",
  },

  // TODO: deprecate the section and related component (replaced with synthetic UI)
  node: {
    enable: bool(process.env.REACT_APP_NODE_ENABLE || false),
    url: process.env.REACT_APP_NODE_URL || 'http://localhost:1880/',
  },

  // TODO: deprecate the section and related component (replaced with synthetic UI)
  code: {
    enable: bool(process.env.REACT_APP_CODE_ENABLE || false),
    url: process.env.REACT_APP_CODE_URL || 'http://localhost:8000/',
  },

  // TODO: deprecate the section and related component (replaced with synthetic UI)
  note: {
    enable: bool(process.env.REACT_APP_NOTE_ENABLE || false),
    url: process.env.REACT_APP_NOTE_URL || 'http://localhost:8889/lab?token=my-token-abc',
  },

  // TODO: deprecate the section and related component (replaced with synthetic UI)
  sell: {
    enable: bool(process.env.REACT_APP_SELL_ENABLE || false),
    url: process.env.REACT_APP_SELL_URL || 'http://localhost:8059',
  },
  // TODO: deprecate the section and related component (replaced with synthetic UI)
  train: {
    enable: bool(process.env.REACT_APP_TRAIN_ENABLE || false),
    url: process.env.REACT_APP_TRAIN_URL || 'http://localhost:8180/vnc.html',
  },

  // TODO: deprecate the section and related component (replaced with synthetic UI)
  docs: {
    enable: bool(process.env.REACT_APP_DOCS_ENABLE || false),
    url: process.env.REACT_APP_DOCS_URL || 'http://localhost:9188',
  },

  profile: {
    enable: bool(process.env.REACT_APP_PROFILE_ENABLE || true),
  },

  keys: {
    enable: bool(process.env.REACT_APP_KEYS_ENABLE || true),
  },

  vault: {
    enable: bool(process.env.REACT_APP_VAULT_ENABLE || true),
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
    shareHost: process.env.REACT_APP_XMPP_SHARE_HOST || 'share.localhost',
  },

  jitsi: {
    domain: process.env.REACT_APP_JITSI_DOMAIN || 'localhost:8443',
    roomName: process.env.REACT_APP_JITSI_ROOM_NAME || 'selfdev-meet-room',
  },
}

export default conf
