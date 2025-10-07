import { Button } from "./ui/button";
import { Play, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Empower Your Rice Mill with{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Smarter ERP Automation
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Streamline procurement, production, inventory, and sales — all in one cloud platform.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl transition-all duration-300 px-8 py-6"
              >
                Request a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary px-8 py-6"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Video
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">200+</div>
                <div className="text-sm text-gray-600">Rice Mills</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1579784340946-55a7bbd51d57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwbWlsbCUyMGZhY3RvcnklMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc1OTg0MzcwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Rice mill with digital automation"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
            {/* Floating dashboard card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl border">
              <div className="w-48 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">85%</div>
                  <div className="text-sm text-gray-600">Efficiency Gain</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}