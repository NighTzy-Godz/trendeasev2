/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "rgb(var(--bg-color))",
        bgColorHover: "rgb(var(--bg-color-hover))",
        mainColor: "rgb(var(--main-color))",
        mainColorHover: "rgb(var(--main-color-hover) )",
        textColor: "rgb(var(--text-color) )",
        errColor: "rgb(var(--error-color) )",
      },
    },
  },
  plugins: [],
};
