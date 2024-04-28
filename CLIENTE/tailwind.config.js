/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        //DEFAULT: '0.25rem',
        //DEFAULT: '4px',
        'md': '0.375rem',
        'lg': '0.5rem',
        'full': '9999px',
        'xl': '25px',
        'large': '12px'
      },
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "ardilla": "var(--color-ardilla)",
        "gris": "var(--color-gris)",
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
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}