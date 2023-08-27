<template>
  <v-menu v-model="showMenu" absolute offset-y style="max-width: 600px">
    <template v-slot:activator="{ on, attrs }">
      <span class="d-flex">
        <v-img :src="url" max-width="64" max-height="64" />
        <v-icon class="ma-1" v-on="on" v-bind="attrs">mdi-dots-vertical</v-icon>
      </span>
    </template>

    <v-list dense>
      <v-list-item link :href="url" target="_blank">
        <v-list-item-icon>
          <v-icon> mdi-open-in-new</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> Open in new tab </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="toClipboard(url)">
        <v-list-item-icon>
          <v-icon> mdi-clipboard-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> Copy url to clipboard </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import toClipboard from "@/utils/toClipboard";

@Component
export default class TableImagePreview extends Vue {
  @Prop(String) readonly url!: string;

  toClipboard = toClipboard;

  showMenu: boolean = false;
}
</script>
