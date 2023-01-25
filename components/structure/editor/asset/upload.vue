<template>
    <v-card>
        <v-card-title> Asset Manager</v-card-title>
        <v-card-text>
            <form-field-text v-if="canUpload" :field="titleField" v-model="Asset.title"/>
            <form-field-text :field="descriptionFiled" v-model="Asset.description"/>
            <form-field-file v-if="canUpload" :field="fileField" v-model="file"/>
            <div v-if="canUpload" class="tw-my-2 tw-text-center tw-w-full">OR</div>
            <form-field-text v-if="canUpload" :field="urlField" v-model="Asset.url"/>
            <div class="px-3" v-if="thumbnail.src">
                <div>Asset</div>
                <img :src="thumbnail.src" alt="thumbnail" class="tw-w-full"/>
            </div>
            <v-progress-linear v-if="saving" indeterminate color="cyan"/>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="saving" @click="save" text color="green">Upload</v-btn>
            <v-btn :disabled="saving" @click="cancel" text color="red"> Cancel</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import {
    Vue,
    Component,
    Prop,
    Watch,
    VModel,
    Emit,
} from "vue-property-decorator";
import {StructureField} from "~/interfaces/StructureField";
import {Api} from "~/utils/store-accessor";
import {Asset} from "~/repositories";
import {AssetTokens} from "~/models/AssetTokens";

@Component
export default class StructureFileUploader extends Vue {
    @Prop({type: String, default: "image"}) type!: string;
    @Prop({type: String, default: "add"}) mode!: string;
    @Prop({type: StructureField}) item!: StructureField;


    Api = Api;

    Asset: Asset = {
        title: "sample asset title",
        description: "some note about this asset",
        location: "asset/image",
        extension: "ext",
        thumb: "",
        url: "",
    };


    get canUpload() {
        return this.mode === 'add' || this.mode === 'replace'
    }

    file: any = null;

    saving: Boolean = false;

    // editMode: Boolean = false

    thumbnail = {
        src: "",
    }

    titleField = {
        label: "Asset Title",
        placeholder: "asset name or title",
        rules: [],
        colAttrs: {cols: 12},
    };

    urlField = {
        label: "Asset URL",
        placeholder: "enter asset url",
        // disabled: this.editMode,
        rules: [],
        colAttrs: {cols: 12},
    };

    descriptionFiled = {
        label: "Asset description",
        placeholder: "please add some note about this asset",
        rules: [],
        colAttrs: {cols: 12},
    };

    fileField = {
        label: "File",
        placeholder: "please select file to upload",
        rules: [],
        colAttrs: {cols: 12},
    };

    mounted() {
        this.prepareAsset();
        if (this.item.src && this.item.alt) {
            this.thumbnail = {src: this.item.src}
        }
    }

    @Watch("file")
    onFileInput() {
        this.thumbnail = {
            src: URL.createObjectURL(this.file),
        }
    }

    @Emit()
    cancel() {
    }

    uploaded(asset: Asset): Asset {
        this.$emit("uploaded", asset);
        return asset;
    }

    async save() {
        this.saving = true;
        if (this.mode === 'edit') {
            await this.saveAsset();
        } else {
            if ((this.Asset.url === "" || this.file !== null)) {
                let res = await this.upload();
                this.Asset.extension = res.extension;
                if (this.type === "image") {
                    this.Asset.thumb = res.view_link.replace(res.file_name, "500x500-" + res.file_name);
                    this.Asset.url = res.view_link;
                } else {
                    this.Asset.url = res.download_link;
                }
            } else {
                this.Asset.extension = this.Asset.url!.substring(
                    this.Asset.url!.lastIndexOf(".") + 1
                );
                this.Asset.thumb = this.Asset.url;
            }
            await this.saveAsset();
        }

        this.saving = false;
    }

    async upload() {
        let formData = new FormData();
        formData.append("attachment", this.file);
        formData.append("keep_original_name", "0");
        formData.append(
            "meta",
            JSON.stringify({
                title: this.Asset.title,
                description: this.Asset.description,
            })
        );
        return this.$axios.$post(process.env.DAM_API_URL + "/upload/" +
            (this.type === "image" ? AssetTokens.image : AssetTokens.file), formData);
    }

    async saveAsset() {
        return await Api.Asset.create(this.Asset)
            .then((asset) => {
                this.$emit("uploaded", asset);
            });
    }

    async updateAsset() {
        return await Api.Asset.update({id: +this.Asset.id!, Asset: this.Asset})
            .then((asset) => {
                this.$emit("uploaded", asset);
            });
    }

    prepareAsset(){
        this.Asset = {title: "", description: "", location: "asset/image", extension: "ext", thumb: "", url: "",};
        console.log('mode has change' , this.mode , this.Asset);
        if (this.mode === 'edit') {
            this.Asset.title = this.item.title ? this.item.title : "";
            this.Asset.description = this.item.alt ? this.item.alt : "";
            this.Asset.url = this.item.src ? this.item.src : "";
        }
    }

    @Watch('mode')
    onModeChanged() {
        this.prepareAsset()
    }
}
</script>
