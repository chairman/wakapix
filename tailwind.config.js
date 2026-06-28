/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1E3A5F",
          primaryHover: "#172F4E",
          accent: "#FF6B35",
          accentHover: "#E85A26",
          bg: "#F8F9FA",
          card: "#FFFFFF",
          border: "#E5E7EB",
          text: "#1F2937",
          textSecondary: "#6B7280",
          light: "#EEF3F9",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "Source Han Sans CN",
          "Noto Sans SC",
          "Microsoft YaHei",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        cardHover: "0 8px 24px rgba(30,58,95,0.12)",
        focus: "0 0 0 3px rgba(255,107,53,0.2)",
      },
      borderRadius: {
        lg: "8px",
        xl: "12px",
      },
      keyframes: {
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        pulse2: {
          "0%,100%": { opacity: 1 },
          "50%": { opacity: 0.6 },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { opacity: 0, transform: "translateY(8px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        spin: "spin 1s linear infinite",
        pulse2: "pulse2 1.5s ease-in-out infinite",
        fadeIn: "fadeIn 0.2s ease-out",
        slideUp: "slideUp 0.25s ease-out",
      },
    },
  },
  plugins: [],
};
