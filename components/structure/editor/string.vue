<template>
  <form-field-text :field = "field" v-model="item.value" />
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";

@Component
export default class PageContent extends Vue {
  @VModel({ type: Object }) item!: Object

  field = {
    label : 'Filed',
    rules : [],
    colAttrs : {cols : 12}
  }

  mounted(){
    this.field.label = this.item.title ?? 'field';
  }
}
</script>
