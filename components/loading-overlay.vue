<template>
    <v-overlay opacity="0.7" :value="show">
        <v-progress-circular color="fff" size="50" indeterminate/>
        <strong class="white--text ms-4"> Connecting to Server... </strong>
    </v-overlay>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";

@Component
export default class LoadingOverlay extends Vue {
    @Prop(Boolean) readonly show!: Boolean;
}
</script>
