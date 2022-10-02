<template>
  <div v-if="!isEmpty">
    <div class="tw-p-2 tw-my-1.5 tw-text-gray-500 tw-text-sm tw-bg-gray-50 tw-rounded-lg tw-inline-block">In order to choose video player component please click here ..</div>
    <div class='tw-aspect-video' >
      <iframe
        @click="clicked"
        ref="videoPlayer"
        class="tw-z-0"
        :title='model.video.alt'
        :src='model.video.src'
        width='100%'
        height='100%'
        allow='autoplay; fullscreen'
        allowfullscreen=''
        data-ready='true' />
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
        video : {
          type : StructureType.File,
          title : 'Video' ,
          alt: 'Some note about this image',
          src : 'https://player.vimeo.com/video/408847720?autoplay=1&amp;muted=1&amp;loop=1&amp;controls=0&amp;background=1'},
      }
  }

  clicked(){
    console.log('you have clicked me easily ');
    this.$emit('click');
  }
  get isEmpty(): Boolean {
    return this.model && Object.keys(this.model).length === 0;
  }
}
</script>
