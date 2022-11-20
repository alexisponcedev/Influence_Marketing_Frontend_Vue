<template>
    <v-container fluid>

        <v-card>
            <div class="tw-p-2 tw-space-y-2">
                <nuxt-link to="/menu/header"
                           class="tw-block tw-h-20 tw-bg-gray-50 tw-text-center tw-py-5 tw-rounded-xl tw-flex tw-items-center tw-justify-center hover:tw-bg-gray-100 tw-border tw-border-dashed tw-border-gray-200">
                    Edit Header Menu
                </nuxt-link>

                <div class="tw-text-center tw-border tw-border-dashed tw-border-gray-200 tw-rounded-xl tw-py-32">
                    Page Content Is Here
                </div>
                <nuxt-link to="/menu/footer"
                           class="tw-block tw-h-20 tw-bg-gray-50 tw-text-center tw-py-20 tw-rounded-xl tw-flex tw-items-center tw-justify-center hover:tw-bg-gray-100 tw-border tw-border-dashed tw-border-gray-200">
                    Edit Footer Menu
                </nuxt-link>
            </div>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {Api} from "@/store";


@Component({
    layout: "panel"
})
export default class Menus extends Vue {
    Api = Api;

    tab = "centerOptions";

}
</script>

