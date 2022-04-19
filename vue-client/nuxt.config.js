export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Github",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  publicRuntimeConfig: {
    API_BASE: process.env.API_BASE,
    PORT: process.env.PORT,
    GRAPHQL_BASE: process.env.GRAPHQL_BASE,
    DOMAIN_NAME: process.env.DOMAIN_NAME,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~assets/css/global.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/api.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/svg-sprite"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "cookie-universal-nuxt",
    "@nuxtjs/apollo",
  ],
  svgSprite: {
    input: "~/assets/icons/svg/",
    output: "~/assets/icons/sprites/",
  },
  apollo: {
    includeNodeModules: true,
    clientConfigs: {
      default: "~/apollo/client.js",
    },
    tokenName: "token",
    cookieAttributes: {
      expires: 7,
      path: "/",
      domain: process.env.DOMAIN_NAME,
      secure: false,
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
