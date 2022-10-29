<template>
  <div>
    <img src="/blocks/SponsorshipBigImageAndText.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class SponsorshipBigImageAndText extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      image : {id : 0 , type : StructureType.Image , title : 'Image' , src : '' , alt : ''},
      text : {id : 1 , type : StructureType.Text , title : 'Text' , value : '<p>“It gives me great pleasure to welcome Hisense on board as an Official Sponsor of the FIFA World Cup, and we are delighted to partner with this&nbsp;<span style="color: rgb(0, 170, 166);">internationally respected brand</span>, which also has a grown presence in the sports market. FIFA and Hisense are both focused on technology, innovation, and giving people the&nbsp;<span style="color: rgb(0, 170, 166);">best possible experience</span>. I am confident that this collaboration will support the global objectives of both organizations and contribute to the success of what is sure to be an amazing event next year.</p><p><span class="ql-size-small">- Fatma Samoura, FIFA Secretary General</span></p>' },
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
