<template>
    <menu-type-links single :widgets.sync="widgets" :modelKey="modelKey" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    layout: "panel",
})
export default class MenuLinksSingleType extends Vue {
    @Prop(String) readonly modelKey!: string;
    @Prop() widgets!: any;
}
</script>
