<template>
    <div class="tw-p-2">
        <label>
            {{ model.title }}
        </label>

        <div v-if="model.src" class="tw-text-center tw-w-full">
            <div
                class="tw-flex tw-items-center tw-justify-between tw-space-x-2 tw-bg-white tw-py-3.5 tw-px-2 tw-rounded-lg"
            >
                <div class="tw-flex tw-items-center tw-justify-start">
                    <img
                        v-if="type === 'image'"
                        class="tw-max-h-10 tw-max-w-[100px] tw-object-cover tw-rounded"
                        :src="model.src"
                        alt="alt about image"
                    />
                    <img
                        v-else
                        class="tw-max-h-8 tw-max-w-[100px] tw-object-cover tw-rounded"
                        src="/file.png"
                        alt="alt about image"
                    />
                    <div class="tw-line-clamp-1 tw-pl-2 tw-w-40">
                        {{ model.alt }}
                    </div>
                </div>

                <v-menu bottom offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon elevation="0" v-on="on" v-bind="attrs">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>

                    <v-list class="pa-0">
                        <v-list-item class="pa-0">
                            <v-btn
                                color="#fff"
                                elevation="0"
                                class="tw-w-full tw-h-[48px] tw-block tw-p-3 tw-rounded-none"
                                @click="replaceAsset"
                            >
                                Replace Image
                            </v-btn>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item class="pa-0">
                            <v-btn
                                color="#fff"
                                elevation="0"
                                class="tw-w-full tw-h-[48px] tw-block tw-p-3 tw-rounded-none"
                                @click="editAsset"
                            >
                                Edit Image
                            </v-btn>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item class="pa-0">
                            <v-btn
                                color="#fff"
                                elevation="0"
                                class="tw-w-full tw-h-[48px] tw-block tw-p-3 tw-rounded-none"
                                @click="copyURL"
                            >
                                Copy URL
                            </v-btn>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item class="pa-0">
                            <v-btn
                                color="#fff"
                                elevation="0"
                                class="tw-w-full tw-h-[48px] tw-block tw-p-3 tw-rounded-none"
                                @click="deleteAsset"
                            >
                                Delete Image
                            </v-btn>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </div>

        <button
            v-else
            @click="showDialog = true"
            class="tw-text-center tw-w-full"
        >
            <div
                class="tw-flex tw-items-center tw-justify-center tw-space-x-2 tw-bg-white tw-py-3.5 tw-rounded-lg tw-text-center tw-w-full hover:tw-bg-blue-200"
            >
                <span>select or upload asset</span>
                <v-icon>mdi-cloud-upload</v-icon>
            </div>
        </button>

        <v-dialog v-model="showDialog" max-width="500">
            <structure-editor-asset-upload
                v-if="showUploadBox"
                :item="model"
                :mode="mode"
                :type="type"
                @uploaded="selected"
                @cancel="showUploadBox = false"
            />

            <structure-editor-asset-list
                v-else
                @selected="selected"
                @cancel="close"
                @addNewAsset="addNewAsset"
            />
        </v-dialog>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, VModel } from "vue-property-decorator";
import { StructureField } from "~/interfaces/StructureField";
import { Api, AppStore } from "~/utils/store-accessor";
import { Asset } from "~/repositories";
import { AssetTokens } from "~/models/AssetTokens";

@Component
export default class StructureImageEditor extends Vue {
    @Prop({ type: String, default: "image" }) readonly type!: string;
    @VModel() model!: StructureField;
    Api = Api;
    showUploadBox: Boolean = false;
    showDialog: Boolean = false;
    mode: string = "add";

    selected(asset: Asset) {
        this.model.src = asset.url!;
        this.model.alt = asset.description!;
        this.close();
    }

    deleteAsset() {
        this.selected({ url: "", description: "" });
    }

    editAsset() {
        this.mode = "edit";
        this.showDialog = true;
        this.showUploadBox = true;
    }

    copyURL() {
        if ("clipboard" in navigator) {
            navigator.clipboard.writeText(this.model.src);
            AppStore.showSnackBar({
                message: "Copied to clipboard!",
                color: "success",
            });
        }
    }

    replaceAsset() {
        this.mode = "replace";
        this.showDialog = true;
        this.showUploadBox = true;
    }

    addNewAsset() {
        this.mode === "add";
        this.showDialog = true;
        this.showUploadBox = true;
    }

    close() {
        this.showDialog = false;
        this.showUploadBox = false;
    }
}
</script>
