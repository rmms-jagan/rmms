import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { LockKeyhole, CheckCircle, XCircle, Loader2 } from "lucide-react";
import BrandHeader from "../BrandHeader/BrandHeader";
import BrandFooter from "../BrandHeader/BrandFooter";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const pendingPassowrdUpdate = JSON.parse(
    sessionStorage.getItem("pendingPassowrdUpdate")
  );

  useEffect(() => {
    if (!pendingPassowrdUpdate || !pendingPassowrdUpdate.rmmEmail) {
      navigate("/login");
    }
  }, [navigate, pendingPassowrdUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://script.google.com/macros/s/AKfycbxPTBzOQdfrmLQf9FnXT1jyCr3U_WGaNdMCuXau_PSN5etcVgtG1JhIQCuXrZ6mNOeHUA/exec",
        null,
        {
          params: {
            action: "setNewPassword",
            rmmEmail: pendingPassowrdUpdate.rmmEmail,
            newPasswordValue: password,
          },
        }
      );

      if (response.data.status === "Success") {
        sessionStorage.removeItem("pendingPassowrdUpdate");
        setSuccess("Password updated successfully!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.data.message || "Failed to update password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 px-4">
      <BrandHeader />

      {/* Reset Password Card */}
      <div className="w-[90%] max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reset Your Password 🔒
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password Field */}
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>

        {/* Error / Success Messages */}
        {error && (
          <div className="flex items-center justify-center mt-4 text-red-600 text-sm">
            <XCircle className="h-4 w-4 mr-2" /> {error}
          </div>
        )}
        {success && (
          <div className="flex items-center justify-center mt-4 text-green-600 text-sm">
            <CheckCircle className="h-4 w-4 mr-2" /> {success}
          </div>
        )}
      </div>

      <BrandFooter />
    </div>
  );
};

export default UpdatePassword;
