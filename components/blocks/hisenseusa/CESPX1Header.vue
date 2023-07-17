<template>
    <div>
        <img src="/blocks/CESPX1Header.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";

@Component
export default class CesPX1Header extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

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
                title: {
                    id: 0,
                    type: StructureType.Text,
                    title: "Title",
                    value: "<h2>PX1-PRO <br/> Trichroma Laser Cinema</h2>",
                },
                subtitle: {
                    id: 1,
                    type: StructureType.Text,
                    title: "Subtitle",
                    value: "<h3>Triple-Lazer UST <br/> Built for home theater</h3>",
                },
                link: {
                    id: 2,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Learn More",
                    value: "/",
                },
                image: {
                    id: 3,
                    type: StructureType.Image,
                    title: "Image",
                    src: "",
                    alt: "Image Alt",
                },
            };
    }

    mounted() {
        if (this.isEmpty) this.reset();
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
