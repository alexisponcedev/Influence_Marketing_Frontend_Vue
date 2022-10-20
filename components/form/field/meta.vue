<template>
  <v-col class="py-0" v-bind="field.colAttrs">
    <label>
      {{ field.label }}
      <v-btn icon color="primary" @click="addRow">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </label>

    <v-row v-for="(row, index) in model" :key="`meta_${index}`">

      <!--      <v-col cols="2">-->
      <!--        <v-text-field-->
      <!--          v-model="model[index].rel"-->
      <!--          outlined-->
      <!--          single-line-->
      <!--          placeholder="Rel (optional)"-->
      <!--          :type="type"-->
      <!--          :readonly="-->
      <!--          typeof field.readonly === 'function'-->
      <!--            ? field.readonly()-->
      <!--            : field.readonly-->
      <!--        "-->
      <!--          :disabled="-->
      <!--          typeof field.disabled === 'function'-->
      <!--            ? field.disabled()-->
      <!--            : field.disabled-->
      <!--        "-->
      <!--        />-->
      <!--      </v-col>-->

      <v-col cols="2">
        <v-autocomplete
          outlined
          v-model="model[index].rel"
          @change="updateName(index)"
          :rules="field.rules"
          item-text="text"
          item-value="value"
          placeholder="Meta Type"
          :items="MetaTypes"
          :readonly="typeof field.readonly === 'function' ? field.readonly() : field.readonly"
          :disabled=" typeof field.disabled === 'function' ? field.disabled() : field.disabled "
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
          :disabled=" model[index].rel.includes('og:')  ||
          (typeof field.disabled === 'function' ? field.disabled() : field.disabled)
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

  MetaTypes : Array<{ text : String , value : String }> = [
    { text : 'blank' , value : 'blank'},
    { text : 'http-equiv' , value : 'http-equiv'},
    { text : 'og:site_name' , value : 'property="og:site_name"'},
    { text : 'og:title' , value : 'property="og:title"'},
    { text : 'og:description' , value : 'property="og:description"'},
    { text : 'og:image' , value : 'property="og:image"'},
    { text : 'og:url' , value : 'property="og:url"'},
    { text : 'og:type' , value : 'property="og:type"'},
    { text : 'og:locale' , value : 'property="og:locale"'},
  ]

  mounted() {
    if (!this.model) this.model = [];
  }

  updateName(index : number){
      if(this.model[index] && this.model[index].rel.includes('og:')){
        this.model[index].name = this.model[index].rel;
      }
  }
  addRow() {
    this.model.push({rel: '', name: '', content: ''});
  }

  removeRow(index: number) {
    this.model.splice(index, 1);
  }


}
</script>
