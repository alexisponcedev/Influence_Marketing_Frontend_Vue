<template>
    <div
        v-if="!isEmpty && Menu.hasOwnProperty('widgets')"
        :class="model.theme.value"
    >
        <div class="footerBox">
            <div class="tw-flex tw-justify-between">
                <div class="tw-flex tw-space-x-12">
                    <div style="width: 134px">
                        <img
                            src="~/assets/images/menu/logo-blue.png"
                            alt="hisense blue logo"
                        />
                    </div>
                    <div
                        v-for="(option, index) in Menu.widgets.main.childs"
                        :key="`column_${index}`"
                    >
                        <ul class="tw-list-none tw-space-y-5">
                            <li
                                class="menuOption"
                                v-for="(item, j) in option.childs"
                                :key="`item_${j}`"
                            >
                                {{ item.header.title }}
                                <ul class="tw-list-none tw-space-y-5">
                                    <li
                                        class="menuOption"
                                        v-for="(item, j) in item.childs"
                                        :key="`item_${j}`"
                                    >
                                        {{ item.name }}
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>

                <div>
                    <div class="followUs">Follow Us</div>

                    <div class="tw-flex tw-space-x-3 tw-items-center">
                        <span
                            v-for="(social, k) in Menu.widgets.socials"
                            :key="`social_${k}`"
                            :class="`socicon socicon-${social.name}`"
                            :title="social.name"
                        />
                    </div>
                </div>
            </div>

            <ul class="tw-list-none tw-flex tw-space-x-9 tw-mt-12">
                <li
                    class="link"
                    v-for="(link, l) in Menu.widgets.links"
                    :key="`link_${l}`"
                >
                    {{ link.name }}
                </li>
                <li class="link">2022 © Copyright Hisense.</li>
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
            };
    }

    async mounted() {
        if (this.isEmpty) this.reset();
        await this.loadMenu();
    }

    async loadMenu() {
        await Api.Menu.getAll();
        const finded = Api.Menu.all.filter(
            (menu) => menu.title == "footer-menu"
        );
        if (finded && finded.length) this.Menu = finded[0] as Menu;

        console.log(this.Menu);
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
.footerBox {
    padding: 66px 24px 24px;
}

.menuOption {
    font-family: "hisense";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    text-transform: uppercase;
    color: #999999;
}

.light {
    background-color: white !important;
    color: black;
}

.v-application .dark,
.dark {
    background-color: black !important;
    color: white;
}

.socicon {
    display: block;
    color: rgba(255, 255, 255, 0.67);
    text-align: center;
    font-size: 22px;
    -webkit-transition: all 300ms ease;
    transition: all 300ms ease;
}

.followUs {
    font-family: "hisense";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #999999;
    opacity: 0.6;
    margin-bottom: 18px;
}

.link {
    font-family: "hisense";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    color: #ffffff;
    opacity: 0.25;
}
</style>
