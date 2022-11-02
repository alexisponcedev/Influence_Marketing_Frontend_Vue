<template>
  <div>
    <img src="/blocks/ExtendedWarrantyFAQ.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class ExtendedWarrantyFAQ extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      title: {id: 0, type: StructureType.String, title: 'Title', value: ''},
      list: {
        id: 1, type: StructureType.List,
        title: 'List',
        newValue: {},
        value: [
          {
            title: {id: 0, type: StructureType.String, title: 'Title', value: ''},
            questions: {
              id: 1, type: StructureType.List, title: 'Questions',
              newItem: {
                question: {id: 0, type: StructureType.String, title: 'Question', value: ''},
                answer: {id: 1, type: StructureType.Text, title: 'Answer', value: ''}
              },
              value: [
                {
                  question: {id: 0, type: StructureType.String, title: 'Question', value: ''},
                  answer: {id: 1, type: StructureType.Text, title: 'Answer', value: ''}
                }
              ]
            }
          }
        ]
      }
    }
  }

  mounted() {
    if (this.isEmpty) this.reset();
  }

  get isEmpty(): Boolean {
    return this.model && Object.keys(this.model).length === 0;
  }

  @Watch('isEmpty')
  onValueChanged() {
    if (this.isEmpty) this.reset();
  }
}
</script>
