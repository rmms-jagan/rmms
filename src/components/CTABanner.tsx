import { Button } from "./ui/button";
import { ArrowRight, Phone } from "lucide-react";

export function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Main Content */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-5xl font-bold text-white">
              Ready to Modernize Your Rice Mill?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join 200+ successful rice mill owners who have transformed their operations with RMMS. 
              Start your free trial today and see the difference in just 14 days.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-50 shadow-lg px-8 py-6 text-lg"
            >
              Schedule a Free Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call: +91 98765 43210
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 pt-8">
            <div className="flex items-center space-x-2 text-white/90">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}