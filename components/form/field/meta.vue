<template>
  <div class="tw-grid tw-grid-cols-3 tw-gap-2" v-if="model.length > 0">
    <div class="tw-space-y-1.5">
      <div class="tw-p-2 tw-rounded-lg tw-bg-white tw-flex tw-flex-col tw-space-y-2 tw-items-center tw-justify-center ">
        <img src="~/assets/Images/meta/google.png" width="72px" alt="Google Logo"/>
      </div>

      <div class="tw-p-2 tw-rounded-lg tw-bg-white tw-space-y-2">
        <div>Preview</div>

        <div>
          <div class="tw-text-blue-600">{{model[googleTitleIndex].content}}</div>
          <div class="tw-text-green-800 tw-font-sm"> {{`https://hisese-usa.com${route}`}} </div>
          <div class="tw-text-gray-500 tw-font-sm">{{model[googleDescriptionIndex].content}}</div>
        </div>
      </div>
      <hr class="hr-border">


      <div v-if="googleTitleIndex >= 0" class="tw-bg-gray-50 tw-overflow-hidden tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg tw-flex twl-items-center">
        <div class="tw-px-3 tw-w-40 tw-font-semibold tw-flex tw-items-center tw-justify-start">Meta Title</div>
        <input type="text" placeholder="Enter title" class="x-input tw-flex-1" v-model="model[googleTitleIndex].content" />
      </div>

      <div v-if="googleDescriptionIndex >= 0" class="tw-bg-gray-50 tw-overflow-hidden tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg tw-flex twl-items-center">
        <div class="tw-px-3 tw-w-40 tw-font-semibold tw-flex tw-items-center tw-justify-start">Meta Description</div>
        <textarea type="text" placeholder="Enter description" class="x-input tw-flex-1" v-model="model[googleDescriptionIndex].content" ></textarea>
      </div>


    </div>

    <div class="tw-space-y-1.5">
      <div class="tw-p-2 tw-rounded-lg tw-bg-white tw-flex tw-flex-col tw-space-y-2 tw-items-center tw-justify-center ">
        <img src="~/assets/Images/meta/facebook.png" width="72px" alt="Facebook Logo"/>
      </div>

      <div class="tw-p-2 tw-rounded-lg tw-bg-white tw-space-y-2">
        <div>Preview</div>


        <div class="tw-border tw-border-solid tw-border-gray-200 tw-bg-gray-50">
          <img v-if="model[ogImageIndex].content" :src="model[ogImageIndex].content" alt="Meta Image">

          <div class="tw-p-2">
            <div class="tw-text-gray-500 tw-font-sm">{{model[ogUrlIndex].content}}</div>
            <div class="tw-font-semibold tw-text-gray-800">{{model[ogTitleIndex].content}}</div>
          <div class="tw-text-gray-500 tw-font-sm">{{model[ogDescriptionIndex].content}}</div>
          </div>

          
        </div>
      </div>
      <hr class="hr-border">


      <div v-if="ogTitleIndex >= 0" class="tw-bg-gray-50 tw-overflow-hidden tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg tw-flex twl-items-center">
        <div class="tw-px-3 tw-w-40 tw-font-semibold tw-flex tw-items-center tw-justify-start">OG Title</div>
        <input type="text" placeholder="Enter title" class="x-input tw-flex-1" v-model="model[ogTitleIndex].content" />
      </div>

      <div v-if="ogDescriptionIndex >= 0" class="tw-bg-gray-50 tw-overflow-hidden tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg tw-flex twl-items-center">
        <div class="tw-px-3 tw-w-40 tw-font-semibold tw-flex tw-items-center tw-justify-start">OG Description</div>
        <textarea type="text" placeholder="Enter description" class="x-input tw-flex-1" v-model="model[ogDescriptionIndex].content" ></textarea>
      </div>

      <div v-if="ogSiteNameIndex >= 0" class="tw-bg-gray-50 tw-overflow-hidden tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg tw-flex twl-items-center">
        <div class="tw-px-3 tw-w-40 tw-font-semibold tw-flex tw-items-center tw-justify-start">OG Site name</div>
        <input type="text" placeholder="Enter site name" class="x-input tw-flex-1" v-model="model[ogSiteNameIndex].content" />
      </div>

      <div v-if="ogUrlIndex >= 0" class="tw-bg-gray-50 tw-overflow-hidden tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg tw-flex twl-items-center">
        <div class="tw-px-3 tw-w-40 tw-font-semibold tw-flex tw-items-center tw-justify-start">OG URL</div>
        <input type="text" placeholder="Enter url" class="x-input tw-flex-1" v-model="model[ogUrlIndex].content" />
      </div>

      <div v-if="ogImageIndex >= 0" class="tw-bg-gray-50 tw-overflow-hidden tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg tw-flex twl-items-center tw-relative">
        <div class="tw-px-3 tw-w-40 tw-font-semibold tw-flex tw-items-center tw-justify-start">OG IMAGE</div>
        <input type="text" placeholder="Enter image url" class="x-input tw-flex-1" v-model="model[ogImageIndex].content" />
      </div>

      <div v-if="ogTypeIndex >= 0" class="tw-bg-gray-50 tw-overflow-hidden tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg tw-flex twl-items-center">
        <div class="tw-px-3 tw-w-40 tw-font-semibold tw-flex tw-items-center tw-justify-start">OG Type</div>
        <input type="text" placeholder="Enter type" class="x-input tw-flex-1" v-model="model[ogTypeIndex].content" />
      </div>

      <div v-if="ogLocaleIndex >= 0" class="tw-bg-gray-50 tw-overflow-hidden tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg tw-flex twl-items-center">
        <div class="tw-px-3 tw-w-40 tw-font-semibold tw-flex tw-items-center tw-justify-start">OG Locale</div>
        <input type="text" placeholder="Enter locale" class="x-input tw-flex-1" v-model="model[ogLocaleIndex].content" />
      </div>

    </div>
    <div class="tw-space-y-1.5">

      <div class="tw-p-2 tw-flex tw-justify-between tw-items-center tw-rounded-t-lg tw-space-y-2 tw-bg-gray-200" style="    border-bottom: 2px solid black;">
        <div>Custom Meta</div> 
        <button class="tw-bg-white tw-rounded tw-font-sm tw-px-2 tw-py-0.8 tw-shadow " @click.prevent="addRow">+ Add</button>
      </div>

      <hr class="hr-border" />


      <div v-for="(item , j) in customTags" class="tw-bg-gray-50 tw-overflow-hidden tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg tw-flex twl-items-center">
        <input type="text" placeholder="Enter meta name" class="x-gray-input tw-w-40 " v-model="item.name" />
        <input type="text" placeholder="Enter meta content" class="x-input tw-flex-1" v-model="item.content" />
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {FormField} from "@/models";
import {MetaInterface} from "~/models/Meta.model";
import Validation from "~/utils/validation";

@Component
export default class TextMetaFormField extends Vue {
  @Prop({default: "text"}) readonly type!: "text";
  @Prop({default: "/"}) readonly route!: "/";
  @Prop(Object) readonly field!: FormField;
  @VModel() model!: Array<MetaInterface>;

  Validation = Validation;

  MetaTypes: Array<{ text: String, value: String }> = [
    {text: 'blank', value: 'blank'},
    {text: 'http-equiv', value: 'http-equiv'},
    {text: 'og:site_name', value: 'property="og:site_name"'},
    {text: 'og:title', value: 'property="og:title"'},
    {text: 'og:description', value: 'property="og:description"'},
    {text: 'og:image', value: 'property="og:image"'},
    {text: 'og:url', value: 'property="og:url"'},
    {text: 'og:type', value: 'property="og:type"'},
    {text: 'og:locale', value: 'property="og:locale"'},
  ]

  mounted() {
    if (!this.model || this.model.length === 0) this.model = [
      {rel: 'blank', name: 'title', content: ''},
      {rel: 'blank', name: 'description', content: ''},


      {rel: 'property="og:site_name"', name: 'property="og:site_name"', content: 'Hisense USA'},
      {rel: 'property="og:title"', name: 'property="og:title"', content: ''},
      {rel: 'property="og:description"', name: 'property="og:description"', content: ''},
      {rel: 'property="og:image"', name: 'property="og:image"', content: ''},
      {rel: 'property="og:url"', name: 'property="og:url"', content: ''},
      {rel: 'property="og:type"', name: 'property="og:type"', content: 'website'},
      {rel: 'property="og:locale"', name: 'property="og:locale"', content: 'en_US'},
    ];
  }

  updateName(index: number) {
    if (this.model[index] && this.model[index].rel.includes('og:')) {
      this.model[index].name = this.model[index].rel;
    }
  }

  addRow() {
    this.model.push({rel: 'blank', name: '', content: ''});
  }

  removeRow(index: number) {
    this.model.splice(index, 1);
  }


  get googleTitleIndex(){
    return this.model.findIndex(i => i.rel === 'blank' && i.name ==='title')
  }
  get googleDescriptionIndex(){
    return this.model.findIndex(i => i.rel === 'blank' && i.name ==='description')
  }

  get ogSiteNameIndex(){
    return this.model.findIndex(i => i.rel.includes('og:site_name'))
  }
  get ogTitleIndex(){
    return this.model.findIndex(i => i.rel.includes('og:title'))
  }
  get ogDescriptionIndex(){
    return this.model.findIndex(i => i.rel.includes('og:description'))
  }
  get ogImageIndex(){
    return this.model.findIndex(i => i.rel.includes('og:image'))
  }
  get ogUrlIndex(){
    return this.model.findIndex(i => i.rel.includes('og:url'))
  }
  get ogTypeIndex(){
    return this.model.findIndex(i => i.rel.includes('og:type'))
  }
  get ogLocaleIndex(){
    return this.model.findIndex(i => i.rel.includes('og:locale'))
  }

  get customTags(){
    return this.model.filter(i => i.rel === 'blank' && i.name !== 'title' && i.name !== 'description')
  }
}
</script>

<style scoped>

.hr-border {
  height: 1px;
  background-color: #d3d3d3;
  border: none;
}
.x-input {
  border: none; 
  background-color: white;
  padding: 11px;
}
.x-input:focus {
  outline: none 
}


.x-gray-input {
  border: none; 
  background-color: rgb(233, 233, 233);
  padding: 11px;
}
.x-gray-input:focus {
  outline: none 
}
</style>
