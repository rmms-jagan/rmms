import React from "react";
import { Button } from "./ui/button";
import { Play, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useContent } from "../context/ContentContext";

export function Hero() {
  const c = useContent("Hero");

  // ✅ Dynamic Trust Indicators from groups
  // Expected in sheet:
  // | Hero | group=facts | key=value, label | type=string | value=200+, Rice Mills |
  const facts = Array.isArray(c.groups) ? c.groups : [];

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* ===========================
              LEFT: TEXT CONTENT
          ============================ */}
          <div className="space-y-8">
            {/* Headings */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                {c.title && c.titleTag ? (
                  <>
                    {c.title}{" "}
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {c.titleTag}
                    </span>
                  </>
                ) : (
                  "Default Hero Title"
                )}
              </h1>

              {c.subtitle && (
                <p className="text-xl text-gray-600 leading-relaxed">{c.subtitle}</p>
              )}
            </div>

            {/* ===========================
                CTAs
            ============================ */}
            <div className="flex flex-col sm:flex-row gap-4">
              {c.cta_text && (
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all duration-300 px-8 py-6"
                >
                  {c.cta_text || "Request a Demo"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}

              {c.cta_secondary && (
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary px-8 py-6"
                >
                  <Play className="mr-2 h-5 w-5" />
                  {c.cta_secondary || "Request a Demo"}
                </Button>
              )}
            </div>

            {/* ===========================
                Trust Indicators (Facts)
            ============================ */}
            {facts.length > 0 && (
              <div className="flex items-center space-x-8 pt-8">
                {facts.map((fact, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-primary">{fact.value}</div>
                    <div className="text-sm text-gray-600">{fact.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ===========================
              RIGHT: HERO IMAGE + FLOATING CARD
          ============================ */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Hero Image */}
            <div className="relative z-10 w-full max-w-lg">
              <ImageWithFallback
                src={
                  c.image ||
                  "https://images.unsplash.com/photo-1579784340946-55a7bbd51d57?auto=format&fit=crop&w=800&q=80"
                }
                alt={c.image_alt || "Hero image"}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>

            {/* Floating card (optional CMS) */}
            {(c.float_value || c.float_label) && (
              <div className="absolute bottom-0 left-4 translate-y-1/2 bg-white p-4 rounded-xl shadow-xl border z-20 w-48">
                <div className="w-full h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    {c.float_value && (
                      <div className="text-2xl font-bold text-primary">{c.float_value}</div>
                    )}
                    {c.float_label && (
                      <div className="text-sm text-gray-600">{c.float_label}</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
