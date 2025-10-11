import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Loader2, KeyRound, XCircle } from "lucide-react";
import BrandHeader from "../BrandHeader/BrandHeader";
import BrandFooter from "../BrandHeader/BrandFooter";
const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const pendingOtp = JSON.parse(sessionStorage.getItem("pendingOtp"));

  useEffect(() => {
    if (!pendingOtp || !pendingOtp.rmmEmail) {
      navigate("/login");
    }
  }, [navigate, pendingOtp]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (fullOtp.length !== 4) {
      setErrorMessage("Please enter the 4-digit OTP.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://script.google.com/macros/s/AKfycbxPTBzOQdfrmLQf9FnXT1jyCr3U_WGaNdMCuXau_PSN5etcVgtG1JhIQCuXrZ6mNOeHUA/exec",
        null,
        {
          params: {
            action: "otpVerification",
            rmmOtp: fullOtp,
            rmmEmailId: pendingOtp.rmmEmail,
          },
        }
      );

      console.log("🔹 OTP API Response:", response.data);
      console.log("🔹 Pending OTP:", pendingOtp);

      if (response.data.status?.toLowerCase() === "success") {
        sessionStorage.removeItem("pendingOtp");

        const email = pendingOtp.rmmEmail;
        const status = (pendingOtp.status || "").toLowerCase();

        if (status.includes("forgotpassword")) {
          console.log("➡️ Navigating to Update Password...");
          const pendingPassowrdUpdate = {
            rmmEmail: email,
            status: "pendingPassowrdUpdate",
          };
          sessionStorage.setItem(
            "pendingPassowrdUpdate",
            JSON.stringify(pendingPassowrdUpdate)
          );
          setTimeout(() => navigate("/update-password"), 100);
        } else if (status.includes("pendingregistration")) {
          console.log("➡️ Navigating to Login after registration...");
          navigate("/login");
        } else {
          console.log("⚠️ Unknown status — navigating to login.");
          navigate("/login");
        }
      } else {
        setErrorMessage(response.data.message || "OTP verification failed.");
      }
    } catch (error) {
      console.error("❌ OTP verification error:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 px-4">
      <BrandHeader />

      {/* OTP Card */}
      <div className="w-[90%] max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          OTP Verification 🔐
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Inputs */}
          <div className="flex justify-center space-x-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                required
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/40 outline-none"
              />
            ))}
          </div>

          {/* Verify Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Verifying...
              </>
            ) : (
              <>
                <KeyRound className="h-4 w-4 mr-2" /> Verify OTP
              </>
            )}
          </Button>
        </form>

        {/* Error Message */}
        {errorMessage && (
          <div className="flex items-center justify-center mt-4 text-red-600 text-sm">
            <XCircle className="h-4 w-4 mr-2" /> {errorMessage}
          </div>
        )}
      </div>

      <BrandFooter />
    </div>
  );
};

export default OTPVerification;
