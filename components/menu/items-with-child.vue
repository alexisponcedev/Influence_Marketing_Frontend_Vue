<template>
    <v-container fluid>
        <v-btn
            outlined
            color="primary"
            class="float-right"
            @click="addNewChild(model.childs)"
        >
            Add Column
        </v-btn>
        <v-tabs
            show-arrows
            v-model="selectedChild"
            background-color="transparent"
        >
            <v-tab
                v-for="(child, index) in model.childs"
                :href="`#child-${index}`"
            >
                {{ child.header.title }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="selectedChild">
            <v-tab-item
                v-for="(child, index) in model.childs"
                :value="`child-${index}`"
            >
                <v-container fluid>
                    <v-row>
                        <v-col>
                            <v-btn
                                icon
                                color="danger"
                                class="float-right"
                                @click="deleteChild(model.childs, index)"
                            >
                                <v-icon> mdi-delete </v-icon>
                            </v-btn>
                            <structure-editor-url
                                :has-background="false"
                                :inline="true"
                                v-model="child.header"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <div
                                class="tw-pl-6 tw-mt-4"
                                v-if="
                                    withProducts &&
                                    child.hasOwnProperty('products')
                                "
                            >
                                <div
                                    class="tw-flex tw-items-center tw-space-x-3 tw-p-2"
                                >
                                    <div class="tw-text-blue-400">
                                        <span>Products</span>
                                    </div>
                                </div>
                                <menu-products v-model="child.products" />
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card
                                outlined
                                class="mb-8 pa-4"
                                v-for="(subChild, j) in child.childs"
                                :key="`option_${j}`"
                            >
                                <v-row>
                                    <v-col>
                                        <v-btn
                                            icon
                                            color="danger"
                                            class="float-right"
                                            @click="
                                                deleteChild(child.childs, j)
                                            "
                                        >
                                            <v-icon> mdi-delete </v-icon>
                                        </v-btn>
                                        <structure-editor-url
                                            :has-background="false"
                                            :inline="true"
                                            v-model="subChild.header"
                                        />
                                    </v-col>
                                </v-row>
                                <menu-items v-model="subChild.childs" />
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <V-col>
                            <button
                                @click="addNewChild(child.childs)"
                                class="tw-border tw-border-dashed tw-bg-blue-50 hover:tw-bg-blue-200 tw-border-gray-200 tw-rounded-xl tw-text-center tw-p-3"
                            >
                                Add New Section
                            </button>
                        </V-col>
                    </v-row>
                </v-container>
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>
<script lang="ts">
import { Vue, Component, VModel, Watch, Prop } from "vue-property-decorator";

@Component
export default class MenuItemWithChildEditor extends Vue {
    @Prop(Boolean) withProducts!: boolean;
    @VModel() model!: any;

    selectedChild: any = "";
    forceUpdateIndex: number = 0;

    deleteChild(childs: any, index: number) {
        childs.splice(index, 1);
        this.forceUpdate();
    }

    addNewChild(childs: any = null) {
        childs.push({
            header: {
                title: "Header Title",
                url: "/",
                target: "_self",
            },
            childs: [],
            products: [],
        });
        this.forceUpdate();
    }

    @Watch("model", { deep: true })
    modelUpdated() {
        this.forceUpdate();
    }

    forceUpdate() {
        this.forceUpdateIndex++;
        this.$forceUpdate();
        setTimeout(() => {
            this.$forceUpdate();
        }, 100);
    }
}
</script>
