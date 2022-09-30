<template>
  <div class="tw-grid tw-grid-cols-2 " v-if="structure" @click="editComponent">
    <div>
      <img
        :src="structure.image.src"
        class=" bg-red-50"
        :alt="structure.image.alt">
    </div>
    <div class="tw-flex tw-flex-col tw-items-start tw-justify-center tw-space-y-6 h-full tw-p-9">
      <h4 class="small-title tw-text-black">{{ structure.smallTitle.value }}</h4>
      <h2 class="large-title tw-text-black">{{ structure.largeTitle.value }}</h2>
      <p class="paragraph tw-text-black">
        {{ structure.paragraph.value }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component , Emit} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";


@Component
export default class BlockTextIntroduction extends Vue {

  structure = {
    image: {
      type: StructureType.Image,
      title: 'Upload Image',
      src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/39f6c6b03f/content_dp-beautiful-screen-min-clikhq.png',
      alt: 'Some note about this image',
    },
    smallTitle: {type: StructureType.String, title: 'Samll Title', value: 'Quantom Dot Color'},
    largeTitle: {type: StructureType.String, title: 'Large Title', value: 'Over One Billion Color'},
    paragraph: {
      type: StructureType.Text,
      title: 'Paragraph Text',
      value: 'Quantum Dot produces over one billion colors, purer, richer, more brilliant and accurate colors than a regular\n' +
        '        LCD TV. We could get into how it works. But it’s a lot easier to say it makes everything you watch look like the\n' +
        '        4th of July.'
    }
  }

  @Emit('edit-component')
  editComponent() {
    return {
      title: 'Introducing Component',
      structure: this.structure
    };
  }
}
</script>

<style type="text/css">
.small-title {
  font-size: 15px;
  font-weight: 700;
}

.large-title {
  font-size: 42px;
  font-weight: 700;
}

.paragraph {
  font-size: 18px;
  font-weight: 400;
}
</style>
