<template>
    <div>
        <img src="/blocks/TelevisionsBlockBanner.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";

@Component
export default class TelevisionsBlockBanner extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    reset(oldValue: any = {}) {
        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...{
                    image: {
                        id: 0,
                        type: StructureType.Image,
                        title: "Desktop Image",
                        src: "",
                        alt: "",
                    },
                    mobile: {
                        id: 1,
                        type: StructureType.Image,
                        title: "Mobile Image",
                        src: "",
                        alt: "",
                    },
                    title: {
                        id: 2,
                        type: StructureType.Text,
                        title: "Title",
                        value: "",
                    },
                    subtitle: {
                        id: 3,
                        type: StructureType.Text,
                        title: "Subtitle",
                        value: "",
                    },
                    link: {
                        id: 4,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Sign Up Now",
                        value: "",
                    },
                },
                ...oldValue,
            };
        } else
            this.model = {
                image: {
                    id: 0,
                    type: StructureType.Image,
                    title: "Desktop Image",
                    src: "",
                    alt: "",
                },
                mobile: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Mobile Image",
                    src: "",
                    alt: "",
                },
                title: {
                    id: 2,
                    type: StructureType.Text,
                    title: "Title",
                    value: "",
                },
                subtitle: {
                    id: 3,
                    type: StructureType.Text,
                    title: "Subtitle",
                    value: "",
                },
                link: {
                    id: 4,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Sign Up Now",
                    value: "",
                },
            };
    }

    mounted() {
        this.reset();
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
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
}
</script>
