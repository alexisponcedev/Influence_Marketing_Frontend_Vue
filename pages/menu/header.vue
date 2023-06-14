<template>
    <v-container fluid>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
            <v-tab href="#centerOptions">Center Options</v-tab>
            <v-tab href="#rightOptions">Right Options</v-tab>
            <v-tab href="#hamburger">Hamburger Menu</v-tab>
        </v-tabs>

        <v-card>
            <v-tabs-items v-model="tab">
                <v-tab-item value="hamburger">
                    <v-card-text>
                        <h6>Hamburger Menu Items</h6>
                        <menu-items v-model="Menu.widgets.hamburger" />
                    </v-card-text>
                </v-tab-item>

                <v-tab-item value="centerOptions">
                    <v-card-text>
                        <h6>Center Options</h6>
                        <div class="tw-space-y-3">
                            <draggable
                                v-model="Menu.widgets.centerOption"
                                group="options"
                                class="tw-space-y-3"
                            >
                                <menu-option
                                    v-for="(option, index) in Menu.widgets
                                        .centerOption"
                                    :key="`center_option_${index}`"
                                    :value="option"
                                    @input="(v) => (option = v)"
                                    @deleteOption="
                                        deleteOption(
                                            Menu.widgets.centerOption,
                                            index
                                        )
                                    "
                                />
                            </draggable>
                            <button
                                @click="addNewOption(Menu.widgets.centerOption)"
                                class="tw-border tw-border-dashed tw-border-gray-200 tw-rounded-xl tw-text-center tw-p-3 tw-bg-green-50 hover:tw-bg-green-200 tw-w-full"
                            >
                                Add New Option
                            </button>
                        </div>
                    </v-card-text>
                </v-tab-item>

                <v-tab-item value="rightOptions">
                    <v-card-text>
                        <h6>Right Options</h6>
                        <div class="tw-space-y-3">
                            <draggable
                                v-model="Menu.widgets.rightOption"
                                group="options"
                                class="tw-space-y-3"
                            >
                                <menu-option
                                    v-for="(option, index) in Menu.widgets
                                        .rightOption"
                                    :key="`center_option_${index}`"
                                    :value="option"
                                    @input="(v) => (option = v)"
                                    @deleteOption="
                                        deleteOption(
                                            Menu.widgets.rightOption,
                                            index
                                        )
                                    "
                                />
                            </draggable>
                            <button
                                @click="addNewOption(Menu.widgets.rightOption)"
                                class="tw-border tw-border-dashed tw-border-gray-200 tw-rounded-xl tw-text-center tw-p-3 tw-bg-green-50 hover:tw-bg-green-200 tw-w-full"
                            >
                                Add New Option
                            </button>
                        </div>
                    </v-card-text>
                </v-tab-item>
            </v-tabs-items>
        </v-card>

        <v-card class="mt-5">
            <v-card-text align="end">
                <v-btn color="success" @click="submit">Save Changes</v-btn>
            </v-card-text>
        </v-card>

        <loading-overlay :show="Api.Menu.loading" />
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Api } from "@/store";
import { Menu } from "~/repositories";

@Component({
    layout: "panel",
})
export default class Menus extends Vue {
    Api = Api;

    tab = "centerOptions";

    Menu: any = {
        id: 1,
        title: "header",
        widgets: {
            hamburger: [],
            rightOption: [],
            centerOption: [],
        },
        brand_id: 3,
    };

    mounted() {
        this.fetchMenu();
    }

    async fetchMenu() {
        this.Menu.widgets = ((await Api.Menu.getHeader()) as Menu).widgets;
    }

    addNewOption(list: any) {
        list.push({
            name: "New Option Title",
            url: "/",
            static: false,
            columns: [[{ name: "Sample Item", url: "/" }]],
            products: [
                {
                    name: "Product Name 1",
                    url: "/",
                    image: "https://assets.hisense-usa.com/assets/GalleryImages/Product/436/ccc5d70642/u6h__ScaleMaxWidthWzY0MF0.png",
                },
            ],
        });
    }

    deleteOption(list: any, index: number) {
        list.splice(index, 1);
    }

    async submit() {
        await Api.Menu.update({ id: Number(this.Menu.id), Menu: this.Menu });
    }
}
</script>
