<template>
  <div>
    <img src="/blocks/AuthorizedRetailersBadge.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class AuthorizedRetailersBadge extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      image : {id : 0 , type : StructureType.Image , title : "Badge Image" , src : '' , alt : ''},
      title : {id : 1 , type : StructureType.String , title : 'Title' , value : 'Look for the Authorized Retailer Badge before you buy.'}
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
