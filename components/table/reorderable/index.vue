<template>
  <div>
    <v-card-title>
      <v-spacer />
      <v-btn color="success" @click="submit">
        <v-icon left v-html="'mdi-check'" />
        Apply
      </v-btn>
    </v-card-title>
    <v-data-table item-key="id" :headers="headers" :items="items">
      <template #body="props">
        <draggable
          tag="tbody"
          :list="props.items"
          @end="onDropCallback(props.items, $event)"
        >
          <table-reorderable-row-handler
            v-for="(item, index) in props.items"
            :key="index"
            :item="item"
            :headers="headers"
          >
            <template v-slot:[`item.thumbnail`]="{ item }">
              <v-img :src="item.thumbnail" max-height="64" max-width="64" />
            </template>
            <template v-slot:[`item.image`]="{ item }">
              <v-img :src="item.image" max-height="64" max-width="64" />
            </template>
            <template
              v-for="header in config.headers.filter(
                (header) => !!header.valueFunc
              )"
              v-slot:[getSlotName(header.value)]="{ item }"
            >
              {{ header.valueFunc(item) }}
            </template>
            <template
              v-for="(index, name) in $scopedSlots"
              v-slot:[name]="data"
            >
              <slot :name="name" v-bind="data"></slot>
            </template>
          </table-reorderable-row-handler>
        </draggable>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class ReOrderableTable extends Vue {
  @Prop(Array) readonly items!: Array<Object>;
  @Prop(Object) readonly config!: {
    headers?: Array<{
      text: string;
      value: string;
      sortable?: Boolean;
      searchable?: Boolean;
      valueFunc?: (item: any) => string;
    }>;
    showedHeaders?: Array<string>;
  };

  get headers() {
    const result = this.config.showedHeaders
      ? this.config.headers?.filter((header) =>
          this.config.showedHeaders?.includes(header.value)
        )
      : this.config.headers;
    return result?.map((header) => {
      const result: any = { ...header };
      result.sortable = false;
      return result;
    });
  }

  onDropCallback(items: Array<any>, evt: any) {
    let order = 0;
    items.forEach((item) => (item.order = ++order));
  }

  getSlotName(value: string) {
    return ["item", value].join(".");
  }

  @Emit("submit")
  submit() {
    return this.items.map(
      (item: any) =>
        <Object>{
          record_id: item.id,
          order: item.order,
        }
    );
  }
}
</script>
