<template>
    <menu-type-links-menu
        with-products
        :widgets="widgets"
        :modelKey="modelKey"
    />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    layout: "panel",
})
export default class MenuLinksMenuProductsType extends Vue {
    @Prop(String) readonly modelKey!: string;
    @Prop() widgets!: any;
}
</script>
