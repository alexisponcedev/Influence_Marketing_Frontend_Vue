<template>
  <div>
    <img src="/blocks/FAQs.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class HomeFAQs extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      leftFAQ: {
        id: 0, type: StructureType.List,
        title: 'Left FAQ',
        newItem: {
          question : {id : 0 , type : StructureType.String , title : 'Question' , value : 'Is this a TV or a projector?'},
          answer : {id : 0 , type : StructureType.String , title : 'Question' , value : 'The L9G is a laser projector that comes paired with a projection screen. It\'s not an emissive TV like LED/LCD or OLED – rather, it\'s a new category of TV – high-brightness, ultra-short throw projection TV. When you want the biggest screen possible without breaking the bank, Laser TV is an excellent option.'}
        },
        value: [
          {
            question : {id : 0 , type : StructureType.String , title : 'Question' , value : 'Is this a TV or a projector?'},
            answer : {id : 0 , type : StructureType.String , title : 'Question' , value : 'The L9G is a laser projector that comes paired with a projection screen. It\'s not an emissive TV like LED/LCD or OLED – rather, it\'s a new category of TV – high-brightness, ultra-short throw projection TV. When you want the biggest screen possible without breaking the bank, Laser TV is an excellent option.'}
          },
          {
            question : {id : 0 , type : StructureType.String , title : 'Question' , value : 'Can I use this in a bright room?'},
            answer : {id : 0 , type : StructureType.String , title : 'Question' , value : 'Yes. With high brightness output from the laser projector and a screen built to reject ambient light and boost image contrast, Laser TV is very serviceable in a well-lit room. Picture quality improves significantly with lighting control, but by no means must Laser TV be viewed in a pitch-black room.'}
          },
          {
            question : {id : 0 , type : StructureType.String , title : 'Question' , value : 'How far from the wall does the Laser Console have to sit?'},
            answer : {id : 0 , type : StructureType.String , title : 'Question' , value : 'For the 100" model, the back of the Laser Console is positioned about 11 inches from the wall. For the 120" model it\'s a little over 13 inches from the wall.'}
          },
          {
            question : {id : 0 , type : StructureType.String , title : 'Question' , value : 'How is the screen packaged?'},
            answer : {id : 0 , type : StructureType.String , title : 'Question' , value : 'Laser TV screens ship unassembled, in a flat-pack box.'}
          },
        ]
      },
      rightFAQ: {
        id: 0, type: StructureType.List,
        title: 'Right FAQ',
        newItem: {
          question : {id : 0 , type : StructureType.String , title : 'Question' , value : 'Is this a TV or a projector?'},
          answer : {id : 0 , type : StructureType.String , title : 'Question' , value : 'The L9G is a laser projector that comes paired with a projection screen. It\'s not an emissive TV like LED/LCD or OLED – rather, it\'s a new category of TV – high-brightness, ultra-short throw projection TV. When you want the biggest screen possible without breaking the bank, Laser TV is an excellent option.'}
        },
        value: [
          {
            question : {id : 0 , type : StructureType.String , title : 'Question' , value : 'What type of screen should I choose?'},
            answer : {id : 0 , type : StructureType.String , title : 'Question' , value : 'That depends on the space where you\'ll place the product. If you intend on using Laser TV in a room with lots of windows and high ceilings, then the ALR Daylight Screen will give you that extra boost in brightness to make content pop during daytime viewing. If your intention is to place the Laser TV in a light controlled media room, then the ALR Cinema Screen, with its extremely good reflection control, will be the better choice.'}
          },
          {
            question : {id : 0 , type : StructureType.String , title : 'Question' , value : 'Can the projected image size be changed?'},
            answer : {id : 0 , type : StructureType.String , title : 'Question' , value : 'The projection size changes based on the distance the projector is placed from the wall. The 100" and 120" models are specifically tuned for these projection sizes and paired with screens designed to get the best picture quality possible. Casting a larger or smaller image is certainly possible but there is no manual focus capability.'}
          },
          {
            question : {id : 0 , type : StructureType.String , title : 'Question' , value : 'Can I use the Laser Console on a plain wall, without the screen?'},
            answer : {id : 0 , type : StructureType.String , title : 'Question' , value : 'Absolutely, but the magic of daylight visibility by using Ambient Light Rejecting screen material will be lost. If you only ever plan to watch the Laser TV in a pitch-black room, then projecting to the wall will look good, but not nearly as good as it would with the perfectly paired ALR screen.'}
          },
          {
            question : {id : 0 , type : StructureType.String , title : 'Question' , value : 'How difficult is the screen assembly and mounting process?'},
            answer : {id : 0 , type : StructureType.String , title : 'Question' , value : 'Laser TV screens come flat-packed and require assembly. Expect 2 people to take 1-2 hours to build the screen. The screen mounts to the wall using the included mounting brackets. Take your time and following the step-by-step installation guide and you\'ll find that it\'s not particularly difficult.'}
          },
        ]
      },
      title: { id: 1, type: StructureType.String, title: 'Title', value: 'Frequently Asked Questions' },
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
