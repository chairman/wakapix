import React from "react";

export const PlaceholderImage: React.FC<{
  label?: string;
  aspect?: "sq" | "portrait" | "landscape";
  size?: number;
  gradient?: string;
  className?: string;
}> = ({
  label = "生成图片预览",
  aspect = "sq",
  size = 1,
  gradient = "linear-gradient(135deg, #e6edf5 0%, #cfd9e8 100%)",
  className = "",
}) => {
  const ratios = { sq: "1 / 1", portrait: "3 / 4", landscape: "16 / 9" };
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden text-center no-select ${className}`}
      style={{
        background: gradient,
        aspectRatio: ratios[aspect],
      }}
    >
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0 12px, transparent 12px 24px)",
      }} />
      <div className="relative z-10 flex flex-col items-center gap-2">
        <svg width={42 * size} height={42 * size} viewBox="0 0 24 24" fill="none" stroke="#8B98A8" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L9 18" />
        </svg>
        <span className="text-[11px] text-gray-500 font-medium tracking-wide">
          {label}
        </span>
      </div>
    </div>
  );
};
