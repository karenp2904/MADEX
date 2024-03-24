// tailwind.config.js
import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "ardilla": "var(--color-ardilla)"
      },
      backgroundImage: {
        "auth": "url('bg.svg')",
        "user": "url('user/user-primary.svg')",
        "lock": "url('password/cerrar-primary.svg')",
        "carrito": "url('carrito-de-compras.svg')",
        "snk": "url('snk.jpg')",
      },
      screens: {
        'sm': '650px',
        'md': '950px',
        'lg': '1250px'
      }
    },
  },
  plugins: [],
})
