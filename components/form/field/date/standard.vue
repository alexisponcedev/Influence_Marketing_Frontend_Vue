<template>
  <v-col class="py-0" v-bind="field.colAttrs">
    <label v-if="field.label">
      {{ field.label }}
    </label>
    <v-text-field
      readonly
      v-model="displayDate"
      type="text"
      :outlined="outlined"
      :rules="field.rules"
      @click="show = true"
      :hide-details="hideDetails"
      @click:append="show = true"
      :placeholder="field.placeholder"
    />
    <date-picker
      :type="type"
      :locale="locale"
      :show="show"
      :color="color"
      v-model="date"
      append-to="body"
      class="display-none"
      :format="dateFormat"
      @input="updateValue"
      @close="show = false"
    />
  </v-col>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { FormField } from "@/models";
import formatDate from "@/utils/format/date";

@Component
export default class StandardDateFormField extends Vue {
  @VModel() model!: string;
  @Prop({ default: () => <Object>{} }) readonly field!: FormField;

  @Prop({ default: "en" }) readonly locale!: string;
  @Prop({ default: "#304156" }) readonly color!: string;
  @Prop({ default: "outlined" }) readonly outlined!: string;
  @Prop({ default: "date" }) readonly type!: "date" | "datetime" | "year";
  @Prop({ default: false }) readonly hideDetails!: string;
  @Prop({ default: "YYYY/MM/DD" }) readonly dateFormat!: string;
  @Prop({ default: "YYYY/MM/DD" }) readonly displayDateFormat!: string;

  date: string = "";
  displayDate: string = "";
  show: boolean = false;

  mounted() {
    if (this.model && this.model.length) {
      this.updateDate();
      this.updateValue(this.date);
    } else {
      this.date = "";
      this.displayDate = "";
    }
  }

  updateValue(newValue: string, _?: string) {
    this.model = formatDate(newValue, this.dateFormat);
  }

  @Watch("model")
  valueUpdated() {
    this.updateDate();
  }

  updateDate() {
    if (this.model && this.model.length) {
      this.date = this.model;
      this.displayDate = formatDate(this.date, this.displayDateFormat);
    } else {
      this.date = "";
      this.displayDate = "";
    }
  }
}
</script>
