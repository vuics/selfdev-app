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
        model: {
          type: 'object',
          properties: {
            provider: { type: 'string' },
            name: { type: 'string' }
          }
        },
        systemMessage: { type: 'string' },
      }
    },
    defaultOptions: function () {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'chat' ],
        model: {
          provider: 'openai',
          name: 'gpt-4o-mini',
        },
        systemMessage: '',
      }
    }
  },

  'rag-v1.0': {
    key: 'rag-v1.0',
    value: 'rag-v1.0',
    icon: 'sitemap',
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
        model: {
          type: 'object',
          properties: {
            provider: { type: 'string' },
            name: { type: 'string' }
          }
        },
        embeddings: {
          type: 'object',
          properties: {
            provider: { type: 'string' },
            name: { type: 'string' }
          }
        },
        vectorStore: { type: 'string' },
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
      }
    },
    defaultOptions: () => {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'rag' ],
        model: {
          provider: 'openai',
          name: 'gpt-4o-mini',
        },
        embeddings: {
          provider: 'openai',
          name: 'text-embedding-3-large',
        },
        vectorStore: 'chroma',
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
            // "https://web.az1.ai",
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
            // instance: { type: 'string' },
            backend: { type: 'string' },
            language: { type: 'string' },
            draw: {
              type: 'object',
              properties: {
                enable: { type: 'boolean' },
                output: { type: 'string' },
                style: { type: 'string' },
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
          // instance: 'ibm-q/open/main',
          backend: 'ibm_torino',  // ibm_torino, ibm_brisbane, ibm_sherbrooke
          language: 'qasm2',  // qasm2, qasm3
          draw: {
            enable: true,
            output: 'text',
            style: 'str',
          },
        },
      }
    }
  },
}

export default archetypes

const defaultArchetype = Object.values(archetypes)[0]

export { defaultArchetype }
