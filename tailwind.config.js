/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sc: "37.5rem",
      },
      flex: {
        2: "2 2 0%",
        3: "3 4 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
        8: "8 8 0%",
        9: "9 9 0%",
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
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideIn: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideOut: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        likeActive: {
          "0%": { transform: "scale(1)" },
          "10%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out forwards",
        fadeOut: "fadeOut 0.3s ease-in-out forwards",
        slideIn: "slideIn 0.3s ease-in-out forwards",
        slideOut: "slideOut 0.3s ease-in-out forwards",
        likeActive: "likeActive 0.2s ease-in-out forwards",
      },
      aspectRatio: {
        camera: "3 / 4",
      },
      colors: {
        red: "#f31110",
        yellow: "#FFD700",
        blue: "#710FD4",

        grayscale: {
          100: "#FFFFFF",
          200: "#F5F5F5",
          300: "#F0F0F0",
          400: "#E0E0E0",
          500: "#8A8A8A",
          600: "#666666",
          700: "#2A2A2A",
          800: "#1A1B1F",
          900: "#000000",
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
  plugins: [require("tailwind-scrollbar-hide")],
};
