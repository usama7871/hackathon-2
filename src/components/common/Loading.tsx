import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function Loading({ size = "md", text }: LoadingProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Custom SVG Spinner with Glow Effect */}
      <div className="relative">
        <svg
          className={`${sizeClasses[size]} animate-spin text-[#FFD700]`}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
              <stop offset="70%" stopColor="#FFD700" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle
            cx="32"
            cy="32"
            r="30"
            stroke="url(#glow)"
            strokeWidth="4"
            className="opacity-80"
          />
          <path
            d="M32 8C18.76 8 8 18.76 8 32C8 45.24 18.76 56 32 56C45.24 56 56 45.24 56 32C56 18.76 45.24 8 32 8ZM32 0C49.64 0 64 14.36 64 32C64 49.64 49.64 64 32 64C14.36 64 0 49.64 0 32C0 14.36 14.36 0 32 0Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
        </svg>

        {/* Glowing Ring */}
        <div
          className={`absolute inset-0 rounded-full ${
            size === "lg" ? "w-20 h-20" : size === "md" ? "w-16 h-16" : "w-10 h-10"
          } animate-ping border-4 border-[#FFD700]/50`}
        />
      </div>

      {/* Optional Text with Neon Glow */}
      {text && (
        <p
          className="mt-4 text-[#FFD700] font-semibold text-center text-opacity-80 animate-pulse"
          style={{ textShadow: "0 0 8px #FFD700, 0 0 12px #FFA500" }}
        >
          {text}
        </p>
      )}
    </div>
  );
}
