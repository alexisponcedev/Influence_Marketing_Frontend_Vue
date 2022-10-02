<template>
  <v-col class="py-0" v-bind="field.colAttrs">


    <label>

      {{ field.label }}

      <v-btn icon color="primary" @click="addRow">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

    </label>

    <v-row v-for="(row, index) in model" :key="`meta_${index}`">
      <v-col cols="2">
        <v-text-field
          v-model="model[index].rel"
          outlined
          single-line
          placeholder="Rel (optional)"
          :type="type"
          :readonly="
          typeof field.readonly === 'function'
            ? field.readonly()
            : field.readonly
        "
          :disabled="
          typeof field.disabled === 'function'
            ? field.disabled()
            : field.disabled
        "
        />
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="model[index].name"
          outlined
          single-line
          placeholder="Name"
          :type="type"
          :rules="[Validation.required]"
          :readonly="
          typeof field.readonly === 'function'
            ? field.readonly()
            : field.readonly
        "
          :disabled="
          typeof field.disabled === 'function'
            ? field.disabled()
            : field.disabled
        "
        />
      </v-col>
      <v-col cols="8">
        <v-text-field
          v-model="model[index].content"
          outlined
          single-line
          :type="type"
          :rules="[Validation.required]"
          placeholder="Content"
          append-outer-icon="mdi-delete"
          @click:append-outer="removeRow(index)"
          :readonly="
          typeof field.readonly === 'function'
            ? field.readonly()
            : field.readonly
        "
          :disabled="
          typeof field.disabled === 'function'
            ? field.disabled()
            : field.disabled
        "
        />
      </v-col>

    </v-row>


  </v-col>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {FormField} from "@/models";
import {MetaInterface} from "~/models/Meta.model";
import Validation from "~/utils/validation";

@Component
export default class TextMetaFormField extends Vue {
  @Prop({default: "text"}) readonly type!: "text";
  @Prop(Object) readonly field!: FormField;
  @VModel() model!: Array<MetaInterface>;

  Validation = Validation;

  mounted() {
    if (!this.model) this.model = [];
  }

  addRow() {
    this.model.push({rel: '', name: '', content: ''});
  }

  removeRow(index: number) {
    this.model.splice(index, 1);
  }
}
</script>
