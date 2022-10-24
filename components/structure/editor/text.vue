<template>
  <v-col>
    <label v-if="field.label">
      {{ field.label }}
    </label>
    <vue-editor v-model="model.value" :editor-toolbar="customToolbar"/>
  </v-col>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import Validation from "~/utils/validation";
import {StructureField} from "~/interfaces/StructureField";

@Component
export default class StructureTextEditor extends Vue {
  @VModel({type: StructureField}) model!: StructureField

  customToolbar = [
    ["bold", "italic", "underline" , {list: "ordered"}, {list: "bullet"}],
    [{ 'align': [] } , { 'header': [1, 2, 3, 4, 5, 6, false] } , { size: [ 'small', false, 'large', 'huge' ]}],
    [
      {color: ["#00AAA6","#00CCCC","#000000","#101010" ,"#252525","#FFFFFF","#EAEAEA","#D9D9D9","#F6F7FD","#9747FF","#1E518A","#0C4955"]},
      {background: ["#00AAA6","#00CCCC","#000000","#101010" ,"#252525","#FFFFFF","#EAEAEA","#D9D9D9","#F6F7FD","#9747FF","#1E518A","#0C4955"]}],
    ["link", "image"],
    ["clean"]
  ]

  field = {
    label: 'Textarea',
    rules: [],
    colAttrs: {cols: 12}
  }

  mounted() {
    this.field.label = this.model.title ?? '';
  }
}
</script>

<style >
.ql-editor {
  min-height: 100px !important;
}

.ql-editor  strong {
  font-weight: bold !important;
}
</style>
