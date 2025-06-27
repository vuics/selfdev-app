import React, { useState, useEffect } from 'react'
import {
  Dropdown,
} from 'semantic-ui-react'
import i18n from "i18next";
// import detector from "i18next-browser-languagedetector";
// import backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import conf from './conf'

const language = localStorage.getItem('i18n.language') || 'en-US'

const languageOptions = [
  { key: 'en-US', value: 'en-US', flag: 'us', text: 'English' },
  { key: 'ru-RU', value: 'ru-RU', flag: 'ru', text: 'Русский' },
]

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  'en-US': {
    translation: {
      // Home
      'title': 'Open-source Agentic AI',
      'title1': 'Supercharges Entrepreneurial Dreams',
      'subtitle': 'Autopilot your business. Focus on what you love.',
      'subtitle1': `Powered by Self-developing ${conf.app.name}.`,
    },
    app: {
      'name': conf.app.name,
    },
    ResponsiveContainer: {
      'Docs': 'Docs',
      'Mobile': 'Mobile',
      'Pricing': 'Pricing',
      'Log In': 'Log In',
      'Sign Up': 'Sign Up',
      'Join a Waitlist': 'Join a Waitlist',
      'Mobile App': 'Mobile App',
      'Get Started': 'Get Started',
      'Documentation': 'Documentation',
      'GitHub': 'GitHub',
      'YouTube': 'YouTube',
      'Contact Us': 'Contact Us',
      'Close Sidebar': 'Close Sidebar'
    },
    Footer: {
      'Contact Us': 'Contact Us',
      'GitHub': 'GitHub',
      'LinkedIn': 'LinkedIn',
      'Discord': 'Discord',
      'YouTube': 'YouTube',
      'X': 'X',
      'Platform': 'Platform',
      'Home': 'Home',
      'Documentation': 'Documentation',
      'Pricing': 'Pricing',
      'Security': 'Security',
      'Mobile apps': 'Mobile apps',
      'About Us': 'About Us',
      'slogan': `Self-developing ${conf.app.name} is tailoring to your unique business needs.`,
      'Team': 'Team',
      'Mission': 'Mission',
      'Roadmap': 'Roadmap',
      'Select language': 'Select language',
      'Share': 'Share',
      'QR Code': 'QR Code for Home',
      'Tap QR': 'Tap QR for full screen.',
      'copyright': `© 2024-2025 ${conf.app.company}. All rights reserved.`,
      'Terms of Service': 'Terms of Service',
      'Privacy Policy': 'Privacy Policy',
      'LLMs': 'LLMs',
    },
    Login: {
      'Please enter a valid email address': 'Please enter a valid email address',
      'Please enter a valid password': 'Please enter a valid password',
      'Error logging in.': 'Error logging in.',
      'Log-in to Your Account': 'Log-in to Your Account',
      'E-mail address': 'E-mail address',
      'Password': 'Password',
      'Remember Me': 'Remember Me',
      'Login': 'Login',
      'Forgot password?': 'Forgot password?',
      'New to us?': 'New to us?',
      'Sign Up': 'Sign Up'
    },
    Signup: {
      // TODO
    },
    Reset: {
      // TODO
    },
    Forgot: {
      // TODO
    },
    Menubar: {
      'Hive': 'Hive',
      'Chat': 'Chat',
      'Talk': 'Talk',
      'Map': 'Map',
      'Meet': 'Meet',
      'Flow': 'Flow',
      'Node': 'Node',
      'Code': 'Code',
      'Note': 'Note',
      'Sell': 'Sell',
      'Train': 'Train',
      'Docs': 'Docs',
      'Profile': 'Profile',
      'API Keys': 'API Keys',
      'Vault': 'Vault',
      'Subscription': 'Subscription',
      'Log Out': 'Log Out'
    },
    Hive: {
      'Error retrieving credentials.': 'Error retrieving credentials.',
      'Error getting agents.': 'Error getting agents.',
      'Error posting agent.': 'Error posting agent.',
      'Error putting agent.': 'Error putting agent.',
      'Error deleting agent.': 'Error deleting agent.',
      'Error downloading agents.': 'Error downloading agents.',
      'Invalid JSON file': 'Invalid JSON file',
      'Please upload a valid JSON file.': 'Please upload a valid JSON file.',
      'Error uploading map.': 'Error uploading map.',
      'Error': 'Error',
      'Info': 'Info',
      'Schema Validation Error': 'Schema Validation Error',
      'Add Agent': 'Add Agent',
      'Download': 'Download',
      'Upload': 'Upload',
      'Archetype': 'Archetype',
      'Options': 'Options',
      'Select Archetype': 'Select Archetype',
      'Not compliant with JSON Schema': 'Not compliant with JSON Schema',
      'JSON Schema error': 'JSON Schema error',
      'Cancel': 'Cancel',
      'Submit': 'Submit',
      'Edit': 'Edit',
      'Delete': 'Delete',
      '(no description)': '(no description)',
      'Deployed': 'Deployed',
      'Update': 'Update'
    },
  },
  'ru-RU': {
    translation: {
      // Home
      'title': 'Агентский ИИ с открытым исходным кодом',
      'title1': 'воплощает предпринимательские мечты',
      'subtitle': 'Автоматизируйте бизнес на автопилоте. Сфокусируйтесь на том, что любите.',
      'subtitle1': `Работает на базе саморазвивающегося ${conf.app.name}.`,
    },
    app: {
      'name': 'ГиперАгентство',
    },
    ResponsiveContainer: {
      'Docs': 'Документация',
      'Mobile': 'Мобильное',
      'Pricing': 'Цены',
      'Log In': 'Войти',
      'Sign Up': 'Зарегистрироваться',
      'Join a Waitlist': 'Присоединиться к списку ожидания',
      'Mobile App': 'Мобильное приложение',
      'Get Started': 'Начать',
      'Documentation': 'Документация',
      'GitHub': 'GitHub',
      'YouTube': 'YouTube',
      'Contact Us': 'Связаться с нами',
      'Close Sidebar': 'Закрыть боковую панель'
    },
    Footer: {
      'Contact Us': 'Связаться с нами',
      'GitHub': 'GitHub',
      'LinkedIn': 'LinkedIn',
      'Discord': 'Discord',
      'YouTube': 'YouTube',
      'X': 'X',
      'Platform': 'Платформа',
      'Home': 'Главная',
      'Documentation': 'Документация',
      'Pricing': 'Цены',
      'Security': 'Безопасность',
      'Mobile apps': 'Мобильные приложения',
      'About Us': 'О нас',
      'slogan': `Саморазвивающийся ${conf.app.name} адаптируется под потребности вашего бизнеса.`,
      'Team': 'Команда',
      'Mission': 'Миссия',
      'Roadmap': 'Дорожная карта',
      'Select language': 'Выбрать язык',
      'Share': 'Поделиться',
      'QR Code': 'QR-код для главной страницы',
      'Tap QR': 'Нажмите на QR для полного экрана.',
      'copyright': `© 2024–2025 ${conf.app.company}. Все права защищены.`,
      'Terms of Service': 'Условия использования',
      'Privacy Policy': 'Политика конфиденциальности',
      'LLMs': 'Языковые модели',
    },
    Login: {
      'Please enter a valid email address': 'Пожалуйста, введите корректный адрес электронной почты',
      'Please enter a valid password': 'Пожалуйста, введите корректный пароль',
      'Error logging in.': 'Ошибка входа.',
      'Log-in to Your Account': 'Вход в ваш аккаунт',
      'E-mail address': 'Адрес электронной почты',
      'Password': 'Пароль',
      'Remember Me': 'Запомнить меня',
      'Login': 'Войти',
      'Forgot password?': 'Забыли пароль?',
      'New to us?': 'Впервые у нас?',
      'Sign Up': 'Зарегистрироваться'
    },
    Signup: {
      // TODO
    },
    Reset: {
      // TODO
    },
    Forgot: {
      // TODO
    },
    Menubar: {
      'Hive': 'Улей',
      'Chat': 'Чат',
      'Talk': 'Разговор',
      'Map': 'Карта',
      'Meet': 'Встреча',
      'Flow': 'Поток',
      'Node': 'Узел',
      'Code': 'Код',
      'Note': 'Заметка',
      'Sell': 'Продажа',
      'Train': 'Обучение',
      'Docs': 'Документация',
      'Profile': 'Профиль',
      'API Keys': 'API-ключи',
      'Vault': 'Сейф',
      'Subscription': 'Подписка',
      'Log Out': 'Выйти'
    },
    Hive: {
      'Error retrieving credentials.': 'Ошибка при получении учетных данных.',
      'Error getting agents.': 'Ошибка при получении агентов.',
      'Error posting agent.': 'Ошибка при добавлении агента.',
      'Error putting agent.': 'Ошибка при обновлении агента.',
      'Error deleting agent.': 'Ошибка при удалении агента.',
      'Error downloading agents.': 'Ошибка при загрузке агентов.',
      'Invalid JSON file': 'Недопустимый JSON-файл',
      'Please upload a valid JSON file.': 'Пожалуйста, загрузите допустимый JSON-файл.',
      'Error uploading map.': 'Ошибка при загрузке карты.',
      'Error': 'Ошибка',
      'Info': 'Информация',
      'Schema Validation Error': 'Ошибка проверки схемы',
      'Add Agent': 'Добавить агента',
      'Download': 'Скачать',
      'Upload': 'Загрузить',
      'Archetype': 'Архетип',
      'Options': 'Параметры',
      'Select Archetype': 'Выбрать архетип',
      'Not compliant with JSON Schema': 'Не соответствует схеме JSON',
      'JSON Schema error': 'Ошибка схемы JSON',
      'Cancel': 'Отмена',
      'Submit': 'Отправить',
      'Edit': 'Редактировать',
      'Delete': 'Удалить',
      '(no description)': '(без описания)',
      'Deployed': 'Развернуто',
      'Update': 'Обновить'
    },
  },
};

i18n
  // .use(detector)
  // .use(backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,

    // lng: "en",
    lng: language,

    // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    },

    // use en if detected lng is not available
    // fallbackLng: "en",
    fallbackLng: "en-US",
    debug: true,

    // TODO: Send not translated keys to endpoint
    //       https://www.i18next.com/how-to/extracting-translations
    saveMissing: false, // send not translated keys to endpoint
  });

export default i18n;

export function LanguageSelector () {
  const [ language, setLanguage ] = useState(i18n.language)

  useEffect(() => {
    i18n
      .changeLanguage(language)
      .then((t) => {
        localStorage.setItem('i18n.language', language);
        // console.log('Language changed to:', language, ', title:', t('title'))
      })
      .catch((err) => {
        console.error('Error changing language:', err)
      })
  }, [language]);

  // console.log('i18n.language:', i18n.language)

  return (
    <Dropdown
      placeholder='Select Language'
      // fluid
      search
      selection
      compact
      options={languageOptions}
      value={language}
      defaultValue='en-US'
      onChange={(e, { value }) => setLanguage(value) }
    />
  )
}
