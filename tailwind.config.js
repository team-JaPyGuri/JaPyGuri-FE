/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sc: "37.5rem",
      },
      fontFamily: {
        pretendard: ["Pretendard Variable", "sans"],
      },
      fontSize: {
        "size-20": "1.25rem",
        "size-18": "1.125rem",
        "size-16": "1rem",
        "size-14": "0.875rem",
        "size-13": "0.813rem",
        "size-11": "0.688rem",
      },
      fontWeight: {
        semibold: "600",
        medium: "500",
        regular: "400",
      },
      colors: {
        red: "#f31110",
        yellow: "#FFD700",
        blue: "#710FD4",

        grayscale: {
          100: "#FFFFFF",
          200: "#F5F5F5",
          300: "#E0E0E0",
          400: "#8A8A8A",
          500: "#666666",
          600: "#2A2A2A",
          700: "#1A1B1F",
          800: "#000000",
        },

        nail: {
          red: "#FF5858",
          pink: "#FFC0CB",
          nude: "#F5DEB3",
          white: "#FFFFFF",
          black: "#000000",
          blue: "#6A6AFF",
          green: "#358B35",
          purple: "#A346A3",
          yellow: "#F9F985",
          orange: "#FFA500",
          brown: "#934F4F",
          gray: "#808080",
          gold: {
            start: "#FFD700",
            end: "#998100",
          },
          silver: {
            start: "#C0C0C0",
            end: "#5A5A5A",
          },
          rosegold: {
            start: "#B76E79",
            end: "#513136",
          },
          chrome: {
            start: "#D4AF37",
            end: "#6E5B1D",
          },
        },
      },
    },
  },
  plugins: [],
};
