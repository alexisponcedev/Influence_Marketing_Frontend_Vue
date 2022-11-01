<template>
  <div>
    <img src="/blocks/BlockCards.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class BlockCards extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      title : {id : 0 , type : StructureType.Text , title : 'Title' , value : 'We make award winning TVs.'},
      text : {id : 1 , type : StructureType.Text , title : 'Text' , value : 'LESS TALK, MORE TV' +
          'Find one (or two) \n' +
          'made just for you.' +
          'Computer-generated living room not included.' +
          ''},
      link : {id : 2 , type : StructureType.Url , title : 'View the Entire Lineup' , value :'/'},
      image : {id : 3 , type : StructureType.Image , title : 'Image' , src :'' , alt  :''},
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
