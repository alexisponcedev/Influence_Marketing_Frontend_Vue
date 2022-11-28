<template>
    <div>
        <img src="/blocks/BlockHero.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class BlockHero extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: Object

    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
                }
            }
        } else
            this.model = {
                backgroundImage: {id: 0, type: StructureType.Image, title: "Image", src: '', alt: ''},
                title: {id: 1, type: StructureType.String, title: 'Title', value: 'It all starts with X'},
                subtitle: {
                    id: 2,
                    type: StructureType.String,
                    title: 'Subtitle',
                    value: 'Pre-order the limited edition ULED X today.'
                },
                link: {id: 3, type: StructureType.Url, title: 'Sign Up Now', value: ''},
            }
    }

    mounted() {
        if (this.isEmpty) this.reset();
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    @Watch('value')
    onValueChanged(newValue: any, oldValue: any) {
        if (newValue && Object.keys(newValue).length === 0) this.reset(oldValue);
    }
}
</script>
