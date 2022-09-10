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
    :loading="loading"
    :gridOnly="gridOnly"
    @click:row="clickRow"
    @showListView="gridMode = false"
  />
  <div v-else>
    <v-card-title>
      <v-text-field
        v-if="search"
        single-line
        hide-details
        label="Search"
        v-model="searchQuery"
        append-icon="mdi-magnify"
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
      <v-btn
        small
        class="mx-1"
        v-if="config.globalActions && config.globalActions.length == 1"
        :color="config.globalActions[0].color"
        @click="
          config.globalActions[0].action
            ? $emit(config.globalActions[0].action)
            : undefined
        "
        :to="config.globalActions[0].to"
      >
        <v-icon v-if="config.globalActions[0].icon" left>
          {{ config.globalActions[0].icon }}
        </v-icon>
        {{ config.globalActions[0].text }}
      </v-btn>
    </v-card-title>
    <v-dialog v-model="customizeViewShow" max-width="300">
      <v-card>
        <v-card-title> Customize Table View </v-card-title>
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
      :loading="loading"
      :items="items"
      :search="searchQuery"
      :headers="headers"
      :show-select="showSelect"
      :single-select="singleSelect"
      :options.sync="optionsSync"
      :server-items-length="total"
      @click:row="clickRow"
      :footer-props="{ 'items-per-page-options': itemsPerPageOptions }"
    >
      <template v-slot:[`item.thumbnail`]="{ item }">
        <v-img :src="item.thumbnail" max-height="64" max-width="64" />
      </template>
      <template v-slot:[`item.image`]="{ item }">
        <v-img :src="item.image" max-height="64" max-width="64" />
      </template>
      <template v-slot:[`item.logo`]="{ item }">
        <v-img :src="item.logo" max-height="64" max-width="64" />
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
              :icon="!action.text"
              :text="!!action.text"
              :outlined="!!action.text"
              :to="getActionTo(action.to, item)"
              :key="'1-' + itemIndex + '-' + actionIndex"
            >
              <v-icon small>
                {{ action.icon }}
              </v-icon>
              {{ action.text }}
            </v-btn>
            <v-btn
              v-else
              small
              :icon="!action.text"
              :text="!!action.text"
              :outlined="!!action.text"
              @click.stop="action.onClick(item)"
              :key="'2-' + itemIndex + '-' + actionIndex"
            >
              <v-icon small>
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
import { Vue, Component, Prop, PropSync, Emit } from "vue-property-decorator";
import exportCSVFile from "@/utils/exportCSVFile";
import { IIndexable } from "@/utils/IIndexable";

@Component
export default class StandardTable extends Vue {
  @Prop({ default: true }) readonly search!: Boolean;
  @Prop(Boolean) readonly singleSelect!: Boolean;
  @Prop(Boolean) readonly showSelect!: Boolean;
  @Prop(Boolean) readonly reorderable!: Boolean;
  @Prop(Boolean) readonly exportable!: Boolean;
  @Prop(Boolean) readonly gridOnly!: Boolean;
  @Prop(Boolean) readonly loading!: Boolean;
  @Prop(Boolean) readonly grid!: Boolean;
  @Prop(Array) readonly items!: Array<Object>;
  @Prop(Number) readonly total!: Number;
  @PropSync("options", { type: Object }) readonly optionsSync!: Object;
  @Prop({ default: () => [5, 10, 15, -1] })
  readonly itemsPerPageOptions!: Array<number>;
  @Prop(Object) readonly config!: {
    globalActions?: Array<{
      text?: string;
      color?: string;
      action?: string;
    }>;
    actions?: Array<{
      type?: string;
      text?: string;
      icon?: string;
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

  searchQuery = "";
  customizeViewShow: Boolean = false;
  reorderMode: Boolean = false;
  gridMode: Boolean = false;

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
