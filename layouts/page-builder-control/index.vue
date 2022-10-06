<template>
    <v-card color="#FCFCFC" elevation="0" class="px-7 page-builder-header">
        <v-row align="center" justify="">
            <v-col cols="12" md="6">
                <h1 class="text-h6 font-weight-bold mb-1">Page builder</h1>
                <span class="text-subtitle-2 grey--text text--darken-2">65" 4K ULED™ Premium Hisense Android Smart TV (2021)</span>
            </v-col>
            <v-col cols="12" md="6" class="text-right">
                <v-btn elevation="0" outlined color="grey darken-4" class="control-btns" >Discard</v-btn>
                <v-btn elevation="0" outlined color="grey darken-4"  class="control-btns">Preview</v-btn>
                <v-btn elevation="0" color="grey darken-4 white--text"  class="control-btns">Save Page</v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class PageBuilderControl extends Vue {
}
</script>

<style lang="scss">
.page-builder-header {
    display: block;
    width: 100%;
    height: 82px;
    position: fixed;
    top: 0;
    z-index: 5;
    left: 0;

    &.theme--dark {
        background: linear-gradient(180deg,
                rgba(5, 5, 5, 0.95) 44%,
                rgba(0, 0, 0, 0.46) 3%,
                hsla(0, 0%, 100%, 0)) !important;
    }
    .control-btns{
        border-radius:10px !important;
        width: 150px !important;
        padding: 22px 0px !important;
        margin: 2px 0;
    }
}
</style>
