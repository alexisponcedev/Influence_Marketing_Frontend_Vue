<template>
    <div>
        <img src="/blocks/NbaHeaderBanner.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class NbaHeaderBanner extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "theme", {
            id: 0,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                { title: "Light", value: Theme.light },
                { title: "Dark", value: Theme.dark },
            ],
        });
        blockAddItem(this.model, "text", {
            id: 4,
            type: StructureType.SimpleText,
            title: "Text",
            value: '<h5 class="ql-align-center">From September 1st - October 31st,</h5><h4 class="ql-align-center">BUY A <span style="color: rgb(255, 187, 243);">65"OR LARGER</span> HISENSE GOOGLE TV WITH A </h4><h4 class="ql-align-center">100 DAY GUARANTEE <span style="color: rgb(255, 187, 243);">AND </span>GET AWARDED <span style="color: rgb(255, 187, 243);">$100*</span></h4>',
        });
        blockAddItem(this.model, "mobile", {
            id: 3,
            type: StructureType.Image,
            title: "mobile Image",
            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/8d994c5faa/MobileHeader__ScaleMaxWidthWzMwNDhd.jpg-p5h3yt.jpg",
            alt: "Some note about this image",
        });
        blockAddItem(this.model, "tablet", {
            id: 3,
            type: StructureType.Image,
            title: "tablet Image",
            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/8d994c5faa/MobileHeader__ScaleMaxWidthWzMwNDhd.jpg-p5h3yt.jpg",
            alt: "Some note about this image",
        });
        blockAddItem(this.model, "desktop", {
            id: 3,
            type: StructureType.Image,
            title: "desktop Image",
            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/3cd5e3c19c/HUSA-100-Day-v-copy-2__ScaleMaxWidthWzMwNDhd.png-gs3474.png",
            alt: "Some note about this image",
        });

        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    Theme = Theme;
}
</script>
