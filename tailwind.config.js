/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    corePlugins: {
        preflight: false,
    },
    prefix: "tw-",
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./assets/**/*.scss",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],

    theme: {
        extend: {
            screens: {
                xxs: "351px",
                xs: "421px",
                sm: "576px",
                md: "769px",
                lg: "992px",
                xl: "1201px",
                "2xl": "1441px",
                "3xl": "1921px",
            },
            colors: {
                transparent: "transparent",
                midnight: "#131E29",
                skyblue: "#B6DCE4",
                lime: "#C5E86C",
                purple: "#9678D3",
                red: "#FA4616",
                orange: "#FFB81C",
                "gray-400": "#424B54",
                "gray-300": "#71787F",
                "gray-200": "#A1A5A9",
                "gray-100": "#D0D2D4",
            },
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
