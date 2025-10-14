/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // ✅ Enables dark mode
  theme: {
    extend: {
      colors: {
        primary: "#0d9488", // teal-600
        accent: "#16a34a",  // green-600
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
