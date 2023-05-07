<template>
    <div>
        <img src="/blocks/NewsRoomNewsBox.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";

@Component
export default class NewsRoomNewsBox extends Vue {
    @VModel({ type: Object }) model!: any;
}
</script>
