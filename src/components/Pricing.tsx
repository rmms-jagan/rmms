import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Check, Star } from "lucide-react";
import { useContent } from "../context/ContentContext";

// ✅ Define CMS-driven data structure for type safety
interface PricingPlan {
  plan_name?: string;
  plan_price?: string;
  plan_period?: string;
  plan_desc?: string;
  plan_features?: string[];
  plan_cta?: string;
  plan_popular?: boolean;
}

interface PricingContent {
  title_before?: string;
  title_highlight?: string;
  subtitle?: string;
  trial_text?: string;
  trial_note?: string;
  popular_label?: string;
  billing_note?: string;
  groups?: PricingPlan[];
}

export function Pricing() {
  // ✅ Load content dynamically from CMS
  const content = useContent("Pricing") as PricingContent;

  // ✅ Safely handle plan groups
  const plans = Array.isArray(content.groups) ? content.groups : [];

  // ✅ Fallback if CMS data is empty
  const fallbackPlans: PricingPlan[] = [
    {
      plan_name: "Starter",
      plan_price: "₹2,999",
      plan_period: "/month",
      plan_desc:
        "Perfect for small rice mills getting started with automation",
      plan_features: [
        "Up to 50 transactions/day",
        "Basic inventory management",
        "Simple billing & invoicing",
        "Email support",
        "Mobile app access",
        "Basic reports",
      ],
      plan_cta: "Start Free Trial",
      plan_popular: false,
    },
    {
      plan_name: "Professional",
      plan_price: "₹7,999",
      plan_period: "/month",
      plan_desc:
        "Ideal for growing rice mills with advanced operational needs",
      plan_features: [
        "Unlimited transactions",
        "Advanced inventory & stock management",
        "Full billing & accounting suite",
        "Procurement & vendor management",
        "Priority phone support",
        "Advanced analytics & reports",
        "Custom workflows",
        "API integrations",
      ],
      plan_cta: "Start Free Trial",
      plan_popular: true,
    },
    {
      plan_name: "Enterprise",
      plan_price: "₹15,999",
      plan_period: "/month",
      plan_desc:
        "Complete solution for large rice mills with complex operations",
      plan_features: [
        "Everything in Professional",
        "Multi-location support",
        "Custom development",
        "Dedicated account manager",
        "24/7 priority support",
        "Advanced security features",
        "Training & onboarding",
        "SLA guarantees",
      ],
      plan_cta: "Contact Sales",
      plan_popular: false,
    },
  ];

  const finalPlans = plans.length > 0 ? plans : fallbackPlans;

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===========================
            HEADER
        ============================ */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            {content.title_before || "Simple, Transparent"}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {content.title_highlight || "Pricing"}
            </span>
          </h2>

          {content.subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.subtitle}
            </p>
          )}
        </div>

        {/* ===========================
            PRICING GRID
        ============================ */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {finalPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                plan.plan_popular
                  ? "border-primary shadow-lg scale-105"
                  : "border-gray-200 hover:border-primary/50"
              }`}
            >
              {plan.plan_popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {content.popular_label || "Most Popular"}
                    </span>
                  </div>
                </div>
              )}

              <CardHeader className="text-center space-y-4 pb-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">
                    {plan.plan_name}
                  </h3>
                  <p className="text-gray-600">{plan.plan_desc}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.plan_price}
                    </span>
                    <span className="text-gray-600 ml-1">
                      {plan.plan_period}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {content.billing_note || "Billed monthly"}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.plan_features?.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-6 ${
                    plan.plan_popular
                      ? "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg"
                      : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  }`}
                  variant={plan.plan_popular ? "default" : "outline"}
                >
                  {plan.plan_cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ===========================
            TRIAL CTA
        ============================ */}
        {(content.trial_text || content.trial_note) && (
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-3 rounded-full">
              <span className="text-primary font-medium">
                {content.trial_text || "🎉 Start Free for 14 Days"}
              </span>
            </div>
            <p className="text-gray-600">
              {content.trial_note ||
                "No credit card required • Full access to all features • Cancel anytime"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
