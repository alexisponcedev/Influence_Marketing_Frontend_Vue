<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
          <v-tab href="#Main">Main</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-tabs-items v-model="tab">
      <v-tab-item value="Main">
        <v-card-text>
          <form-standard
            ref="mainForm"
            :model="User"
            :fields="mainFormFields"
            @submit="mainFormSubmit"
            :loading="Api.User.loading"
          />
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { fromResource } from "@/utils/fromResource";
import selectItems from "@/utils/select-items";
import getProfile from "@/utils/getProfile";
import Validation from "@/utils/validation";
import { User } from "@/repositories";
import { FormField } from "@/models";
import { Api } from "@/store";

@Component({ layout: "panel" })
export default class UserForm extends Vue {
  @Prop(Boolean) readonly editMode!: Boolean;
  @Prop(Boolean) readonly profile!: Boolean;

  Api = Api;

  tab = "";

  User: User = {
    level: "IM Admin",
  };

  mainFormFields: Array<FormField> = [];

  async initDetailsTab() {
    await this.getEntity();
    this.updateDetailsFormFields();
  }

  async getEntity() {
    if (this.editMode)
      this.User = fromResource<User>(
        await Api.User.get(
          this.profile ? +getProfile().user_id! : +this.$route.params.id
        )
      );
  }

  updateDetailsFormFields() {
    this.mainFormFields = [
      {
        label: "Name",
        modelKey: "name",
        type: "form-field-text",
        rules: [Validation.required],
        colAttrs: { cols: 12 },
      },
      {
        label: "Email",
        modelKey: "email",
        type: "form-field-text",
        disabled: this.profile,
        rules: [Validation.required, Validation.email],
        colAttrs: { cols: 12 },
      },
      {
        label: "Level",
        modelKey: "level",
        "item-text": "title",
        "item-value": "value",
        disabled: this.profile,
        type: "form-field-select",
        rules: [Validation.required],
        items: selectItems.user_level,
        colAttrs: { cols: 12 },
      },
      {
        label: "Password",
        modelKey: "password",
        type: "form-field-password",
        placeholder: this.editMode
          ? "Leave blank if you don't want to change it"
          : undefined,
        rules: [
          !this.editMode ? Validation.required : true,
          Validation.password,
        ],
        colAttrs: { cols: 12 },
      },
      {
        label: "Password Confirmation",
        modelKey: "password_confirm",
        type: "form-field-password",
        placeholder: this.editMode
          ? "Leave blank if you don't want to change it"
          : undefined,
        rules: [
          !this.editMode
            ? Validation.required
            : this.passwordConfirmationValidation,
          this.passwordConfirmationValidation,
        ],
        colAttrs: { cols: 12 },
      },
    ];
  }

  passwordConfirmationValidation() {
    return (
      (!this.User.password && !(this.User as any).password_confirm) ||
      this.User.password === (this.User as any).password_confirm ||
      "Password must match"
    );
  }

  async mainFormSubmit() {
    if (this.formValidate()) {
      if (this.editMode) {
        if (!this.User.password) this.User.password = undefined;
        if (!(this.User as any).password_confirm)
          (this.User as any).password_confirm = undefined;
        await Api.User.update({
          id: this.profile ? +getProfile().user_id! : +this.$route.params.id,
          User: this.User,
        });
      } else await Api.User.create(this.User);
      if (!this.editMode) this.$router.push("/User/All");
      else this.getEntity();
    }
  }

  formValidate() {
    return (this.$refs.mainForm as any).validate();
  }

  @Watch("tab")
  tabChanged(newTab: string, _: string) {
    switch (newTab) {
      case "Main":
        this.initDetailsTab();
        break;
      default:
        break;
    }
  }
}
</script>
