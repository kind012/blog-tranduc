/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Inter: "Inter",
    },
    container: {
      center: true,
      padding: "4rem",
    },
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        grid1: "494.763px 197.913px 197.9px 197.913px 197.913px",

        // Complex site-specific column configuration
        footer: "200px minmax(900px, 1fr) 100px",
      },
      width: {
        widths: "calc(calc(100% / 4) - 30px)",
      },
    },
  },
  plugins: [],
};
