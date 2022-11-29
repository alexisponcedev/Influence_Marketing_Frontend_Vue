<template>
    <div class="tw-flex tw-items-center " :class="{'tw-flex-row-reverse' : model.direction.value === Direction.rtl }"
         v-if="!isEmpty">
        <div class="tw-flex-1">
            <img
                :src="model.image.src"
                style="width: 720px; height: 720px"
                class="tw-bg-grey-50 tw-object-cover"
                :alt="model.image.alt"/>
        </div>

        <div class="tw-flex-1 tw-flex tw-flex-col tw-items-start tw-justify-center tw-space-y-6 h-full tw-p-9">
            <h4 class="small-title tw-text-black">{{ model.littleTitle.value }}</h4>
            <h2 class="large-title tw-text-black">{{ model.title.value }}</h2>
            <p class="paragraph tw-text-black">
                {{ model.description.value }}
            </p>
        </div>

    </div>
    <!--  <div>-->
    <!--    <img src="/blocks/ProductFeatureWithImage.png" alt=""/>-->
    <!--  </div>-->
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";
import {Direction} from "~/interfaces/DirectionEnum";

@Component
export default class BlockProductFeatureWithImage extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({type: Object}) model!: any;

    Theme = Theme;
    Direction = Direction;

    product: Object = {};
    loadingProduct: boolean = true;

    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
                }
            }
        } else
            this.model = {
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        {title: "Light", value: this.Theme.light},
                        {title: "Dark", value: this.Theme.dark},
                    ],
                },
                direction: {
                    id: 1,
                    type: StructureType.Select,
                    title: "Direction",
                    value: Direction.ltr,
                    items: [
                        {title: "Left To Right", value: this.Direction.ltr},
                        {title: "Right To Left", value: this.Direction.rtl},
                    ],
                },
                littleTitle: {
                    id: 2,
                    type: StructureType.String,
                    title: 'Little Title',
                    value: "4K ULED ™"
                },
                title: {
                    id: 3,
                    type: StructureType.String,
                    title: 'Title',
                    value: "Sharper, smoother pictures"
                },
                description: {
                    id: 4,
                    type: StructureType.String,
                    title: 'Description',
                    value: "4K greatness, but better. The U8G has our exclusive ULED technologies. They boost color, contrast, brightness, motion… we could go on. It’s the TV your old TV wants to be."
                },
                image: {
                    id: 5,
                    type: StructureType.Image,
                    title: 'Image',
                    src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/26632e121d/pdp-3_6-u9-50-50-feat-1__ScaleMaxWidthWzMwNDhd.jpg-t34p4p.jpg',
                    alt: 'featured image'
                },
                link: {
                    id: 6,
                    type: StructureType.Url,
                    title: 'Shop TV',
                    value: "/"
                },
                backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
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

        if (this.model[name].type !== item.type) this.model[name].type = item.type;
        if (item.type === StructureType.Image) {
            this.model[name].src = '';
            this.model[name].alt = 'Image Alt';
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
