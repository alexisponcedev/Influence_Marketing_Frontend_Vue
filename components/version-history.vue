<template>
  <v-navigation-drawer
    width="320"
    v-model="drawer"
    absolute
    temporary
    right
  >


    <div class="tw-p-3">
      <h6>Version Histories</h6>

      <ul class=" tw-list-none tw-pl-0 tw-space-y-2" style="padding-left : 0;">

        <li v-for="history in histories" :key="history.id"
            :class="{'tw-bg-white tw-border-gray-600' : selected.id === history.id}"
            class="tw-text-sm tw-transition tw-duration-300 tw-border tw-border-solid tw-border-white tw-bg-gray-50 tw-p-3 tw-rounded-lg tw-cursor-pointer">

          <div class="tw-flex tw-items-center tw-space-x-2">

            <div class="tw-flex-1"  @click="select(history)">
              <div class="tw-w-full tw-text-left">
                <span v-if="history.name" class="tw-font-semibold">{{ history.name }}</span>
                <span v-else class="tw-text-gray-500">Unnamed</span>
              </div>
              <div class="tw-mt-1 tw-text-gray-500">{{ history.created_at }}</div>
            </div>

            <div v-if="history.id === selected.id">
              <button @click.self="preview" class="">preview</button>
            </div>


          </div>

        </li>

      </ul>
    </div>


  </v-navigation-drawer>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";

@Component({
  components: {}
})
export default class VersionHistory extends Vue {
  @VModel({type: Object}) model!: any

  drawer = true;

  selected: any = {};

  histories = [{
    id: 1,
    name: 'Summer 2022',
    widgets: [{name: "Sample", title: "Sample Component", structure: {}, image: "sample.png", category: 'ImageBox',}],
    created_at: '11/17/2022 11:50:40',
    updated_at: '11/17/2022 11:50:40'
  }, {
    id: 2,
    name: '',
    widgets: [{name: "Sample", title: "Sample Component", structure: {}, image: "sample.png", category: 'ImageBox',}],
    created_at: '11/17/2022 12:15:40',
    updated_at: '11/17/2022 12:15:40'
  }]

  open() {
    this.drawer = true;
  }
  close(){
    this.drawer = false;
  }

  select(history: any) {
    this.selected = history;
  }

  preview(history : any){
    this.model = history.widgets;
    this.close();
  }

}
</script>
