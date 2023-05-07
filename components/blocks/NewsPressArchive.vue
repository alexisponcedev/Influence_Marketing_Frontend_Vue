<template>
    <div>
        <img src="/blocks/NewsPressArchive.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";

@Component
export default class NewsPressArchive extends Vue {
    @VModel({ type: Object }) model!: any;
}
</script>
