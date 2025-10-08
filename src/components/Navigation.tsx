import React from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useContent } from "../context/ContentContext";

export function Navigation() {
  const c = useContent("Navigation");
  const links = c.navLinks?.split(",") || [];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="text-xl font-semibold">{c.logoText || "Company"}</span>
          </div>

          <div className="hidden md:block ml-10 flex items-baseline space-x-8">
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-gray-600 hover:text-primary transition-colors">
                {link}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">{c.ctaLoginText || "Login"}</Button>
            <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all duration-300">
              {c.ctaButtonText || "Free Demo"}
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
