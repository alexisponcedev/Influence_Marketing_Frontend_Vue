<template>
    <div class="">
        <div
            class="tw-flex tw-items-center tw-w-full tw-justify-between tw-p-3"
            v-if="!simple"
        >
            <h6>{{ title }}</h6>
            <button @click="close">
                <v-icon>mdi-close</v-icon>
            </button>
        </div>

        <component
            :is="`structure-editor-${structure[key].type}`"
            v-for="(key, index) in structureKeys.filter((i) => i.type !== null)"
            v-model="structure[key]"
            :key="index"
        />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Emit } from "vue-property-decorator";
import { StructureField } from "@/interfaces/StructureField";

@Component
export default class StructureEditor extends Vue {
    @Prop(String) readonly title: string | undefined;
    @Prop({ type: Boolean, default: false }) readonly simple:
        | boolean
        | undefined;
    @VModel() structure!: StructureField | any;

    @Emit("close")
    close() {
        this.$emit("close");
    }

    get structureKeys() {
        return this.structure
            ? // Object.keys(this.structure)
              Object.entries(this.structure)
                  .sort((a: any, b: any) => {
                      if (a[1].id < b[1].id) return -1;
                      else if (a[1].id > b[1].id) return 1;
                      return 0;
                  })
                  .map((i) => i[0])
            : [];
    }
}
</script>
