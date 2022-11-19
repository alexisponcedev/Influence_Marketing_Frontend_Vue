<template>
    <span class="" dir="ltr"> {{ getDateTime }} </span>
</template>

<script>

export default {
    props: {
        value: {type: String, default: ''},
        timezone: {type: String, default: 'UTC'},
        inFormat: {type: String, default: 'MM/DD/YYYY HH:mm:ss'},
        outFormat: {type: String, default: 'MM/DD/YYYY HH:mm:ss'},
        locale: {type: String, default: 'en-US'},
    },
    computed: {
        getDateTime() {
            let d = (new Date(this.value))
            return d.toLocaleDateString(this.locale) + ' ' + d.toLocaleTimeString(this.locale);
        }
    }
}
</script>
