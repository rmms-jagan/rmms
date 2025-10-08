import React from "react";
import { Separator } from "./ui/separator";

export function Footer() {
  const footerLinks = {
    Company: [
      { name: "About Us", href: "#" },
      { name: "Our Team", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" }
    ],
    Resources: [
      { name: "Documentation", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "System Status", href: "#" }
    ],
    Contact: [
      { name: "Sales", href: "#" },
      { name: "Support", href: "#" },
      { name: "Partnerships", href: "#" },
      { name: "Media Kit", href: "#" }
    ],
    Support: [
      { name: "Getting Started", href: "#" },
      { name: "Video Tutorials", href: "#" },
      { name: "Community Forum", href: "#" },
      { name: "Training", href: "#" }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="text-xl font-semibold">RMMS</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Smart ERP for Rice Mills. Streamline your operations with our comprehensive cloud-based platform designed specifically for rice mill automation.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-400">
                <span className="font-medium text-white">Address:</span> 
                <br />RMMS Tech. Sai Vihar,Nimakhandi, Brahmapur, Odisha 760001 
              </div>
              <div className="text-sm text-gray-400">
                <span className="font-medium text-white">Email:</span> ricemillmanagmentsystem@gmail.com
              </div>
              <div className="text-sm text-gray-400">
                <span className="font-medium text-white">Phone:</span> +91 9970516523
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold text-lg">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2025 RMMS. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center space-x-8 mt-8 pt-8 border-t border-gray-800">
          <div className="text-sm text-gray-400 text-center">
            <div className="font-medium text-white">Trusted by 200+ Rice Mills</div>
            <div>Across India</div>
          </div>
          <div className="text-sm text-gray-400 text-center">
            <div className="font-medium text-white">99.9% Uptime</div>
            <div>SLA Guarantee</div>
          </div>
          <div className="text-sm text-gray-400 text-center">
            <div className="font-medium text-white">ISO 27001</div>
            <div>Certified</div>
          </div>
          <div className="text-sm text-gray-400 text-center">
            <div className="font-medium text-white">GDPR</div>
            <div>Compliant</div>
          </div>
        </div>
      </div>
    </footer>
  );
}