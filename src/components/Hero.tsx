import { Button } from "./ui/button";
import { Play, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import React from "react";
import { useContent } from "../context/ContentContext";

export function Hero() {
  const c = useContent("Hero");

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                {c.title || "Default Title"}
                <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> {c.titleTag || "Default Title"}</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {c.subtitle || "Default subtitle goes here."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl">
                {c.cta_text || "Request a Demo"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Play className="mr-2 h-5 w-5" />
                {c.cta_secondary || "Watch Video"}
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <ImageWithFallback 
              src={c.image || "https://images.unsplash.com/photo-1579784340946-55a7bbd51d57"}
              alt={c.image_alt || "Default Hero"}
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
