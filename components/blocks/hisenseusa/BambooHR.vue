<template>
    <div>
        <img src="/blocks/BambooHR.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";

@Component
export default class BambooHR extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
    }


}
</script>
