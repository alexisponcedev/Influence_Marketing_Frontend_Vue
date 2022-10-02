<template>
  <div>
    <div class="tw-flex tw-items-center tw-w-full tw-justify-between tw-p-3" v-if="!simple">
      <h6>{{ title }}</h6>
      <button @click="close">
        <v-icon>mdi-close</v-icon>
      </button>
    </div>

    <component :is="`structure-editor-${structure[key].type}`"
               v-for="(key , index) in structureKeys"
               v-model="structure[key]"
               :key="index"/>

  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Emit} from "vue-property-decorator";
import {StructureField} from "~/utils/StructureField";

@Component
export default class PageContent extends Vue {
  @Prop(String) readonly title: string | undefined
  @Prop({type: Boolean, default: false}) readonly simple: boolean | undefined
  @VModel({type: StructureField}) structure!: StructureField

  @Emit('close')
  close() {
    this.$emit('close');
  }

  get structureKeys() {
    return this.structure ? Object.keys(this.structure) : [];
  }
}
</script>
