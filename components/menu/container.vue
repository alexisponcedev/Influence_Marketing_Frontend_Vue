<template>
    <v-container v-if="menu" fluid>
        <template v-if="sections && sections.length">
            <v-tabs
                show-arrows
                v-model="selectedSection"
                background-color="transparent"
            >
                <v-tab
                    v-for="section in sections"
                    :href="'#' + section.value"
                    v-text="section.title"
                />
            </v-tabs>
        </template>
        <v-tabs-items v-model="selectedSection">
            <v-tab-item
                v-for="(section, index) in sections"
                :value="section.value"
                eager
            >
                <v-card>
                    <v-card-text>
                        <component
                            :is="'menu-type-' + section.type"
                            :widgets="menu.widgets"
                            :modelKey="section.value"
                            :key="'menu-type-' + section.type + '-' + index"
                        />
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>

        <v-card class="mt-5">
            <v-card-text align="end">
                <v-btn color="success" @click="submit">Save Changes</v-btn>
            </v-card-text>
        </v-card>

        <loading-overlay :show="Api.Menu.loading" />
    </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator";
import { Api } from "@/store";

@Component({
    layout: "panel",
})
export default class Menus extends Vue {
    @Prop() readonly menu!: any;
    @Prop(Array) readonly sections!: Array<{
        title: string;
        value: string;
        type: string;
    }>;

    Api = Api;

    selectedSection: any = "";

    @Watch("menu")
    menuUpdated() {
        if (Array.isArray(this.menu.widgets)) this.menu.widgets = {};
    }

    @Emit("submit")
    submit() {
        return this.menu;
        // await Api.Menu.update({ id: Number(this.menu.id), Menu: this.menu });
    }
}
</script>
