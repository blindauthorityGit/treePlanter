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
                    //     DEFAULT: "#A0D31F",
                    //     50: "#E2F4B5",
                    //     100: "#DBF2A4",
                    //     200: "#CEEC80",
                    //     300: "#C0E75C",
                    //     400: "#B2E239",
                    //     500: "#A0D31F",
                    //     600: "#7BA218",
                    //     700: "#567111",
                    //     800: "#314009",
                    //     900: "#0C0F02",
                    // },
                    DEFAULT: "#758E4F",
                    50: "#CDD9BB",
                    100: "#C4D2AE",
                    200: "#B1C394",
                    300: "#9DB57A",
                    400: "#8AA660",
                    500: "#758E4F",
                    600: "#576A3B",
                    700: "#3A4627",
                    800: "#1C2213",
                    900: "#000000",
                },
                saboconOrange: {
                    DEFAULT: "#FC7327",
                    50: "#FFE8DC",
                    100: "#FEDBC8",
                    200: "#FEC1A0",
                    300: "#FDA777",
                    400: "#FD8D4F",
                    500: "#FC7327",
                    600: "#E85503",
                    700: "#B04002",
                    800: "#792C02",
                    900: "#421801",
                },
            },
        },
    },
    plugins: [],
};
