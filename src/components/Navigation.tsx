import React from "react";
import { Button } from "./ui/button";
import { Menu, Globe } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { useLanguage } from "../context/ContentContext";
import { safeText } from "../utils/safeContent";

export function Navigation() {
  const c = useContent("Navigation");
  const { language, setLanguage } = useLanguage();

  // ✅ Parse navLinks safely
  const navLinks =
    typeof c.navLinks === "string"
      ? c.navLinks.split(",").map((link) => link.trim())
      : [];

  const availableLangs = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "od", label: "ଓଡ଼ିଆ" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ✅ Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">
                {safeText(c.logoIcon || "R")}
              </span>
            </div>
            <span className="text-xl font-semibold">
              {safeText(c.logoText || "RMMS")}
            </span>
          </div>

          {/* ✅ Desktop Navigation Links */}
          <div className="hidden md:block ml-10 flex items-baseline space-x-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* ✅ Desktop Right Section (CTAs + Language Selector) */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">
              {safeText(c.ctaLoginText || "Login")}
            </Button>

            <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all duration-300">
              {safeText(c.ctaButtonText || "Free Demo")}
            </Button>

            {/* 🌐 Language Dropdown */}
            <div className="flex items-center space-x-2 border border-gray-200 rounded-md px-2 py-1 bg-white shadow-sm">
              <Globe className="h-4 w-4 text-gray-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm bg-transparent outline-none focus:ring-0"
              >
                {availableLangs.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ✅ Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
