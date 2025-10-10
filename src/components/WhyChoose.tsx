import React from "react";
import { Card, CardContent } from "./ui/card";
import * as Icons from "lucide-react";
import { useContent } from "../context/ContentContext";
import { safeText } from "../utils/safeContent";

// ✅ Define CMS schema shape
interface WhyChooseContent {
  title_before?: string;
  title_highlight?: string;
  subtitle?: string;
  trust_badge?: string;
  stats?: {
    value: string;
    label: string;
  }[];
  groups?: {
    benefit_icon?: string;
    benefit_title?: string;
    benefit_desc?: string;
  }[];
}

export function WhyChoose() {
  const c = useContent("WhyChoose") as WhyChooseContent;

  // ✅ Safely extract groups from CMS
  const benefits = Array.isArray(c.groups)
    ? c.groups
    : [
      {
        benefit_icon: "Cloud",
        benefit_title: "Cloud-based",
        benefit_desc:
          "Access your data from anywhere with secure cloud infrastructure and automatic backups.",
      },
      {
        benefit_icon: "Shield",
        benefit_title: "Secure",
        benefit_desc:
          "Bank-level security with data encryption, role-based access, and compliance standards.",
      },
      {
        benefit_icon: "Settings",
        benefit_title: "Customizable",
        benefit_desc:
          "Adapt the system to your unique rice mill processes with flexible configuration options.",
      },
      {
        benefit_icon: "Headphones",
        benefit_title: "24x7 Support",
        benefit_desc:
          "Get expert assistance whenever you need it with our dedicated customer support team.",
      },
    ];

  // ✅ Default stats fallback
  const stats =
    c.stats ||
    [
      { value: "200+", label: "Rice Mills" },
      { value: "99.9%", label: "Uptime SLA" },
      { value: "50M+", label: "Transactions Processed" },
      { value: "24/7", label: "Expert Support" },
    ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white" id="why-choose">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ✅ Header */}
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              {safeText(c.title_before) || "Why Choose"}{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {safeText(c.title_highlight) || "RMMS?"}
              </span>
            </h2>
            {c.subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {safeText(c.subtitle)}
              </p>
            )}
          </div>

          {/* ✅ Trust Badge */}
          <div className="inline-flex items-center space-x-3 bg-white px-8 py-4 rounded-full shadow-lg border">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-primary">
                {safeText(c.trust_badge) || "Trusted by 200+ mills across India"}
              </span>
            </div>
          </div>
        </div>

        {/* ✅ Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((b, index) => {
            const IconName = b.benefit_icon as keyof typeof Icons;
            const IconCandidate = Icons[IconName];

            // ✅ Ensure only valid Lucide components are used
            const RenderIcon =
              typeof IconCandidate === "object" ||
                typeof IconCandidate === "function"
                ? (IconCandidate as React.ComponentType<
                  React.SVGProps<SVGSVGElement>
                >)
                : Icons.Package;

            return (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white"
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto">
                    <RenderIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {safeText(b.benefit_title)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {safeText(b.benefit_desc)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ✅ Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {safeText(s.value)}
                </div>
                <div className="text-gray-600">{safeText(s.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
