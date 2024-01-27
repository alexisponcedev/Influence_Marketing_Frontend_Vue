<template>
    <div v-if="widgets && Object.keys(widgets).includes(modelKey)">
        <v-text-field
            outlined
            :label="structure.title"
            v-model="widget[structure.key]"
            v-for="structure in structures"
        />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { IIndexable } from "@/utils/IIndexable";

@Component({
    layout: "panel",
})
export default class MenuSocialsType extends Vue {
    @Prop() widgets!: any;
    @Prop(String) readonly modelKey!: string;

    structures: Array<any> = [
        { title: "Social Media Title", key: "socialMediaTitle" },
    ];

    mounted() {
        this.widgetsUpdated();
    }

    @Watch("widgets")
    widgetsUpdated() {
        if (!this.widgets) this.widgets = {};
        if (
            !Object.keys(this.widgets).includes(this.modelKey) ||
            Array.isArray(this.widgets[this.modelKey])
        )
            this.widgets[this.modelKey] = {};
    }

    get widget() {
        return this.widgets[this.modelKey] as IIndexable;
    }
}
</script>
