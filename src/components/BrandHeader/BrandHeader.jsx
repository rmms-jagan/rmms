import React from "react";
import { useNavigate } from "react-router-dom";

const BrandHeader = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center mb-6 space-x-2 cursor-pointer select-none"
      onClick={() => navigate("/")}
    >
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md hover:scale-105 transition-transform">
        <span className="text-white font-bold text-lg">R</span>
      </div>
      <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
        RMMS
      </h1>
    </div>
  );
};

export default BrandHeader;
