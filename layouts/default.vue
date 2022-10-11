<template>
  <v-app>
    <slot>
      <Nuxt />
    </slot>
    <SnackBar />
    <ConfirmationModal />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ConfirmationModal from "./common-modals/ConfirmationModal.vue";
import SnackBar from "./common-modals/SnackBar.vue";

@Component({
  components: {
    SnackBar,
    ConfirmationModal
  }
})
export default class DefaultLayout extends Vue {}
</script>
