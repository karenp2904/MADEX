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
        "ardilla": "var(--color-ardilla)",
        "gris": "var(--color-gris)"
      },
      backgroundImage: {
        "auth": "url('bg.svg')",
        "user": "url('user/user-primary.svg')",
        "lupa": "url('buscar.svg')",
        "lock": "url('password/cerrar-primary.svg')",
        "carrito": "url('carrito-de-compras.svg')",
        "aplicaciones": "url('aplicaciones/aplicaciones.svg')",
        "auditlog": "url('auditlog/auditlog.svg')",
        "m-users": "url('user/m-users.svg')",
        "roles": "url('user/roles.svg')",
        "facturas": "url('facturas/facturas.svg')",
        "muebles": "url('categorias/centro e irl.webp')"


      },
      screens: {
        'sm': '650px',
        'md': '950px',
        'lg': '1250px'
      },

      borderRadius:{
        'none': '0',
      'sm': '0.125rem',
      //DEFAULT: '0.25rem',
      //DEFAULT: '4px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'xl':'25px',
      'large': '12px'
      },

      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [],
})
