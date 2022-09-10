<template>
  <v-dialog v-model="showSynced" max-width="300px">
    <v-card>
      <v-card-title> Add Region </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            label="Title"
            v-model="Region.name"
            :rules="[Validation.required]"
          />
          <v-text-field
            label="Image URL"
            v-model="Region.image"
            :rules="[Validation.required]"
          />
        </v-form>
        <v-btn color="primary" block @click="submit"> Add </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from "vue-property-decorator";
import Validation from "@/utils/validation";
import { Region } from "@/repositories";
import { Api } from "@/store";

@Component
export default class addRegionModal extends Vue {
  @PropSync("show", { type: Boolean }) showSynced!: Boolean;

  Api = Api;
  Validation = Validation;

  Region: Region = {
    id: 0,
    name: "",
    image: "",
    site_id: +(localStorage.getItem("active_site") || 0),
  };

  submit() {
    if (this.formValidate()) {
      this.showSynced = false;
      this.$emit("submit", this.Region);
      this.Region = {
        id: 0,
        name: "",
        image: "",
        site_id: +(localStorage.getItem("active_site") || 0),
      };
    }
  }

  formValidate() {
    return (this.$refs.form as any).validate();
  }
}
</script>
F
