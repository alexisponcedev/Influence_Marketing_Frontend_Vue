<template>
    <div class="tw-space-y-2">
        <draggable v-model="model" group="menu-socials" class="tw-space-y-2">
            <div v-for="(item, index) in model" :key="index">
                <v-row v-if="editing === index" align="start">
                    <form-field-select-social
                        :field="selectField"
                        v-model="item.name"
                        :rules="[]"
                        placeholder="select social media"
                    />
                    <form-field-text :field="textField" v-model="item.url" />

                    <v-col justify="center">
                        <v-btn icon elevation="0" text @click="confirm">
                            <v-icon class="red--text"> mdi-check </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <div
                    v-else
                    class="tw-flex tw-items-center tw-justify-between tw-bg-gray-50 tw-rounded-xl tw-p-4"
                >
                    <div
                        class="tw-text-base tw-flex tw-items-center tw-justify-start tw-space-x-2 tw-w-72"
                    >
                        <span
                            style="font-size: 20px"
                            :class="`socicon socicon-${item.name}`"
                        />
                        <span>
                            {{ item.name }}
                        </span>
                    </div>
                    <div class="tw-flex-1">{{ item.url }}</div>
                    <div class="tw-flex tw-items-center tw-space-x-4">
                        <button @click="edit(index)">
                            <v-icon small class="gray--text">
                                mdi-pencil
                            </v-icon>
                        </button>
                        <button @click="remove(index)">
                            <v-icon small class="red--text">
                                mdi-delete
                            </v-icon>
                        </button>
                    </div>
                </div>
            </div>
        </draggable>

        <button
            @click="addNew"
            class="tw-border tw-border-dashed tw-bg-gray-50 tw-border-gray-200 tw-rounded-xl tw-text-center tw-p-3 hover:tw-bg-gray-200"
        >
            Add New Item
        </button>
    </div>
</template>
<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";

@Component
export default class MenuSocialsEditor extends Vue {
    @VModel({ type: Array }) model!: any;

    editing: number = -1;
    pages: Array<any> = [];

    textField = {
        label: "",
        placeholder: "enter name",
        rules: [],
        colAttrs: { cols: 7 },
    };

    selectField = {
        label: "",
        placeholder: "Enter page name",
        "item-text": "title",
        "item-value": "value",
        rules: [],
        colAttrs: { cols: 4 },
    };

    edit(index: number) {
        this.editing = index;
    }

    remove(index: number) {
        this.model.splice(index, 1);
        this.$forceUpdate();
    }

    addNew() {
        this.model.push({
            id: this.model.length + 1,
            name: "facebook",
            url: "https://facebook.com/",
        });
        this.edit(this.model.length - 1);
        this.$emit("addItem");
    }

    confirm() {
        this.editing = -1;
    }
}
</script>
