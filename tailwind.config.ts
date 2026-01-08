import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#419745",
        deep: "#105213",
        lime: "#9EBF23",
        light: "#81BD42",
        navy: "#031926",
        olive: "#3d4a3a",
        forest: "#2a352a",
        cream: "#f5f5f0",
        blue: "#344966",
        gray: "#646C62",
      },
      fontFamily: {
        drawing: "inherit",
        sans: ["var(--font-oak)", "system-ui", "sans-serif"],
        serif: ["var(--font-astoria)", "Georgia", "serif"],
      },
      letterSpacing: {
        wide: "0.02em",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
