<template>
  <div>
    <img src="/blocks/ProductNewsBox.png" alt="">
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockProductNewsBox extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop(Number) readonly product_id!: number
  @VModel({type: Object}) model!: Object

  Theme = Theme;

  mounted() {
    if (this.isEmpty) {
      this.model = {
        theme: {
          id: 0,
          type: StructureType.Select,
          title: 'Theme',
          value: Theme.dark,
          items: [
            {title: 'Light', value: this.Theme.light},
            {title: 'Dark', value: this.Theme.dark},
          ]
        },
        list: {
          id : 1,
          type: StructureType.List,
          title: 'Items',


          newItem: {
            link: { id : 0 , type: StructureType.Url, title: 'Shop Now URL', value: '/products'},
            image: {
              id : 1,
              type: StructureType.Image,
              title: 'Upload Image',
              src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png',
              alt: 'Some note about this image',
            },
            title: {id : 2,type: StructureType.String, title: 'Title', value: 'TELEVISIONS'},
          },



          value: [
            {
              image: {
                id : 1 ,
                type: StructureType.Image,
                title: 'Upload Image',
                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/c3e247b4bb/L5G_KeyFeature-01__ScaleMaxWidthWzMwNDhd.jpg-rgx0ux.jpg',
                alt: 'Some note about this image',
              },
              title: {id : 2 , type: StructureType.String, title: 'Title', value: 'Ultra Short Throw. Ultra Convenient.'},
              note: {id : 2 , type: StructureType.Text, title: 'Note', value: 'Big screen entertainment in a convenient package. No need for ceiling mounts or in-wall cable runs, simply place the L5G on a TV stand just 11 inches from the wall and get a massive 100-inch projection – that’s 3x more screen than a 55-inch TV.'},
            },

            {
              image: {
                id : 1 ,
                type: StructureType.Image,
                title: 'Upload Image',
                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/128e13b02c/L5G_KeyFeature-02__ScaleMaxWidthWzMwNDhd.jpg-ood6s1.jpg',
                alt: 'Some note about this image',
              },
              title: {id : 2 , type: StructureType.String, title: 'Title', value: 'ALR Daylight Screen.'},
              note: {id : 2 , type: StructureType.Text, title: 'Note', value: 'The L5G comes with a perfectly paired Ambient Light Rejecting (ALR) screen to remove the guesswork from a UST projector setup. The ALR Daylight screen produces an incredibly bright image and features a scratch-resistant surface – no more worrying about hanging it in a high-traffic room. Screen assembly is required.'},
            },
            {
              image: {
                id : 1 ,
                type: StructureType.Image,
                title: 'Upload Image',
                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/5ed4db1d83/L5G_KeyFeature-03__ScaleMaxWidthWzMwNDhd.jpg-6fotlq.jpg',
                alt: 'Some note about this image',
              },
              title: {id : 2 , type: StructureType.String, title: 'Title', value: 'Cinematic Sound.'},
              note: {id : 2 , type: StructureType.Text, title: 'Note', value: 'With built-in 30W Dolby Atmos® sound, the L5G delivers cinematic sound that seemingly flows all around you. For the true audiophiles, the L5G’s eARC support means you get full signal pass-thru to your surround sound system.'},
            },
            {
              image: {
                id : 1 ,
                type: StructureType.Image,
                title: 'Upload Image',
                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/6249a2c95a/AndroidTV-Hisense__ScaleMaxWidthWzMwNDhd.png-brng7w.png',
                alt: 'Some note about this image',
              },
              title: {id : 2 , type: StructureType.String, title: 'Title', value: 'Smart TV Platform.'},
              note: {id : 2 , type: StructureType.Text, title: 'Note', value: 'The smart Android TV platform brings great content to the biggest screen in your home. Install apps from the Google Play Store and open your favorite streaming services for limitless entertainment.'},
            },
            {
              image: {
                id : 1 ,
                type: StructureType.Image,
                title: 'Upload Image',
                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/74b132ee29/L5G_KeyFeature-05__ScaleMaxWidthWzMwNDhd.jpg-bpdvwj.jpg',
                alt: 'Some note about this image',
              },
              title: {id : 2 , type: StructureType.String, title: 'Title', value: 'HDR10.'},
              note: {id : 2 , type: StructureType.Text, title: 'Note', value: 'With 4K resolution, HDR10 support, and 2700 Lumens peak brightness, the L5G faithfully recreates a world of incredible color and detail. The fixed-focal length of the L5G delivers unmatched picture clarity and focus uniformity.'},
            },
            {
              image: {
                id : 1 ,
                type: StructureType.Image,
                title: 'Upload Image',
                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/d20b3573a9/L5G_KeyFeature-06__ScaleMaxWidthWzMwNDhd.jpg-71sf7j.jpg',
                alt: 'Some note about this image',
              },
              title: {id : 2 , type: StructureType.String, title: 'Title', value: 'Game Mode.'},
              note: {id : 2 , type: StructureType.Text, title: 'Note', value: 'No need to manually change TV settings when you’re about to drop in. High-speed HDMI ports detect when a gaming console is the active input source and automatically adjusts picture and signal processing settings to optimize game performance.'},
            },
            {
              image: {
                id : 1 ,
                type: StructureType.Image,
                title: 'Upload Image',
                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/455ab21fd5/L5G_KeyFeature-07__ScaleMaxWidthWzMwNDhd.jpg-al7o9k.jpg',
                alt: 'Some note about this image',
              },
              title: {id : 2 , type: StructureType.String, title: 'Title', value: '25,000+ hr Life Span.'},
              note: {id : 2 , type: StructureType.Text, title: 'Note', value: 'Experience true-to-life color with impressive dynamic range that just doesn’t quit. The L5G’s X-Fusion™ Laser Engine exceeds the Rec.709 standard for UHD 4K and lasts long enough to enjoy more than 25,000 hours of content.'},
            },
            {
              image: {
                id : 1 ,
                type: StructureType.Image,
                title: 'Upload Image',
                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/47e209bc74/L5G_KeyFeature-08__ScaleMaxWidthWzMwNDhd.jpg-kfqbwv.jpg',
                alt: 'Some note about this image',
              },
              title: {id : 2 , type: StructureType.String, title: 'Title', value: 'Smart Features.'},
              note: {id : 2 , type: StructureType.Text, title: 'Note', value: 'With built-in Wi-Fi, Bluetooth, Google Assistant, Works with Alexa, the L5G and its included Voice Remote can be integrated with your smart home ecosystem to create automations to your heart’s desire.'},
            },

          ]
        },
      }
    }
  }
  get isEmpty(): Boolean {
    return this.model && Object.keys(this.model).length === 0;
  }
}
</script>

<style type="text/css"></style>
