import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B04B3D",
        secondary: "#FDFBF7",
        accent: "#D4AF37",
        dark: "#0F0F0F"
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        sans: ["var(--font-body)"]
      }
    }
  },
  plugins: []
};
export default config;