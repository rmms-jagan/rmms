import React, { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContent, useLanguage } from "../context/ContentContext";
import { safeText } from "../utils/safeContent";

export function Navigation() {
  const c = useContent("Navigation");
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Safely parse nav links
  const navLinks =
    typeof c.navLinks === "string"
      ? c.navLinks.split(",").map((link) => link.trim())
      : ["Home", "Features", "Pricing", "Contact"];

  const availableLangs = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "od", label: "ଓଡ଼ିଆ" },
  ];

  const handleLoginClick = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  // ✅ Smooth Scroll Logic
  const handleNavClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ✅ Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick("hero")}>
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">
                {safeText(c.logoIcon || "R")}
              </span>
            </div>
            <span className="text-xl font-semibold">
              {safeText(c.logoText || "RMMS")}
            </span>
          </div>

          {/* ✅ Desktop Navigation */}
          <div className="hidden md:flex ml-10 items-baseline space-x-8">
            {navLinks.map((link) => {
              const sectionId = link.toLowerCase().replace(/\s+/g, "-");
              return (
                <button
                  key={link}
                  onClick={() => handleNavClick(sectionId)}
                  className="text-gray-700 font-medium hover:text-primary transition-colors"
                >
                  {link}
                </button>
              );
            })}
          </div>

          {/* ✅ Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={handleLoginClick}>
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu (Expanded) */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="px-4 py-4 space-y-3">
            {/* ✅ Mobile Navigation Links */}
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const sectionId = link.toLowerCase().replace(/\s+/g, "-");
                return (
                  <button
                    key={link}
                    onClick={() => handleNavClick(sectionId)}
                    className="block text-gray-700 font-medium hover:text-primary hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors text-left w-full"
                  >
                    {link}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-gray-200 my-3" />

            {/* ✅ Buttons */}
            <div className="space-y-2">
              <Button variant="ghost" className="w-full" onClick={handleLoginClick}>
                {safeText(c.ctaLoginText || "Login")}
              </Button>

              <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all duration-300">
                {safeText(c.ctaButtonText || "Free Demo")}
              </Button>
            </div>

            {/* 🌐 Language Selector */}
            <div className="flex items-center space-x-2 border border-gray-200 rounded-md px-2 py-1 bg-white shadow-sm mt-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm bg-transparent outline-none focus:ring-0 flex-1"
              >
                {availableLangs.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
