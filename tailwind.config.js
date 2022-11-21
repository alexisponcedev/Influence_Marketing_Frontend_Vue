/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    corePlugins: {
        preflight: false,
    },
    prefix: 'tw-',
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],

    theme: {
        extend: {
            screens: {
                '3xl': '1650px',
            },
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
}
