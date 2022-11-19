import colors from "vuetify/es5/util/colors";

export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: "static",
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "IM CXM",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            {
                charset: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                hid: "description",
                name: "description",
                content: "",
            },
            {
                name: "format-detection",
                content: "telephone=no",
            },
        ],

        link: [
            {
                rel: "icon",
                type: "image/x-icon",
                href: "/favicon.ico",
            },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        "@/assets/scss/custom.scss",
        "@/assets/scss/octavia-design-system/octavia-design-system.scss",
        "@/assets/css/main.css",

        // '@/assets/base/_bootstrapStyle.scss',
        // '@/assets/base/_customBootstrap.scss',
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        "~/plugins/event.client.js",
        "~/plugins/dragAndDrop.js",
        "~/plugins/octavia.kit",
        "~/plugins/v-perfect-scrollbar.client.js",
        "~/plugins/vue-navigation-bar.client.js",
        "~/plugins/apexChart.client.js",
        "~/plugins/vue-draggable.js",
        "~/plugins/date-picker.js",
        "~/plugins/qrcode.client.js",
        "~/plugins/vue2Editor.js",
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        "@nuxt/typescript-build",
        // https://go.nuxtjs.dev/vuetify
        "@nuxtjs/vuetify",
        "@nuxt/postcss8",
        // '@nuxt/image',
    ],

    image: {
        domains: [
            "https://assets.hisense-usa.com",
            // 'http://localhost',
            // 'https://imcxm.dev.hisenseportal.com/'
        ],
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        "nuxt-webfontloader",
    ],

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ["~/assets/scss/variables.scss"],
        defaultAssets: {
            font: false,
        },
        treeShake: true,
        theme: {
            dark: false,
            themes: {
                light: {
                    primary: "#304156",
                    secondary: "#475569",
                    success: colors.green,
                    danger: colors.red,
                    warning: colors.deepOrange,
                    info: colors.indigo,
                    dark: "#242939",
                    background: "#f2f3f8",
                },
                dark: {
                    primary: "#475569",
                    secondary: "#304156",
                    success: colors.green,
                    danger: colors.red,
                    warning: colors.deepOrange,
                    info: colors.indigo,
                },
            },
        },
    },

    webfontloader: {
        google: {
            families: ["Archivo:400;500;600;700"],
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        postcss: {
            plugins: {
                tailwindcss: {},
                autoprefixer: {},
                "postcss-import": {},
            },
        },
    },

    env: {
        APP_NAME: process.env.APP_NAME || "imcxm",
        BASE_API_PATH: process.env.BASE_API_PATH || "https://imcxm.dev-api.hisenseportal.com/api",
        PORTAL_URL: process.env.PORTAL_URL || "https://secure.dev.hisenseportal.com/",
        DAM_API_URL: process.env.DAM_API_URL || 'https://assets.hisenseportal.com/api/v1'
    },
};
