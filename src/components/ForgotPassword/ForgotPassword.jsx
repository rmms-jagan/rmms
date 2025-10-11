import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Loader2, Mail } from "lucide-react";

const ForgotPassword = () => {
  const [rmmEmail, setRmmEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://script.google.com/macros/s/AKfycbxPTBzOQdfrmLQf9FnXT1jyCr3U_WGaNdMCuXau_PSN5etcVgtG1JhIQCuXrZ6mNOeHUA/exec",
        null,
        {
          params: {
            action: "forgotPassword",
            rmmEmail,
          },
        }
      );

      if (response.data.status === "Success") {
        const forgotJson = {
          rmmEmail,
          status: "forgotPasswordPending",
        };
        sessionStorage.setItem("pendingOtp", JSON.stringify(forgotJson));
        navigate("/otp-verification");
      } else {
        setError(response.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 px-4">
      {/* Branding Header */}
      <div className="flex items-center mb-6 space-x-2">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-lg">R</span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
          RMMS
        </h1>
      </div>

      {/* Forgot Password Card */}
      <div className="w-[90%] max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Forgot Password 🔐
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            <input
              type="email"
              placeholder="Enter your registered Email"
              value={rmmEmail}
              onChange={(e) => setRmmEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending OTP...
              </>
            ) : (
              "Send OTP"
            )}
          </Button>
        </form>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-600 text-center mt-3">{error}</p>
        )}

        {/* Links */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Login Here
          </Link>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-xs text-gray-500">
        © {new Date().getFullYear()} RMMS — All rights reserved.
      </p>
    </div>
  );
};

export default ForgotPassword;
