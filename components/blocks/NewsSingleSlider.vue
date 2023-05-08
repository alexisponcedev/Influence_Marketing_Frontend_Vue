<template>
    <div>
        <img src="/blocks/NewsSingleSlider.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";

@Component
export default class NewsSingleSlider extends Vue {
    @VModel({ type: Object }) model!: any;
}
</script>
