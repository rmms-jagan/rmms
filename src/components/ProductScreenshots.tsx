import React from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ProductScreenshots() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            All Your Operations in{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              One Smart Dashboard
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of unified rice mill management with our intuitive dashboard interface.
          </p>
        </div>

        {/* Main Dashboard Mockup */}
        <div className="relative mb-16">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="relative">
              {/* Laptop Frame */}
              <div className="bg-gray-900 rounded-t-2xl p-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="bg-gray-100 p-1 rounded-b-2xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1649881927251-46644283751a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBjb21wdXRlciUyMHNjcmVlbnxlbnwxfHx8fDE3NTk4NDM3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="RMMS Dashboard"
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Floating Mobile Mockup */}
          <div className="absolute -bottom-8 -right-8 hidden lg:block">
            <div className="bg-gray-900 rounded-3xl p-2 w-64 shadow-2xl">
              <div className="bg-white rounded-2xl overflow-hidden">
                <div className="h-6 bg-gray-100 flex items-center justify-center">
                  <div className="w-16 h-1 bg-gray-400 rounded-full"></div>
                </div>
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1519337364444-c5eeec430101?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBtb2NrdXAlMjBidXNpbmVzcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTk4NDM3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Mobile Dashboard"
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Background Decorations */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-2xl"></div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto">
              <span className="text-white font-bold">📊</span>
            </div>
            <h3 className="font-semibold text-foreground">Real-time Analytics</h3>
            <p className="text-gray-600">Monitor your mill's performance with live data and insights.</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto">
              <span className="text-white font-bold">📱</span>
            </div>
            <h3 className="font-semibold text-foreground">Mobile Access</h3>
            <p className="text-gray-600">Access your dashboard anywhere with our responsive mobile interface.</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto">
              <span className="text-white font-bold">🔧</span>
            </div>
            <h3 className="font-semibold text-foreground">Customizable</h3>
            <p className="text-gray-600">Tailor the dashboard to match your specific operational needs.</p>
          </div>
        </div>
      </div>
    </section>
  );
}