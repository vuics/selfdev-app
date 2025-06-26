import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const language = localStorage.getItem('i18n.language') || 'en-US'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  // en: {
  'en-US': {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
      "title": "Open-source Agentic AI",
      "subtitle": "Supercharges Entrepreneurial Dreams",
    }
  },
  // ru: {
  'ru-RU': {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
      "title": "Агентский ИИ с открытым исходным кодом",
      "subtitle": "воплощает предпринимательские мечты",
    }
  },
  fr: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next"
    }
  }
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
