/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#ffecb1",
          DEFAULT: "#FFCA1F",
          dark: "#ffc100",
        },
      },
    },
  },
  plugins: [],
  prefix: "fbb-",
  important: true,
  corePlugins: {
    preflight: false,
  },
};
