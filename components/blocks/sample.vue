<template>
    <div class="tw-grid tw-grid-cols-2 " v-if="!isEmpty">
        <!--    <pre>{{model}}</pre>-->
        <img :src="model.image.src" style="width: 720px; height: 720px" class="tw-bg-grey-50 tw-object-cover"
            :alt="model.image.alt">
        <div class="tw-flex tw-flex-col tw-items-start tw-justify-center tw-space-y-6 h-full tw-p-9">
            <h4 class="small-title tw-text-black">{{ model.smallTitle.value }}</h4>
            <h2 class="large-title tw-text-black">{{ model.largeTitle.value }}</h2>
            <p class="paragraph tw-text-black" v-html="model.paragraph.value" />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";


@Component
export default class BlockTextIntroduction extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({ default: true }) readonly editable: Boolean | undefined
    @VModel({ type: Object }) model!: any

    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: { id: 7, type: StructureType.Color, title: 'Background color', value: '#fff' }
                }
            }
        } else
            this.model = {
                image: {
                    id: 0,
                    type: StructureType.Image,
                    title: 'Upload Image',
                    src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/39f6c6b03f/content_dp-beautiful-screen-min-clikhq.png',
                    alt: 'Some note about this image',
                },
                smallTitle: { id: 1, type: StructureType.String, title: 'Samll Title', value: 'Quantom Dot Color' },
                largeTitle: { id: 2, type: StructureType.String, title: 'Large Title', value: 'Over One Billion Color' },
                paragraph: {
                    id: 3,
                    type: StructureType.Text,
                    title: 'Paragraph Text',
                    value: 'Quantum Dot produces over one billion colors, purer, richer, more brilliant and accurate colors than a regular\n' +
                        '        LCD TV. We could get into how it works. But it’s a lot easier to say it makes everything you watch look like the\n' +
                        '        4th of July.'
                }
            }
    }

    mounted() {

        

        blockAddItem(this.model, 'image', {
            id: 0,
            type: StructureType.Image,
            title: 'Upload Image',
            src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/39f6c6b03f/content_dp-beautiful-screen-min-clikhq.png',
            alt: 'Some note about this image',
        });
        blockAddItem(this.model, 'smallTitle', { id: 1, type: StructureType.String, title: 'Samll Title', value: 'Quantom Dot Color' });
        blockAddItem(this.model, 'largeTitle', { id: 2, type: StructureType.String, title: 'Large Title', value: 'Over One Billion Color' });
        blockAddItem(this.model, 'paragraph', {
            id: 3,
            type: StructureType.Text,
            title: 'Paragraph Text',
            value: 'Quantum Dot produces over one billion colors, purer, richer, more brilliant and accurate colors than a regular\n' +
                '        LCD TV. We could get into how it works. But it’s a lot easier to say it makes everything you watch look like the\n' +
                '        4th of July.'
        });
        blockAddItem(this.model, 'file', {
            id: 0,
            type: StructureType.File,
            title: 'Upload File',
            src: '',
            alt: 'upload file',
        });
        this.model = { ...this.model }
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css">
.small-title {
    font-size: 15px;
    font-weight: 700;
}

.large-title {
    font-size: 42px;
    font-weight: 700;
}

.paragraph {
    font-size: 18px;
    font-weight: 400;
}
</style>
