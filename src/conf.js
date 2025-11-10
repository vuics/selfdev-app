export const bool = (val) => ['true', '1', true, 1, 'yes', 'y', 'on'].includes(val)
export const json = (val) => val && JSON.parse(val)
export const num = (val) => val ? Number(val) : (val === 0 ? 0 : undefined)
export const arr = (str) => str ? str.split(',') : []

const conf = {
  app: {
    name: import.meta.env.VITE_APP_NAME || 'HyperAgency',
    company: import.meta.env.VITE_APP_COMPANY || 'Vuics LLC',
    url: import.meta.env.VITE_APP_URL || 'https://selfdev-web.dev.local:3690',
    // qr: import.meta.env.VITE_APP_QR || '/images/qr/qr-org.svg',
    qr: import.meta.env.VITE_APP_QR || '/images/qr/qr-ru.svg',
  },

  style: {
    color0: 'teal',
    grayLogo: false,
  },

  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || 'admin@hyag.org',
    github: import.meta.env.VITE_CONTACT_GITHUB || 'https://github.com/vuics/hyag',
    linkedin: import.meta.env.VITE_CONTACT_LINKEDIN || 'https://www.linkedin.com/showcase/hyag/',
    // linkedin: import.meta.env.VITE_CONTACT_LINKEDIN || 'https://www.linkedin.com/company/hyag-ai/',
    discord: import.meta.env.VITE_CONTACT_DISCORD || 'https://discord.gg/nr4ps6Dk',
    youtube: import.meta.env.VITE_CONTACT_YOUTUBE || 'https://youtube.com/@hyper-agency',
    x: import.meta.env.VITE_CONTACT_X || '',
  },

  legal: {
    dir: import.meta.env.VITE_LEGAL_DIR || 'legal/org',
    fallbackKey: import.meta.env.VITE_LEGAL_FALLBACK_KEY || 'en_default',
    noteKey: import.meta.env.VITE_LEGAL_NOTE_KEY || 'noteBodyOrg',
    // dir: import.meta.env.VITE_LEGAL_DIR || 'legal/ru',
    // fallbackKey: import.meta.env.VITE_LEGAL_FALLBACK_KEY || 'ru_default',
    // noteKey: import.meta.env.VITE_LEGAL_NOTE_KEY || '',
    // noteKey: import.meta.env.VITE_LEGAL_NOTE_KEY || 'noteBodyRu'
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

  dash: {
    enable: bool(import.meta.env.VITE_DASH_ENABLE || true),
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

  omni: {
    enable: bool(import.meta.env.VITE_OMNI_ENABLE || true),
    skip: 0,
    limit: 1000,
  },

  apps: {
    enable: bool(import.meta.env.VITE_APPS_ENABLE || true),
    registryUrl: import.meta.env.VITE_APPS_REGISTRY_URL || 'https://verdaccio.hyag.ru',
  },

  meet: {
    enable: bool(import.meta.env.VITE_MEET_ENABLE || false),
  },

  hive: {
    enable: bool(import.meta.env.VITE_HIVE_ENABLE || false),
    skip: 0,
    limit: 1000,
  },

  docs: {
    enable: bool(import.meta.env.VITE_DOCS_ENABLE || false),
    url: import.meta.env.VITE_DOCS_URL || 'http://docs.dev.local:9298/',
    i18n: {
      'en-US': '',
      'ru-RU': '/ru',
    },
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

  profile: {
    enable: bool(import.meta.env.VITE_PROFILE_ENABLE || true),
  },

  keys: {
    enable: bool(import.meta.env.VITE_KEYS_ENABLE || true),
  },

  vault: {
    enable: bool(import.meta.env.VITE_VAULT_ENABLE || true),
  },

  pricing: {
    enable: bool(import.meta.env.VITE_PRICING_ENABLE || true),
    allowedPlans: arr(import.meta.env.VITE_PRICING_ALLOWED_PLANS || 'free,basic1,premium1,enterprise'), // test8
    priceKey: import.meta.env.VITE_PRICING_PRICE_KEY || 'price',   // options: price, priceRu
  },

  subscription: {
    enable: bool(import.meta.env.VITE_SUBSCRIPTION_ENABLE || true),
    allowedPlans: arr(import.meta.env.VITE_SUBSCRIPTION_ALLOWED_PLANS || 'free,basic1,premium1,enterprise'), // test8
    priceKey: import.meta.env.VITE_SUBSCRIPTION_PRICE_KEY || 'price',

    stripePaymentElement: 'PaymentElement',  // 'CardElement' or 'PaymentElement'
  },

  subscribe: {
    enable: bool(import.meta.env.VITE_SUBSCRIBE_ENABLE || true),
    allowedPlans: arr(import.meta.env.VITE_SUBSCRIBE_ALLOWED_PLANS || 'free,basic1,premium1,enterprise'), // test8
    priceKey: import.meta.env.VITE_SUBSCRIBE_PRICE_KEY || 'priceRu',
  },

  wallet: {
    enable: bool(import.meta.env.VITE_WALLET_ENABLE || true),
  },

  settings: {
    enable: bool(import.meta.env.VITE_SETTINGS_ENABLE || true),
  },

  admin: {
    enable: bool(import.meta.env.VITE_ADMIN_ENABLE || true),
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

  unami: {
    enable: bool(import.meta.env.VITE_UNAMI_ENABLE || false),
    url: import.meta.env.VITE_UNAMI_URL || 'http://umami.dev.local:3083/script.js',
    websiteId: import.meta.env.VITE_UNAMI_WEBSITE_ID || 'TBS',
  },

  tawk: {
    enable: bool(import.meta.env.VITE_TAWK_ENABLE || false),
    url: import.meta.env.VITE_TAWK_URL || 'https://embed.tawk.to/685ce6b56a55a619118475e7/1iuleadir',
    respectConsent: bool(import.meta.env.VITE_TAWK_RESPECT_CONSENT || true),
  },

  tiledesk: {
    enable: bool(import.meta.env.VITE_TILEDESK_ENABLE || false),
    url: import.meta.env.VITE_TILEDESK_URL || 'https://tiledesk.hyag.ru/widget/launch.js',
    projectId: import.meta.env.VITE_TILEDESK_PROJECT_ID || '68f52da07782880012123522',
    respectConsent: bool(import.meta.env.VITE_TILEDESK_RESPECT_CONSENT || false),
  },

  protocol: {
    enable: bool(import.meta.env.VITE_PROTOCOL_ENABLE || true),
    proto: import.meta.env.VITE_PROTOCOL_PROTO || "web+hyag",
  },
}

export default conf
