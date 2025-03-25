import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fullPageNavActive: {
          '0%': {
            maxHeight: '0px'
          },
          '100%': {
            maxHeight: '10px'
          }
        }
      },
      animation: {
        fullPageNavActive: 'fullPageNavActive 0.5s ease'
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;
