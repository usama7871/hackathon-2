import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function Loading({ size = "md", text }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Custom SVG Spinner */}
      <svg
        className={`${sizeClasses[size]} animate-spin text-[#B88E2F]`}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 64C14.36 64 0 49.64 0 32C0 14.36 14.36 0 32 0C49.64 0 64 14.36 64 32C64 49.64 49.64 64 32 64ZM32 8C18.76 8 8 18.76 8 32C8 45.24 18.76 56 32 56C45.24 56 56 45.24 56 32C56 18.76 45.24 8 32 8Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <path
          d="M32 0C36.58 0 41.12 0.88 45.48 2.6C49.84 4.32 53.92 6.84 57.52 10.04C61.12 13.24 64.16 17.08 66.48 21.36C68.8 25.64 70.36 30.28 71.08 35.08C71.8 39.88 71.68 44.76 70.72 49.52C69.76 54.28 67.96 58.84 65.4 63.04L59.32 59.56C61.36 56.12 62.8 52.32 63.56 48.36C64.32 44.4 64.4 40.36 63.8 36.4C63.2 32.44 61.92 28.64 60.04 25.16C58.16 21.68 55.72 18.6 52.84 16.04C49.96 13.48 46.68 11.48 43.16 10.12C39.64 8.76 35.96 8.08 32.24 8.08L32 0Z"
          fill="currentColor"
        />
      </svg>

      {/* Optional Text with Pulse Animation */}
      {text && (
        <p className="mt-2 text-gray-600 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}