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

  code: {
    enable: bool(process.env.REACT_APP_CODE_ENABLE || false),
    url: process.env.REACT_APP_CODE_URL || 'http://localhost:9390/',
    topOffset: num(process.env.REACT_APP_CODE_TOP_OFFSET || 50),
  },

  build: {
    enable: bool(process.env.REACT_APP_BUILD_ENABLE || false),
    url: process.env.REACT_APP_BUILD_URL || 'http://localhost:9690/',
    topOffset: num(process.env.REACT_APP_BUILD_TOP_OFFSET || 50),
  },

  open: {
    enable: bool(process.env.REACT_APP_OPEN_ENABLE || false),
    url: process.env.REACT_APP_OPEN_URL || 'http://localhost:9990/',
    topOffset: num(process.env.REACT_APP_OPEN_TOP_OFFSET || 50),
  },

  note: {
    enable: bool(process.env.REACT_APP_NOTE_ENABLE || false),
    url: process.env.REACT_APP_NOTE_URL || 'http://localhost:8889/lab?token=my-token-abc',
    topOffset: num(process.env.REACT_APP_NOTE_TOP_OFFSET || 50),
  },

  sell: {
    enable: bool(process.env.REACT_APP_SELL_ENABLE || false),
    url: process.env.REACT_APP_SELL_URL || 'http://localhost:8069',
    topOffset: num(process.env.REACT_APP_SELL_TOP_OFFSET || 50),
  },

  train: {
    enable: bool(process.env.REACT_APP_TRAIN_ENABLE || false),
    url: process.env.REACT_APP_TRAIN_URL || 'http://localhost:8180/vnc.html',
    topOffset: num(process.env.REACT_APP_TRAIN_TOP_OFFSET || 50),
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
  },
}

export default conf
