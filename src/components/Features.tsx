import React from "react";
import { Card, CardContent } from "./ui/card";
import * as Icons from "lucide-react";
import { useContent } from "../context/ContentContext";

export function Features() {
  const content = useContent("Features");
  const features = Array.isArray(content.groups) ? content.groups : [];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            {content.title_before}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {content.title_highlight}
            </span>
          </h2>
          {content.subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.subtitle}
            </p>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature: any, index: number) => {
            const IconName = feature.feature_icon as keyof typeof Icons;
            const Icon = Icons[IconName] || Icons.Package; // fallback to Package

            return (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.feature_title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.feature_desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
