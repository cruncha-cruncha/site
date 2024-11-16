import * as defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "special-elite": ["Special Elite", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        xxs: ".5rem",
      },
    },
  },
  plugins: [],
};
