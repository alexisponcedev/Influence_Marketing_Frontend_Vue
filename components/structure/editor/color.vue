<template>
  <div class="tw-p-2">
    <label>
      {{ model.title }}
    </label>

    <button @click="show = true" class="tw-text-center tw-w-full tw-mt-1 tw-flex tw-items-center tw-justify-between tw-px-2.5 tw-py-2 tw-bg-white tw-rounded">

      <div class="tw-whitespace-nowrap">Color Picker</div>
      <div :style="{'backgroundColor' : model.value}" class="tw-flex tw-items-center tw-justify-center tw-bg-white tw-py-2 tw-px-2 tw-min-w-40 tw-rounded-lg tw-shadow tw-text-center tw-uppercase">
        {{ model.value }}
      </div>

    </button>

    <v-dialog v-model="show" max-width="350">

      <v-card>
        <v-card-title>Color Picker</v-card-title>
        <v-card-text>
          <v-color-picker
            v-model="color"
            dot-size="25"
            mode="hexa"
            show-swatches
            swatches-max-height="100"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="select" text color="green" >Select </v-btn>
          <v-btn @click="close" text > Close</v-btn>
        </v-card-actions>

      </v-card>


    </v-dialog>


  </div>
</template>

<script lang="ts">
import {Vue, Component, VModel} from "vue-property-decorator";
import {StructureField} from "~/interfaces/StructureField";

@Component
export default class StructureImageEditor extends Vue {
  @VModel({type: StructureField}) model!: StructureField

  color : string = '#fff'

  show: Boolean = false;

  select(){
    this.model.value = this.color;
    this.close();
  }

  close() {
    this.show = false;
  }
}
</script>
