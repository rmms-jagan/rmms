import React from "react";
import { Card, CardContent } from "./ui/card";
import { Package, Calculator, Truck, BarChart3 } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Package,
      title: "Inventory & Stock Management",
      description: "Track raw materials, finished goods, and work-in-progress inventory with real-time visibility and automated alerts."
    },
    {
      icon: Calculator,
      title: "Billing & Accounting",
      description: "Automated invoicing, financial reporting, and seamless GST compliance with integrated accounting modules."
    },
    {
      icon: Truck,
      title: "Procurement & Vendor Management",
      description: "Streamline supplier relationships, purchase orders, and vendor payments with complete transparency."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard & Reports",
      description: "Make data-driven decisions with comprehensive analytics, KPI tracking, and customizable business reports."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Modern Rice Mills
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to digitize and optimize your rice mill operations in one comprehensive platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}