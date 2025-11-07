import { faker } from '@faker-js/faker'
import i18next from 'i18next'

import conf from './conf'
import i18n from './i18n'

const t = (key) => i18next.t(`connectors:${key}`)
const getDocUrl = (path) => `${conf.docs.url}${conf.docs.i18n[i18n.language]}/docs/agent-connectors/${path}`

const connectors = {
  'messengers': {
    key: 'messengers',
    value: 'messengers',
    icon: 'comments',
    text: 'Messengers',
    description: t('messengers.description'),
    docUrl: getDocUrl('messengers'),

    schema: {
      title: 'Messengers',
      description: 'Configuration for messenger protocols and gateways.',
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name' },
        description: { type: 'string', title: 'Description' },
        messengers: {
          type: 'object',
          title: 'Messenger Configuration',
          properties: {
            general: {
              type: 'object',
              title: 'General Settings',
              properties: {
                RemoteNickFormat: {
                  type: 'string',
                  default: '[{PROTOCOL}] <{NICK}> ',
                  description: 'Format of remote nicknames displayed in chat.'
                }
              }
            },
            protocols: {
              type: 'array',
              title: 'Protocols',
              items: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    title: 'Protocol Type',
                    enum: [
                      'discord', 'gitter', 'irc', 'keybase', 'matrix',
                      'mattermost', 'msteams', 'mumble', 'nctalk', 'rocketchat',
                      'slack', 'sshchat', 'telegram', 'vk', 'whatsapp',
                      'xmpp', 'zulip',
                      // 'twitch',  // twitch is basically irc
                      // 'harmony', // there is no config example
                    ]
                  },
                  name: { type: 'string', title: 'Account Name' },
                },
                required: ['type', 'name'],
                allOf: [

                  // === Discord
                  {
                    if: { properties: { type: { const: 'discord' } } },
                    then: {
                      properties: {
                        Token: { type: 'string', title: 'Bot Token' },
                        Server: { type: 'string', title: 'Server ID' },
                        AutoWebhooks: { type: 'boolean', title: 'Auto Webhooks', default: true },
                        RemoteNickFormat: { type: 'string', title: 'Remote Nick Format' },
                        PreserveThreading: { type: 'boolean', title: 'Preserve Threading', default: true },
                      },
                      required: ['Token', 'Server']
                    }
                  },

                  // === Telegram
                  {
                    if: { properties: { type: { const: 'telegram' } } },
                    then: {
                      properties: {
                        Token: { type: 'string', title: 'Bot Token' },
                        RemoteNickFormat: { type: 'string', title: 'Remote Nick Format' },
                        MessageFormat: { type: 'string', title: 'Message Format' },
                        QuoteFormat: { type: 'string', title: 'Quote Format' },
                        QuoteLengthLimit: { type: 'string', title: 'QuoteLengthLimit' },
                        IgnoreMessages: { type: 'string', title: 'IgnoreMessages' },
                      },
                      required: ['Token']
                    }
                  },

                  // === Matrix
                  {
                    if: { properties: { type: { const: 'matrix' } } },
                    then: {
                      properties: {
                        Server: { type: 'string', title: 'Matrix Homeserver URL' },
                        Login: { type: 'string', title: 'Login' },
                        Password: { type: 'string', title: 'Password',
                          // format: 'password'
                        },
                        RemoteNickFormat: { type: 'string', title: 'Remote Nick Format' },
                        NoHomeServerSuffix: { type: 'boolean', title: 'No Home Server Suffix', default: false }
                      },
                      required: ['Server', 'Login', 'Password']
                    }
                  },

                  // === Slack
                  {
                    if: { properties: { type: { const: 'slack' } } },
                    then: {
                      properties: {
                        Token: { type: 'string', title: 'Bot/User Token' },
                        RemoteNickFormat: { type: 'string', title: 'Remote Nick Format' },
                        PreserveThreading: { type: 'boolean', title: 'Preserve Threading', default: true },
                      },
                      required: ['Token']
                    }
                  },

                  // === Mattermost
                  {
                    if: { properties: { type: { const: 'mattermost' } } },
                    then: {
                      properties: {
                        Server: { type: 'string', title: 'Server URL' },
                        Team: { type: 'string', title: 'Team Name' },
                        Login: { type: 'string', title: 'Login' },
                        Password: { type: 'string', title: 'Password',
                          // format: 'password'
                        },
                        NoTLS: { type: 'boolean', title: 'No TLS', default: false },
                        RemoteNickFormat: { type: 'string', title: 'Remote Nick Format' },
                        PrefixMessagesWithNick: { type: 'boolean', title: 'Prefix Messages With Nick', default: true },
                        PreserveThreading: { type: 'boolean', title: 'Preserve Threading', default: true },
                      },
                      required: ['Server', 'Team', 'Login', 'Password']
                    }
                  },

                  // === Rocket.Chat
                  {
                    if: { properties: { type: { const: 'rocketchat' } } },
                    then: {
                      properties: {
                        Server: { type: 'string', title: 'Server URL' },
                        Login: { type: 'string', title: 'Login' },
                        Password: { type: 'string', title: 'Password',
                          // format: 'password'
                        },
                        PrefixMessagesWithNick: { type: 'boolean', title: 'Prefix Messages With Nick', default: true },
                        RemoteNickFormat: { type: 'string', title: 'Remote Nick Format' },
                      },
                      required: ['Server', 'Login', 'Password']
                    }
                  },

                  // === IRC
                  {
                    if: { properties: { type: { const: 'irc' } } },
                    then: {
                      properties: {
                        Server: { type: 'string', title: 'Server (host:port)' },
                        Nick: { type: 'string', title: 'Nickname' },
                        NickServNick: { type: 'string', title: 'Nick Serv Nick' },
                        NickServPassword: { type: 'string', title: 'Nick Serv Password' },
                        RemoteNickFormat: { type: 'string', title: 'Remote Nick Format' },
                        UseTLS: { type: 'boolean', title: 'Use TLS', default: true },
                        UseSASL: { type: 'boolean', title: 'Use SASL', default: true },
                        SkipTLSVerify: { type: 'boolean', title: 'Skip TLS Verify', default: false },
                      },
                      required: ['Server', 'Nick']
                    }
                  },

                  // === Twitch
                  // {
                  //   if: { properties: { type: { const: 'irc' } } },
                  //   then: {
                  //     properties: {
                  //       Password: { type: 'string', title: 'Password',
                  //         format: 'password'
                  //       },
                  //       Nick: { type: 'string', title: 'Nickname' },
                  //       Server: { type: 'string', title: 'Server (host:port)' },
                  //       UseTLS: { type: 'boolean', title: 'Use TLS', default: true },
                  //       RemoteNickFormat: { type: 'string', title: 'Remote Nick Format' },
                  //     },
                  //     required: ['Server', 'Nick', 'Password']
                  //   }
                  // },

                  // === WhatsApp
                  {
                    if: { properties: { type: { const: 'whatsapp' } } },
                    then: {
                      properties: {
                        Number: { type: 'string', title: 'Phone Number' },
                        SessionFile: { type: 'string', title: 'Session File' },
                        QrOnWhiteTerminal: { type: 'boolean', title: 'Invert QR for white terminal', default: false },
                        RemoteNickFormat: { type: 'string', title: 'Remote Nick Format' },
                      },
                      required: ['Number']
                    }
                  },

                  // === XMPP
                  {
                    if: { properties: { type: { const: 'xmpp' } } },
                    then: {
                      properties: {
                        name: { type: 'string', title: 'Server', default: 'matterbridge' },
                        Server: { type: 'string', title: 'Server', default: 'selfdev-prosody.dev.local' },
                        Muc: { type: 'string', title: 'MUC Server', default: 'conference.selfdev-prosody.dev.local' },
                        Jid: { type: 'string', title: 'Jabber ID', default: 'matterbridge@selfdev-prosody.dev.local' },
                        Password: { type: 'string', title: 'Password',
                          // format: 'password'
                        },
                        Nick: { type: 'string', title: 'Nickname', default: 'matterbridge' },
                        RemoteNickFormat: { type: 'string', title: 'Remote Nick Format' },
                        SkipTLSVerify: { type: 'boolean', title: 'Skip TLS Verify', default: false }
                      },
                      required: ['Jid', 'Muc', 'Nick', 'Password', 'Server']
                    }
                  },

                  // === Gitter
                  {
                    if: { properties: { type: { const: 'gitter' } } },
                    then: {
                      properties: {
                        name: { type: 'string', title: 'Account Name' },
                        Token: { type: 'string', title: 'Bot Token' },
                      },
                      required: ['name']
                    }
                  },

                  // === Keybase
                  {
                    if: { properties: { type: { const: 'keybase' } } },
                    then: {
                      properties: {
                        Team: { type: 'string', title: 'Team' },
                        RemoteNickFormat: { type: 'string', title: 'Remote Nick Format' },
                      },
                      required: ['Team']
                    }
                  },

                  // === Microsoft Teams
                  {
                    if: { properties: { type: { const: 'msteams' } } },
                    then: {
                      properties: {
                        TenantID: { type: 'string', title: 'Tenant ID' },
                        ClientID: { type: 'string', title: 'Client ID' },
                        TeamID: { type: 'string', title: 'Team ID' },
                        RemoteNickFormat: { type: 'string', title: 'Remote Nick Format' },
                      },
                      required: ['TenantID', 'ClientID', 'TeamID']
                    }
                  },

                  // === Mumble
                  {
                    if: { properties: { type: { const: 'mumble' } } },
                    then: {
                      properties: {
                        Server: { type: 'string', title: 'Server' },
                        Nick: { type: 'string', title: 'Nick' },
                        Password: { type: 'string', title: 'Password' },
                        TLSClientCertificate: { type: 'string', title: 'TLSClientCertificate' },
                        TLSClientKey: { type: 'string', title: 'TLSClientKey' },
                        TLSCACertificate: { type: 'string', title: 'TLSCACertificate' },
                        SkipTLSVerify: { type: 'boolean', title: 'Skip TLS Verify', default: false },
                      },
                      required: ['Server', 'Nick', 'Password']
                    }
                  },

                  // === Nextcloud Talk
                  {
                    if: { properties: { type: { const: 'nctalk' } } },
                    then: {
                      properties: {
                        Server: { type: 'string', title: 'Server' },
                        Login: { type: 'string', title: 'Login' },
                        Password: { type: 'string', title: 'Password' },
                        RemoteNickFormat: { type: 'string', title: 'Remote Nick Format' },
                      },
                      required: ['Server', 'Login', 'Password']
                    }
                  },

                  // === Sshchat
                  {
                    if: { properties: { type: { const: 'sshchat' } } },
                    then: {
                      properties: {
                        Server: { type: 'string', title: 'Server' },
                        Nick: { type: 'string', title: 'Nick' },
                        RemoteNickFormat: { type: 'string', title: 'Remote Nick Format' },
                      },
                      required: ['Server', 'Nick']
                    }
                  },

                  // === VK
                  {
                    if: { properties: { type: { const: 'vk' } } },
                    then: {
                      properties: {
                        Token: { type: 'string', title: 'Token' },
                      },
                      required: ['Token']
                    }
                  },

                  // === Zulip
                  {
                    if: { properties: { type: { const: 'zulip' } } },
                    then: {
                      properties: {
                        Token: { type: 'string', title: 'Token' },
                        Login: { type: 'string', title: 'Login' },
                        Server: { type: 'string', title: 'Server' },
                      },
                      required: ['Token', 'Login', 'Server']
                    }
                  },

                  // === Default fallback
                  // {
                  //   if: {
                  //     not: {
                  //       properties: {
                  //         type: {
                  //           enum: [
                  //             'discord', 'telegram', 'matrix', 'slack',
                  //             'mattermost', 'rocketchat', 'irc',
                  //             'whatsapp', 'xmpp', 'gitter', 'keybase',
                  //             'msteams', 'mumble', 'nctalk', 'sshchat',
                  //             'vk', 'zulip',
                  //             // 'twitch',  // twitch is basically irc
                  //           ]
                  //         }
                  //       }
                  //     }
                  //   },
                  //   then: {
                  //     properties: {
                  //     },
                  //   }
                  // },
                ]
              }
            },

            "gateways": {
              "type": "array",
              "title": "Gateways",
              "description": "Each gateway connects several protocol accounts together.",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "title": "Gateway Name"
                  },
                  "enable": {
                    "type": "boolean",
                    "title": "Enabled",
                    "default": true
                  },
                  "inout": {
                    "type": "array",
                    "title": "Bridged Channels (In/Out)",
                    "items": {
                      "type": "object",
                      "properties": {
                        "account": {
                          "type": "string",
                          "title": "Account (e.g. discord.mybot)"
                        },
                        "channel": {
                          "type": "string",
                          "title": "Channel / Room"
                        },
                        "direction": {
                          "type": "string",
                          "title": "Direction",
                          "enum": ["inout", "in", "out"],
                          "default": "inout"
                        }
                      },
                      "required": ["account", "channel"]
                    }
                  }
                },
                "required": ["name", "inout"]
              }
            },

          },
          required: ['general', 'protocols', 'gateways']
        }
      },
      required: ["name"]
    },

    uiSchema: {
    },
  },

  'phone': {
    key: 'phone',
    value: 'phone',
    icon: 'phone',
    text: 'Phone',
    description: t('phone.description'),
    docUrl: getDocUrl('phone'),
    schema: {
      title: 'Phone',
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
        description: { type: 'string', title: 'Description', default: '' },
        phone: {
          title: 'Phone Configuration',
          type: 'object',
          properties: {
            host: { type: 'string', title: 'Server Hostname/IP', default: 'example.com' },
            username: { type: 'string', title: 'Username', default: 'username' },
            password: { type: 'string', title: 'Password', default: 'password' },
            realm: { type: 'string', title: 'Realm', default: 'example.com' },

            directoryHost: { type: 'string', title: 'Directory Hostname/IP', default: '192.168.50.100' },
            directoryNumber: { type: 'string', title: 'Directory Number', default: '9639' },
            directoryPassword: { type: 'string', title: 'Directory Password', default: 'password' },

            recipient: { type: 'string', title: 'Recipient JID', default: 'artemarakcheev@selfdev-prosody.dev.local' },
            joinRoom: { type: 'string', title: 'Join Room', default: 'voip' },
            recipientNickname: { type: 'string', title: 'Recipient Nickname in Room', default: 'artemarakcheev' },
            enablePersonal: { type: 'boolean', title: 'Enable Personal Message', default: true },
            enableRoom: { type: 'boolean', title: 'Enable Room Message', default: true },

            welcomeMessage: { type: 'string', title: 'Welcome Message', default: 'Welcome to the HyperAgency. Voice your prompt and press hashtag.' },
          },
          required: ["host", "username", "password", "realm", "directoryHost", "directoryNumber", "directoryPassword", "welcomeMessage"]
        },
      },
      required: ["name"]
    },
  },

  'scheduler': {
    key: 'scheduler',
    value: 'scheduler',
    icon: 'calendar alternate outline',
    text: 'Scheduler',
    description: t('scheduler.description'),
    docUrl: getDocUrl('scheduler'),
    schema: {
      title: 'Scheduler',
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
        description: { type: 'string', title: 'Description', default: '' },
        scheduler: {
          title: 'Scheduler Configuration',
          type: 'object',
          properties: {
            cron: { type: 'string', title: 'Schedule in cron format', default: '* * * * *' },
            message: { type: 'string', title: 'Message', default: 'It is time to do the job.' },

            timezone: { type: 'string', title: 'Timezone (e.g., "America/Sao_Paulo", "UTC", "Europe/London")', default: '' },
            // maxExecutions: { type: 'number', title: 'Maximum Executions', default: 1 },
            maxRandomDelay: { type: 'number', title: 'Maximum Random Delay in Milliseconds', default: 0 },

            recipient: { type: 'string', title: 'Recipient JID', default: 'artemarakcheev@selfdev-prosody.dev.local' },
            joinRoom: { type: 'string', title: 'Join Room', default: 'voip' },
            recipientNickname: { type: 'string', title: 'Recipient Nickname in Room', default: 'artemarakcheev' },
            enablePersonal: { type: 'boolean', title: 'Enable Personal Message', default: true },
            enableRoom: { type: 'boolean', title: 'Enable Room Message', default: true },
          },
          required: ["cron", "message"]
        },
      }
    },
  },

  // 'webhook': {
  //   key: 'webhook',
  //   value: 'webhook',
  //   icon: 'world',
  //   text: 'Webhook',
  //   description: t('webhook.description'),
  //   docUrl: getDocUrl('webhook'),
  //   schema: {
  //     title: 'Webhook',
  //     type: 'object',
  //     properties: {
  //       name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
  //       description: { type: 'string', title: 'Description', default: '' },
  //     }
  //   },
  // },

  // 'hyperagency': {
  //   key: 'hyperagency',
  //   value: 'hyperagency',
  //   icon: 'futbol outline',
  //   text: 'HyperAgency',
  //   description: t('hyperagency.description'),
  //   docUrl: getDocUrl('hyperagency'),
  //   schema: {
  //     title: 'HyperAgency',
  //     type: 'object',
  //     properties: {
  //       name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
  //       description: { type: 'string', title: 'Description', default: '' },
  //     }
  //   },
  // },

  // 'email': {
  //   key: 'email',
  //   value: 'email',
  //   icon: 'mail',
  //   text: 'Email',
  //   description: t('email.description'),
  //   docUrl: getDocUrl('email'),
  //   schema: {
  //     title: 'Email',
  //     type: 'object',
  //     properties: {
  //       name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
  //       description: { type: 'string', title: 'Description', default: '' },
  //     }
  //   },
  // },

  // 'video': {
  //   key: 'video',
  //   value: 'video',
  //   icon: 'video',
  //   text: 'Video',
  //   description: t('video.description'),
  //   docUrl: getDocUrl('video'),
  //   schema: {
  //     title: 'Video',
  //     type: 'object',
  //     properties: {
  //       name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
  //       description: { type: 'string', title: 'Description', default: '' },
  //     }
  //   },
  // },

  // 'mcp': {
  //   key: 'mcp',
  //   value: 'mcp',
  //   icon: 'puzzle piece',
  //   text: 'MCP',
  //   description: t('mcp.description'),
  //   docUrl: getDocUrl('mcp'),
  //   schema: {
  //     title: 'Model Context Protocol',
  //     type: 'object',
  //     properties: {
  //       name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
  //       description: { type: 'string', title: 'Description', default: '' },
  //     }
  //   },
  // },
}

export default connectors

const defaultConnector = Object.values(connectors)[0]

export { defaultConnector }
