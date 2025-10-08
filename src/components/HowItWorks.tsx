import { Database, Settings, TrendingUp } from "lucide-react";
import React from "react";

export function HowItWorks() {
  const steps = [
    {
      step: "1",
      icon: Database,
      title: "Add Your Rice Mill Data",
      description: "Import your existing data or start fresh with our intuitive setup wizard. Configure your mill's specific processes and workflows."
    },
    {
      step: "2", 
      icon: Settings,
      title: "Automate Daily Operations",
      description: "Let RMMS handle routine tasks like inventory tracking, billing, procurement, and vendor management automatically."
    },
    {
      step: "3",
      icon: TrendingUp,
      title: "Monitor and Grow with Insights",
      description: "Access real-time dashboards and analytics to make informed decisions and scale your rice mill operations efficiently."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            How It{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with RMMS in three simple steps and transform your rice mill operations.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform translate-x-4 z-0" />
              )}
              
              {/* Step Card */}
              <div className="relative z-10 text-center space-y-6">
                {/* Step Number */}
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                
                {/* Icon */}
                <div className="w-20 h-20 bg-white shadow-lg rounded-2xl flex items-center justify-center mx-auto border">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}