import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { ProductScreenshots } from "./components/ProductScreenshots";
import { WhyChoose } from "./components/WhyChoose";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { CTABanner } from "./components/CTABanner";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <ProductScreenshots />
        <WhyChoose />
        <Pricing />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}