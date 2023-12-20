<template>
    <menu-items-with-child
        v-if="widgets && Object.keys(widgets).includes(modelKey)"
        :with-products="withProducts"
        v-model="widgets[modelKey]"
        :key="forceUpdateIndex"
        @addItem="forceUpdate"
    />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({
    layout: "panel",
})
export default class MenuLinksMenuType extends Vue {
    @Prop(String) readonly modelKey!: string;
    @Prop(Boolean) withProducts!: boolean;
    @Prop() widgets!: any;

    forceUpdateIndex: number = 0;

    @Watch("widgets")
    widgetsUpdated() {
        if (!this.widgets) this.widgets = {};
        if (!Object.keys(this.widgets).includes(this.modelKey))
            this.widgets[this.modelKey] = {
                childs: [],
            };
        setTimeout(this.forceUpdate, 100);
    }

    forceUpdate() {
        this.forceUpdateIndex++;
    }
}
</script>
