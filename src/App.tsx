import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Inventory from "./components/Inventory/Inventory";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import OTPVerification from "./components/OTP/OTPVerification";
import Profile from "./components/Profile/Profile";
import Reports from "./components/Reports/Reports";
import Settings from "./components/Settings/Settings";
import Customers from "./components/Customers/Customers";
import AttendanceForm from "./components/AttendanceForm/AttendanceForm";
import GoodsSalesVoucherForm from "./components/GoodsSalesVoucherForm/GoodsSalesVoucherForm";
import GoodsPaymentForm from "./components/GoodsPaymentForm/GoodsPaymentForm";
import PaddyPurchaseForm from "./components/PaddyPurchaseForm/PaddyPurchaseForm";
import PaddyPurchaseReport from "./components/PaddyPurchaseForm/PaddyPurchaseReport";
import TransitPassList from "./components/Transit/TransitPassList/TransitPassList";
import ViewTransitPassForm from "./components/Transit/ViewTransitPassForm/ViewTransitPassForm";
import SalesVoucherCardView from "./components/report/SalesVoucherCardView/SalesVoucherCardView";
import LandingPage from "./components/LandingPage/LandingPage";

// ✅ Optional: Modern marketing components from your new Vite app
import { ContentProvider } from "./context/ContentContext";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { ProductScreenshots } from "./components/ProductScreenshots";
import { WhyChoose } from "./components/WhyChoose";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { CTABanner } from "./components/CTABanner";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLogin = sessionStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Navbar logout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/paddyPurchaseForm" element={<PaddyPurchaseForm onClose={() => {}}  />} />
            <Route path="/paddyPurchaseReport" element={<PaddyPurchaseReport />} />
            <Route path="/viewTransitPass" element={<TransitPassList />} />
            <Route path="/viewTransitPassForm" element={<ViewTransitPassForm  onDone={() => {}} />} />
            <Route path="/transit-pass/edit" element={<ViewTransitPassForm mode="edit" />} />
            <Route path="/goodsSalesVoucherForm" element={<GoodsSalesVoucherForm />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/attendanceForm" element={<AttendanceForm />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/goodsPaymentForm" element={<GoodsPaymentForm />} />
            <Route path="/paddyPaymentForm" element={<GoodsPaymentForm />} />
            <Route path="/salesVoucherCardView" element={<SalesVoucherCardView />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          {/* Landing + Marketing section (from Vite site) */}
          <Route
            path="/"
            element={
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
                </div>
              </ContentProvider>
            }
          />
          {/* Authentication Routes */}
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
      )}
    </Router>
  );
}
