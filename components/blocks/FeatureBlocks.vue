<template>
    <div class="tw-flex tw-items-center "
         :class="{'tw-flex-row-reverse' : model.direction.value === Direction.rtl , 'dark' : model.theme.value === Theme.dark }"
         v-if="!isEmpty">
        <div class="tw-flex-1">
            <video width="100%" height="100%" muted="" autoplay="" loop="" playsinline="">
                <source :src="model.video.value">
            </video>
        </div>

        <div class="tw-flex-1 ">
            <div class="tw-flex tw-flex-col tw-items-start tw-justify-center tw-space-y-2 h-full tw-p-9">
                <h2 class="Title tw-text-black">{{ model.title.value }}</h2>
                <div class="Text tw-text-black" v-html="model.text.value"/>
            </div>
        </div>
    </div>

    <!--  <div>-->
    <!--    <img src="/blocks/FeatureBlock.png" alt=""/>-->
    <!--  </div>-->
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";
import {Direction} from "~/interfaces/DirectionEnum";

@Component
export default class HomeFeatureBlock extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    Theme = Theme;
    Direction = Direction;

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
                title: {id: 2, type: StructureType.String, title: 'Title', value: "Smart Home Ready"},
                text: {
                    id: 3,
                    type: StructureType.Text,
                    title: 'Text',
                    value: "Buit-in Wi-Fi, Bluetooth, Google Assistant, Works with Alexa, and Control4 compatible, the L9G integrates with your smart home ecosystem, so you can create automations to your heart’s content."
                },
                video: {
                    id: 4,
                    type: StructureType.Video,
                    title: 'Video',
                    value: 'https://player.vimeo.com/external/586455519.hd.mp4?s=6ca1796bf87c10a1f940258500a7e3e368378378&profile_id=175',
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
<style type="text/css" lang="scss">
.dark {
    background-color: #1e1e1e;
    color: white;
}

.Title {
    font-weight: 700;
    font-size: 36px;
    line-height: 40px;
}

.dark .Title {
    color: white !important;
}

.Text * {
    font-size: 24px;
    font-weight: 300;
    line-height: 32px;
}

.dark .Text {
    color: #bbbbbb !important;
}

</style>
