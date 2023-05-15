<template>
    <div :class="`tw-p-2 tw-rounded-lg${model.hidden ? ' tw-hidden' : '' }`">
        <h6 style="margin-bottom: 3px">{{ model.title }}</h6>
        <div class="tw-mb-4">
            <draggable v-model="model.value" group="blocks" @start="drag=true" @end="drag=false">
                <div class="tw-border tw-border-gray-200 tw-rounded-lg tw-border-solid tw-mb-4"
                     v-for="(fields , index) in model.value" :key="`${key}-${index}`">
                    <div class="tw-flex tw-items-center tw-justify-between tw-cursor-pointer"
                         @click="open = open === index ? open = -1 : index">
                        <h6 class="tw-mx-2.5 tw-my-1">Item {{ index + 1 }}</h6>
                        <button class="tw-p-2" @click="removeItem(index)">
                            <v-icon small>mdi-delete</v-icon>
                        </button>
                    </div>
                    <structure-editor v-if="index === open"
                                      :key="model.title + model.id"
                                      :simple="true"
                                      :value="fields"
                                      @input="v => fields = v"/>
                </div>
            </draggable>

        </div>
        <button class="tw-text-center tw-px-3 tw-font-bold tw-py-3 tw-rounded-lg tw-bg-green-300 tw-w-full"
                @click="addNew">
            Add new item
        </button>
    </div>

</template>

<script lang="ts">
import {Vue, Component, VModel, Prop} from "vue-property-decorator";

@Component
export default class StructureListEditor extends Vue {
    @VModel({type: Array}) model!: any

    field = {
        label: 'Filed',
        rules: [],
        colAttrs: {cols: 12}
    }

    open: number = -1;

    key = Math.round(Math.random() * 100000);

    mounted() {
        this.field.label = this.model.title ?? 'field';
    }

    addNew() {
        this.model.value.push(JSON.parse(JSON.stringify(this.model.newItem)));
        this.open = this.model.value.length - 1;
    }

    removeItem(i: any) {
        this.model.value.splice(i, 1);
    }
}
</script>
