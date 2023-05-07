<template>
    <div>
        <img src="/blocks/NewsIntro.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";

@Component
export default class NewsIntro extends Vue {
    @VModel({ type: Object }) model!: any;
}
</script>
