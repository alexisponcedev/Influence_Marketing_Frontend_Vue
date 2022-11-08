<template>
  <div class="tw-p-20">
    <editor v-model="content"/>
  </div>
</template>

<script>

export default {
  data() {
    return {
      content: '<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>',
    }
  },
}
</script>
<style lang="scss" scoped>
strong{
  font-weight: bold !important;
}
</style>
