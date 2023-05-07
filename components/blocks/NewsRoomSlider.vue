<template>
    <div>
        <img src="/blocks/NewsRoomSlider.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";

@Component
export default class NewsRoomSlider extends Vue {
    @VModel({ type: Object }) model!: any;
}
</script>
