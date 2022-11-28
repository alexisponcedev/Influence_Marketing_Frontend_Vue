<template>

    <div class="tw-flex tw-items-center tw-justify-center tw-py-4 ">
        <div :style="{'width' : width + 'px'}">
            <structure-editor-text v-if="model.text" v-model="model.text" placeholder="please enter the content ..."/>
        </div>
    </div>


</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockCommercialBecomeAPartner extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({type: Object}) model!: any

    Theme = Theme;

    product: Object = {};

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
                    title: 'Theme',
                    value: Theme.light,
                    items: [
                        {title: 'Light', value: this.Theme.light},
                        {title: 'Dark', value: this.Theme.dark},
                    ]
                },
                width: {id: 1, type: StructureType.String, title: 'Width', value: '800'},
                text: {
                    id: 2,
                    type: StructureType.Null,
                    title: "",
                    value: "",
                },
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

    get width() {
        return this.model.width ? Number(this.model.width.value) : 800;
    }
}
</script>

<style type="text/css">
</style>
