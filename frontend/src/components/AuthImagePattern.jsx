import React from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center min-h-screen p-12 relative overflow-hidden bg-gradient-to-br from-red-900 via-green-500 to-blue-500 text-purple-400">
      {/* Large blurred circle #1 */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl opacity-50 animate-pulse" />

      {/* Large blurred circle #2 */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl opacity-30 animate-ping" />

      <div className="max-w-md text-center z-10">
        {/* Animated 3x3 tiles */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-xl bg-cyan-300/20 transition-transform duration-300 hover:scale-105 ${
                i % 2 === 0 ? "animate-bounce" : "animate-pulse"
              }`}
            />
          ))}
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">{title}</h2>
        <p className="text-lg font-light drop-shadow-md">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
