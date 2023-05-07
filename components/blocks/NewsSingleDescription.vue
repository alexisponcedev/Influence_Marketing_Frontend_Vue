<template>
    <div>
        <img src="/blocks/NewsSingleDescription.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";

@Component
export default class NewsSingleDescription extends Vue {
    @VModel({ type: Object }) model!: any;
}
</script>
