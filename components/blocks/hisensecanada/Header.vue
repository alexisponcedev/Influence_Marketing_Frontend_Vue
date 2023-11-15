<template>
    <div>
        <img src="/blocks/hcan/Header.jpg" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";

@Component
export default class Header extends Vue {
    @VModel({ type: Object }) model!: any;
}
</script>
