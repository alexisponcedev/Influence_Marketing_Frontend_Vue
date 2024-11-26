<template>
    <v-navigation-drawer
        v-model="getThemeMode.verticalSidebarDrawer"
        :color="
            $vuetify.theme.dark
                ? 'dark'
                : getThemeMode.verticalSidebarDrawerColor
        "
        :expand-on-hover.sync="getThemeMode.verticalSidebarMini"
        :mini-variant="getThemeMode.verticalSidebarMini"
        :dark="
            getThemeMode.verticalSidebarDrawerColor != 'white' ? true : false
        "
        app
        :disable-resize-watcher="false"
        :mobile-breakpoint="960"
        height="100%"
        class="shadow-sm rounded-tr-lg rounded-br-lg"
        :floating="true"
        :right="$vuetify.rtl"
        v-bind="$attrs"
    >
        <template v-slot:img="props">
            <v-img :style="{ opacity: opacity }" v-bind="props" />
        </template>
        <vue-perfect-scrollbar
            :settings="{ suppressScrollX: true, wheelPropagation: false }"
            class="h-100 rtl-ps-none ps scroll"
            style="height: 100%"
        >
            <v-list dense nav>
                <v-list-item class="px-0">
                    <v-list-item-title class="pa-8">
                        <NuxtLink to="/">
                            <v-img
                                :src="
                                    logos[getActiveBrandName()] ||
                                    require('~/assets/images/menu/imdigital.png')
                                "
                            />
                        </NuxtLink>
                    </v-list-item-title>

                    <!-- <v-list-item-title class="text-18 text-uppercase text-default"
            >Octavia</v-list-item-title
          > -->
                    <v-scroll-x-transition>
                        <v-btn icon @click.stop="toggleSidebar">
                            <v-tooltip
                                v-if="!getThemeMode.verticalSidebarMini"
                                right
                                color="primary"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon dark v-bind="attrs" v-on="on" color
                                        >mdi-circle-slice-8</v-icon
                                    >
                                </template>
                                <span>UnPin</span>
                            </v-tooltip>
                            <v-tooltip
                                v-if="getThemeMode.verticalSidebarMini"
                                right
                                color="primary"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon dark v-bind="attrs" v-on="on" color
                                        >mdi-circle-outline</v-icon
                                    >
                                </template>
                                <span>pin</span>
                            </v-tooltip>
                        </v-btn>
                    </v-scroll-x-transition>
                </v-list-item>
            </v-list>

            <v-list>
                <template v-for="(item, i) in computedItems" v-if="item.if">
                    <div
                        :key="item.subheader"
                        v-if="item.subheader"
                        :class="miniVariant && 'px-1'"
                    >
                        <v-subheader>
                            {{ item.subheader }}
                        </v-subheader>
                        <v-divider />
                    </div>

                    <base-item-group
                        v-if="item.children"
                        :key="`group-${i}`"
                        :item="item"
                    />
                    <div v-else-if="item.divider" :key="`divider-${i}`">
                        <v-divider />
                    </div>
                    <base-item
                        v-else-if="!item.subheader && !item.children"
                        :key="`item-${i}`"
                        :item="item"
                    />
                </template>
            </v-list>
        </vue-perfect-scrollbar>
    </v-navigation-drawer>
</template>

<script>
import getActiveBrandName from "@/utils/getActiveBrandName";
import { mapGetters, mapActions } from "vuex";
import getProfile from "@/utils/getProfile";
import { items } from "@/data/navigation";

export default {
    data() {
        return {
            drawer: true,
            switch1: "on",
            color: "dark",
            colors: ["primary", "blue", "success", "red", "teal"],
            right: false,
            permanent: true,
            miniVariant: false,
            expandOnHover: false,
            items: items,
            opacity: 0.4,
            getProfile: getProfile,
            getActiveBrandName: getActiveBrandName,
            logos: {
                hisenseusa: require("~/assets/images/menu/logo-dark.png"),
                hisensecanada: require("~/assets/images/menu/logo-dark.png"),
                imdigital: require("~/assets/images/menu/imdigital.png"),
            },
        };
    },
    computed: {
        ...mapGetters("themeConfig", ["getThemeMode"]),
        getMiniVariant() {
            return this.miniVariant;
        },
        computedItems() {
            return this.items().map(this.mapItem);
        },
    },
    methods: {
        ...mapActions({
            changeVerticalSidebarDrawer:
                "themeConfig/changeVerticalSidebarDrawer",
            changeVerticalSidebarMini: "themeConfig/changeVerticalSidebarMini",
        }),
        toggleSidebar() {
            this.changeVerticalSidebarMini();
            this.expandOnHover = !this.expandOnHover;
        },
        mapItem(item) {
            return {
                ...item,
                children: item.children
                    ? item.children.map(this.mapItem)
                    : undefined,
                title: item.title,
            };
        },
    },
};
</script>

<style lang="scss">
.ps-container {
    position: inherit !important;
}
.app-admin-wrap-layout-1.sidebar-mini {
    .v-toolbar {
        left: 56px !important;
        transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
    }
    .v-main {
        padding: 75px 0px 12px 56px !important;
        transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
        padding-bottom: 0px !important;
    }
    &.sidebar-close {
        .v-toolbar {
            left: 0px !important;
            transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
        }
        .v-main {
            padding: 75px 0px 12px 0px !important;
            transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
            padding-bottom: 0px !important;
        }
    }
}
</style>
