<template>
    <div v-if="!isEmpty" class="tw-py-14">

        <div class="tw-flex tw-space-x-4 tw-p-4">
            <div class='tw-h-56 tw-flex-1 tw-bg-gray-50 ' v-for="(item , index) in model.list.value" :key="index">
                <img :src="item.image.src" :alt="item.image.alt" class="tw-object-cover tw-w-full tw-h-full"/>
            </div>
        </div>

    </div>

</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";


@Component
export default class ListImageBox extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
                }
            }
        } else
            this.model = {
                list: {
                    id: 0,
                    title: 'Images List',
                    type: StructureType.List,
                    newItem: {
                        image: {
                            id: 0,
                            type: StructureType.Image,
                            title: 'Video',
                            src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/39f6c6b03f/content_dp-beautiful-screen-min-clikhq.png',
                            alt: 'Image Alt'
                        },
                    },
                    value: [
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: 'Video',
                                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/1bf48f3392/px1-pro-1__ScaleMaxWidthWzMwNDhd.jpg-ot8tbg.jpg',
                                alt: 'Image Alt'
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: 'Video',
                                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/674c0869cc/px1-pro-2__ScaleMaxWidthWzMwNDhd.jpg-l1ow8b.jpg',
                                alt: 'Image Alt'
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: 'Video',
                                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/db978ba315/px1-pro-3__ScaleMaxWidthWzMwNDhd.jpg-3cucs1.jpg',
                                alt: 'Image Alt'
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: 'Video',
                                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/9a19430b1c/px1-pro-4__ScaleMaxWidthWzMwNDhd.jpg-z9xinn.jpg',
                                alt: 'Image Alt'
                            },
                        }
                    ]
                }
            }
    }

    mounted() {
        if (this.isEmpty) this.reset();
    }

    clicked() {
        this.$emit('click');
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    @Watch('isEmpty')
    onValueChanged() {

        if (this.isEmpty) this.reset();
    }
}
</script>
