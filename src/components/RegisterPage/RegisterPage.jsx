import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, User, LockKeyhole, Home, Phone } from "lucide-react";

const RegistrationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rmmFirstName, setRmmFirstName] = useState("");
  const [rmmLastName, setRmmLastName] = useState("");
  const [rmmUserName, setRmmUserName] = useState("");
  const [rmmEmail, setRmmEmail] = useState("");
  const [rmmRiceMillName, setRmmRiceMillName] = useState("");
  const [rmmRiceMillAddress, setRmmRiceMillAddress] = useState("");
  const [rmmMobileNo, setRmmMobileNo] = useState("");
  const [rmmPassword, setRmmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(rmmEmail)) {
      setErrorMessage("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(rmmMobileNo)) {
      setErrorMessage("Please enter a valid Indian mobile number.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://script.google.com/macros/s/AKfycbxPTBzOQdfrmLQf9FnXT1jyCr3U_WGaNdMCuXau_PSN5etcVgtG1JhIQCuXrZ6mNOeHUA/exec",
        null,
        {
          params: {
            action: "userRegisterAction",
            rmmUserName,
            rmmFirstName,
            rmmLastName,
            rmmRiceMillName,
            rmmRiceMillAddress,
            rmmEmail,
            rmmMobileNo,
            rmmPassword,
          },
        }
      );

      if (response.data.status === "Success") {
        const pendingRegistration = {
          rmmEmail,
          status: "pendingRegistration",
        };
        sessionStorage.setItem("pendingOtp", JSON.stringify(pendingRegistration));
        navigate("/otp-verification");
      } else if (response.data.status === "Fail") {
        setErrorMessage(`${rmmEmail} already exists`);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setErrorMessage("Something went wrong. Please try again.");
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

      {/* Registration Card */}
      <div className="w-[90%] max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Your Account 🏭
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="First Name"
              value={rmmFirstName}
              onChange={(e) => setRmmFirstName(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          {/* Last Name */}
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Last Name"
              value={rmmLastName}
              onChange={(e) => setRmmLastName(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Username"
              value={rmmUserName}
              onChange={(e) => setRmmUserName(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            <input
              type="email"
              placeholder="Email"
              value={rmmEmail}
              onChange={(e) => setRmmEmail(e.target.value.toLowerCase())}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          {/* Rice Mill Name */}
          <div className="relative">
            <Home className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rice Mill Name"
              value={rmmRiceMillName}
              onChange={(e) => setRmmRiceMillName(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          {/* Rice Mill Address */}
          <div className="relative">
            <Home className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rice Mill Address"
              value={rmmRiceMillAddress}
              onChange={(e) => setRmmRiceMillAddress(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          {/* Mobile Number */}
          <div className="relative">
            <Phone className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Mobile Number"
              value={rmmMobileNo}
              onChange={(e) => setRmmMobileNo(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            <input
              type="password"
              placeholder="Password"
              value={rmmPassword}
              onChange={(e) => setRmmPassword(e.target.value)}
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
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Registering...
              </>
            ) : (
              "Register"
            )}
          </Button>
        </form>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-sm text-red-600 text-center mt-3">{errorMessage}</p>
        )}

        {/* Links */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
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

export default RegistrationPage;
