<template>
  <div class="tw-p-20">

    <form-field-tags v-model="tags" />

    <pre>{{tags}}</pre>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tags : 'a,b,d,e,f,title2,title3',
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
