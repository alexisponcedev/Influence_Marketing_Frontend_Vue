<template>
  <v-dialog v-model="show" max-width="500">
    <v-card>
      <v-card-title>
        Item Editor
      </v-card-title>

      <v-card-text>
        <form-field-text :field="textField" v-model="newItem.name"/>

        <form-field-select-page-name
          :field="urlField"
          v-model="newItem.url"
          :rules="[]"
          placeholder="p"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @add text color="green"> Add </v-btn>
        <v-btn @click="close" text color="red"> Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import {Vue, Component, VModel} from "vue-property-decorator";
import {Api} from "~/utils/store-accessor";

@Component
export default class StructureImageEditor extends Vue {
  @VModel({ type: Object }) model!: any
  Api = Api;

  newItem = {name : '' , url : '/'};

  editMode : Boolean = false;

  textField = {
    label: 'Item Name',
    placeholder: 'enter name',
    rules: [],
    colAttrs: {cols: 12},
  }

  urlField = {
    label: "Parent Page URL",
    placeholder: 'Enter page name',
    'item-text': 'title',
    'item-value': 'value',
    rules: [],
    colAttrs: {cols: 12},
  }

  show: Boolean = false;

  selected() {
    if(!this.editMode)
      this.model.push(this.newItem)
    this.close();
  }
  reset(){
    this.editMode = false;
    this.newItem = { name : '' , url : '/'}
  }

  open(item : any = null){
    if(item) {
      this.editMode = true;
      this.newItem = item;
    }
  }

  close() {
    this.reset();
    this.show = false;
  }
}
</script>

