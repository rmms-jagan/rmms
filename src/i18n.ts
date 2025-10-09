import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        nav: {
          home: "Home",
          features: "Features",
          demo: "Free Demo",
        },
        common: {
          login: "Login",
        },
      },
    },
    hi: {
      translation: {
        nav: {
          home: "होम",
          features: "फ़ीचर्स",
          demo: "नि:शुल्क डेमो",
        },
        common: {
          login: "लॉगिन",
        },
      },
    },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
