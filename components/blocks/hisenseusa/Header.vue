<template>
    <div
        v-if="!isEmpty && Menu.hasOwnProperty('widgets')"
        :class="model.theme.value"
        class=""
    >
        <div class="tw-flex tw-items-center tw-justify-between menuBox">
            <div style="width: 134px">
                <img
                    v-if="model.theme.value === Theme.light"
                    src="~/assets/images/menu/logo-dark.png"
                    alt="Hisense dark logo"
                />
                <img
                    v-else
                    src="~/assets/images/menu/logo-light.png"
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
                    <img
                        class="icon"
                        v-if="model.theme.value === Theme.light"
                        src="~/assets/images/menu/search-dark.png"
                        alt="search icon"
                    />
                    <img
                        class="icon"
                        v-else
                        src="~/assets/images/menu/search-light.png"
                        alt="search icon"
                    />
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
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import { Menu } from "~/repositories";
import { Api } from "~/utils/store-accessor";

@Component
export default class LandingSlider extends Vue {
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
                //         link: {id: 1, type: StructureType.Url, target: "_self", title: 'Link', value: ''},
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
}

.menuOption {
    padding: 8px 14px;
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
