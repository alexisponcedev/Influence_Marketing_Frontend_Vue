<template>
    <div>
        <img src="/blocks/NewsSingleInfoBox.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";

@Component
export default class NewsSingleInfoBox extends Vue {
    @VModel({ type: Object }) model!: any;
}
</script>
