const bool = (val) => ['true', '1', true, 1].includes(val)
// const json = (val) => val && JSON.parse(val)
// const num = (val) => val ? Number(val) : (val === 0 ? 0 : undefined)
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
