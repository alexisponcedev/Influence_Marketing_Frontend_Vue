import colors from "vuetify/lib/util/colors";

export const themeConfig = {
  disableCustomizer: true, // options[Boolean] : true, false(default)
  rtl: false, // options[Boolean] : true, false(default)
  verticalSidebarMini: false, // options[Boolean] : true, false(default)
  verticalSidebarDrawer: true, // options[Boolean] : true, false(default)
  verticalCompactSidebarDrawer: true, // options[Boolean] : true, false(default)
  verticalSaasSidebarDrawer: true, // options[Boolean] : true, false(default)
  showBreadcrumb: true, // options[Boolean] : true, false(default)
  layout: "VerticalWhiteSidebar", //VerticalWhiteSidebar,VerticalCompactSidebar,VerticalSaasLayout,VerticalSidebar,HorizontalBar
  isLoading: false,
  isDark: false,
  verticalSidebarDrawerColor: "white", // primary,white,sucsess,warning,etc
  appBarColor: "white" // primary,white,sucsess,warning,etc
};

export const themePreset = {
  breakpoint: {
    scrollBarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920
    }
  },

  rtl: false,

  theme: {
    default: "light",
    disable: false,
    options: {
      cspNonce: undefined,
      customProperties: true,
      minifyTheme: undefined,
      themeCache: undefined
    },
    themes: {
      light: {
        primary: colors.blue,
        secondary: "#304156",
        success: colors.green,
        danger: colors.red,
        warning: colors.deepOrange,
        info: colors.indigo,
        dark: "#242939",
        background: "#f2f3f8"
      },
      dark: {
        primary: colors.blue,
        secondary: "#304156",
        success: colors.green,
        danger: colors.red,
        warning: colors.deepOrange,
        info: colors.indigo
      }
    }
  }
};
