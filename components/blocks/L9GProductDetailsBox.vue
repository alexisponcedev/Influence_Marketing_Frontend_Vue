<template>
    <div>
        <img src="/blocks/Specs.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";


@Component
export default class L9GProductDetailsBox extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({ default: true }) readonly editable: Boolean | undefined
    @VModel({ type: Object }) model!: Object

    Theme = Theme;

    reset() {
        this.model = {
            theme: {
                id: 0,
                type: StructureType.Select,
                title: 'Theme',
                value: Theme.dark,
                items: [
                    { title: 'Light', value: this.Theme.light },
                    { title: 'Dark', value: this.Theme.dark },
                ]
            },
            title: { id: 1, type: StructureType.String, title: 'Title', value: "Now, here's the " },
        }
    }

    mounted() {
        if (this.isEmpty) this.reset();
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

<style scoped>
.main-title {
    font-family: 'hisense', serif;
    font-style: normal;
    font-weight: 500;
    font-size: 42px;
    line-height: 48px;

    text-align: center;
    color: #000000;
    margin-top: 70px;
    margin-bottom: 72px;
}
</style>
