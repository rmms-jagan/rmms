import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// ✅ Import translation JSON files
import en from "./locales/en/translation.json";
import hi from "./locales/hi/translation.json";
import od from "./locales/od/translation.json";

i18n
  .use(LanguageDetector) // 🔍 auto-detects user language (browser/localStorage)
  .use(initReactI18next) // 🔗 connects i18n to React
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      od: { translation: od },
    },
    fallbackLng: "en", // 🔁 fallback language if none found
    debug: import.meta.env.DEV, // logs only in dev mode
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"], // stores last selected language
    },
  });

export default i18n;
