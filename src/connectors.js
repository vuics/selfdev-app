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
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
        description: { type: 'string', title: 'Description', default: '' },
        test: { type: 'string', title: 'Test', default: '' },
      }
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
