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
      title: {id: 0, type: StructureType.Text, title: "Title", value: "With a lot more to love."},
      list: {
        id: 2,
        type: StructureType.List,
        title: "Items",
        newItem: {
          title: {id: 0, type: StructureType.String, title: "Title", value: "Win a trip to the World Cup finals."},
          backgroundImage: {
            id: 1,
            alt: "some note about this asset",
            src: "http://assets.dev-api.hisenseportal.com/storage/hisense/asset/images/66355af8cdb941.webp",
            type: StructureType.Image,
            title: "Background Image"
          },
          topImage: {
            id: 2,
            type: StructureType.Image,
            title: "Top Image",
            alt: "some note about this asset",
            src: "",
          },
          bottomImage: {
            id: 3,
            type: StructureType.Image,
            title: "Bottom Image",
            src: "",
            alt: "some note about this asset",
          },
          fullWidth: {
            id: 4,
            type: StructureType.Select,
            title: 'Full Width',
            value: false,
            items: [
              {title: 'True', value: true},
              {title: 'False', value: false},
            ]
          },
          link: {id: 5, type: StructureType.Url, title: "Learn More", value: "/"},
        },
        value: [
          {
            title: {id: 0, type: StructureType.String, title: "Title", value: "Win a trip to the World Cup finals."},
            backgroundImage: {
              id: 1,
              alt: "some note about this asset",
              src: "http://assets.dev-api.hisenseportal.com/storage/hisense/asset/images/66355af8cdb941.webp",
              type: StructureType.Image,
              title: "Background Image"
            },
            topImage: {
              id: 2,
              type: StructureType.Image,
              title: "Top Image",
              alt: "some note about this asset",
              src: "",
            },
            bottomImage: {
              id: 3,
              type: StructureType.Image,
              title: "Bottom Image",
              src: "",
              alt: "some note about this asset",
            },
            fullWidth: {
              id: 4,
              type: StructureType.Select,
              title: 'Full Width',
              value: false,
              items: [
                {title: 'True', value: true},
                {title: 'False', value: false},
              ]
            },
            link: {id: 5, type: StructureType.Url, title: "Learn More", value: "/"},
          },
        ],

      },
      link: {id: 2, type: StructureType.Url, title: "See More News", value: "/"},
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
