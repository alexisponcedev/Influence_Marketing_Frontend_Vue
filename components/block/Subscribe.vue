<template>
  <div v-if="!isEmpty" class="main-container tw-flex tw-items-center tw-justify-around">

      <div class="title">{{ model.title.value }}</div>
      <div class="xBorder tw-flex tw-items-center tw-justify-between ">
        <div class="xPlaceholder">Enter Your Email here</div>
        <div class="xButton">Subscribe</div>
      </div>

  </div>

</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";


@Component
export default class LandingVideoPlayer extends Vue {
  @Prop(Number) readonly id: number | undefined
  @VModel({type: Object}) model!: Object

  mounted() {
    if (this.isEmpty)
      this.model = {
        title: {
          type: StructureType.String,
          title: 'Title',
          value: 'Stay up to date with emails\n' +
            'about new products & other news',
        },
        Url: {
          type: StructureType.String,
          title: 'Submit URL',
          value: 'https://target-url.com/to/add/subscription',
        }
      }
  }

  clicked() {
    console.log('you have clicked me easily ');
    this.$emit('click');
  }

  get isEmpty(): Boolean {
    return this.model && Object.keys(this.model).length === 0;
  }
}
</script>

<style scoped>
.main-container {
  background-color: #1E1E1E;
  height: 312px;
}

.title {
  font-family: 'hisense' , serif !important;
  font-style: normal;
  font-weight: 500;
  font-size: 26px !important;
  line-height: 48px;
  color: #FFFFFF;
  max-width: 500px;
}

.xBorder {
  min-width: 443px;
  border-bottom: 1px solid #545454;
}

.xPlaceholder {
  font-family: 'hisense', serif !important;
  font-style: normal;
  font-weight: 500;
  font-size: 20px !important;
  line-height: 48px !important;
  color: #FFFFFF;
  opacity: 0.25;
}

.xButton {
  font-family: 'hisense', serif !important;
  font-style: normal;
  font-weight: 500;
  font-size: 20px !important;
  line-height: 48px;
  color: #FFFFFF;
}
</style>
