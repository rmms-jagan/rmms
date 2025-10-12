import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LanguageSettings = () => {
  const { i18n, t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language || "en");

  const languages = [
    { code: "en", label: "English 🇬🇧" },
    { code: "hi", label: "हिन्दी 🇮🇳" },
    { code: "od", label: "ଓଡ଼ିଆ 🕉️" },
  ];

  useEffect(() => {
    const savedLang = localStorage.getItem("appLang");
    if (savedLang) {
      setSelectedLang(savedLang);
    }
  }, []);

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setSelectedLang(langCode);
    localStorage.setItem("appLang", langCode);
  };

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Globe className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-gray-800">
            {t("language.title", "Language Settings")}
          </h2>
        </div>
        <p className="text-gray-600">
          {t("language.subtitle", "Select your preferred language for the application interface.")}
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mt-8">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`p-4 rounded-xl border transition-all duration-300 shadow-sm ${
              selectedLang === lang.code
                ? "border-primary bg-primary/10 text-primary font-semibold"
                : "border-gray-200 hover:border-primary/40"
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      <div className="text-gray-500 text-sm mt-8">
        {t("language.current", "Current Language")}:{" "}
        <span className="font-medium text-primary uppercase">{selectedLang}</span>
      </div>
    </div>
  );
};

export default LanguageSettings;
