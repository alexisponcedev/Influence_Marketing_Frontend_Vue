<template>
    <div class="tw-flex tw-items-center tw-justify-center tw-py-4">
        <div :style="{ width: width + 'px' }">
            <editor v-if="model.text" v-model="model.text.value" />
            <!--      <structure-editor-text v-if="model.text" v-model="model.text" placeholder="please enter the content ..."/>-->
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import { Theme } from "@/interfaces/ThemeEnum";

@Component
export default class BlockCommercialBecomeAPartner extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    product: Object = {};

    reset(oldValue: any = {}) {
        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...{
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
                    width: {
                        id: 1,
                        type: StructureType.String,
                        title: "Width",
                        value: "800",
                    },
                    text: {
                        id: 2,
                        type: StructureType.Null,
                        title: "",
                        value: "<p>Welcome to the text editor</p> <p>please enter your content ...</p>",
                    },
                    backgroundColor: {
                        id: 3,
                        type: StructureType.Color,
                        title: "Background color",
                        value: "#fff",
                    },
                },
                ...oldValue,
            };
        } else
            this.model = {
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.light,
                    items: [
                        { title: "Light", value: this.Theme.light },
                        { title: "Dark", value: this.Theme.dark },
                    ],
                },
                width: {
                    id: 1,
                    type: StructureType.String,
                    title: "Width",
                    value: "800",
                },
                text: {
                    id: 2,
                    type: StructureType.Null,
                    title: "",
                    value: "<p>Welcome to the text editor</p> <p>please enter your content ...</p>",
                },
                backgroundColor: {
                    id: 3,
                    type: StructureType.Color,
                    title: "Background color",
                    value: "#fff",
                },
            };
    }

    mounted() {
        this.reset(this.model);
    }

    addItem(name: string, item: any) {
        if (!this.model.hasOwnProperty(name)) this.model[name] = item;
        this.model[name].id = item.id;

        if (this.model[name].type !== item.type)
            this.model[name].type = item.type;
        if (item.type === StructureType.Image) {
            this.model[name].src = "";
            this.model[name].alt = "Image Alt";
        }
        if (item.type === StructureType.List) {
            this.model[name].newItem = item.newItem;
        }
        if (item.type === StructureType.Select) {
            this.model[name].items = item.items;
        }
    }

    get width() {
        return this.model.width ? Number(this.model.width.value) : 800;
    }
}
</script>

<style type="text/css"></style>
