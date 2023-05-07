<template>
    <div>
        <img src="/blocks/NewsRoomMedia.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";

@Component
export default class NewsRoomMedia extends Vue {
    @VModel({ type: Object }) model!: any;
}
</script>
