import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import BrandHeader from "../BrandHeader/BrandHeader";
import BrandFooter from "../BrandHeader/BrandFooter";

//import "./LoginPage.css"; // You can remove this if you migrate fully to Tailwind

const LoginPage = ({ setUserLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://script.google.com/macros/s/AKfycbxPTBzOQdfrmLQf9FnXT1jyCr3U_WGaNdMCuXau_PSN5etcVgtG1JhIQCuXrZ6mNOeHUA/exec",
        null,
        {
          params: {
            action: "userValidation",
            username,
            password,
          },
        }
      );

      if (response.data.status === "Success" && response.data.message !== "Invalid Username and Password") {
        const userInfo = response.data.message;
        sessionStorage.setItem("userData", JSON.stringify(userInfo));
        sessionStorage.setItem("isLoggedIn", "true");
        setUserLoggedIn(true);
        setErrorMessage("");
      } else {
        setErrorMessage(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error", error);
      setErrorMessage("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 px-4">
      {/* Branding Header */}
      <BrandHeader />

      {/* Login Card */}
      <div className="w-[90%] max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            <input
              type="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-sm text-red-600 text-center mt-3">{errorMessage}</p>
        )}

        {/* Links */}
        <div className="mt-6 text-center space-y-2 text-sm text-gray-600">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              Register your Rice Mill
            </Link>
          </p>
          <p>
            <Link
              to="/forgot-password"
              className="font-medium text-secondary hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
      <BrandFooter />
    </div>
  );
};

export default LoginPage;
