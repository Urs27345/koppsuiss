import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      miniLandscape: "400px",
      phoneLandscape: "480px",
      phone: "640px",
      tablet: "769px",
      desktop: "1025px",
      laptop: "1280px",
      large: "1440px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: "#ff0000",
        green: "#00a335",
        darkGray: "#272e32",
        lightGray: "#969696",
        secondaryGray: "#777777",
        thirdGray: "#444444",
        fourthGray: "#404040bf",
        secondaryBlack: "#240000"
      },
      spacing: {
        3.5: "14px",
        5.5: "22px",
        30: '30px',
        49: "49px",
        93: '93px',
      }
    },
  },
  plugins: [],
};
export default config;
