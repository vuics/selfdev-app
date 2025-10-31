import { faker } from '@faker-js/faker'
import i18next from 'i18next'

import conf from './conf'
import i18n from './i18n'

const t = (key) => i18next.t(`connectors:${key}`)
const getDocUrl = (path) => `${conf.docs.url}${conf.docs.i18n[i18n.language]}/docs/agent-connectors/${path}`

const connectors = {
  'matterbridge': {
    key: 'matterbridge',
    value: 'matterbridge',
    icon: 'send',
    text: 'Matterbridge',
    description: t('matterbridge.description'),
    docUrl: getDocUrl('matterbridge'),
    schema: {
      title: 'Matterbridge',
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name', default: faker.internet.username().toLowerCase() },
        description: { type: 'string', title: 'Description', default: 'some descr' },
      }
    },
  },

  'telegram': {
    key: 'telegram',
    value: 'telegram',
    icon: 'send',
    text: 'Telegram',
    description: t('telegram.description'),
    docUrl: getDocUrl('telegram'),
    schema: {
      title: 'Telegram',
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name', default: 'Artem' },
        description: { type: 'string', title: 'Description', default: 'some descr' },
      }
    },
  },
}

export default connectors

const defaultConnector = Object.values(connectors)[0]

export { defaultConnector }
