export const bool = (val) => ['true', '1', true, 1, 'yes', 'y', 'on'].includes(val)
export const json = (val) => val && JSON.parse(val)
export const num = (val) => val ? Number(val) : (val === 0 ? 0 : undefined)
export const arr = (str) => str ? str.split(',') : []

const conf = {
  app: {
    name: import.meta.env.VITE_APP_NAME || 'HyperAgency',
    company: import.meta.env.VITE_APP_COMPANY || 'Vuics LLC',
    url: import.meta.env.VITE_APP_URL || 'https://selfdev-web.dev.local:3690',
  },

  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || 'admin@vuics.com',
    github: import.meta.env.VITE_CONTACT_GITHUB || 'https://github.com/vuics/hyag',
    linkedin: import.meta.env.VITE_CONTACT_LINKEDIN || 'https://www.linkedin.com/showcase/hyag/',
    discord: import.meta.env.VITE_CONTACT_DISCORD || 'https://discord.gg/nr4ps6Dk',
    youtube: import.meta.env.VITE_CONTACT_YOUTUBE || 'https://youtube.com/@hyper-agency',
    x: import.meta.env.VITE_CONTACT_X || '',
  },

  api: {
    url: import.meta.env.VITE_API_URL || 'http://localhost:6369/v1',
  },

  interestForm: {
    url: import.meta.env.VITE_INTEREST_FORM_URL || 'https://forms.gle/927RwUdTpSwc6EbE7',
  },

  cookie: {
    banner: bool(import.meta.env.VITE_COOKIE_BANNER || true),
  },

  synthetic: {
    enable: bool(import.meta.env.VITE_SYNTHETIC_PLUGIN || false),
    // enable: bool(import.meta.env.VITE_SYNTHETIC_PLUGIN || true),
    components: json(import.meta.env.VITE_SYNTHETIC_COMPONENTS || '{"talk":{},"meet":{},"hive":{},"flow":{"url":"http://localhost:7860/"},"node":{"url":"http://localhost:1880/"},"code":{"url":"http://localhost:8000/"},"note":{"url":"http://localhost:8889/lab?token=my-token-abc"},"sell":{"url":"http://localhost:8059"},"train":{"url":"http://localhost:8180/vnc.html"},"bank":{"url":"http://localhost:4200"},"blockchain":{"url":"http://localhost:5000/ui"},"contract":{"url":"http://localhost:5109"},"blockchain1":{"url":"http://localhost:5001/ui"},"contract1":{"url":"http://localhost:5209"},"blockchain2":{"url":"http://localhost:5002/ui"},"contract2":{"url":"http://localhost:5309"},"ecommerce":{"url":"http://localhost:9012"},"storefront":{"url":"http://localhost:8012"},"docs":{"url":"http://localhost:9188"}}'),
  },

  iframe: {
    topOffset: num(import.meta.env.VITE_IFRAME_TOP_OFFSET || 40),
    bottomOffset: num(import.meta.env.VITE_IFRAME_BOTTOM_OFFSET || 0),
  },

  account: {
    start: import.meta.env.VITE_ACCOUNT_START || '/chat',
  },

  chat: {
    enable: bool(import.meta.env.VITE_CHAT_ENABLE || true),
  },

  talk: {
    enable: bool(import.meta.env.VITE_TALK_ENABLE || false),
    limit: 5,
  },

  map: {
    enable: bool(import.meta.env.VITE_MAP_ENABLE || true),
    skip: 0,
    limit: 100,
  },

  meet: {
    enable: bool(import.meta.env.VITE_MEET_ENABLE || false),
  },

  hive: {
    enable: bool(import.meta.env.VITE_HIVE_ENABLE || false),
    skip: 0,
    limit: 1000,
  },

  // TODO: deprecate the section and related component (replaced with synthetic UI)
  flow: {
    enable: bool(import.meta.env.VITE_FLOW_ENABLE || false),
    url: import.meta.env.VITE_FLOW_URL || 'http://localhost:7860/',

    widget: bool(import.meta.env.VITE_FLOW_WIDGET || false),
    widgetOffset: num(import.meta.env.VITE_FLOW_WIDGET_OFFSET || 50),
    flowId: import.meta.env.VITE_FLOW_FLOW_ID || '0d9fa75c-61f6-4a21-afe6-609975ea4082',
    chatInputs: import.meta.env.VITE_FLOW_CHAT_INPUTS || '{"your_key":"value"}',
    chatInputField: import.meta.env.VITE_FLOW_CHAT_INPUT_FIELD || "your_chat_key",
  },

  // TODO: deprecate the section and related component (replaced with synthetic UI)
  node: {
    enable: bool(import.meta.env.VITE_NODE_ENABLE || false),
    url: import.meta.env.VITE_NODE_URL || 'http://localhost:1880/',
  },

  // TODO: deprecate the section and related component (replaced with synthetic UI)
  code: {
    enable: bool(import.meta.env.VITE_CODE_ENABLE || false),
    url: import.meta.env.VITE_CODE_URL || 'http://localhost:8000/',
  },

  // TODO: deprecate the section and related component (replaced with synthetic UI)
  note: {
    enable: bool(import.meta.env.VITE_NOTE_ENABLE || false),
    url: import.meta.env.VITE_NOTE_URL || 'http://localhost:8889/lab?token=my-token-abc',
  },

  // TODO: deprecate the section and related component (replaced with synthetic UI)
  sell: {
    enable: bool(import.meta.env.VITE_SELL_ENABLE || false),
    url: import.meta.env.VITE_SELL_URL || 'http://localhost:8059',
  },
  // TODO: deprecate the section and related component (replaced with synthetic UI)
  train: {
    enable: bool(import.meta.env.VITE_TRAIN_ENABLE || false),
    url: import.meta.env.VITE_TRAIN_URL || 'http://localhost:8180/vnc.html',
  },

  // TODO: deprecate the section and related component (replaced with synthetic UI)
  docs: {
    enable: bool(import.meta.env.VITE_DOCS_ENABLE || false),
    url: import.meta.env.VITE_DOCS_URL || 'http://localhost:9188',
  },

  profile: {
    enable: bool(import.meta.env.VITE_PROFILE_ENABLE || true),
  },

  keys: {
    enable: bool(import.meta.env.VITE_KEYS_ENABLE || true),
  },

  vault: {
    enable: bool(import.meta.env.VITE_VAULT_ENABLE || true),
  },

  subscription: {
    enable: bool(import.meta.env.VITE_SUBSCRIPTION_ENABLE || true),
    stripePaymentElement: 'PaymentElement',  // 'CardElement' or 'PaymentElement'
  },

  metered: {
    enable: bool(import.meta.env.VITE_METERED_ENABLE || true),
  },

  settings: {
    enable: bool(import.meta.env.VITE_SETTINGS_ENABLE || true),
  },

  pricing: {
    enable: bool(import.meta.env.VITE_PRICING_ENABLE || true),
  },

  security: {
    enable: bool(import.meta.env.VITE_SECURITY_ENABLE || true),
  },

  mobile: {
    enable: bool(import.meta.env.VITE_MOBILE_ENABLE || true),
    webAppUrl: import.meta.env.VITE_MOBILE_WEB_APP_URL || 'https://m.hyag.org/',
  },

  team: {
    enable: bool(import.meta.env.VITE_TEAM_ENABLE || true),
  },

  mission: {
    enable: bool(import.meta.env.VITE_MISSION_ENABLE || true),
  },

  roadmap: {
    enable: bool(import.meta.env.VITE_ROADMAP_ENABLE || true),
  },

  xmpp: {
    host: import.meta.env.VITE_XMPP_HOST || 'localhost',
    boshServiceUrl: import.meta.env.VITE_XMPP_BOSH_SERVICE_URL || '',  // 'https://localhost:5281/http-bind/',
    discoverConnectionMethods: bool(import.meta.env.VITE_XMPP_DISCOVER_CONNECTION_METHODS || false),
    websocketUrl: import.meta.env.VITE_XMPP_WEBSOCKET_URL || 'wss://localhost:5281/xmpp-websocket',
    mucHost: import.meta.env.VITE_XMPP_MUC_HOST || 'conference.localhost',
    shareHost: import.meta.env.VITE_XMPP_SHARE_HOST || 'share.localhost',
    shareUrlPrefix: import.meta.env.VITE_SHARE_URL_PREFIX || 'https://selfdev-prosody.dev.local:5281/file_share/',
  },

  jitsi: {
    domain: import.meta.env.VITE_JITSI_DOMAIN || 'localhost:8443',
    roomName: import.meta.env.VITE_JITSI_ROOM_NAME || 'selfdev-meet-room',
  },
}

export default conf
