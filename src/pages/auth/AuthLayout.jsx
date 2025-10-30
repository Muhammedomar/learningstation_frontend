// frontend/src/components/layout/AuthLayout.jsx
import React from "react";
import backImg from "../../assets/Gemini_Generated_Image_oid9x2oid9x2oid9.png";

const AuthLayout = ({ children, leftImage }) => {
  return (
    <div
      className="min-h-screen max-w-full flex justify-center items-center bg-[#235391]"
      style={{
        backgroundImage: `url(${backImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl pr-5 flex gap-5 justify-center items-center h-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        {/* Left side image */}
        {leftImage && (
          <div className="flex-1">
            <img
              className="rounded-t-lg h-[80vh] object-cover overflow-hidden"
              src={leftImage}
              alt="Auth visual"
              loading="lazy"
            />
          </div>
        )}

        {/* Right side content */}
        <div className="flex-1 w-full">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
