<template>
  <UserForm edit-mode profile />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import UserForm from "./add.vue";

@Component({ layout: "panel", components: { UserForm } })
export default class Profile extends Vue {}
</script>
