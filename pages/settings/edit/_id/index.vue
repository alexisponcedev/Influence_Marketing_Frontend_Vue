<template>
    <EntityForm edit-mode/>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import EntityForm from "../../add.vue";

@Component({
    layout: "panel",
    components: {
        EntityForm,
    },
})
export default class editEntity extends Vue {
}
</script>
