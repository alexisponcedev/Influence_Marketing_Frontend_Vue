<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-tabs background-color="transparent">
          <v-tab>All Users</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <im-table-users />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ layout: "panel" })
export default class AllUser extends Vue {}
</script>
