/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#FEE09A",
          DEFAULT: "#FDB713",
          dark: "#DE9C02",
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
