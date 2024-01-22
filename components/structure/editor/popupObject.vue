<template>
    <div
        v-if="typeof model.hidden === 'undefined' || !model.hidden"
        class="tw-p-2 tw-rounded-lg"
    >
        <label>
            {{ model.title }}
        </label>

        <v-dialog v-model="showDialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    large
                    block
                    outlined
                    v-on="on"
                    v-bind="attrs"
                    class="mb-5 mt-2"
                >
                    Open Content Editor
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5">
                    {{ model.title }}
                    <v-spacer />
                    <v-btn icon @click="showDialog = false">
                        <v-icon>mdi-window-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <structure-editor
                        :key="model.title + model.id"
                        :simple="true"
                        v-model="model.value"
                    />
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";

@Component
export default class StructurePopUpObjectEditor extends Vue {
    @VModel() model!: any;

    showDialog: boolean = false;
}
</script>
