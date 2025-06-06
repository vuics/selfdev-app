import { faker } from '@faker-js/faker'

const archetypes = {
  'chat-v1.0': {
    key: 'chat-v1.0',
    value: 'chat-v1.0',
    icon: 'chat',
    text: 'Chat v1.0',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
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
      }
    },
    defaultOptions: function () {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'chat' ],
        systemMessage: '',
        model: {
          provider: 'openai',
          name: 'gpt-4o-mini',
          apiKey: {
            valueFromVault: 'OPENAI_API_KEY',
          },
        },
      }
    }
  },

  'rag-v1.0': {
    key: 'rag-v1.0',
    value: 'rag-v1.0',
    icon: 'archive',
    text: 'RAG v1.0',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
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
        rag: {
          type: 'object',
          properties: {
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
        rag: {
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
              // "https://web.selfdev.vuics.com",
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

  'notebook-v1.0': {
    key: 'notebook-v1.0',
    value: 'notebook-v1.0',
    icon: 'file code',
    text: 'Notebook v1.0',
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

  'command-v1.0': {
    key: 'command-v1.0',
    value: 'command-v1.0',
    icon: 'terminal',
    text: 'Command v1.0',
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
    icon: 'code branch',
    text: 'Langflow v1.0',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        flow: {
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
        flow: {
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
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        webhook: {
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
        webhook: {
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

  'quantum-v1.0': {
    key: 'quantum-v1.0',
    value: 'quantum-v1.0',
    icon: 'react',
    text: 'Quantum v1.0',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        qiskit: {
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
        qiskit: {
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
    icon: 'hdd',
    text: 'Storage v1.0',
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

  'code-v1.0': {
    key: 'code-v1.0',
    value: 'code-v1.0',
    icon: 'code',
    text: 'Code v1.0',
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
}

export default archetypes

const defaultArchetype = Object.values(archetypes)[0]

export { defaultArchetype }
