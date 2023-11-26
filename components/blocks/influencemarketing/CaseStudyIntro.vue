<template>
  <section v-if="!isEmpty">
    <div class="tw-bg-midnight">
      <div
        class="tw-pt-36 md:tw-pt-[200px] tw-pb-12 md:tw-pb-16 tw-px-4 tw-max-w-[1150px] tw-mx-auto tw-flex tw-flex-col md:tw-flex-row tw-gap-8 md:tw-gap-0 tw-justify-center tw-items-start">
        <div class="tw-w-full md:tw-w-1/2 tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-6 md:tw-gap-8">
          <div class="tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-4 md:tw-gap-6">
            <h1 v-if="model.title.value"
              class="tw-text-white tw-text-6xl md:tw-text-7xl lg:tw-text-8xl tw-font-bold tw-uppercase tw-tracking-[-1.92px]"
              v-html="model?.title?.valu"></h1>
            <h3 v-if="model.subtitle.value"
              class="tw-text-skyblue tw-text-2xl md:tw-text-4xl lg:tw-text-5xl tw-font-bold tw-uppercase tw-tracking-[-0.96px]"
              v-html="model?.subtitle?.valu"></h3>
          </div>
          <div v-if="model?.note?.value" class="tw-text-gray-200 tw-text-xs tw-font-normal " v-html="
            model?.note?.valu"></div>
        </div>
        <div class="tw-w-full md:tw-w-1/2">
          <div v-if="model?.description?.value"
            class="tw-text-white tw-text-base md:tw-text-xl md:tw-leading-[25px] tw-font-normal "
            v-html="model?.description?.value"></div>
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
export default class CaseStudyIntro extends Vue {
  @Prop(Number) readonly id: number | undefined;
  @Prop({ default: true }) readonly editable: boolean | undefined;
  @VModel({ type: Object }) model!: any;

  mounted() {
    blockAddItem(this.model, "title", {
      id: 1,
      type: StructureType.SimpleText,
      title: "Title",
      value: "",
    });
    blockAddItem(this.model, "subtitle", {
      id: 2,
      type: StructureType.SimpleText,
      title: "Subitle",
      value: "",
    });
    blockAddItem(this.model, "note", {
      id: 3,
      type: StructureType.SimpleText,
      title: "Note",
      value: "",
    });
    blockAddItem(this.model, "description", {
      id: 4,
      type: StructureType.SimpleText,
      title: "Description",
      value: "",
    });
    this.model = { ...this.model };
  }

  get isEmpty(): Boolean {
    return this.model && Object.keys(this.model).length === 0;
  }
}
</script>
