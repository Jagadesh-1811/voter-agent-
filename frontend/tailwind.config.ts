import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-instrument)", "sans-serif"],
        serif: ["var(--font-newsreader)", "serif"],
      },
      colors: {
        "stone-black": "hsl(27 7% 3%)",
        "warm-charcoal": "#1C1917",
        "stone": "#E7E5E4",
        "lime": "#D4F268",
        "card": "#292524",
      },
      zIndex: {
        '9999': '9999',
      }
    },
  },
  plugins: [],
};
export default config;
