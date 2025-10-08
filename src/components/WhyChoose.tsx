import { Cloud, Shield, Settings, Headphones } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import React from "react";

export function WhyChoose() {
  const benefits = [
    {
      icon: Cloud,
      title: "Cloud-based",
      description: "Access your data from anywhere with secure cloud infrastructure and automatic backups."
    },
    {
      icon: Shield,
      title: "Secure",
      description: "Bank-level security with data encryption, role-based access, and compliance standards."
    },
    {
      icon: Settings,
      title: "Customizable", 
      description: "Adapt the system to your unique rice mill processes with flexible configuration options."
    },
    {
      icon: Headphones,
      title: "24x7 Support",
      description: "Get expert assistance whenever you need it with our dedicated customer support team."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Stats */}
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                RMMS?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join hundreds of rice mill owners who have transformed their operations with our trusted platform.
            </p>
          </div>

          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-3 bg-white px-8 py-4 rounded-full shadow-lg border">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-primary">Trusted by 200+ mills across India</span>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                200+
              </div>
              <div className="text-gray-600">Rice Mills</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                99.9%
              </div>
              <div className="text-gray-600">Uptime SLA</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                50M+
              </div>
              <div className="text-gray-600">Transactions Processed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-gray-600">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}