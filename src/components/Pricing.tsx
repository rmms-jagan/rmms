import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Check, Star } from "lucide-react";

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "₹2,999",
      period: "/month",
      description: "Perfect for small rice mills getting started with automation",
      features: [
        "Up to 50 transactions/day",
        "Basic inventory management",
        "Simple billing & invoicing",
        "Email support",
        "Mobile app access",
        "Basic reports"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional", 
      price: "₹7,999",
      period: "/month",
      description: "Ideal for growing rice mills with advanced operational needs",
      features: [
        "Unlimited transactions",
        "Advanced inventory & stock management",
        "Full billing & accounting suite",
        "Procurement & vendor management",
        "Priority phone support",
        "Advanced analytics & reports",
        "Custom workflows",
        "API integrations"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "₹15,999",
      period: "/month",
      description: "Complete solution for large rice mills with complex operations",
      features: [
        "Everything in Professional",
        "Multi-location support",
        "Custom development",
        "Dedicated account manager",
        "24/7 priority support",
        "Advanced security features",
        "Training & onboarding",
        "SLA guarantees"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            Simple, Transparent{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your rice mill. All plans include a 14-day free trial with no setup fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span className="text-sm font-medium">Most Popular</span>
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center space-y-4 pb-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <div className="text-sm text-gray-500">Billed monthly</div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                      </div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full py-6 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg' 
                      : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trial CTA */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-3 rounded-full">
            <span className="text-primary font-medium">🎉 Start Free for 14 Days</span>
          </div>
          <p className="text-gray-600">
            No credit card required • Full access to all features • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}