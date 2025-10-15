import { faker } from '@faker-js/faker'
import i18next from 'i18next'

import conf from './conf'
import i18n from './i18n'

const t = (key) => i18next.t(`archetypes:${key}`)
const getDocUrl = (path) => `${conf.docs.url}${conf.docs.i18n[i18n.language]}/docs/agent-archetypes/${path}`

const archetypes = {
  'chat-v1.0': {
    key: 'chat-v1.0',
    value: 'chat-v1.0',
    icon: 'chat',
    text: 'Chat v1.0',
    description: t('chat.description'),
    docUrl: getDocUrl('chat'),
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        chat: {
          type: 'object',
          properties: {
            systemMessage: { type: 'string' },
            model: {
              type: 'object',
              properties: {
                provider: { type: 'string' },
                name: { type: 'string' },
                apiKey: {
                  type: 'object',
                  properties: {
                    valueFromVault: { type: 'string' },
                  },
                },
              }
            },
            session: { type: 'string' },
          }
        },
      }
    },
    defaultOptions: function () {
      const name = faker.internet.username().toLowerCase()
      return {
        name,
        description: '',
        joinRooms: [ 'chat' ],
        chat: {
          systemMessage: '',
          model: {
            provider: 'openai',
            name: 'gpt-5-nano',
            apiKey: {
              valueFromVault: 'OPENAI_API_KEY',
            },
          },
          session: '',
        },
      }
    }
  },

  'maptrix-v1.0': {
    key: 'maptrix-v1.0',
    value: 'maptrix-v1.0',
    icon: 'sitemap',
    text: 'Maptrix v1.0',
    description: t('maptrix.description'),
    docUrl: getDocUrl('maptrix'),
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        maptrix: {
          type: 'object',
          properties: {
            mapId: { type: 'string' },
            input: { },
            output: {
              type: 'array',
              items: { type: 'string' }
            },
            parseJson: { type: 'boolean' },
            promptKey: { type: 'string' },
            sendStatus: { type: 'boolean' },
          },
        },
      }
    },
    defaultOptions: () => {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'maptrix' ],
        maptrix: {
          mapId: '',  // example, mapId: '68e644b25a4d208ebb0f631a',
          input: {
            prompt: '',
            input1: 'hello',
            input2: 'world',
          },
          output: [
            'output1',
            'output2',
          ],
          parseJson: true,
          promptKey: 'prompt',
          sendStatus: false,
        },
      }
    }
  },

  'system-v1.0': {
    key: 'system-v1.0',
    value: 'system-v1.0',
    icon: 'cog',
    text: 'System v1.0',
    description: t('system.description'),
    docUrl: getDocUrl('system'),
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        system: {
          type: 'object',
          properties: {
          //   systemMessage: { type: 'string' },
          //   model: {
          //     type: 'object',
          //     properties: {
          //       provider: { type: 'string' },
          //       name: { type: 'string' },
          //       apiKey: {
          //         type: 'object',
          //         properties: {
          //           valueFromVault: { type: 'string' },
          //         },
          //       },
          //     }
          //   },
          //   session: { type: 'string' },
          }
        },
      }
    },
    defaultOptions: function () {
      const name = faker.internet.username().toLowerCase()
      return {
        name,
        description: '',
        joinRooms: [ 'system' ],
        system: {
          // systemMessage: '',
          // model: {
          //   provider: 'openai',
          //   name: 'gpt-5-nano',
          //   apiKey: {
          //     valueFromVault: 'OPENAI_API_KEY',
          //   },
          // },
          // session: '',
        },
      }
    }
  },

  'transform-v1.0': {
    key: 'transform-v1.0',
    value: 'transform-v1.0',
    icon: 'edit',
    text: 'Transform v1.0',
    description: t('transform.description'),
    docUrl: getDocUrl('transform'),
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        transform: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: [
                'echo',      // Returns the original input string unchanged.
                'const',     // Always returns the string provided in `const`.
                'repeat',    // Repeats the input string `repeat` times.
                'regexp',    // Applies a sed/vim-style regex transformation (s/pattern/replacement/flags).
                'uuid',      // Generates a UUID v4 string; no parameters.
                'nanoid',    // Generates a NanoID string of length specified in `nanoid`.
                'case',      // Changes letter casing of input; options: 'upper','lower','camel','snake','kebab'.
                'hash',      // Returns a hash of input using algorithm specified in `hash` ('md5','sha256','sha512').
                'trim',      // Removes leading and trailing whitespace from input string.
                'truncate',  // Truncates input to a maximum length specified in `truncate`.
                'prefix',    // Adds the string specified in `prefix` to the beginning of input.
                'suffix',    // Adds the string specified in `suffix` to the end of input.
                'template',  // Uses Mustache templating to render input with variables from JSON-parsed input string.
                'slugify'    // Converts input into a URL-friendly slug; lowercase if `slugify` is true.
              ]
            },

            // echo -- no params
            const: { type: 'string' },
            repeat: { type: 'number' },
            regexp: { type: 'string' },
            // uuid -- no params
            nanoid: { type: 'number' },
            case: { type: 'string', enum: ['upper','lower','camel','snake','kebab'] },
            hash: { type: 'string', enum: ['md5','sha256','sha512'] },
            // trim -- no params
            truncate: { type: 'number' },
            prefix: { type: 'string' },
            suffix: { type: 'string' },
            template: { type: 'string' },
            slugify: { type: 'boolean' }, // if true, lowercase slug
          }
        },
      }
    },
    defaultOptions: function () {
      const name = faker.internet.username().toLowerCase()
      return {
        name,
        description: '',
        joinRooms: [ 'transform' ],
        transform: {
          type: 'echo',

          // echo -- no params
          const: 'constant-text',
          repeat: 3,
          regexp: 's/original/replacement/g',
          // uuid -- no params
          nanoid: 9,
          case: 'upper',
          hash: 'md5',
          truncate: 30,
          prefix: 'prefix-',
          suffix: '-suffix',
          template: 'Hello, {{name}}!',
          slugify: true, // if true, lowercase slug
        },
      }
    }
  },

  'architect-v1.0': {
    key: 'architect-v1.0',
    value: 'architect-v1.0',
    icon: 'magic stick',
    text: 'Architect v1.0',
    description: t('architect.description'),
    docUrl: getDocUrl('architect'),
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        architect: {
          type: 'object',
          properties: {
            // mapId: { type: 'string' },
            // input: { },
            // output: {
            //   type: 'array',
            //   items: { type: 'string' }
            // },
            // parseJson: { type: 'boolean' },
            // promptKey: { type: 'string' },
            // sendStatus: { type: 'boolean' },
          },
        },
      }
    },
    defaultOptions: () => {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'architect' ],
        maptrix: {
          // mapId: '',
          // input: {
          //   prompt: '',
          //   input1: 'hello',
          //   input2: 'world',
          // },
          // output: [
          //   'output1',
          //   'output2',
          // ],
          // parseJson: true,
          // promptKey: 'prompt',
          // sendStatus: false,
        },
      }
    }
  },

  'rag-v1.0': {
    key: 'rag-v1.0',
    value: 'rag-v1.0',
    icon: 'archive',
    text: 'RAG v1.0',
    description: t('rag.description'),
    docUrl: getDocUrl('rag'),
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        rag: {
          type: 'object',
          properties: {
            systemMessage: { type: 'string' },
            model: {
              type: 'object',
              properties: {
                provider: { type: 'string' },
                name: { type: 'string' },
                apiKey: {
                  type: 'object',
                  properties: {
                    valueFromVault: { type: 'string' },
                  },
                },
              },
            },
            embeddings: {
              type: 'object',
              properties: {
                provider: { type: 'string' },
                name: { type: 'string' },
                apiKey: {
                  type: 'object',
                  properties: {
                    valueFromVault: { type: 'string' },
                  },
                },
              },
            },
            vectorStore: { type: 'string' },
            commands: {
              type: 'object',
              properties: {
                get: { type: 'string' },
                count: { type: 'string' },
                loadText: { type: 'string' },
                loadURL: { type: 'string' },
                loadAttachment: { type: 'string' },
                // loadGDrive: { type: 'string' },
                delete: { type: 'string' },
              },
            },
            loaders: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  enable: { type: 'boolean' },
                  kind: { type: 'string' },

                  // file loader
                  files: {
                    type: 'array',
                    items: { type: 'string' }
                  },

                  // directory loader
                  path: { type: 'string' },
                  glob: { type: 'string' },

                  // web loader
                  urls: {
                    type: 'array',
                    items: { type: 'string' }
                  },

                  // google-drive loader
                  folderId: { type: 'string' },
                  recursive: { type: 'boolean' },
                  unstructured: { type: 'boolean' },
                  filesIds: {
                    type: 'array',
                    items: { type: 'string' }
                  },
                  documentIds: {
                    type: 'array',
                    items: { type: 'string' }
                  },
                },
              },
            },
          },
        },
      }
    },
    defaultOptions: () => {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'rag' ],
        rag: {
          systemMessage: `You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise.
Question: {question}
Context: {context}
Answer:`,
          model: {
            provider: 'openai',
            name: 'gpt-4o-mini',
            apiKey: {
              valueFromVault: 'OPENAI_API_KEY',
            },
          },
          embeddings: {
            provider: 'openai',
            name: 'text-embedding-3-large',
            apiKey: {
              valueFromVault: 'OPENAI_API_KEY',
            },
          },
          vectorStore: 'chroma',
          commands: {
            get: '^//GET$',
            count: '^//COUNT$',
            loadText: '^//LOAD_TEXT\\s+([\\s\\S]*)',
            loadURL: '^//LOAD_URL\\s+([\\s\\S]*)',
            loadAttachment: '^//LOAD_ATTACHMENT$',
            // loadGDrive: "^//LOAD_URL\\s+((https?:\\/\\/[^\\s,]+)(,\\s*https?:\\/\\/[^\\s,]+)*)$",
            delete: '^//DELETE$',
          },
          loaders: [ {
            enable: false,
            kind: "text",
            files: [
              // "/opt/app/README.md",
              // "/opt/app/input/tech-docs/raw-features-list.md",
              // "/opt/app/input/tech-docs/tech-development-leading_draft.md",
            ],
          }, {
            enable: false,
            kind: "directory",
            // path: "/opt/app/input",
            path: "",
            glob: "**/*.*",
          }, {
            enable: false,
            kind: "web",
            urls: [
              // "https://hyag.org",
              // "https://en.wikipedia.org/wiki/Agent-based_model",
            ],
          }, {
            enable: false,
            kind: "google-drive",
            folderId: "",
            recursive: true,
            unstructured: false,
            filesIds: [
              // ""
            ],
            documentIds: [
              // "1pi95Wc03l8poJoIJpRXniILIPNGIbDn9VMBfmZPdgZY",
              // "1PdeQWPP1EZMXCnNNeMAdUhuRQffTbigfKU3bYC3hGjA",
              // "12adeT8_7-9ZP7mO205zFlLxU1PjrvtMviV7uwhRunAY",
              // "17U3QGlmaKxY_DoXkSZCC5EhSQ7iVehBJSWVifxRpLPo",
              // "114agEJugBBjhOoY8Tj0o0tXdntLg94kyGLPmNBemq1A",
              // "1DOwKaugogQy-yR9H-rAd-gqPDIfcDV7B3s6orvytKso",
              // "1H9OjmYsSJ8Bq2HE4X3bMidranqvkjqP-kLjkcVxQIGA",
              // "1zKuMfvQx0Lq_cJgJmzssOZnIHi7hLEpcILsDq7IPOAY",
              // "1iJQQ-__EGdsApjFAPJu2c0-raDnCebcXq33UgWL-2CM",
              // "1j1_cTw01NUO7tiVWfRADFV2WddZV-ttORupmkMd66vs",
              // "16PrhlaVbOqWL-J6N2zKBzKxROICbbf_R7FCoNEmpXac",
              // "1RBULCW0TXrYjTL8i9rFcZXu6cvMIkYmJr4cMqf1B9eI",
              // "1ozAo6OGcJRj96pk6OXNLCo-cBHT-vZaJ0PEckEAJzUc",
              // "1Oq1T9H6EM-XKmQ1FjGTC7SvZRXoz6k1Z1QLBnx6osDY",
              // "1lgvjB6RKYviPHC9sgEaCpZc-lbiBTZ1XWEop3Vbq_iQ",
              // "1c1cJSqJKJDYj-w8nSWXoc43uFlyNshqDTscMkk-mFuk",
              // "1EfDV6cVE4ipe4ZiAFYhFd4jPsCOrYJ-3ENT0wYf1IDk",
              // "1882BF98pW90cb5tS-nCyEuOB2eXO7EOTrNJdyykdC3Q",
              // "162yIECys1DdLF88jqfMm9kTvt7HoYs47ixPVqxTir94",
              // "15JwiNM-28Z9L-ZMvnLaqXd80yxOO9hAmZ6mU87Kk5zA",
              // "1MCPlsbmsyTU_h2ehDiqcLSaDOAGoIIJc4KVz7Nh_J9M",
            ]
          } ],
        },
      }
    }
  },

  'stt-v1.0': {
    key: 'stt-v1.0',
    value: 'stt-v1.0',
    icon: 'headphones',
    text: 'Speech-to-Text v1.0',
    description: t('stt.description'),
    docUrl: getDocUrl('stt'),
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        stt: {
          type: 'object',
          properties: {
            model: {
              type: 'object',
              properties: {
                provider: { type: 'string' },
                name: { type: 'string' },
                apiKey: {
                  type: 'object',
                  properties: {
                    valueFromVault: { type: 'string' },
                  },
                },
              }
            },
            language: { type: 'string' },
          },
        }
      }
    },
    defaultOptions: () => {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'stt' ],
        stt: {
          model: {
            provider: 'openai',
            name: 'whisper-1',
            apiKey: {
              valueFromVault: 'OPENAI_API_KEY',
            },
          },
          language: 'en',
        },
      }
    }
  },

  'tts-v1.0': {
    key: 'tts-v1.0',
    value: 'tts-v1.0',
    icon: 'file audio',
    text: 'Text-to-Speech v1.0',
    description: t('tts.description'),
    docUrl: getDocUrl('tts'),
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        tts: {
          type: 'object',
          properties: {
            model: {
              type: 'object',
              properties: {
                provider: { type: 'string' },
                name: { type: 'string' },
                apiKey: {
                  type: 'object',
                  properties: {
                    valueFromVault: { type: 'string' },
                  },
                },
                format: { type: 'string' },
                speed: { type: 'number' },
              }
            },
          },
        }
      }
    },
    defaultOptions: () => {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'tts' ],
        tts: {
          model: {
            provider: 'openai',
            name: 'tts-1',
            voice: 'nova',
            apiKey: {
              valueFromVault: 'OPENAI_API_KEY',
            },
          },
          format: 'mp3', // mp3, flac, wav, pcm
          speed: 1,
        },
      }
    }
  },

  'imagegen-v1.0': {
    key: 'imagegen-v1.0',
    value: 'imagegen-v1.0',
    icon: 'images',
    text: 'ImageGen v1.0',
    description: t('imagegen.description'),
    docUrl: getDocUrl('imagegen'),
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        imagegen: {
          type: 'object',
          properties: {
            model: {
              type: 'object',
              properties: {
                provider: { type: 'string' },
                name: { type: 'string' },
                apiKey: {
                  type: 'object',
                  properties: {
                    valueFromVault: { type: 'string' },
                  },
                },
              }
            },
            size: { type: 'string' },
            quality: { type: 'string' },
            style: { type: 'string' },
            n: { type: 'number' },
          }
        },
      }
    },
    defaultOptions: function () {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'imagegen' ],
        imagegen: {
          // See docs on params: https://platform.openai.com/docs/api-reference/images/create
          model: {
            provider: 'openai',
            name: 'dall-e-2',    // "dall-e-2", "dall-e-3", "gpt-image-1",
            apiKey: {
              valueFromVault: 'OPENAI_API_KEY',
            },
          },
          size: '256x256',      // "256x256", "512x512", "1024x1024"; DALL·E 3 only supports "1024x1024")
          quality: 'standard',  // "standard" (default) or "hd" (for high detail)
          style: 'natural',     // "vivid" (default) or "natural" — affects artistic style
          n: 1,                 // OpenAI limits you to n=1
        },
      }
    }
  },

  'code-v1.0': {
    key: 'code-v1.0',
    value: 'code-v1.0',
    icon: 'code',
    text: 'Code v1.0',
    description: t('code.description'),
    docUrl: getDocUrl('code'),
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        code: {
          type: 'object',
          properties: {
            kernel: { type: 'string' },
            env: { },
            commands: {
              type: 'object',
              properties: {
                start: { type: 'string' },
                restart: { type: 'string' },
                reconnect: { type: 'string' },
                shutdown: { type: 'string' },
              },
            },
          },
        },
      }
    },
    defaultOptions: () => {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'code' ],

        code: {
          kernel: 'python3',
          env: {
            'MY_ENV_VAR': 'my-value',
            'MY_SECOND_ENV_VAR': 'some value',
          },
          commands: {
            start: "^//START$",
            restart: "^//RESTART$",
            reconnect: "^//RECONNECT$",
            shutdown: "^//SHUTDOWN$",
          },
        },
      }
    }
  },

  'quantum-v1.0': {
    key: 'quantum-v1.0',
    value: 'quantum-v1.0',
    icon: 'react',
    text: 'Quantum v1.0',
    description: t('quantum.description'),
    docUrl: getDocUrl('quantum'),
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        quantum: {
          type: 'object',
          properties: {
            // provider: { type: 'string' },
            backend: { type: 'string' },
            minNumQubits: { type: 'number' },
            language: { type: 'string' },
            optimizationLevel: { type: 'number' },
            draw: {
              type: 'object',
              properties: {
                enable: { type: 'boolean' },
                output: { type: 'string' },
                style: { type: 'string' },
              },
            },
            instance: {
              type: 'object',
              properties: {
                valueFromVault: { type: 'string' },
              },
            },
            apiKey: {
              type: 'object',
              properties: {
                valueFromVault: { type: 'string' },
              },
            },
          },
        },
      }
    },
    defaultOptions: () => {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'quantum' ],
        quantum: {
          // provider: 'ibm',
          backend: 'fake_almaden_v2',  // least_busy, fake_almaden_v2, ibm_torino, ibm_brisbane, ibm_sherbrooke
          minNumQubits: 127,  // only for least_busy backend
          language: 'qasm2',  // qasm2, qasm3
          optimizationLevel: 1,
          draw: {
            enable: true,
            output: 'text',   // text, mpl
            style: 'str',     // only for text output
          },
          instance: {
            valueFromVault: 'IBM_CLOUD_QISKIT_INSTANCE',
          },
          apiKey: {
            valueFromVault: 'IBM_CLOUD_API_KEY',
          },
        },
      }
    }
  },

  'storage-v1.0': {
    key: 'storage-v1.0',
    value: 'storage-v1.0',
    icon: 'database',
    text: 'Storage v1.0',
    description: t('storage.description'),
    docUrl: getDocUrl('storage'),
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        storage: {
          type: 'object',
          properties: {
            driver: { type: 'string' },
            namespace: { type: 'string' },
            verbose: { type: 'number', enum: [0, 1, 2] },
            commands: {
              type: 'object',
              properties: {
                list: { type: 'string' },
                get: { type: 'string' },
                set: { type: 'string' },
                delete: { type: 'string' },
              },
            },
          },
        },
      }
    },
    defaultOptions: () => {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'storage' ],
        storage: {
          driver: 'mongodb',
          namespace: 'default',
          verbose: 1,
          commands: {
            list: "^//LIST$",
            get: "^//GET\\s+(?P<key>\\S+)(?:\\s+(?P<default>.+))?$",
            set: "^//SET\\s+(?P<key>\\S+)\\s+(?P<value>.+)$",
            delete: "^//DELETE\\s+(?P<key>\\S+)$",
          },
        },
      }
    }
  },

  'command-v1.0': {
    key: 'command-v1.0',
    value: 'command-v1.0',
    icon: 'terminal',
    text: 'Command v1.0',
    description: t('command.description'),
    docUrl: getDocUrl('command'),
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        command: {
          type: 'object',
          properties: {
            execute: { type: 'string' },
            shell: { type: 'boolean' },
          },
        }
      }
    },
    defaultOptions: () => {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'command' ],
        command: {
          // execute: '/bin/sh',
          execute: '',
          shell: false,
        },
      }
    }
  },

  'langflow-v1.0': {
    key: 'langflow-v1.0',
    value: 'langflow-v1.0',
    icon: 'pallet',
    text: 'Langflow v1.0',
    description: t('langflow.description'),
    docUrl: getDocUrl('langflow'),
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        langflow: {
          type: 'object',
          properties: {
            flowId: { type: 'string' },
            sessionId: { type: 'string' },
          },
        },
      }
    },
    defaultOptions: () => {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'langflow' ],
        langflow: {
          flowId: '',
          sessionId: '',
        },
      }
    }
  },

  'nodered-v1.0': {
    key: 'nodered-v1.0',
    value: 'nodered-v1.0',
    icon: 'map signs',
    text: 'Node-RED v1.0',
    description: t('nodered.description'),
    docUrl: getDocUrl('nodered'),
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        nodered: {
          type: 'object',
          properties: {
            method: { type: 'string' },
            route: { type: 'string' },
            payload: { },
            parseJson: { type: 'boolean' },
            promptKey: { type: 'string' },
          },
        },
      }
    },
    defaultOptions: () => {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'nodered' ],
        nodered: {
          method: 'POST',
          route: '',
          payload: {
            prompt: '',
          },
          parseJson: true,
          promptKey: 'prompt',
        },
      }
    }
  },

  'n8n-v1.0': {
    key: 'n8n-v1.0',
    value: 'n8n-v1.0',
    icon: 'code branch',
    text: 'N8n (external) v1.0',
    description: t('n8n.description'),
    docUrl: getDocUrl('n8n'),
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        n8n: {
          type: 'object',
          properties: {
            method: { type: 'string' },
            url: { type: 'string' },
            payload: { },
            parseJson: { type: 'boolean' },
            promptKey: { type: 'string' },
          },
        },
      }
    },
    defaultOptions: () => {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'n8n' ],
        n8n: {
          method: 'POST',
          url: '',
          payload: {
            prompt: '',
          },
          parseJson: true,
          promptKey: 'prompt',
        },
      }
    }
  },

  'notebook-v1.0': {
    key: 'notebook-v1.0',
    value: 'notebook-v1.0',
    icon: 'file code',
    text: 'Notebook v1.0',
    description: t('notebook.description'),
    docUrl: getDocUrl('notebook'),
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        notebook: {
          type: 'object',
          properties: {
            filePath: { type: 'string' },
            kernelName: { type: 'string' },
            parameters: { },
            parseJson: { type: 'boolean' },
            promptKey: { type: 'string' },
          },
        }
      }
    },
    defaultOptions: () => {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'notebook' ],
        notebook: {
          // filePath: '/opt/app/input/selfdev-notebooks/papermill.ipynb',
          filePath: '',
          kernelName: 'python3',
          parameters: {
            who: 'Earth',
            num: 0.3,
          },
          parseJson: true,
          promptKey: 'prompt',
        },
      }
    }
  },

  'avatar-v1.0': {
    key: 'avatar-v1.0',
    value: 'avatar-v1.0',
    icon: 'smile outline',
    text: 'Avatar (LipSync) v1.0',
    description: t('avatar.description'),
    docUrl: getDocUrl('avatar'),
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        avatar: {
          type: 'object',
          properties: {
            model: {
              type: 'object',
              properties: {
                provider: { type: 'string' },
                // name: { type: 'string' },
                // apiKey: {
                //   type: 'object',
                //   properties: {
                //     valueFromVault: { type: 'string' },
                //   },
                // },
              }
            },
          },
        }
      }
    },
    defaultOptions: () => {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'avatar' ],
        avatar: {
          model: {
            provider: 'sadtalker',
            // name: 'gpt-4o-mini',
            // apiKey: {
            //   valueFromVault: 'OPENAI_API_KEY',
            // },
          },
        },
      }
    }
  },
}

export default archetypes

const defaultArchetype = Object.values(archetypes)[0]

export { defaultArchetype }
