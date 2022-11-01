<template>
  <div>
    <img src="/blocks/NeedHelpBox.png" alt="">
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class LandingSlider extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({ default: true }) readonly editable: Boolean | undefined
  @VModel({type: Object }) model!: any

  activeSlide = 0;

  reset(){
    this.model = {
      list: {
        id : 1,
        type: StructureType.List,
        title: 'Items',
        newItem: {},
        value: [
          {
            title: {id : 0 , type: StructureType.String, title: 'Title', value: 'Register Product'},
            url: {id : 0 , type: StructureType.String, title: 'Target URL', value: '/'},
          },
          {
            title: {id : 0 , type: StructureType.String, title: 'Title', value: "FAQ's"},
            url: {id : 0 , type: StructureType.String, title: 'Target URL', value: '/'},
          },
          {
            title: {id : 0 , type: StructureType.String, title: 'Title', value: "VIDEOS"},
            url: {id : 0 , type: StructureType.String, title: 'Target URL', value: '/'},
          },
          {
            title: {id : 0 , type: StructureType.String, title: 'Title', value: "REPLACEMENT PARTS"},
            url: {id : 0 , type: StructureType.String, title: 'Target URL', value: '/'},
          },
          {
            title: {id : 0 , type: StructureType.String, title: 'Title', value: "CONTACT HISENSE"},
            url: {id : 0 , type: StructureType.String, title: 'Target URL', value: '/'},
          },
          {
            title: {id : 0 , type: StructureType.String, title: 'Title', value: "TECHNICAL SUPPORT"},
            url: {id : 0 , type: StructureType.String, title: 'Target URL', value: '/'},
          },
        ]
      },
    }
  }
  mounted() {
    if (this.isEmpty) this.reset();
  }

  get isEmpty(): Boolean {
    return this.model && Object.keys(this.model).length === 0;
  }

  @Watch('isEmpty')
  onValueChanged(){
    if(this.isEmpty) this.reset();
  }
}
</script>
