import React, { useState, useEffect } from 'react'
import {
  Dropdown,
} from 'semantic-ui-react'
import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
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
      "title": "Open-source Agentic AI",
      "title1": "Supercharges Entrepreneurial Dreams",
      "subtitle": "Autopilot your business. Focus on what you love.",
      "subtitle1": `Powered by Self-developing ${conf.app.name}.`,

      // Footer
      "select language": "Select language",
    }
  },
  'ru-RU': {
    translation: {
      // Home
      "title": "Агентский ИИ с открытым исходным кодом",
      "title1": "воплощает предпринимательские мечты",
      "subtitle": "Автоматизируйте бизнес на автопилоте. Сфокусируйтесь на том, что любите.",
      // "subtitle1": `Работает на базе саморазвивающегося ${conf.app.nameRu}.`,
      "subtitle1": `Работает на базе саморазвивающегося ${conf.app.name}.`,

      // Footer
      "select language": "Выберите язык",
    }
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
