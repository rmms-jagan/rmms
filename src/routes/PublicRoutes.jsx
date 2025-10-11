import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Landing Page Sections
import { ContentProvider } from "../context/ContentContext";
import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { HowItWorks } from "../components/HowItWorks";
import { ProductScreenshots } from "../components/ProductScreenshots";
import { WhyChoose } from "../components/WhyChoose";
import { Pricing } from "../components/Pricing";
import { Testimonials } from "../components/Testimonials";
import { CTABanner } from "../components/CTABanner";
import { Footer } from "../components/Footer";

// Auth Components
import LoginPage from "../components/LoginPage/LoginPage";
import RegisterPage from "../components/RegisterPage/RegisterPage";
import OTPVerification from "../components/OTP/OTPVerification";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import UpdatePassword from "../components/UpdatePassword/UpdatePassword";

export default function PublicRoutes({ setIsLoggedIn }) {
  return (
    <ContentProvider>
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

        {/* Auth routes */}
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage
                setUserLoggedIn={(val) => {
                  if (val) {
                    sessionStorage.setItem("isLoggedIn", "true");
                    setIsLoggedIn(true);
                  }
                }}
              />
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </ContentProvider>
  );
}
