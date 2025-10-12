import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Settings as SettingsIcon,
  Layers,
  Package,
  Boxes,
  Globe,
} from "lucide-react";
import PPCSetting from "./PPCSetting";
import Category from "./Category";
import BagConfiguration from "./BagConfiguration";
import Warehouse from "./Warehouse";
import LanguageSettings from "./LanguageSettings";

const Settings = () => {
  const { i18n, t } = useTranslation();
  const [selectedSetting, setSelectedSetting] = useState("PPCSetting");

  // Load persisted language
  useEffect(() => {
    const savedLang = localStorage.getItem("appLang");
    if (savedLang && i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const menuItems = [
    { key: "PPCSetting", label: t("settings.menu.ppc", "PPC Setting"), icon: SettingsIcon },
    { key: "Category", label: t("settings.menu.category", "Category"), icon: Layers },
    { key: "BagConfiguration", label: t("settings.menu.bag", "Bag Configuration"), icon: Package },
    { key: "Warehouse", label: t("settings.menu.warehouse", "Warehouse"), icon: Boxes },
    { key: "Language", label: t("settings.menu.language", "Language"), icon: Globe },
  ];

  const renderSettingComponent = () => {
    switch (selectedSetting) {
      case "PPCSetting":
        return <PPCSetting />;
      case "Category":
        return <Category />;
      case "BagConfiguration":
        return <BagConfiguration />;
      case "Warehouse":
        return <Warehouse />;
      case "Language":
        return <LanguageSettings />;
      default:
        return <div className="text-gray-500 text-center py-8">{t("settings.select", "Select a setting from the menu")}</div>;
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row border rounded-2xl shadow-lg overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full md:w-72 bg-gradient-to-br from-primary to-secondary text-white flex flex-col">
          <div className="p-6 border-b border-white/20 text-center">
            <h2 className="text-2xl font-bold tracking-tight">⚙️ {t("settings.title", "Settings")}</h2>
            <p className="text-white/80 text-sm">
              {t("settings.subtitle", "Manage your mill’s configuration and preferences")}
            </p>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-auto">
            <ul className="mt-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = selectedSetting === item.key;
                return (
                  <li
                    key={item.key}
                    onClick={() => setSelectedSetting(item.key)}
                    className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-all duration-200 select-none ${
                      isActive ? "bg-white/20 text-white font-semibold" : "text-white/90 hover:bg-white/10"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-white animate-fadeIn">
          <div className="border-b pb-4 mb-6 flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-gray-800">
              {t("settings.dashboard", "Settings Dashboard")}
            </h1>
          </div>

          {renderSettingComponent()}
        </main>
      </div>
    </section>
  );
};

export default Settings;
