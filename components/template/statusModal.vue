<template>
    <v-dialog v-model="showSynced" max-width="800px">
        <v-card>
            <v-card-title>
                Template Status
                <v-spacer />
                <v-btn icon @click="showSynced = false">
                    <v-icon>mdi-window-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <form-field-text
                    ref="search"
                    v-model="searchTerm"
                    :field="searchField"
                />
            </v-card-text>
            <v-card-text>
                <div v-for="(template, index) in data" :key="index">
                    <v-row justify="space-between" align="center" class="mx-0">
                        <p class="mb-0">{{ template.name }}</p>
                        <v-checkbox
                            :value="template.status !== null"
                            @click="() => submitStatus(template.id)"
                        />
                    </v-row>
                    <v-divider v-if="index !== data.length - 1"></v-divider>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Watch } from "vue-property-decorator";
import Validation from "@/utils/validation";
import { FormField } from "@/models";
import { Api, AppStore } from "@/store";

@Component
export default class TemplateStatusModal extends Vue {
    @PropSync("show", { type: Boolean }) showSynced!: Boolean;

    forceUpdateIndex: number = 0;

    Validation = Validation;

    Api = Api;

    data: any = [];

    searchTerm = "";

    searchField = {
        rules: [Validation.required],
        label: "Search",
        colAttrs: { cols: 12 },
        items: () => Api.Template.all,
        "item-value": "id",
        "item-text": "name",
    };

    mounted() {
        this.init();
    }

    async init() {
        if (!Api.Template.all.length) this.data = await Api.Template.getAll();
    }

    submitStatus(_id: number) {
        Api.Template.updateStatus(_id).then(() => Api.Template.getAll());
    }

    @Watch("show")
    getData() {
        this.init();
    }

    @Watch("searchTerm")
    searchItems() {
        if (this.searchTerm.length) {
            this.data = Api.Template.all.filter((item) => {
                if (item.name)
                    return item.name
                        .toLowerCase()
                        .includes(this.searchTerm.toLowerCase());
            });
        } else this.data = Api.Template.all;
    }
}
</script>
