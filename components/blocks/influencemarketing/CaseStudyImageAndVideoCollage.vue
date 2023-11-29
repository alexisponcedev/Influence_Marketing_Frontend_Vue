<template>
  <section v-if="!isEmpty">
    <div class="tw-bg-midnight">
      <div class="tw-p-4 tw-max-w-[1385px] tw-mx-auto ">
        <div v-for="(item, index) in model?.list?.value" :key=index>
          <div v-if="item?.image?.src && item?.video?.value"
            class="tw-flex tw-flex-col md:tw-flex-row tw-gap-8 tw-justify-center tw-items-center">
            <div class="tw-w-full md:tw-w-1/2 tw-pt-[61%] tw-h-0 md:tw-pt-0 md:tw-h-[400px] tw-relative">
              <img class="tw-absolute tw-left-0 tw-top-0 tw-w-full tw-h-[calc(100%_-_28px)] tw-object-cover"
                :src="item?.image?.src" :alt="item?.image?.alt" />
              <div v-if="item?.imageCaption?.value"
                class="tw-absolute tw-left-4 tw-bottom-0 tw-text-white tw-text-xs tw-font-normal "
                v-html="item?.imageCaption?.value"></div>
            </div>
            <div class="tw-w-full md:tw-w-1/2 tw-pt-[61%] tw-h-0 md:tw-pt-0 md:tw-h-[400px] tw-relative">
              <iframe class="tw-absolute tw-left-0 tw-top-0 tw-w-full tw-h-[calc(100%_-_28px)] tw-object-cover"
                :src="item?.video?.value" allow="autoplay"></iframe>
              <div v-if="item?.videoCaption?.value"
                class="tw-absolute tw-left-4 tw-bottom-0 tw-text-white tw-text-xs tw-font-normal "
                v-html=item?.videoCaption?.value></div>
            </div>
          </div>
          <div v-else-if="item?.image?.src" class="tw-w-full tw-relative tw-pt-[57.8%] tw-h-0">
            <img class="tw-absolute tw-left-0 tw-top-0 tw-w-full tw-object-cover tw-h-[calc(100%_-_28px)]"
              :src="item?.image?.src" :alt="item?.image?.alt" />
            <div v-if="item?.imageCaption?.value"
              class="tw-absolute tw-left-4 tw-bottom-0 tw-text-white tw-text-xs tw-font-normal "
              v-html="item?.imageCaption?.value"></div>
          </div>
          <div v-else-if="item?.video?.value" class="tw-w-full tw-relative tw-pt-[57.8%] tw-h-0">
            <iframe class="tw-absolute tw-left-0 tw-top-0 tw-w-full tw-object-cover tw-h-[calc(100%_-_28px)]"
              :src="item?.video?.value" allow="autoplay"></iframe>
            <div v-if="item?.videoCaption?.value"
              class="tw-absolute tw-left-4 tw-bottom-0 tw-text-white tw-text-xs tw-font-normal "
              v-html=item?.videoCaption?.value></div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class CaseStudyImageAndVideoCollage extends Vue {
  @Prop(Number) readonly id: number | undefined;
  @Prop({ default: true }) readonly editable: boolean | undefined;
  @VModel({ type: Object }) model!: any;

  mounted() {
    blockAddItem(this.model, "list", {
      id: 1,
      type: StructureType.List,
      title: "Rows",
      maxLength: 2,
      newItem: {
        image: {
          id: 0,
          type: StructureType.Image,
          title: "Image",
          src: "",
          alt: ""
        },
        video: {
          id: 1,
          type: StructureType.Video,
          title: "Video",
          value: "",
        },
        imageCaption: {
          id: 2,
          type: StructureType.SimpleText,
          title: "Image caption",
          value: "",
        },
        videoCaption: {
          id: 3,
          type: StructureType.SimpleText,
          title: "Video caption",
          value: "",
        },
      },
      value: [
      ],
    });
    this.model = { ...this.model };
  }

  get isEmpty(): Boolean {
    return this.model && Object.keys(this.model).length === 0;
  }
}
</script>
