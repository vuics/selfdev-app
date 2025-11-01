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
      // "$schema": "https://json-schema.org/draft/2020-12/schema",
      title: 'Messangers',
      description: "Configuration for messagner protocols and gateways.",
      "type": "object",
      "properties": {
        name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
        description: { type: 'string', title: 'Description', default: '' },

        messengers: {
          title: 'Messangers Options',
          description: "Messangers options",
          "type": "object",
          "properties": {

            "general": {
              "type": "object",
              "title": "General Settings",
              "properties": {
                "RemoteNickFormat": {
                  "type": "string",
                  "default": "[{PROTOCOL}] <{NICK}> ",
                  "description": "Format of remote nicknames displayed in chat."
                },
                // TODO: add
                // "MediaServerUpload": {
                //   "type": "string",
                //   "title": "Media Server Upload URL"
                // },
                // "MediaServerDownload": {
                //   "type": "string",
                //   "title": "Media Server Download URL"
                // }
              }
            },

            "protocols": {
              "type": "array",
              "title": "Protocols",
              "description": "Each protocol represents one messaging platform integration (e.g. Discord, Telegram).",
              "items": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "title": "Protocol Type",
                    "enum": [
                      "discord", "gitter", "harmony", "irc", "keybase", "matrix",
                      "mattermost", "msteams", "mumble", "nextcloud", "rocketchat",
                      "slack", "sshchat", "telegram", "twitch", "vk", "whatsapp",
                      "xmpp", "zulip"
                    ]
                  },
                  "accounts": {
                    "type": "array",
                    "title": "Accounts",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string",
                          "title": "Account Name"
                        },
                        "server": {
                          "type": "string",
                          "title": "Server / Host (optional)"
                        },
                        "token": {
                          "type": "string",
                          "title": "Access Token"
                        },
                        "username": {
                          "type": "string",
                          "title": "Username / Bot Name"
                        },
                        "password": {
                          "type": "string",
                          "title": "Password",
                          "format": "password"
                        },
                        "channel": {
                          "type": "string",
                          "title": "Default Channel / Room"
                        },
                        "prefixMessagesWithNick": {
                          "type": "boolean",
                          "title": "Prefix messages with nickname",
                          "default": true
                        },
                        "useTLS": {
                          "type": "boolean",
                          "title": "Use TLS",
                          "default": true
                        }
                      },
                      "required": ["name"]
                    }
                  }
                },
                "required": ["type", "accounts"]
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
            }
          },

          "required": ["general", "protocols", "gateways"]
        },
      },
    },

    uiSchema: {
      "ui:order": ["name", "description", "messengers"],

      name: {
        "ui:placeholder": "e.g. some_name"
      },
      description: {
        "ui:placeholder": "e.g. some description"
      },

      "messangers": {
        "ui:order": ["general", "protocols", "gateways"],

        "general": {
          "ui:description": "Define global Matterbridge settings applied to all gateways.",
          "RemoteNickFormat": {
            "ui:widget": "text"
          },
          // TODO: add
          // "MediaServerUpload": {
          //   "ui:widget": "url"
          // },
          // "MediaServerDownload": {
          //   "ui:widget": "url"
          // }
        },

        "protocols": {
          "ui:options": {
            "orderable": true,
            "addable": true,
            "removable": true
          },
          "items": {
            "ui:title": "Protocol Definition",
            "ui:options": {
              "orderable": true,
              "addable": true,
              "removable": true
            },
            "type": {
              "ui:widget": "select"
            },
            "accounts": {
              "ui:options": {
                "orderable": true,
                "addable": true,
                "removable": true
              },
              "items": {
                "ui:title": "Account Configuration",
                "ui:options": {
                  "orderable": true,
                  "addable": true,
                  "removable": true
                },
                "name": {
                  "ui:placeholder": "e.g. matterbridge_bot"
                },
                "server": {
                  "ui:placeholder": "e.g. chat.example.com"
                },
                "token": {
                  "ui:widget": "password",
                  "ui:placeholder": "Bot token or API key"
                },
                "username": {
                  "ui:placeholder": "e.g. bridge_bot"
                },
                "password": {
                  "ui:widget": "password"
                },
                "channel": {
                  "ui:placeholder": "e.g. #general, or room@conference.server"
                },
                "prefixMessagesWithNick": {
                  "ui:widget": "select"
                },
                "useTLS": {
                  "ui:widget": "select"
                }
              }
            }
          }
        },

        "gateways": {
          "ui:options": {
            "orderable": true,
            "addable": true,
            "removable": true
          },
          "items": {
            "ui:title": "Gateway Configuration",
            "ui:description": "Define how accounts and channels are linked.",
            "name": {
              "ui:placeholder": "e.g. discord-telegram"
            },
            "enable": {
              "ui:widget": "select"
            },
            "inout": {
              "ui:options": {
                "orderable": true,
                "addable": true,
                "removable": true
              },
              "items": {
                "ui:title": "Bridge Connection",
                "account": {
                  "ui:placeholder": "e.g. discord.mybot"
                },
                "channel": {
                  "ui:placeholder": "e.g. #general or room@conference.domain"
                },
                "direction": {
                  "ui:widget": "select"
                }
              }
            }
          }
        }
      }
    },

    // // Example formData
    // formData: {
    //   general: { RemoteNickFormat: "[{PROTOCOL}] <{NICK}> " },
    //   protocols: [
    //     { type: "xmpp", accounts: [{ name: "matterbridge", server: "selfdev-prosody.dev.local", username: "matterbridge", password: "mAtter_BRiDGE-123", channel: "bridge@conference.selfdev-prosody.dev.local" }] },
    //     { type: "telegram", accounts: [{ name: "az1_ai_bot", token: "123456:ABC", channel: "1426287173" }] }
    //   ],
    //   gateways: [
    //     { name: "xmpp-telegram", enable: true, inout: [{ account: "xmpp.matterbridge", channel: "bridge" }, { account: "telegram.az1_ai_bot", channel: "1426287173" }] }
    //   ]
    // },


    // formData: {
    //   general: {
    //     RemoteNickFormat: "[{PROTOCOL}] <{NICK}> "
    //   },
    //   protocols: [
    //     {
    //       type: "xmpp",
    //       accounts: [
    //         {
    //           name: "matterbridge",
    //           server: "selfdev-prosody.dev.local",
    //           username: "matterbridge",
    //           password: "mAtter_BRiDGE-123",
    //           channel: "bridge@conference.selfdev-prosody.dev.local",
    //           Muc: "conference.selfdev-prosody.dev.local",
    //           Jid: "matterbridge@selfdev-prosody.dev.local",
    //           SkipTLSVerify: true
    //         },
    //         {
    //           name: "matter",
    //           server: "selfdev-prosody.dev.local",
    //           username: "matter",
    //           password: "123",
    //           channel: "bridge@conference.selfdev-prosody.dev.local",
    //           Muc: "conference.selfdev-prosody.dev.local",
    //           Jid: "matter@selfdev-prosody.dev.local",
    //           SkipTLSVerify: true
    //         }
    //       ]
    //     },
    //     {
    //       type: "telegram",
    //       accounts: [
    //         {
    //           name: "astr_angel_bot",
    //           token: "7720071997:AAGc75WMud54G7q29gwuwOorpayDL_f9PzA",
    //           RemoteNickFormat: "<{NICK}> ",
    //           MessageFormat: "HTMLNick :",
    //           QuoteFormat: "{MESSAGE} (re @{QUOTENICK}: {QUOTEMESSAGE})",
    //           QuoteLengthLimit: 46,
    //           IgnoreMessages: "^/"
    //         },
    //         {
    //           name: "az1_ai_bot",
    //           token: "7672478424:AAF9EzIYf4dEuzwE_Y56BFgAmhHX81EwjU8",
    //           RemoteNickFormat: "<{NICK}> ",
    //           MessageFormat: "HTMLNick :",
    //           QuoteFormat: "{MESSAGE} (re @{QUOTENICK}: {QUOTEMESSAGE})",
    //           QuoteLengthLimit: 46,
    //           IgnoreMessages: "^/"
    //         }
    //       ]
    //     },
    //     {
    //       type: "discord",
    //       accounts: [
    //         {
    //           name: "selfdev_bot",
    //           token: "MTM1MDk1MzA3NTkyNTU4NTk2MA.GGyAf_.z49SNbYC8M28vxbUelf-nvJIOxogG-RkwLQS8g",
    //           server: "az1"
    //         }
    //       ]
    //     }
    //   ],
    //   gateways: [
    //     {
    //       name: "xmpp-telegram",
    //       enable: true,
    //       inout: [
    //         { account: "xmpp.matterbridge", channel: "bridge" },
    //         { account: "xmpp.matter", channel: "bridge@conference.selfdev-prosody.dev.local" },
    //         { account: "telegram.az1_ai_bot", channel: "1426287173" },
    //         { account: "discord.selfdev_bot", channel: "general" }
    //       ]
    //     }
    //   ]
    // },

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
        test1: { type: 'string', title: 'Test 1', default: 'test1' },
      }
    },
  },

  'hyperagency': {
    key: 'hyperagency',
    value: 'hyperagency',
    icon: 'futbol outline',
    text: 'HyperAgency',
    description: t('hyperagency.description'),
    docUrl: getDocUrl('hyperagency'),
    schema: {
      title: 'HyperAgency',
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
        description: { type: 'string', title: 'Description', default: '' },
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
      }
    },
  },

  'cron': {
    key: 'cron',
    value: 'cron',
    icon: 'calendar alternate outline',
    text: 'Cron',
    description: t('cron.description'),
    docUrl: getDocUrl('cron'),
    schema: {
      title: 'Cron',
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
        description: { type: 'string', title: 'Description', default: '' },
      }
    },
  },

  'video': {
    key: 'video',
    value: 'video',
    icon: 'video',
    text: 'Video',
    description: t('video.description'),
    docUrl: getDocUrl('video'),
    schema: {
      title: 'Video',
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
        description: { type: 'string', title: 'Description', default: '' },
      }
    },
  },

  'mcp': {
    key: 'mcp',
    value: 'mcp',
    icon: 'puzzle piece',
    text: 'MCP',
    description: t('mcp.description'),
    docUrl: getDocUrl('mcp'),
    schema: {
      title: 'Model Context Protocol',
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
        description: { type: 'string', title: 'Description', default: '' },
      }
    },
  },
}

export default connectors

const defaultConnector = Object.values(connectors)[0]

export { defaultConnector }
