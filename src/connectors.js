import { faker } from '@faker-js/faker'
import i18next from 'i18next'

import conf from './conf'
import i18n from './i18n'

const t = (key) => i18next.t(`connectors:${key}`)
const getDocUrl = (path) => `${conf.docs.url}${conf.docs.i18n[i18n.language]}/docs/agent-connectors/${path}`

const connectors = {
  'mcp': {
    key: 'mcp',
    value: 'mcp',
    // icon: 'puzzle piece',
    icon: 'dot circle',
    text: 'MCP Server',
    description: t('mcp.description'),
    docUrl: getDocUrl('mcp'),
    schema: {
      title: 'Model Context Protocol',
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
        description: { type: 'string', title: 'Description', default: '' },

        enablePersonal: { type: 'boolean', title: 'Enable Personal Message', default: true },
        recipient: { type: 'string', title: 'Recipient JID', default: 'artemarakcheev@selfdev-prosody.dev.local' },

        enableRoom: { type: 'boolean', title: 'Enable Room Message', default: true },
        joinRoom: { type: 'string', title: 'Join Room', default: 'mcp' },
        recipientNickname: { type: 'string', title: 'Recipient Nickname in Room', default: 'artemarakcheev' },

        mcp: {
          title: 'Model Context Protocol Configuration',
          type: 'object',
          properties: {
            endpoint: { type: 'string', title: 'Endpoint', default: faker.lorem.slug() },
            timeoutSec: { type: 'number', title: 'Timeout in Seconds', default: 300 },
            // setRequestId: { type: 'boolean', title: 'Set Request ID', default: true },
            // requestIdKey: { type: 'string', title: 'Request ID Key', default: 'requestId' },
          },
          required: ["endpoint"]
        },
      }
    },
  },

  'email': {
    key: 'email',
    value: 'email',
    icon: 'mail',
    text: 'Email',
    description: t('email.description'),
    docUrl: getDocUrl('email'),
    schema: {
      title: 'Email',
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
        description: { type: 'string', title: 'Description', default: '' },

        enablePersonal: { type: 'boolean', title: 'Enable Personal Message', default: true },
        recipient: { type: 'string', title: 'Recipient JID', default: 'artemarakcheev@selfdev-prosody.dev.local' },

        enableRoom: { type: 'boolean', title: 'Enable Room Message', default: true },
        joinRoom: { type: 'string', title: 'Join Room', default: 'email' },
        recipientNickname: { type: 'string', title: 'Recipient Nickname in Room', default: 'artemarakcheev' },

        email: {
          title: 'Email Configuration',
          type: 'object',
          properties: {

            imap: {
              title: 'IMAP',
              type: 'object',
              properties: {
                host: { type: 'string', title: 'Host', default: 'imap.example.com' },
                port: { type: 'number', title: 'Port', default: 993 },
                user: { type: 'string', title: 'Host', default: 'user@example.com' },
                password: {
                  type: 'object',
                  title: 'Password',
                  properties: {
                    valueFromVault: { type: 'string', title: 'Password Value From Vault', default: 'EMAIL_PASSWORD', },
                  },
                },
                secure: { type: 'boolean', title: 'Secure', default: true },
              },
            },
            smtp: {
              title: 'SMTP',
              type: 'object',
              properties: {
                host: { type: 'string', title: 'Host', default: 'smtp.example.com' },
                port: { type: 'number', title: 'Port', default: 465 },
                user: { type: 'string', title: 'Host', default: 'user@example.com' },
                password: {
                  type: 'object',
                  title: 'Password',
                  properties: {
                    valueFromVault: { type: 'string', title: 'Password Value From Vault', default: 'EMAIL_PASSWORD', },
                  },
                },
                secure: { type: 'boolean', title: 'Secure', default: true },
              },
            },
            pollSec: { type: 'number', title: 'Poll Every Seconds', default: 30 },
            defaultRecipient: { type: 'string', title: 'Default Recipient', default: 'default@example.com' },
            defaultSubject: { type: 'string', title: 'Default Subject', default: 'Message from Agentic AI' },
          },
        },
      },
    },
  },

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

                  // === XMPP
                  {
                    if: { properties: { type: { const: 'xmpp' } } },
                    then: {
                      properties: {
                        name: { type: 'string', title: 'Server', default: 'matterbridge' },
                        Server: { type: 'string', title: 'Server', default: 'selfdev-prosody.dev.local' },
                        Muc: { type: 'string', title: 'MUC Server', default: 'conference.selfdev-prosody.dev.local' },
                        Jid: { type: 'string', title: 'Jabber ID', default: 'matterbridge@selfdev-prosody.dev.local' },
                        Password: {
                          type: 'object',
                          title: 'Password',
                          properties: {
                            valueFromVault: { type: 'string', title: 'Password Value From Vault', default: 'XMPP_PASSWORD', },
                          },
                        },
                        Nick: { type: 'string', title: 'Nickname', default: 'matterbridge' },
                        RemoteNickFormat: { type: 'string', title: 'Remote Nick Format' },
                        SkipTLSVerify: { type: 'boolean', title: 'Skip TLS Verify', default: false }
                      },
                      required: ['Jid', 'Muc', 'Nick', 'Password', 'Server']
                    }
                  },


                  // === Discord
                  {
                    if: { properties: { type: { const: 'discord' } } },
                    then: {
                      properties: {
                        Token: {
                          type: 'object',
                          title: 'Token',
                          properties: {
                            valueFromVault: { type: 'string', title: 'Token Value From Vault', default: 'DISCORD_TOKEN', },
                          },
                        },
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
                        Token: {
                          type: 'object',
                          title: 'Token',
                          properties: {
                            valueFromVault: { type: 'string', title: 'Token Value From Vault', default: 'TELEGRAM_TOKEN', },
                          },
                        },
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
                        Password: {
                          type: 'object',
                          title: 'Password',
                          properties: {
                            valueFromVault: { type: 'string', title: 'Password Value From Vault', default: 'MATRIX_PASSWORD', },
                          },
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
                        Token: {
                          type: 'object',
                          title: 'Token',
                          properties: {
                            valueFromVault: { type: 'string', title: 'Token Value From Vault', default: 'SLACK_TOKEN', },
                          },
                        },
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
                        Password: {
                          type: 'object',
                          title: 'Password',
                          properties: {
                            valueFromVault: { type: 'string', title: 'Password Value From Vault', default: 'MATTERMOST_PASSWORD', },
                          },
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
                        Password: {
                          type: 'object',
                          title: 'Password',
                          properties: {
                            valueFromVault: { type: 'string', title: 'Password Value From Vault', default: 'ROCKETCHAT_PASSWORD', },
                          },
                        },
                        PrefixMessagesWithNick: { type: 'boolean', title: 'Prefix Messages With Nick', default: true },
                        RemoteNickFormat: { type: 'string', title: 'Remote Nick Format' },
                      },
                      required: ['Server', 'Login', 'Password']
                    }
                  },

                  // === IRC and Twitch that uses IRC
                  {
                    if: { properties: { type: { const: 'irc' } } },
                    then: {
                      properties: {
                        Server: { type: 'string', title: 'Server (host:port)' },
                        Nick: { type: 'string', title: 'Nickname' },
                        Password: {
                          type: 'object',
                          title: 'Password',
                          properties: {
                            valueFromVault: { type: 'string', title: 'Password Value From Vault', default: 'IRC_PASSWORD', },
                          },
                        },
                        NickServNick: { type: 'string', title: 'Nick Serv Nick' },
                        NickServPassword: {
                          type: 'object',
                          title: 'Nick Serv Password',
                          properties: {
                            valueFromVault: { type: 'string', title: 'Nick Serv Password Value From Vault', default: 'IRC_NICKSERV_PASSWORD', },
                          },
                        },
                        RemoteNickFormat: { type: 'string', title: 'Remote Nick Format' },
                        UseTLS: { type: 'boolean', title: 'Use TLS', default: true },
                        UseSASL: { type: 'boolean', title: 'Use SASL', default: true },
                        SkipTLSVerify: { type: 'boolean', title: 'Skip TLS Verify', default: false },
                      },
                      required: ['Server', 'Nick']
                    }
                  },

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

                  // === Gitter
                  {
                    if: { properties: { type: { const: 'gitter' } } },
                    then: {
                      properties: {
                        name: { type: 'string', title: 'Account Name' },
                        Token: {
                          type: 'object',
                          title: 'Token',
                          properties: {
                            valueFromVault: { type: 'string', title: 'Token Value From Vault', default: 'GITTER_TOKEN', },
                          },
                        },
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
                        TeamID: {
                          type: 'object',
                          title: 'Team ID',
                          properties: {
                            valueFromVault: { type: 'string', title: 'Team ID Value From Vault', default: 'MSTEAMS_TEAMID', },
                          },
                        },
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
                        Password: {
                          type: 'object',
                          title: 'Password',
                          properties: {
                            valueFromVault: { type: 'string', title: 'Password Value From Vault', default: 'MUMBLE_PASSWORD', },
                          },
                        },
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
                        Password: {
                          type: 'object',
                          title: 'Password',
                          properties: {
                            valueFromVault: { type: 'string', title: 'Password Value From Vault', default: 'NCTALK_PASSWORD', },
                          },
                        },
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
                        Token: {
                          type: 'object',
                          title: 'Token',
                          properties: {
                            valueFromVault: { type: 'string', title: 'Token Value From Vault', default: 'VK_TOKEN', },
                          },
                        },
                      },
                      required: ['Token']
                    }
                  },

                  // === Zulip
                  {
                    if: { properties: { type: { const: 'zulip' } } },
                    then: {
                      properties: {
                        Token: {
                          type: 'object',
                          title: 'Token',
                          properties: {
                            valueFromVault: { type: 'string', title: 'Token Value From Vault', default: 'ZULIP_TOKEN', },
                          },
                        },
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

        enablePersonal: { type: 'boolean', title: 'Enable Personal Message', default: true },
        recipient: { type: 'string', title: 'Recipient JID', default: 'artemarakcheev@selfdev-prosody.dev.local' },

        enableRoom: { type: 'boolean', title: 'Enable Room Message', default: true },
        joinRoom: { type: 'string', title: 'Join Room', default: 'voip' },
        recipientNickname: { type: 'string', title: 'Recipient Nickname in Room', default: 'artemarakcheev' },

        phone: {
          title: 'Phone Configuration',
          type: 'object',
          properties: {
            host: { type: 'string', title: 'Server Hostname/IP', default: 'example.com' },
            username: { type: 'string', title: 'Username', default: 'username' },
            password: {
              type: 'object',
              title: 'Password',
              properties: {
                valueFromVault: { type: 'string', title: 'Password Value From Vault', default: 'PHONE_PASSWORD', },
              },
            },
            realm: { type: 'string', title: 'Realm', default: 'example.com' },

            directoryHost: { type: 'string', title: 'Directory Hostname/IP', default: '192.168.50.100' },
            directoryNumber: { type: 'string', title: 'Directory Number', default: '9639' },
            directoryPassword: {
              type: 'object',
              title: 'Password',
              properties: {
                valueFromVault: { type: 'string', title: 'Directory Password Value From Vault', default: 'PHONE_DIRECTORY_PASSWORD', },
              },
            },

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

        enablePersonal: { type: 'boolean', title: 'Enable Personal Message', default: true },
        recipient: { type: 'string', title: 'Recipient JID', default: 'artemarakcheev@selfdev-prosody.dev.local' },

        enableRoom: { type: 'boolean', title: 'Enable Room Message', default: true },
        joinRoom: { type: 'string', title: 'Join Room', default: 'voip' },
        recipientNickname: { type: 'string', title: 'Recipient Nickname in Room', default: 'artemarakcheev' },

        scheduler: {
          title: 'Scheduler Configuration',
          type: 'object',
          properties: {
            cron: { type: 'string', title: 'Schedule in cron format', default: '* * * * *' },
            message: { type: 'string', title: 'Message', default: 'It is time to do the job.' },

            timezone: { type: 'string', title: 'Timezone (e.g., "America/Sao_Paulo", "UTC", "Europe/London")', default: '' },
            // maxExecutions: { type: 'number', title: 'Maximum Executions', default: 1 },
            maxRandomDelay: { type: 'number', title: 'Maximum Random Delay in Milliseconds', default: 0 },
          },
          required: ["cron", "message"]
        },
      }
    },
  },

  'webhook': {
    key: 'webhook',
    value: 'webhook',
    icon: 'anchor',
    text: 'Webhook',
    description: t('webhook.description'),
    docUrl: getDocUrl('webhook'),
    schema: {
      title: 'Webhook',
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
        description: { type: 'string', title: 'Description', default: '' },

        enablePersonal: { type: 'boolean', title: 'Enable Personal Message', default: true },
        recipient: { type: 'string', title: 'Recipient JID', default: 'artemarakcheev@selfdev-prosody.dev.local' },

        enableRoom: { type: 'boolean', title: 'Enable Room Message', default: true },
        joinRoom: { type: 'string', title: 'Join Room', default: 'webhook' },
        recipientNickname: { type: 'string', title: 'Recipient Nickname in Room', default: 'artemarakcheev' },

        webhook: {
          title: 'Webhook Configuration',
          type: 'object',
          properties: {
            method: { type: 'string', title: 'Method', enum: ['get', 'post'], default: 'get' },
            endpoint: { type: 'string', title: 'Endpoint', default: faker.lorem.slug() },
            timeoutSec: { type: 'number', title: 'Timeout in Seconds', default: 300 },
            setRequestId: { type: 'boolean', title: 'Set Request ID', default: true },
            requestIdKey: { type: 'string', title: 'Request ID Key', default: 'requestId' },
          },
          required: ["method", "endpoint"]
        },
      }
    },
  },

  'webapp': {
    key: 'webapp',
    value: 'webapp',
    icon: 'globe',
    text: 'Web App',
    description: t('webapp.description'),
    docUrl: getDocUrl('webapp'),
    schema: {
      title: 'Model Context Protocol',
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
        description: { type: 'string', title: 'Description', default: '' },

        enablePersonal: { type: 'boolean', title: 'Enable Personal Message', default: true },
        recipient: { type: 'string', title: 'Recipient JID', default: 'artemarakcheev@selfdev-prosody.dev.local' },

        enableRoom: { type: 'boolean', title: 'Enable Room Message', default: true },
        joinRoom: { type: 'string', title: 'Join Room', default: 'webapp' },
        recipientNickname: { type: 'string', title: 'Recipient Nickname in Room', default: 'artemarakcheev' },

        webapp: {
          title: 'Web App Configuration',
          type: 'object',
          properties: {
            domain: { type: 'string', title: 'Domain', default: 'webapp.example.com' },
            endpoint: { type: 'string', title: 'Endpoint', default: faker.lorem.slug() },
            defaultCode: { type: 'string', title: 'Default Code (Lowdefy YAML)', format: 'textarea', default: '' },
            allowUpdates: { type: 'boolean', title: 'Allow Updates (Regenerate upon Receiving Messages with Code)', default: true },
          },
          required: ["domain", "endpoint"]
        },
      }
    },
  },


  // 'api': {
  //   key: 'api',
  //   value: 'api',
  //   icon: 'puzzle',
  //   text: 'API',
  //   description: t('api.description'),
  //   docUrl: getDocUrl('api'),
  //   schema: {
  //     title: 'API',
  //     type: 'object',
  //     properties: {
  //       name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
  //       description: { type: 'string', title: 'Description', default: '' },
  //     }
  //   },
  // },

  // 'tiledesk': {
  //   key: 'tiledesk',
  //   value: 'tiledesk',
  //   icon: 'ticket',
  //   text: 'Tiledesk',
  //   description: t('tiledesk.description'),
  //   docUrl: getDocUrl('tiledesk'),
  //   schema: {
  //     title: 'Tiledesk',
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
}

export default connectors

const defaultConnector = Object.values(connectors)[0]

export { defaultConnector }
