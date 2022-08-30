<template>
  <v-dialog v-if="AppStore.confirmationModal" v-model="show" max-width="290">
    <v-card>
      <v-card-title>
        {{ AppStore.confirmationModal.title }}
      </v-card-title>

      <v-card-text>
        {{ AppStore.confirmationModal.text }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text
          v-if="AppStore.confirmationModal.disagreeButton"
          :color="AppStore.confirmationModal.disagreeButton.color"
          @click="
            AppStore.confirmationModal.disagreeButton.callback(
              AppStore.confirmationModal.disagreeButton.callbackPayload
            );
            show = false;
          "
        >
          {{ AppStore.confirmationModal.disagreeButton.title }}
        </v-btn>

        <v-btn
          text
          v-if="AppStore.confirmationModal.agreeButton"
          :color="AppStore.confirmationModal.agreeButton.color"
          @click="
            AppStore.confirmationModal.agreeButton.callback(
              AppStore.confirmationModal.agreeButton.callbackPayload
            );
            show = false;
          "
        >
          {{ AppStore.confirmationModal.agreeButton.title }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { AppStore } from "@/store";

@Component
export default class ConfirmationModal extends Vue {
  AppStore = AppStore;

  show: Boolean = false;

  @Watch("AppStore.confirmationModal.show")
  snackbarShowChanged(show: Boolean, _: Boolean) {
    if (show) this.show = true;
  }

  @Watch("show")
  showChanged(_: Boolean, hide: Boolean) {
    if (hide) AppStore.hideConfirmationModal();
  }
}
</script>
