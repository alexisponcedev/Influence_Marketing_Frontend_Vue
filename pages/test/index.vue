<template>
    <div class="tw-p-20">


        <input type="text" v-model="str" />

        <hr>

        <pre>{{ str }}</pre>
        <pre>{{ safeString(str) }}</pre>
    </div>
</template>

<script>

import safeString from "~/utils/safeString";

export default {
    data() {
        return {
            str : "",
            tags: 'a,b,d,e,f,title2,title3',
            content: '<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>',
        }
    },
    methods:{
        safeString : safeString
    }
}
</script>
<style lang="scss" scoped>
strong {
    font-weight: bold !important;
}
</style>
