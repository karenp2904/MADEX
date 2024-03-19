// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)"
      },
      backgroundImage: {
        "auth": "url('bg.svg')",
        "user": "url('user/user-primary.svg')",
        "lock": "url('password/cerrar-primary.svg')",
      }
    },
  },
  plugins: [],
}
