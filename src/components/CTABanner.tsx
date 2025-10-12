import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { safeText } from "../utils/safeContent";

// ✅ Define CMS schema shape for CTABanner
interface CTABannerContent {
  title?: string;
  subtitle?: string;
  primary_cta_text?: string;
  secondary_cta_text?: string;
  secondary_cta_icon?: string;
  phone_number?: string;
  trust_points?: string[];
  background_from?: string;
  background_to?: string;
}

export function CTABanner() {
  const c = useContent("CTABanner") as CTABannerContent;

  // ✅ Default trust points (if CMS doesn’t provide)
  const trustPoints =
    Array.isArray(c.trust_points) && c.trust_points.length > 0
      ? c.trust_points
      : ["No setup fees", "14-day free trial", "Cancel anytime"];

  return (
    <section
      className={`relative py-20 bg-gradient-to-br ${
        c.background_from && c.background_to
          ? `from-${c.background_from} to-${c.background_to}`
          : "from-primary to-secondary"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* ✅ Main Content */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-5xl font-bold text-white">
              {safeText(c.title) || "Ready to Modernize Your Rice Mill?"}
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {safeText(c.subtitle) ||
                "Join 200+ successful rice mill owners who have transformed their operations with RMMS. Start your free trial today and see the difference in just 14 days."}
            </p>
          </div>

          {/* ✅ CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-50 shadow-lg px-8 py-6 text-lg"
            >
              {safeText(c.primary_cta_text) || "Schedule a Free Demo"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg"
            >
              <Phone className="mr-2 h-5 w-5" />
              {safeText(c.secondary_cta_text) ||
                `Call: ${c.phone_number || "+91 9970516523"}`}
            </Button>
          </div>

          {/* ✅ Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 pt-8">
            {trustPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-white/90"
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>{safeText(point)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
