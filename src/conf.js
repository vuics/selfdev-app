const bool = (val) => ['true', '1', true, 1].includes(val)
// const json = (val) => val && JSON.parse(val)
const num = (val) => val ? Number(val) : (val === 0 ? 0 : undefined)
// const arr = (str) => str ? str.split(',') : []

const conf = {
  contact: {
    email: '2@az1.ai'
  },

  api: {
    url: process.env.REACT_APP_API_URL || 'http://localhost:6369/v1',
  },

  interestForm: {
    url: process.env.REACT_APP_INTEREST_FORM_URL || 'https://forms.gle/TBS',
  },

  account: {
    start: process.env.REACT_APP_ACCOUNT_START || '/chat',
  },

  chat: {
    enable: bool(process.env.REACT_APP_CHAT_ENABLE || true),
    limit: 5,
  },

  code: {
    enable: bool(process.env.REACT_APP_CODE_ENABLE || true),
    url: process.env.REACT_APP_CODE_URL || 'http://localhost:9390/',
    topOffset: num(process.env.REACT_APP_CODE_TOP_OFFSET || 50),
  },

  build: {
    enable: bool(process.env.REACT_APP_BUILD_ENABLE || true),
    url: process.env.REACT_APP_BUILD_URL || 'http://localhost:9690/',
    topOffset: num(process.env.REACT_APP_BUILD_TOP_OFFSET || 50),
  },

  open: {
    enable: bool(process.env.REACT_APP_OPEN_ENABLE || true),
    url: process.env.REACT_APP_OPEN_URL || 'http://localhost:9990/',
    topOffset: num(process.env.REACT_APP_OPEN_TOP_OFFSET || 50),
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

  terminal: {
    enable: bool(process.env.REACT_APP_TERMINAL_ENABLE || true),
    wsUrl: process.env.REACT_APP_WS_URL || 'ws://localhost:6369',
  },
}

export default conf
