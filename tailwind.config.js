// /** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                ...fontFamily,
                sans: ["Montserrat", "sans-serif"],
            },
            colors: {
                primaryColor: {
                    DEFAULT: "#A0D31F",
                    50: "#E2F4B5",
                    100: "#DBF2A4",
                    200: "#CEEC80",
                    300: "#C0E75C",
                    400: "#B2E239",
                    500: "#A0D31F",
                    600: "#7BA218",
                    700: "#567111",
                    800: "#314009",
                    900: "#0C0F02",
                },
            },
        },
    },
    plugins: [],
};
