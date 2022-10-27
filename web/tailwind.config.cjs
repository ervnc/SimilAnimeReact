/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    extend: {
      backgroundImage: {
        background_login: "url(/background_login.png)",
        background_user_registration: "url(/background_user_registration.png)",
        background_character_registration: "url(/background_character_registration.png)",
      },
      boxShadow: {
        left: 'inset 950px 4px 250px 30px #272323;',
        right: 'inset -950px 4px 250px 30px #272323',
        menu: '0px 15px 5px rgba(0, 0, 0, 0.25);',
      },
      backgroundColor: {
        color_input: "#333334",
        color_blue: "#1D90F4",
      },
      fontFamily: {
        quicksand: 'Quicksand, sans-serif',
        comfortaa: 'Comfortaa, sans-serif'
      }
    },
  },
  plugins: [],
}
