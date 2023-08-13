<template>
    <footer v-if="!isEmpty && Menu.hasOwnProperty('widgets')">
        <div
            class="tw-w-full tw-bg-white tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-4 md:tw-gap-8 tw-pb-5"
        >
            <div
                class="tw-w-full tw-border-b tw-border-midnight tw-border-solid tw-border-t-0 tw-border-x-0"
            >
                <div class="tw-container tw-mx-auto">
                    <div
                        class="tw-flex tw-flex-wrap tw-gap-4 md:tw-gap-8 tw-items-center tw-justify-start tw-px-4 tw-py-8 md:tw-py-10"
                    >
                        <div
                            class="tw-w-full md:tw-w-auto tw-flex tw-gap-4 tw-items-center tw-justify-start"
                        >
                            <button
                                v-for="(social, k) in Menu.widgets.socials"
                                :key="`social_${k}`"
                                :class="`tw-text-midnight socicon socicon-${social.name}`"
                                :title="social.name"
                            ></button>
                        </div>
                        <a
                            href="#"
                            class="tw-w-full md:tw-w-auto tw-text-midnight tw-text-xl md:tw-text-2xl"
                        >
                            @influencemarketing
                        </a>
                    </div>
                </div>
            </div>

            <div
                v-if="model.template.value === 'v1'"
                class="tw-container tw-mx-auto tw-px-4 tw-pt-16 tw-pb-8 md:tw-py-[84px] tw-py-[84px] tw-flex tw-flex-wrap md:tw-flex-nowrap tw-justify-between tw-items-start"
            >
                <div class="tw-pr-4 tw-mb-16 md:tw-mb-0">
                    <img
                        src="../../../assets/footer_logo_2.png"
                        alt="logo"
                        class="tw-w-full"
                    />
                </div>
                <div
                    class="tw-w-full md:tw-w-1/2 lg:tw-w-1/3 tw-flex tw-flex-wrap md:tw-flex-nowrap tw-justify-between tw-items-start"
                >
                    <div
                        class="tw-w-full sm:tw-w-1/2 tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-4 md:tw-gap-7 tw-text-midnight tw-mb-10 md:tw-mb-0"
                    >
                        <a
                            :href="Menu.widgets.columns[0][0].url"
                            class="tw-uppercase tw-font-bold"
                        >
                            {{ Menu.widgets.columns[0][0].name }}
                        </a>
                        <ul
                            class="tw-list-none tw-p-0 tw-m-0 tw-w-full tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-4"
                        >
                            <li
                                v-for="(column, index) in Menu.widgets
                                    .columns[0]"
                                :key="`option_${index}`"
                            >
                                <a v-if="index > 0" :href="column.url">{{
                                    column.name
                                }}</a>
                            </li>
                        </ul>
                    </div>
                    <ul
                        class="tw-list-none tw-p-0 tw-w-full sm:tw-w-1/2 tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-4 md:tw-gap-7 tw-text-midnight tw-font-bold tw-mb-10 md:tw-mb-0"
                    >
                        <li
                            v-for="(
                                column, index
                            ) in Menu.widgets.columns.slice(-1)[0]"
                            :key="`option_${index}`"
                        >
                            <a :href="column.url">{{ column.name }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                v-else
                class="tw-container tw-mx-auto tw-px-4 tw-pt-16 tw-pb-8 md:tw-py-[84px] tw-flex tw-flex-wrap md:tw-flex-nowrap tw-justify-between tw-items-start"
            >
                <div class="tw-pr-4 tw-mb-16 md:tw-mb-0">
                    <img
                        src="../../../assets/footer_logo_1.png"
                        alt="logo"
                        class="tw-w-full"
                    />
                </div>
                <div class="tw-w-full md:tw-w-4/5 tw-grid tw-grid-cols-4">
                    <div
                        v-for="(column, index) in Menu.widgets.columns"
                        :key="`option_${index}`"
                        v-if="index < Menu.widgets.columns.length - 1"
                        class="tw-col-span-4 sm:tw-col-span-2 md:tw-col-span-1 tw-mb-10 md:tw-mb-0 tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-4 md:tw-gap-7 tw-text-midnight"
                    >
                        <a
                            :href="column[0].url"
                            class="tw-uppercase tw-font-bold"
                        >
                            {{ column[0].name }}
                        </a>
                        <ul
                            class="tw-list-none tw-p-0 tw-m-0 tw-w-full tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-4"
                        >
                            <li v-for="(item, _index) in column" :key="index">
                                <a v-if="_index > 0" :href="item.url">{{
                                    item.name
                                }}</a>
                            </li>
                        </ul>
                    </div>
                    <ul
                        class="tw-list-none tw-p-0 tw-col-span-4 sm:tw-col-span-2 md:tw-col-span-1 tw-mb-10 md:tw-mb-0 tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-4 md:tw-gap-7 tw-text-midnight tw-font-bold"
                    >
                        <li
                            v-for="(
                                column, index
                            ) in Menu.widgets.columns.slice(-1)[0]"
                            :key="`option_${index}`"
                        >
                            <a :href="column.url">{{ column.name }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tw-container tw-mx-auto tw-px-4 tw-text-midnight">
                <div class="tw-mb-10 md:tw-mb-14">
                    <p class="tw-font-bold tw-mb-4">General Inquiries</p>
                    <p>info@influencemarketing.ca</p>
                </div>
                <div
                    class="tw-w-full tw-flex tw-flex-wrap tw-justify-between tw-items-center tw-gap-4"
                >
                    <ul
                        class="tw-list-none tw-p-0 tw-m-0 tw-flex tw-flex-wrap tw-justify-start tw-items-center tw-gap-4 md:tw-gap-10 tw-text-xs"
                    >
                        <li
                            v-for="(item, index) in Menu.widgets.links"
                            :key="index"
                            class="tw-w-full md:tw-w-auto"
                        >
                            <a :href="item.url">{{ item.name }}</a>
                        </li>
                    </ul>
                    <p class="tw-w-full md:tw-w-auto tw-text-xs">
                        {{ Menu.widgets.copyright }}
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <!-- <div class="tw-pt-[140px] tw-pb-[250px] tw-bg-[#1042f1]" v-if="!isEmpty && Menu.hasOwnProperty('widgets')">
        <img :src="model.image.src" :alt="model.image.alt" class="tw-absolute tw-bottom-0 tw-right-0">

        <div class="tw-flex tw-border-t-0 tw-border-r-0 tw-border-l-0 tw-pb-2 tw-mx-9 tw-border-b tw-border-solid tw-border-[#FFF9F9] tw-w-full">
            <img src="~/assets/images/menu/logo-light.svg" alt="hisense blue logo">
        </div>
        <div class="tw-grid tw-grid-cols-3 tw-gap-10 tw-px-9 tw-mt-10">

            <div class="tw-flex tw-flex-col tw-gap-5" v-for="(column , index) in Menu.widgets.columns" :key="`column_${index}`">
               <div class="tw-text-white tw-text-[24px] tw-font-bold">Locate Us</div>
                <div :class="{'tw-text-lg tw-text-white' : j > 0 , 'tw-text-white tw-text-[24px] tw-font-bold' : j ===0 } " v-for="(item , j) in column" :key="`item_${j}`"> {{ item.name }} </div>
            </div>

            <div class="tw-flex tw-flex-col tw-gap-5">
                <div class="tw-text-lg tw-text-white" v-html="Menu.widgets.social_title"/>

                <div class="tw-flex tw-space-x-3 tw-items-center">
                        <span v-for="(social , k) in Menu.widgets.socials" :key="`social_${k}`"
                              :class="`socicon socicon-${social.name}`" :title="social.name"/>
                </div>

               <div class="tw-flex tw-gap-5">
                   <img :src="item.Image.src" :alt="item.Image.alt" v-for="(item, index) in model.list.value" :key="index">
               </div>
            </div>
        </div>

        <div class="tw-flex tw-items-center tw-gap-2 tw-px-9 tw-mt-10">
            <img src="~/assets/images/menu/logo-mini.svg" alt="logo image">
            <div class="tw-flex tw-flex-col">
                <div class="tw-text-white tw-text-lg">{{ Menu.widgets.copyright }}</div>
                <div class="tw-flex tw-items-center tw-justify-between tw-gap-2">
                    <div class="tw-text-white tw-text-base" v-for="(link , l) in Menu.widgets.links" :key="`link_${l}`">{{ link.name }}</div>
                </div>
            </div>
        </div>
    </div> -->

    <!--    <div v-if="!isEmpty && false && Menu.hasOwnProperty('widgets')" :class="model.theme.value">-->

    <!--        <div class="footerBox">-->

    <!--            <div class="tw-flex tw-justify-between">-->
    <!--                <div class="tw-flex tw-space-x-12">-->
    <!--                    <div style="width:134px">-->
    <!--                        <img src="~/assets/images/menu/logo-light.svg" alt="hisense blue logo">-->
    <!--                    </div>-->
    <!--                    <div v-for="(column , index) in Menu.widgets.columns" :key="`column_${index}`">-->
    <!--                        <ul class="tw-list-none tw-space-y-5">-->
    <!--                            <li class="menuOption" v-for="(item , j) in column" :key="`item_${j}`">{{ item.name }}</li>-->
    <!--                        </ul>-->
    <!--                    </div>-->
    <!--                </div>-->

    <!--                <div>-->
    <!--                    <div class="followUs">{{  Menu.widgets.social_title }}</div>-->

    <!--                    <div class="tw-flex tw-space-x-3 tw-items-center">-->
    <!--                        <span v-for="(social , k) in Menu.widgets.socials" :key="`social_${k}`"-->
    <!--                              :class="`socicon socicon-${social.name}`" :title="social.name"/>-->
    <!--                    </div>-->
    <!--                </div>-->
    <!--            </div>-->

    <!--            <ul class="tw-list-none tw-flex tw-space-x-9 tw-mt-12 tw-w-40">-->
    <!--                <li class="link" v-for="(link , l) in Menu.widgets.links" :key="`link_${l}`">{{ link.name }}</li>-->
    <!--                <li class="link">{{ Menu.widgets.copy_right }}</li>-->
    <!--            </ul>-->
    <!--        </div>-->

    <!--    </div>-->
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import { Menu } from "~/repositories";
import { Api } from "~/utils/store-accessor";

@Component
export default class IMFooter extends Vue {
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
                template: {
                    id: 1,
                    type: StructureType.Select,
                    title: "Template",
                    value: "v1",
                    items: [
                        { title: "V1", value: "v1" },
                        { title: "V2", value: "v2" },
                    ],
                },
            };
    }

    async mounted() {
        if (this.isEmpty) this.reset();
        await this.loadMenu();
    }

    async loadMenu() {
        this.Menu = (await Api.Menu.getFooter()) as Menu;
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
    background-color: #1954ed;
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
