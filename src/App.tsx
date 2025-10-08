import React from "react";
import { ContentProvider } from "./context/ContentContext";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <ContentProvider>
      <div className="min-h-screen bg-white">
        <Navigation />
        <main>
          <Hero />
          <Features />
        </main>
        <Footer />
      </div>
    </ContentProvider>
  );
}
