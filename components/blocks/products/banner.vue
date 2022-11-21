<template>
    <div v-if="!isEmpty" class="tw-flex tw-items-center tw-justify-between tw-space-x-4 banner-container tw-bg-black">
        <div class="tw-flex-1 tw-flex tw-justify-center tw-items-center">
            <div class="tw-mx-auto textBox">
                <h2 v-html="model.title.value"/>
                <h3 v-html="model.subtitle.value"/>
            </div>
        </div>

        <div class="tw-flex-1">
            <img class="" :src="model.image.src" :alt="model.image.alt">
        </div>
    </div>

</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class ProductBanner extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        if (this.isEmpty)
            this.model = {
                title: {
                    id: 0,
                    type: StructureType.String,
                    title: 'Banner Title',
                    value: 'Introducing <br /> The All New U Series'
                },
                subtitle: {
                    id: 1,
                    type: StructureType.String,
                    title: 'Banner Subtitle',
                    value: 'Featuring Next Gen TV*'
                },
                image: {
                    id: 2,
                    type: StructureType.Image,
                    title: 'Banner Image',
                    src: 'https://assets.hisense-usa.com/assets/ProductCategoryImages/2693e641dd/Hisense-New-TVs-header__ScaleMaxWidthWzEwMjRd.png',
                    alt: 'banner image',
                },
            }
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style scoped lang="scss">
.banner-container {
    padding: 180px 24px 48px;
    color: white;

    .textBox {
        font-family: hisense, serif;

        h2 {
            font-size: 32px;
            line-height: 43px;
            margin: 23px 0;
            color: white;
        }

        h3 {
            font-size: 22px;
            color: white;
            font-weight: 400;
        }
    }
}
</style>
