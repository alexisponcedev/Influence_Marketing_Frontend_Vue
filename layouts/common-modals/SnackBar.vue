<template>
  <v-snackbar
    v-if="AppStore.snackbar"
    v-model="show"
    :color="AppStore.snackbar.color"
    :timeout="AppStore.snackbar.timeout"
    content-class="white--text"
  >
    {{ AppStore.snackbar.message }}
    <template v-slot:action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="show = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { AppStore } from "@/store";

@Component
export default class SnackBar extends Vue {
  AppStore = AppStore;

  show: Boolean = false;

  @Watch("AppStore.snackbar.show")
  snackbarShowChanged(show: Boolean, _: Boolean) {
    if (show) this.show = true;
  }

  @Watch("show")
  showChanged(_: Boolean, hide: Boolean) {
    if (hide) AppStore.hideSnackBar();
  }
}
</script>
