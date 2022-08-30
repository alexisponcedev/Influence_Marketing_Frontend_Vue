<template>
  <div class="mb-2" v-if="locations && locations.length > 1">
    <h5>
      <router-link
        text
        class="ml-2"
        :to="locations.slice(-1)[0].to"
        v-text="locations.slice(-1)[0].title"
      />
    </h5>
    <small>
      <span v-for="(location, index) in locations" :key="index">
        <router-link class="mx-2" :to="location.to" v-text="location.title" />
        <template v-if="index != locations.length - 1">
          >
        </template>
      </span>
    </small>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Breadcrumbs extends Vue {
  @Prop(Array) readonly locations!: Array<{ title: string; to: string }>;
}
</script>
