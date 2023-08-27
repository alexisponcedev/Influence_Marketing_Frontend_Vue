<template>
  <table-reorderable
    v-if="reorderMode"
    :items="items"
    :config="config"
    @submit="onReOrder"
  >
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="item">
      <slot :name="name" v-bind="item" />
    </template>
  </table-reorderable>
  <table-grid
    v-else-if="gridMode"
    :items="items"
    :config="config"
    :search="search"
    v-on="$listeners"
    :loading="loading"
    :gridOnly="gridOnly"
    @click:row="clickRow"
    :gridCenter="gridCenter"
    @showListView="gridMode = false"
  />
  <div v-else>
    <v-card-title>
      <v-text-field
        v-if="search"
        single-line
        hide-details
        label="Search"
        append-icon="mdi-magnify"
        v-model="internalSearchQuery"
      />
      <v-spacer />
      <v-spacer />
      <v-btn
        v-if="grid"
        small
        outlined
        class="mx-1"
        color="secondary"
        @click="gridMode = true"
      >
        <v-icon left v-html="'mdi-view-grid'" />
        Grid View
      </v-btn>
      <v-btn
        v-if="!!config.showedHeaders"
        small
        outlined
        class="mx-1"
        color="secondary"
        @click="showCustomizeViewModal()"
      >
        <v-icon left v-html="'mdi-view-column-outline'" />
        Customize View
      </v-btn>
      <v-btn
        v-if="reorderable"
        small
        class="mx-1"
        outlined
        @click="reorderMode = true"
      >
        <v-icon left v-html="'mdi-order-numeric-ascending'" />
        Reorder
      </v-btn>
      <v-btn
        v-if="exportable"
        small
        outlined
        class="mx-1"
        color="secondary"
        @click="exportCSV()"
      >
        <v-icon left>mdi-download</v-icon>
        Export CSV
      </v-btn>
      <v-menu
        v-for="(globalAction, index) in config.globalActions"
        :key="index"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            v-on="on"
            class="mx-1"
            v-bind="attrs"
            :to="globalAction.to"
            :color="globalAction.color"
            :class="globalAction.class"
            @click="
              !(globalAction.childs && globalAction.childs.length) &&
              globalAction.action
                ? $emit(globalAction.action, globalAction.payload)
                : undefined
            "
          >
            <v-icon
              v-if="globalAction.childs && globalAction.childs.length"
              left
            >
              mdi-chevron-down
            </v-icon>
            <v-icon v-else-if="globalAction.icon" :left="!!globalAction.text">
              {{ globalAction.icon }}
            </v-icon>
            {{ globalAction.text }}
          </v-btn>
        </template>
        <v-list dense v-if="globalAction.childs && globalAction.childs.length">
          <v-list-item
            v-for="(child, index) in globalAction.childs"
            style="cursor: pointer"
            :key="index"
          >
            <v-list-item-icon v-if="child.icon" class="mr-2">
              <v-icon small v-text="child.icon" />
            </v-list-item-icon>
            <v-list-item-content
              @click="
                child.to
                  ? $router.push(child.to)
                  : child.action
                  ? $emit(child.action, child.payload)
                  : undefined
              "
            >
              <v-list-item-title>
                {{ child.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        v-if="selectedRows.length"
        small
        outlined
        class="mx-1"
        color="danger"
        @click="
          $emit('submitSelectedRows', selectedRows);
          selectedRows = [];
        "
      >
        <v-icon left v-html="selectButtonIcon" />
        {{ selectButtonText }} {{ selectedRows.length }} item
      </v-btn>
    </v-card-title>
    <v-dialog v-model="customizeViewShow" max-width="300">
      <v-card>
        <v-card-title>
          Customize Table View
          <v-spacer />
          <v-btn icon @click="customizeViewShow = false">
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div
            v-for="header in config.headers.filter(
              (header) => header.value != 'actions'
            )"
            :key="header.value"
          >
            <v-checkbox
              v-model="config.showedHeaders"
              :value="header.value"
              :label="header.text"
              hide-details
            />
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-data-table
      item-key="id"
      :items="items"
      :headers="headers"
      :loading="loading"
      @click:row="clickRow"
      v-model="selectedRows"
      :show-expand="showExpand"
      :show-select="showSelect"
      :disable-sort="disableSort"
      :options.sync="optionsSync"
      :server-items-length="total"
      :single-expand="singleExpand"
      :single-select="singleSelect"
      :search="externalSearch ? undefined : internalSearchQuery"
      :footer-props="{ 'items-per-page-options': itemsPerPageOptions }"
    >
      <template v-slot:[`item.thumbnail`]="{ item }">
        <table-image-preview :url="item.thumbnail" />
      </template>
      <template v-slot:[`item.image`]="{ item }">
        <table-image-preview :url="item.image" />
      </template>
      <template v-slot:[`item.logo`]="{ item }">
        <table-image-preview :url="item.logo" />
      </template>
      <template v-slot:[`item.media.url`]="{ item }">
        <table-image-preview v-if="item.media" :url="item.media.url" />
      </template>
      <template
        v-for="header in config.headers.filter((header) => !!header.valueFunc)"
        v-slot:[getSlotName(header.value)]="{ item }"
      >
        {{ header.valueFunc(item) }}
      </template>
      <template
        v-if="config.actions"
        v-slot:[`item.actions`]="{ item, itemIndex }"
      >
        <div style="display: flex" @click.stop.prevent="() => {}">
          <template
            v-for="(action, actionIndex) in config.actions"
            @click="null"
          >
            <v-btn
              v-if="action.to"
              small
              class="ml-1"
              :icon="!action.text"
              :text="!!action.text"
              :outlined="!!action.text"
              :to="getActionTo(action.to, item)"
              :key="'1-' + itemIndex + '-' + actionIndex"
            >
              <v-icon :left="!!action.text" small>
                {{ action.icon }}
              </v-icon>
              {{ action.text }}
            </v-btn>
            <v-btn
              v-else
              small
              class="ml-1"
              target="_blank"
              :icon="!action.text"
              :text="!!action.text"
              :outlined="!!action.text"
              :key="'2-' + itemIndex + '-' + actionIndex"
              @click.stop="action.onClick ? action.onClick(item) : null"
              :href="action.href ? getProperty(item, action.href) : null"
            >
              <v-icon :left="!!action.text" small>
                {{ action.icon }}
              </v-icon>
              {{ action.text }}
            </v-btn>
          </template>
        </div>
      </template>
      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="item">
        <slot :name="name" v-bind="item" />
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import exportCSVFile from "@/utils/exportCSVFile";
import { IIndexable } from "@/utils/IIndexable";
import {
  Vue,
  Prop,
  Emit,
  Watch,
  PropSync,
  Component,
} from "vue-property-decorator";

@Component
export default class StandardTable extends Vue {
  @Prop({ default: true }) readonly search!: Boolean;
  @Prop(Boolean) readonly externalSearch!: Boolean;
  @Prop(Boolean) readonly singleExpand!: Boolean;
  @Prop(Boolean) readonly singleSelect!: Boolean;
  @Prop(Boolean) readonly disableSort!: Boolean;
  @Prop(Boolean) readonly reorderable!: Boolean;
  @Prop(Boolean) readonly showSelect!: Boolean;
  @Prop(Boolean) readonly exportable!: Boolean;
  @Prop(Boolean) readonly gridCenter!: Boolean;
  @Prop(Boolean) readonly showExpand!: Boolean;
  @Prop(Boolean) readonly gridOnly!: Boolean;
  @Prop(Boolean) readonly loading!: Boolean;
  @Prop(Boolean) readonly grid!: Boolean;
  @Prop(Array) readonly items!: Array<Object>;
  @Prop(Number) readonly total!: Number;
  @Prop({ default: "mdi-delete", type: String })
  readonly selectButtonIcon!: String;
  @Prop({ default: "Remove", type: String }) readonly selectButtonText!: String;
  @PropSync("options", { type: Object }) readonly optionsSync!: Object;
  @PropSync("searchQuery", { type: String, default: "" })
  searchQuerySync!: string;
  @Prop({ default: () => [5, 10, 15, -1] })
  readonly itemsPerPageOptions!: Array<number>;
  @Prop(Object) readonly config!: {
    globalActions?: Array<{
      to?: string;
      text?: string;
      icon?: string;
      payload?: any;
      class?: string;
      color?: string;
      action?: string;
      childs?: Array<{
        to?: string;
        text?: string;
        icon?: string;
        payload?: any;
        action?: string;
      }>;
    }>;
    actions?: Array<{
      type?: string;
      text?: string;
      icon?: string;
      href?: string;
      onClick: any;
      to?: string;
    }>;
    headers?: Array<{
      text: string;
      value: string;
      sortable?: Boolean;
      searchable?: Boolean;
      valueFunc?: (item: any) => string;
    }>;
    showedHeaders?: Array<string>;
    grid?: {
      image: string | ((item: any) => string);
      title: string | ((item: any) => string);
      subtitle?: string | ((item: any) => string);
      chips?: Array<string | ((item: any) => string)>;
    };
  };

  customizeViewShow: Boolean = false;
  reorderMode: Boolean = false;
  gridMode: Boolean = false;
  selectedRows: Array<any> = [];
  internalSearchQuery: string = "";

  mounted() {
    if (this.grid) this.gridMode = true;
  }

  get headers() {
    return this.config.showedHeaders
      ? [
          ...this.config.headers!.filter((header) =>
            this.config.showedHeaders?.includes(header.value)
          ),
          ...this.config.headers!.filter((header) => header.value == "actions"),
        ]
      : this.config.headers;
  }

  getActionTo(to?: string, item?: any) {
    if (!to) return undefined;
    const myRegexp = new RegExp(/\[(.*?)\]/, "g");
    let match = myRegexp.exec(to);
    let result = to;
    while (match != null) {
      result = result.replaceAll(match[0], (item as IIndexable)[match[1]]);
      match = myRegexp.exec(to);
    }
    return result;
  }

  @Emit("click:row")
  clickRow(event: any) {
    return event;
  }

  @Emit("onReOrder")
  onReOrder(e: any) {
    this.reorderMode = false;
    return e;
  }

  getSlotName(value: string) {
    return ["item", value].join(".");
  }

  showCustomizeViewModal() {
    this.customizeViewShow = true;
  }

  exportCSV() {
    exportCSVFile(
      this.config.headers?.reduce((accumulator, header) => {
        return { ...accumulator, [header.value]: header.text };
      }, {}),
      this.items.map((item) => {
        const result = {};
        this.config.headers?.forEach((header) => {
          (result as IIndexable)[header.value] = !!header.valueFunc
            ? header.valueFunc(item)
            : this.getProperty(item, header.value);
        });
        return result;
      })
    );
  }

  @Watch("internalSearchQuery")
  searchQueryChanged(newQuery: any) {
    this.searchQuerySync = newQuery;
  }

  getProperty(object: Object, path: String) {
    var parts = path.split("."),
      length = parts.length,
      i,
      property = object || this;

    for (i = 0; i < length; i++) {
      if ((property as IIndexable)[parts[i]] == undefined)
        if (i != length - 1) (property as IIndexable)[parts[i]] = {};
      property = (property as IIndexable)[parts[i]];
    }

    return property;
  }
}
</script>
