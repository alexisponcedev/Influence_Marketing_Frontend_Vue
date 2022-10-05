<template>
  <div class="tw-container tw-mx-auto">
    <div class="tw-bg-red-50 tw-py-10 tw-mx-auto tw-flex tw-justify-center tw-items-center">

      <pre>{{file}}</pre>
      <structure-editor-image v-model="file"/>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      file : {
        title : 'test',
        value : null,
        src : '',
        alt : '',
      }
    }
  },

}
</script>
