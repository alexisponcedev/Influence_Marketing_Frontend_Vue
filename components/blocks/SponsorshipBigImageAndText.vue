<template>
    <div>
        <img src="/blocks/SponsorshipBigImageAndText.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class SponsorshipBigImageAndText extends Vue {
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
                image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                text: {
                    id: 1,
                    type: StructureType.Text,
                    title: 'Text',
                    value: '<p>“It gives me great pleasure to welcome Hisense on board as an Official Sponsor of the FIFA World Cup, and we are delighted to partner with this&nbsp;<span style="color: rgb(0, 170, 166);">internationally respected brand</span>, which also has a grown presence in the sports market. FIFA and Hisense are both focused on technology, innovation, and giving people the&nbsp;<span style="color: rgb(0, 170, 166);">best possible experience</span>. I am confident that this collaboration will support the global objectives of both organizations and contribute to the success of what is sure to be an amazing event next year.</p><p><span class="ql-size-small">- Fatma Samoura, FIFA Secretary General</span></p>'
                },
            }
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
