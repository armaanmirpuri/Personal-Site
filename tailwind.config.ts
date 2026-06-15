import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101418",
        paper: "#f8faf7",
        line: "rgb(16 20 24 / 0.12)"
      },
      boxShadow: {
        soft: "0 24px 80px rgb(16 20 24 / 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
