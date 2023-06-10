<template>
    <div
        v-if="!isEmpty && Menu.hasOwnProperty('widgets')"
        :class="model.theme.value"
        class=""
    >
        <div
            class="tw-flex tw-justify-center tw-items-center tw-mx-auto tw-w-full"
        >
            <div
                class="tw-w-full md:tw-w-8/12 tw-max-w-5xl tw-flex tw-justify-between tw-gap-4 tw-items-center tw-rounded-full tw-bg-white tw-py-2 md:tw-py-4 tw-px-4 md:tw-px-6 lg:tw-px-8 md:tw-min-w-[740px] lg:tw-min-w-[850px]"
            >
                <div
                    class="tw-w-9 tw-h-9 tw-flex tw-justify-center tw-items-center"
                >
                    <img src="~/assets/images/Logo.png" alt="logo" />
                </div>
                <nav
                    class="tw-justify-end tw-items-center tw-gap-6 lg:tw-gap-8 tw-hidden md:tw-flex"
                >
                    <ul
                        class="tw-list-none tw-flex tw-items-center tw-justify-center"
                    >
                        <li
                            v-for="(option, index) in Menu.widgets.centerOption"
                            :key="index"
                        >
                            <a
                                class="tw-text-midnight tw-uppercase tw-font-bold tw-text-sm lg:tw-text-base"
                                :href="option.url"
                            >
                                {{ option.name }}
                            </a>
                        </li>
                        <a
                            :href="Menu.widgets.centerOption.slice(-1).url"
                            class="btn tw-block tw-w-fit tw-mx-auto tw-cursor-pointer"
                            >{{ Menu.widgets.centerOption.slice(-1).name }}</a
                        >
                    </ul>
                </nav>
                <a class="tw-block md:tw-hidden" icon>
                    <!-- <HamburgerMenu /> -->
                </a>
            </div>
        </div>
        <!-- <div class="tw-flex tw-items-center tw-justify-between menuBox">
            <div style="width: 134px">
                <img
                    v-if="model.theme.value === Theme.light"
                    src="~/assets/images/menu/logo-dark.png"
                    alt="Hisense dark logo"
                />
                <img
                    v-else
                    src="~/assets/images/menu/logo-light.svg"
                    alt="Hisense light logo"
                />
            </div>
            <ul class="tw-list-none tw-flex tw-items-center tw-justify-center">
                <li
                    class="menuOption"
                    v-for="(option, index) in Menu.widgets.centerOption"
                    :key="index"
                >
                    {{ option.name }}
                </li>
            </ul>

            <ul class="tw-list-none tw-flex tw-items-center tw-justify-center">
                <li
                    class="menuOption"
                    v-for="(option, index) in Menu.widgets.rightOption"
                    :key="index"
                >
                    {{ option.name }}
                </li>
                               <li class="menuOption tw-flex tw-items-center">
                                   <img class="icon" v-if="model.theme.value === Theme.light"
                                        src="~/assets/images/menu/search-dark.png" alt="search icon">
                                   <img class="icon" v-else src="~/assets/images/menu/search-light.png" alt="search icon">
                               </li>
                <li class="menuOption tw-flex tw-items-center">
                    <img
                        class="icon"
                        v-if="model.theme.value === Theme.light"
                        src="~/assets/images/menu/hamburger-dark.png"
                        alt="search icon"
                    />
                    <img
                        class="icon"
                        v-else
                        src="~/assets/images/menu/hamburger-light.png"
                        alt="search icon"
                    />
                </li>
            </ul>
        </div> -->
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import { Menu } from "~/repositories";
import { Api } from "~/utils/store-accessor";

@Component
export default class IMHeader extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    Menu: Menu = {};
    Theme = Theme;

    Api = Api;

    reset(oldValue: any = {}) {
        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue,
                ...{
                    backgroundColor: {
                        id: 7,
                        type: StructureType.Color,
                        title: "Background color",
                        value: "#fff",
                    },
                },
            };
        } else
            this.model = {
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        { title: "Light", value: this.Theme.light },
                        { title: "Dark", value: this.Theme.dark },
                    ],
                },
                // notification: {
                //     id: 1, type: StructureType.Object,
                //     title: 'Notification',
                //     value: {
                //         title: {id: 0, type: StructureType.String, title: 'Title', value: 'Notification Text Message'},
                //         link: {id: 1, type: StructureType.Url, title: 'Link', value: ''},
                //     }
                // }
            };
    }

    async mounted() {
        if (this.isEmpty) this.reset();

        await this.loadMenu();
    }

    async loadMenu() {
        this.Menu = (await Api.Menu.getHeader()) as Menu;
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    @Watch("isEmpty")
    onValueChanged() {
        if (this.isEmpty) this.reset();
    }
}
</script>
<style scoped>
.menuBox {
    padding: 12px 24px;
    background: linear-gradient(0deg, #0c2445, #0c2445), #002357;
}

.menuOption {
    padding: 8px 20px;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 1.3px;
    line-height: 24px;
}

.light {
    background-color: white;
    color: black;
}

.v-application .dark,
.dark {
    background-color: black !important;
    color: white;
}

.icon {
    width: 19px;
    height: 19px;
}
</style>
