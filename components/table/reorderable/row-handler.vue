<template>
  <tr>
    <td v-for="(header, index) in headers" :key="index">
      <slot :item="item" :name="columnName(header)">
        <div v-text="getNonSlotValue(item, header)" />
      </slot>
    </td>
  </tr>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { IIndexable } from "@/utils/IIndexable";

@Component
export default class ReOrderableTableRowHandler extends Vue {
  @Prop({ default: () => <Object>{} }) readonly item!: Object;
  @Prop({ default: () => [] }) readonly headers!: Array<any>;

  columnName(header: any) {
    return `item.${header.value}`;
  }

  getNonSlotValue(item: any, header: any) {
    var path = header.value,
      parts = path.split("."),
      length = parts.length,
      i,
      property = item || this;

    for (i = 0; i < length; i++) {
      if ((property as IIndexable)[parts[i]] == undefined)
        if (i != length - 1) (property as IIndexable)[parts[i]] = {};
      property = (property as IIndexable)[parts[i]];
    }
    return property || "";
  }
}
</script>
