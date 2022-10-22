<template>
  <div class="tw-p-2 tw-rounded-lg ">
    <h6 style="margin-bottom: 3px">{{model.title}}</h6>
    <div class="tw-space-y-4 tw-mb-4">
      <div class="tw-bg-gray-50" v-for="(fields , index) in model.value" :key="`structure-list-${index}`">

        <div class="tw-flex tw-items-center tw-justify-between">
          <h6 class="tw-mx-2.5 tw-my-1">Item {{ index + 1}}</h6>
          <button class="tw-p-2" @click="removeItem(index)"><v-icon small>mdi-delete</v-icon></button>
        </div>
        <structure-editor :key="model.title + model.id" :simple="true" :value="fields" @input="v => fields = v"/>
      </div>
    </div>
    <button class="tw-text-center tw-px-3 tw-font-bold tw-py-3 tw-rounded-lg tw-bg-green-300 tw-w-full" @click="addNew">Add new item</button>
  </div>

</template>

<script lang="ts">
import {Vue, Component, VModel, Prop} from "vue-property-decorator";

@Component
export default class StructureListEditor extends Vue {
  @VModel({ type: Array }) model!: any

  field = {
    label : 'Filed',
    rules : [],
    colAttrs : {cols : 12}
  }

  mounted(){
    this.field.label = this.model.title ?? 'field';
  }
  addNew(){
    this.model.value.push(JSON.parse(JSON.stringify(this.model.newItem)));
  }
  removeItem(i : any){
    this.model.value.splice(i , 1);
  }
}
</script>
