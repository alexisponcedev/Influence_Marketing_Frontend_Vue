<template>
    <div>
        <v-sheet class="header-backup"></v-sheet>
        <v-app-bar
            :color="$vuetify.theme.dark ? 'dark' : getThemeMode.appBarColor"
            :dark="getThemeMode.appBarColor != 'white' ? true : false"
            app
            class="px-sm text-left shadow-sm ma-4 rounded-lg"
            flat
            height="75"
        >
            <v-app-bar-nav-icon
                v-ripple="{ class: 'primary--text' }"
                @click="changeVerticalSidebarDrawer"
            />
            <v-progress-linear
                :active="getThemeMode.isLoading"
                :indeterminate="getThemeMode.isLoading"
                absolute
                bottom
                color="primary"
            />
            <v-spacer />

            <span
                v-if="
                    Api.PublicDeployment.status &&
                    (Api.PublicDeployment.status.inprogress ||
                        Api.PublicDeployment.status.waiting)
                "
                class="pr-8"
            >
                <v-progress-circular
                    indeterminate
                    class="mr-1"
                    color="primary"
                    width="1"
                    size="20"
                />
                <template v-if="Api.PublicDeployment.status.inprogress">
                    {{ Api.PublicDeployment.status.inprogress }}
                    build in process
                </template>

                <template
                    v-if="
                        Api.PublicDeployment.status.inprogress &&
                        Api.PublicDeployment.status.waiting
                    "
                >
                    and
                </template>

                <template v-if="Api.PublicDeployment.status.waiting">
                    {{ Api.PublicDeployment.status.waiting }} build waiting
                </template>

                ...
            </span>

            <!-- <v-badge
        bordered
        overlap
        content="3"
        color="red"
        offset-x="22"
        offset-y="22"
      >
        <v-btn icon @click="notificationDrawer = !notificationDrawer">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </v-badge> -->

            <!-- <v-btn icon @click="searchDrawer = !searchDrawer">
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

            <v-chip pill class="transparent py-5" @click="showUserDrawer()">
                Hi,
                {{
                    getProfile().first_name || getProfile().user_name || "Admin"
                }}
                <v-avatar class="ml-2">
                    <v-img
                        v-if="getProfile().avatar"
                        :src="getProfile().avatar"
                    />
                    <v-icon v-else large> mdi-account-circle-outline </v-icon>
                </v-avatar>
            </v-chip>
        </v-app-bar>
        <!-- userDrawer -->
        <v-navigation-drawer
            v-model="userDrawer"
            fixed
            right
            height="100%"
            temporary
            floating
            width="350"
            :key="userDrawerForceUpdateIndex"
        >
            <user-drawer>
                <template v-slot:userDrawerCloseButton>
                    <v-btn icon color @click.stop="userDrawer = !userDrawer">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
            </user-drawer>

            <template v-slot:append>
                <div v-if="getProfile().level == 'Admin'" class="my-4 mx-4">
                    <base-hover-button
                        @click.native="goToPortal"
                        text="Portal"
                        block
                        bg-color="lighten-5 primary--text"
                        icon-name="mdi-account-supervisor"
                    />
                </div>
                <div class="my-4 mx-4">
                    <base-hover-button
                        @click.native="logoutUser"
                        text="Logout"
                        block
                        bg-color="primary lighten-5 primary--text"
                        icon-name="mdi-logout"
                    />
                </div>
            </template>
        </v-navigation-drawer>

        <!-- notificationDrawer  -->
        <v-navigation-drawer
            v-model="notificationDrawer"
            fixed
            right
            height="100%"
            temporary
            floating
            width="350"
        >
            <notification-drawer>
                <template v-slot:notificationDrawerCloseButton>
                    <v-btn
                        icon
                        color
                        @click.stop="notificationDrawer = !notificationDrawer"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
            </notification-drawer>

            <template v-slot:append>
                <div class="my-4 mx-4">
                    <base-hover-button
                        text="View All Notifications"
                        block
                        bg-color="primary lighten-5 primary--text"
                    />
                </div>
            </template>
        </v-navigation-drawer>
        <!-- searchDrawer -->
        <v-navigation-drawer
            v-model="searchDrawer"
            fixed
            right
            height="100%"
            temporary
            floating
            width="380"
        >
            <search-drawer>
                <template v-slot:searchDrawerCloseButton>
                    <v-btn
                        icon
                        color
                        @click.stop="searchDrawer = !searchDrawer"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
            </search-drawer>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Api, AppStore, ThemeConfig } from "@/store";
import { mapGetters, mapActions } from "vuex";
import getProfile from "@/utils/getProfile";

@Component({
    components: {
        UserDrawer: () => import("../common-drawer/UserDrawer.vue"),
        NotificationDrawer: () =>
            import("../common-drawer/NotificationDrawer.vue"),
        SearchDrawer: () => import("../common-drawer/SearchDrawer.vue"),
    },
    computed: {
        ...mapGetters("themeConfig", ["getThemeMode"]),
    },
    methods: {
        ...mapActions({
            changeVerticalSidebarDrawer:
                "themeConfig/changeVerticalSidebarDrawer",
        }),
    },
})
export default class VerticallAppBar extends Vue {
    ThemeConfig = ThemeConfig;
    getProfile = getProfile;
    Api = Api;

    userDrawer: Boolean = false;
    notificationDrawer: Boolean = false;
    searchDrawer: Boolean = false;

    userDrawerForceUpdateIndex = 0;

    logoutUser() {
        this.$router.push("/auth/logout");
    }

    goToPortal() {
        if (process.env.PORTAL_URL)
            window.location.href = process.env.PORTAL_URL;
        else
            AppStore.showSnackBar({
                message: "Portal URL Not Resolved!",
                color: "error",
            });
    }

    showUserDrawer() {
        this.userDrawerForceUpdateIndex++;
        this.userDrawer = !this.userDrawer;
        this.$forceUpdate();
    }

    _timer: any = null;
    _timerStatus: boolean = false;

    mounted() {
        this.setupTimer();
    }

    async setupTimer() {
        if (!this._timerStatus) {
            await this.getDeployStatus();
            this._timerStatus = true;
            await new Promise((resolve) => setTimeout(resolve, 30000));
            this._timerStatus = false;
            this.setupTimer();
        }
    }

    async getDeployStatus() {
        await Api.PublicDeployment.getStatus();
    }

    beforeDestroy() {
        if (this._timer) clearInterval(this._timer);
    }
}
</script>

<style lang="scss">
.header-backup {
    display: block;
    width: 100%;
    height: 102px;
    position: fixed;
    top: 0;
    z-index: 5;
    background: linear-gradient(
        180deg,
        hsla(0, 0%, 97.3%, 0.95) 44%,
        hsla(0, 0%, 97.3%, 0.46) 73%,
        hsla(0, 0%, 100%, 0)
    ) !important;
    left: 0;
    &.theme--dark {
        background: linear-gradient(
            180deg,
            rgba(5, 5, 5, 0.95) 44%,
            rgba(0, 0, 0, 0.46) 3%,
            hsla(0, 0%, 100%, 0)
        ) !important;
    }
}
.tippy-box[data-theme~="light"] {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.vnb {
    background: transparent !important;
    &__menu-options {
        margin-top: 3px !important;
        &__option {
            &__link {
                &:focus {
                    outline: none;
                    border: 1px solid none;
                }
                &:hover {
                    color: #0081ff;
                    .vnb__menu-options__option__arrow {
                        fill: #0081ff;
                    }
                }

                &__icon {
                    svg {
                        fill: #0081ff !important;
                    }
                }
            }
        }
    }

    &__sub-menu-options {
        &__option {
            &__link {
                &:focus {
                    outline: none;
                    border: 1px solid none;
                }
                color: #000 !important;
                &:hover {
                    color: #0081ff !important;
                }
            }
        }
    }
}

.vnb__collapse-button {
    &:focus {
        border: 1px solid none;
        outline: none;
    }
    &:after {
        content: "\F035C";
        font-size: 25px;
        font-weight: 600;
        font-family: "Material Design Icons";
    }
    svg {
        display: none !important;
    }
}

.vnb__popup {
    max-height: 80vh;
    overflow-x: hidden;
    overflow-y: scroll !important;
    .vnb__popup__top__close-button {
        &:focus {
            border: 1px solid none;
            outline: none;
        }
        top: 20px;
        right: -33px;
        svg {
            fill: #000 !important;
        }
    }
}
</style>
