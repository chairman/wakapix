import React from "react";

export const Tag: React.FC<{
  children: React.ReactNode;
  color?: "green" | "orange" | "gray" | "blue" | "red";
  dot?: boolean;
  onClick?: () => void;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}> = ({ children, color = "gray", dot, onClick, removable, onRemove, className = "" }) => {
  const colors = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    gray: "bg-gray-100 text-gray-600 border-gray-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    red: "bg-red-50 text-red-700 border-red-200",
  };
  const dotColors = {
    green: "#10b981",
    orange: "#f97316",
    gray: "#9ca3af",
    blue: "#3b82f6",
    red: "#ef4444",
  };
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] border font-medium ${colors[color]} ${
        onClick ? "cursor-pointer hover:opacity-80" : ""
      } ${className}`}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: dotColors[color] }}
        />
      )}
      <span>{children}</span>
      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-0.5 opacity-60 hover:opacity-100 text-current"
          aria-label="remove"
        >
          ×
        </button>
      )}
    </span>
  );
};
