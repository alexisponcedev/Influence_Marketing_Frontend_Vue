<template>
  <div>
    <img src="/blocks/ContactUsNewForm.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class ContactUsNewForm extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      title : {id : 0 , type : StructureType.String , title : 'Title' , value : 'Email US'},
      generalInquirySubmitUrl : {id : 1 , type : StructureType.Url , title : 'General Inquiry Submit Url' , value : 'https://imcrm.dev-api.hisenseportal.com/api/hisense/contact/inquery' },
      partAndServiceSupportSubmitUrl : {id : 2 , type : StructureType.Url , title : 'General Inquiry Submit Url' , value : 'https://imcrm.dev-api.hisenseportal.com/api/hisense/contact/register-product' },
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
