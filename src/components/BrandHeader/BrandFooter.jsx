import React from "react";

const BrandFooter = () => {
  return (
    <p className="mt-6 text-xs text-gray-500 text-center">
      © {new Date().getFullYear()} RMMS — All rights reserved.
    </p>
  );
};

export default BrandFooter;
