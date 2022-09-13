/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx", // todos os arquivos dentro da pasta src e que terminam com tsx
    "./index.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        galaxy: "url('/background-galaxy.png')",
      },
    },
  },
  plugins: [],
};
