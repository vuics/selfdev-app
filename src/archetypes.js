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
        systemMessage: { type: 'string' },
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
        }
      }
    },
    defaultOptions: function () {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        systemMessage: '',
        joinRooms: [ 'all' ],
        model: {
          provider: 'openai',
          name: 'gpt-4o-mini',
        },
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
        // systemMessage: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        // model: {
        //   type: 'object',
        //   properties: {
        //     provider: { type: 'string' },
        //     name: { type: 'string' }
        //   }
        // }
      }
    },
    defaultOptions: () => {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        systemMessage: '',
        joinRooms: [ 'all' ],
        model: {
          provider: 'openai',
          name: 'gpt-4o-mini',
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
        systemMessage: { type: 'string' },
        joinRooms: {
          type: 'array',
          items: { type: 'string' }
        },
        // model: {
        //   type: 'object',
        //   properties: {
        //     provider: { type: 'string' },
        //     name: { type: 'string' }
        //   }
        // }
      }
    },
    defaultOptions: () => {
      return {
        name: faker.internet.username().toLowerCase(),
        description: '',
        systemMessage: '',
        joinRooms: [ 'all' ],
        // model: {
        //   provider: 'openai',
        //   name: 'gpt-4o-mini',
        // },
      }
    }
  },
}

export default archetypes

const defaultArchetype = Object.values(archetypes)[0]

export { defaultArchetype }
