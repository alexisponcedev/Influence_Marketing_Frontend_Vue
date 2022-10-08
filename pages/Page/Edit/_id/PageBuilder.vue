<template>
  <v-container fluid style="background-color: #F2F3F8;height: 100vh">

    <v-card color="#FCFCFC" elevation="0" class="mb-4 px-7 page-builder-header">
      <v-row align="center">
        <v-col cols="12" md="6">
          <h1 class="text-h6 font-weight-bold mb-1">Page builder</h1>
          <span
            class="text-subtitle-2 grey--text text--darken-2">65" 4K ULED™ Premium Hisense Android Smart TV (2021)</span>
        </v-col>
        <v-col cols="12" md="6" class="text-right">
          <v-btn @click="discard" elevation="0" outlined color="grey darken-4" class="control-btns">Discard</v-btn>
          <v-btn elevation="0" outlined color="grey darken-4" class="control-btns">Preview</v-btn>
          <v-btn @click="saveDraft" outlined elevation="0" color="grey darken-4 white--text" class="control-btns">Save
            Draft
          </v-btn>
          <v-btn @click="savePage" elevation="0" color="grey darken-4 white--text" class="control-btns">
            Publish
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <div class="tw-grid tw-grid-cols-10 tw-gap-6" style="margin-top : 88px !important">

      <div
        class="bg-white tw-col-span-8 tw-rounded-lg tw-overflow-hidden tw-overflow-y-auto tw-max-h-full tw-space-y-2 tw-p-2"
        style="max-height: 88vh">
        <draggable v-model="blocksList" group="people" @start="drag=true" @end="drag=false">
          <block-container v-for="(block , i) in blocksList" :key="block.id"
                           class="tw-mb-2"
                           @edit="editBlock(i)"
                           @delete="deleteBlock(i)"
                           @duplicate="duplicateBlock(i)"
                           @move-up="moveUpBlock(i)"
                           @move-down="moveDownBlock(i)"
                           :block="block">
            <component :is="`block-${block.name}`" :id="block.id" v-model="block.structure"/>
          </block-container>
        </draggable>
        <block-drop/>
      </div>
      <div class="bg-white tw-rounded-lg tw-col-span-2 tw-overflow-hidden tw-overflow-y-auto " style="max-height: 88vh">

<!--        <div v-show="editIndex === -1">-->
<!--          <h6 class="tw-p-2">Page Template</h6>-->
<!--          <form-field-select :field="templateFiled" v-model="templateId"/>-->

          <block-selector v-show="editIndex === -1"  class="tw-p-4" @add-block="addBlock"/>
<!--        </div>-->
        <structure-editor v-if="editIndex > -1"
                          @close="cancelEditing"
                          :title="blocksList[editIndex].title"
                          v-model="blocksList[editIndex].structure"/>
      </div>
    </div>

    <loading-overlay :show="Api.Page.loading"/>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component, Watch} from "vue-property-decorator";
import {Api} from "@/store";
import draggable from 'vuedraggable'
import {Content, Draft, Page, Template} from "~/repositories";
import Validation from "~/utils/validation";

interface BlockInterface {
  id: Number,
  selected: Boolean,
  structure: Object,
  name: String,
  title: String,
  image: String
}

@Component({
  components: {draggable}
})
export default class PageBuilder extends Vue {
  Api = Api;

  tab = "";

  blocksList: BlockInterface[] = [];

  templates: Template[] = []

  // templateId: Number = 1;

  editIndex: Number = -1;

  // templateFiled = {
  //   label: "Template",
  //   modelKey: "template",
  //   "item-text": "name",
  //   "item-value": "id",
  //   placeholder: 'Select Template',
  //   type: "form-field-select",
  //   rules: [Validation.required],
  //   items: [],
  //   colAttrs: {cols: 12},
  // };

  async mounted() {
    this.getDraft().then(res => {
      if (res.data!.page_draft)
        this.blocksList = res.data!.page_draft as BlockInterface[];
      else
        this.loadFromLocalStorage();
    })
    setInterval(this.saveToLocalStorage, 5000)
    // await this.getTemplates();
  }

<<<<<<< Updated upstream
  async getTemplates() {
    this.templates = await Api.Template.getAll()
    this.templateFiled.items = this.templates as Template[];
  }
=======
  // async getTemplates() {
  //   this.templates = await Api.Template.getAll() as Template[];
  //   this.templateFiled.items = this.templates as [];
  // }
>>>>>>> Stashed changes

  addBlock(block: any) {
    let id = this.blocksList.length + 1;
    this.blocksList.push({id: id, selected: false, structure: {}, ...block,});
    this.selectBlock(this.blocksList.length - 1);
  }

  selectBlock(index: any) {
    this.blocksList.forEach(i => i.selected = false);
    this.blocksList[index].selected = true;
  }

  editBlock(i: Number) {
    this.selectBlock(i);
    this.editIndex = i;
  }

  deleteBlock(i: any) {
    this.cancelEditing();
    this.blocksList.splice(i, 1);
  }

  duplicateBlock(i: any) {
    let newBlock = JSON.parse(JSON.stringify(this.blocksList[i]));
    newBlock.id = this.blocksList.length + 1;
    this.blocksList.splice(i + 1, 0, newBlock)
  }

  moveUpBlock(i: any) {
    if (i > 0 && this.blocksList.length > 1) {
      const block = this.blocksList.splice(i, 1)[0];
      this.blocksList.splice(i - 1, 0, block)
    }
  }

  moveDownBlock(i: any) {
    if (this.blocksList.length > 1 && i < this.blocksList.length) {
      const block = this.blocksList.splice(i, 1)[0];
      this.blocksList.splice(i + 1, 0, block)
    }
  }

  cancelEditing() {
    this.editIndex = -1;
  }

  get getPageCache() {
    return `page_${this.$route.params.id}_data`;
  }

  saveToLocalStorage() {
    localStorage.setItem(this.getPageCache, JSON.stringify(this.blocksList));
    console.log('data is saved into local storage')
  }

  loadFromLocalStorage() {
    if (this.blocksList.length === 0) {
      console.log('loading data from local storage');
      this.blocksList = JSON.parse(localStorage.getItem(this.getPageCache) ?? "[]");
    }
  }

  discard() {

  }

  async savePage() {
    let content: Content = {page_id: +this.$route.params.id, page_content: this.blocksList}
    await Api.Page.savePageContent(content);
  }

  async saveDraft() {
    let draft: Draft = {page_id: +this.$route.params.id, page_draft: this.blocksList};
    await Api.Page.saveDraft(draft)
  }

  async getDraft() {
    return await Api.Page.getDraft(+this.$route.params.id)
  }

}
</script>
