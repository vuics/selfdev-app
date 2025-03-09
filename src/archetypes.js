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
        joinRooms: [ 'all' ],
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
        joinRooms: [ 'all' ],
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
            "/opt/app/README.md",
            "/opt/app/input/tech-docs/raw-features-list.md",
            "/opt/app/input/tech-docs/tech-development-leading_draft.md",
          ],
        }, {
          enable: false,
          kind: "directory",
          path: "/opt/app/input",
          glob: "**/*.*",
        }, {
          enable: false,
          kind: "web",
          urls: [
            "https://web.az1.ai",
            "https://en.wikipedia.org/wiki/Agent-based_model",
          ],
        }, {
          enable: false,
          kind: "google-drive",
          folderId: "",
          recursive: true,
          filesIds: [
            // ""
          ],
          documentIds: [
            "1pi95Wc03l8poJoIJpRXniILIPNGIbDn9VMBfmZPdgZY",
            "1PdeQWPP1EZMXCnNNeMAdUhuRQffTbigfKU3bYC3hGjA",
            "12adeT8_7-9ZP7mO205zFlLxU1PjrvtMviV7uwhRunAY",
            "17U3QGlmaKxY_DoXkSZCC5EhSQ7iVehBJSWVifxRpLPo",
            "114agEJugBBjhOoY8Tj0o0tXdntLg94kyGLPmNBemq1A",
            "1DOwKaugogQy-yR9H-rAd-gqPDIfcDV7B3s6orvytKso",
            "1H9OjmYsSJ8Bq2HE4X3bMidranqvkjqP-kLjkcVxQIGA",
            "1zKuMfvQx0Lq_cJgJmzssOZnIHi7hLEpcILsDq7IPOAY",
            "1iJQQ-__EGdsApjFAPJu2c0-raDnCebcXq33UgWL-2CM",
            "1j1_cTw01NUO7tiVWfRADFV2WddZV-ttORupmkMd66vs",
            "16PrhlaVbOqWL-J6N2zKBzKxROICbbf_R7FCoNEmpXac",
            "1RBULCW0TXrYjTL8i9rFcZXu6cvMIkYmJr4cMqf1B9eI",
            "1ozAo6OGcJRj96pk6OXNLCo-cBHT-vZaJ0PEckEAJzUc",
            "1Oq1T9H6EM-XKmQ1FjGTC7SvZRXoz6k1Z1QLBnx6osDY",
            "1lgvjB6RKYviPHC9sgEaCpZc-lbiBTZ1XWEop3Vbq_iQ",
            "1c1cJSqJKJDYj-w8nSWXoc43uFlyNshqDTscMkk-mFuk",
            "1EfDV6cVE4ipe4ZiAFYhFd4jPsCOrYJ-3ENT0wYf1IDk",
            "1882BF98pW90cb5tS-nCyEuOB2eXO7EOTrNJdyykdC3Q",
            "162yIECys1DdLF88jqfMm9kTvt7HoYs47ixPVqxTir94",
            "15JwiNM-28Z9L-ZMvnLaqXd80yxOO9hAmZ6mU87Kk5zA",
            "1MCPlsbmsyTU_h2ehDiqcLSaDOAGoIIJc4KVz7Nh_J9M",
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
      }
    },
    defaultOptions: () => {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        joinRooms: [ 'all' ],
      }
    }
  },
}

export default archetypes

const defaultArchetype = Object.values(archetypes)[0]

export { defaultArchetype }
