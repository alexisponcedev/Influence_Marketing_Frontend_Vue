<template>
  <div>
    <img src="/blocks/HeaderMenu.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlockHeaderMenu extends Vue {
  @Prop(Number) readonly id: number | undefined;
  @Prop(Number) readonly product_id!: number;
  @VModel({type: Object}) model!: Object;

  Theme = Theme;

  reset() {
    this.model = {
      theme: {
        id: 0,
        type: StructureType.Select,
        title: "Theme",
        value: Theme.dark,
        items: [
          {title: "Light", value: this.Theme.light},
          {title: "Dark", value: this.Theme.dark},
        ],
      },
      list: {
        id: 1,
        type: StructureType.List,
        title: 'Items',
        newItem: {
          link: {id: 0, type: StructureType.Url, title: 'Link URL', value: '/'},
          image: {
            id: 1,
            type: StructureType.Image,
            title: 'Image',
            src: 'https://assets.hisense-usa.com/resources/themes/default/images/common/logo.svg',
            alt: 'Image Data',
          },
        },
        value: [
          {
            link: {id: 0, type: StructureType.Url, title: 'Link URL', value: '/'},
            image: {
              id: 1,
              type: StructureType.Image,
              title: 'Image',
              src: 'https://assets.hisense-usa.com/resources/themes/default/images/common/logo.svg',
              alt: 'Image Data',
            },
          },
          {
            link: {id: 0, type: StructureType.Url, title: 'Link URL', value: '/'},
            image: {
              id: 1,
              type: StructureType.Image,
              title: 'Image',
              src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/a27f35e091/Google-TV-color__ScaleMaxWidthWzMwNDhd.png-obt5nh.png',
              alt: 'Image Data',
            },
          },
        ]
      },
    };
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
