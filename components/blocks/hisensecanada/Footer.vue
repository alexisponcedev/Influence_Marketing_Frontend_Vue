<template>
    <div>
        <img src="/blocks/hcan/Footer.jpg" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";

@Component
export default class Footer extends Vue {
    @VModel({ type: Object }) model!: any;
}
</script>
