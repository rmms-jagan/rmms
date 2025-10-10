import React from "react";
import { Card, CardContent } from "./ui/card";
import * as Icons from "lucide-react";
import { useContent } from "../context/ContentContext";

// ✅ Define CMS data structure for better type safety
interface FeatureGroup {
  feature_icon?: string;
  feature_title?: string;
  feature_desc?: string;
}

interface FeaturesContent {
  title_before?: string;
  title_highlight?: string;
  subtitle?: string;
  groups?: FeatureGroup[];
}

export function Features() {
  // ✅ Load content dynamically from CMS context
  const content = useContent("Features") as FeaturesContent;

  // ✅ Safely handle groups array
  const features = Array.isArray(content.groups) ? content.groups : [];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            {content.title_before || "Powerful Features for"}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {content.title_highlight || "Modern Rice Mills"}
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
          {features.length > 0 ? (
            features.map((feature, index) => {
              const IconName = feature.feature_icon as keyof typeof Icons;
              const Icon =
                (IconName && Icons[IconName]) || Icons.Package; // ✅ fallback icon

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
                      {feature.feature_title || "Feature Title"}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.feature_desc ||
                        "Feature description goes here."}
                    </p>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            // ✅ Fallback UI (if no CMS content)
            <>
              {[
                {
                  icon: "Database",
                  title: "Inventory Management",
                  desc: "Track stock levels, purchases, and usage in real time.",
                },
                {
                  icon: "Settings",
                  title: "Automation",
                  desc: "Automate billing, vendor tracking, and production.",
                },
                {
                  icon: "TrendingUp",
                  title: "Analytics",
                  desc: "Visualize data and improve decision-making.",
                },
                {
                  icon: "Users",
                  title: "Team Collaboration",
                  desc: "Empower your team with clear workflows and permissions.",
                },
              ].map((fallback, index) => {
                const Icon = Icons[fallback.icon as keyof typeof Icons];
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
                        {fallback.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {fallback.desc}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
