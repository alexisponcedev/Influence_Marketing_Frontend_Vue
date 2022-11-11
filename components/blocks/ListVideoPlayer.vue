<template>
  <div v-if="!isEmpty" style="margin-bottom : -8px">

    <div v-if="editable"
         class="tw-p-2 tw-my-1.5 tw-text-gray-500 tw-text-sm tw-bg-gray-50 tw-rounded-lg tw-inline-block">In order to
      choose video player component please click here ..
    </div>

    <div class="tw-flex tw-space-x-4 tw-p-4">

      <div class='tw-aspect-video tw-flex-1 tw-bg-gray-50 ' v-for="(item , index) in model.list.value" :key="index">
        <iframe
          @click="clicked"
          ref="videoPlayer"
          class="tw-z-0"
          :src='item.video.value'
          width='100%'
          height='100%'
          allow='autoplay; fullscreen'
          allowfullscreen=''
          data-ready='true'/>
      </div>
    </div>

  </div>

</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";


@Component
export default class ListVideoPlayer extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      list : {
        id : 0 ,
        title : 'video List',
        type : StructureType.List,
        newItem:{
          video: {
            id: 0,
            type: StructureType.Url,
            title: 'Video',
            value: 'https://player.vimeo.com/video/408847720?autoplay=1&amp;muted=1&amp;loop=1&amp;controls=0&amp;background=1'
          },
        },
        value : [
          {
            video: {
              id: 0,
              type: StructureType.Url,
              title: 'Video',
              value: 'https://player.vimeo.com/video/408847720?autoplay=1&amp;muted=1&amp;loop=1&amp;controls=0&amp;background=1'
            },
          },
          {
            video: {
              id: 0,
              type: StructureType.Url,
              title: 'Video',
              value: 'https://player.vimeo.com/video/408847720?autoplay=1&amp;muted=1&amp;loop=1&amp;controls=0&amp;background=1'
            },
          }
        ]
      }
    }
  }

  mounted() {
    if (this.isEmpty) this.reset();
  }

  clicked() {
    this.$emit('click');
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
