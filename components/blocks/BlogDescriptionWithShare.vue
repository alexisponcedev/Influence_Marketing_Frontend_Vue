<template>
  <div>
    <img src="/blocks/BlogDescriptionWithShare.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class BlogDescriptionWithShare extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      text: {id: 0, type: StructureType.Text, title: 'Text', value: ''},
      sharingTitle: {id: 1, type: StructureType.String, title: 'Sharing Title', value: ''},
      list: {
        id: 2, type: StructureType.List, title: 'List',
        newItem: {
          link: {id: 0, type: StructureType.Url, title: 'Link', value: ''},
          socialMedia: {
            id: 1, type: StructureType.Select, title: 'Social Media', value: "linkedin",
            items: [
              { title: "LinkedIn", value: "linkedin" },
              { title: "Twitter", value: "twitter" },
              { title: "Facebook", value: "facebook" },
              { title: "Link", value: "link" },
            ]
          },
        },
        value: [
          {
            link: {id: 0, type: StructureType.Url, title: 'Link', value: ''},
            socialMedia: {
              id: 1, type: StructureType.Select, title: 'Social Media', value: "linkedin",
              items: [
                { title: "LinkedIn", value: "linkedin" },
                { title: "Twitter", value: "twitter" },
                { title: "Facebook", value: "facebook" },
                { title: "Link", value: "link" },
              ]
            },
          }
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
  onValueChanged() {
    if (this.isEmpty) this.reset();
  }
}
</script>
