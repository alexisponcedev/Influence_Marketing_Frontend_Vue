<template>
    <menu-items
        v-if="widgets && Object.keys(widgets).includes(modelKey)"
        v-model="widgets[modelKey]"
        :key="forceUpdateIndex"
        @addItem="forceUpdate"
        :single="single"
    />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({
    layout: "panel",
})
export default class MenuLinksType extends Vue {
    @Prop(String) readonly modelKey!: string;
    @Prop(Boolean) single!: boolean;
    @Prop() widgets!: any;

    forceUpdateIndex: number = 0;

    mounted() {
        this.widgetsUpdated();
    }

    @Watch("widgets")
    widgetsUpdated() {
        if (!this.widgets) this.widgets = {};
        if (!Object.keys(this.widgets).includes(this.modelKey))
            this.widgets[this.modelKey] = [];
        this.forceUpdate();
    }

    forceUpdate() {
        this.forceUpdateIndex++;
        this.$forceUpdate();
    }
}
</script>
