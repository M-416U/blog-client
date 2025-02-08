import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4F46E5", // Indigo
          dark: "#818CF8", // Lighter indigo for dark mode
        },
        background: {
          light: "#FFFFFF",
          dark: "#0F172A", // Slate 900
        },
        surface: {
          light: "#F8FAFC", // Slate 50
          dark: "#1E293B", // Slate 800
        },
        text: {
          light: "#1E293B", // Slate 800
          dark: "#F1F5F9", // Slate 100
        },
        accent: {
          light: "#EC4899", // Pink 500
          dark: "#F472B6", // Pink 400
        },
      },
    },
  },
  plugins: [],
};

export default config;
