import Vue from 'vue';
export const EventBus = new class {
  constructor() {
    this.vue = new Vue();
  }
  fire(event, data = {} ) {
    this.vue.$emit(event, data);
  }
  listen(event, callback) {
    this.vue.$on(event, callback);
  }
  remove(event){
    this.vue.$off(event);
  }
}
