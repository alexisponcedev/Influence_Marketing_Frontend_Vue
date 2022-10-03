<template>
  <div class='main-container tw-flex tw-flex-col tw-items-center hover:bg-gray-100 tw-transition tw-duration-200' v-if="!isEmpty">
    <div>
      <a href='#' title='Shop Televisions' class="image-box tw-flex tw-justify-center tw-items-center" v-if="model.hasOwnProperty('image')">
        <img
          :src="model.image.src"
          :alt='model.image.alt'
          width='176px'
        />
      </a>
    </div>
    <p v-if="model.hasOwnProperty('title')" class='title tw-my-5'>{{ model.title.value }}</p>
    <a href='#' class="button">
      SHOP NOW
    </a>
  </div>

</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";


@Component
export default class LandingProductItem extends Vue {
  @Prop(Number) readonly id: number | undefined
  @VModel({type: Object}) model!: Object

  mounted() {
    if (this.isEmpty)
      this.model = {
        link: {type: StructureType.String, title: 'Go to', value: '/products'},
        image: {
          type: StructureType.Image,
          title: 'Upload Image',
          src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/39f6c6b03f/content_dp-beautiful-screen-min-clikhq.png',
          alt: 'Some note about this image',
        },
        title: {type: StructureType.String, title: 'Title', value: 'TELEVISIONS'},
      }
  }

  get isEmpty(): Boolean {
    return this.model && Object.keys(this.model).length === 0;
  }
}
</script>

<style scoped>
.main-container{
  height : 468px
}
.button{
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 7px 24px;
  gap: 10px;
  width: 134px;
  border: 1px solid #000000;
  border-radius: 48px;
}
.image-box{
  width: 264px;
  height: 264px;
  margin-bottom: 12px;
}
.title {
  font-family: 'hisense';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  color: #000000;
  margin-bottom: 12px;
}
</style>
