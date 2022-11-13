<template>
  <v-col class="py-0" v-bind="field.colAttrs">
    <label>
      {{ field.label }}
    </label>

    <div class="tw-flex tw-space-x-2 tw-items-center">
      <div class="tw-bg-white tw-px-2 tw-py-0.5 tw-rounded tw-border tw-border-solid tw-border-gray-500 ">
        <input type="text" class="x-input" placeholder="Enter name" v-model='name' @keyup.enter.prevenet="addTag">
        <button @click.prevent="addTag">
          <v-icon>mdi-plus</v-icon>
        </button>
      </div>
      <div v-for="(tag , index) in model" :key="tag"
           class="tw-space-x-2 tw-px-2 tw-py-3 tw-rounded tw-border tw-border-solid tw-border-gray-500">
        <span>{{ tag }}</span>
        <button @click.prevent="removeTag(index)">
          <v-icon small>mdi-close</v-icon>
        </button>
      </div>
    </div>
  </v-col>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import Validation from "~/utils/validation";
import {FormField} from "~/models";

@Component
export default class TextMetaFormField extends Vue {
  @VModel() model!: Array<string>;
  @Prop({
    type: Object, default: {
      label: 'Tags',
      placeholder: 'tag name',
      rules: [],
      colAttrs: {cols: 12},
    }
  }) readonly field!: FormField;

  Validation = Validation;

  name = '';

  // tags: Array<string> = [];

  mounted() {
    // this.tags = this.model && this.model.length > 0 ?  this.model.split(',').filter(i => i !== '') : [];
  }


  removeTag(index: number) {
    // this.tags.splice(index, 1);
    this.model.splice(index, 1);
  }

  addTag() {
    if (this.name != '') {
      // this.tags.push(this.name)
      this.model.push(this.name)
      this.name = '';
    }
  }

  // @Watch('tags')
  // onTagsChanged() {
    // this.model = this.tags.join(',');
  // }
}
</script>

<style scoped>
.x-input {
  border: none;
  background-color: white;
  padding: 11px;
}

.x-input:focus {
  outline: none
}
</style>
