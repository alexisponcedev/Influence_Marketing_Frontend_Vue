<template>
    <v-card>
        <v-card-title>
            Asset Manager
        </v-card-title>

        <v-card-text>
            <form-field-text :field="titleField" v-model="Asset.title" />
            <form-field-text :field="descriptionFiled" v-model="Asset.description" />
            <form-field-file :field="fileField" v-model="file" />
            <div class="tw-my-2 tw-text-center tw-w-full">OR</div>
            <form-field-text :field="urlField" v-model="Asset.url" />

            <v-progress-linear v-if="saving" indeterminate color="cyan" />
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="saving" @click="save" text color="green"> Upload</v-btn>
            <v-btn :disabled="saving" @click="cancel" text color="red"> Cancel</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, VModel, Emit } from "vue-property-decorator";
import { StructureField } from "~/interfaces/StructureField";
import { Api } from "~/utils/store-accessor";
import { Asset } from "~/repositories";
import { AssetTokens } from "~/models/AssetTokens";


@Component
export default class StructureFileUploader extends Vue {
    @Prop({ type: String, default: 'image' }) type!: string
    @VModel({ type: StructureField }) item!: StructureField


    Api = Api;

    Asset: Asset = {
        title: 'sample asset title',
        description: 'some note about this asset',
        location: 'asset/image',
        extension: 'ext',
        thumb: '',
        url: '',
    };

    file: any = null;

    saving: Boolean = false;

    titleField = {
        label: 'Asset Title',
        placeholder: 'asset name or title',
        rules: [],
        colAttrs: { cols: 12 }
    }

    urlField = {
        label: 'Asset URL',
        placeholder: 'enter asset url',
        rules: [],
        colAttrs: { cols: 12 }
    }

    descriptionFiled = {
        label: 'Asset description',
        placeholder: 'please add some note about this asset',
        rules: [],
        colAttrs: { cols: 12 }
    }

    fileField = {
        label: 'File',
        placeholder: 'please select file to upload',
        rules: [],
        colAttrs: { cols: 12 }
    }

    @Emit()
    cancel() {
    }

    uploaded(asset: Asset): Asset {
        this.$emit('uploaded', asset);
        return asset;
    }

    async save() {
        this.saving = true;
        if (this.Asset.url === '') {
            let res = await this.upload();
            this.Asset.extension = res.extension;
            if (this.type === 'image') {
                this.Asset.thumb = res.view_link.replace(res.file_name, '500x500-' + res.file_name);
                this.Asset.url = res.view_link;
            } else {
                this.Asset.url = res.download_link;
            }

        } else {
            this.Asset.extension = this.Asset.url!.substring(this.Asset.url!.lastIndexOf('.') + 1)
            this.Asset.thumb = this.Asset.url;
        }
        await this.saveAsset();
        this.saving = false;
    }

    async upload() {
        let formData = new FormData();
        formData.append('attachment', this.file);
        formData.append('keep_original_name', '0');
        formData.append('meta', JSON.stringify({ title: this.Asset.title, description: this.Asset.description }));
        return this.$axios.$post(process.env.DAM_API_URL + '/upload/' + (this.type === 'image' ? AssetTokens.image : AssetTokens.file), formData);
    }

    async saveAsset() {
        return await Api.Asset.create(this.Asset)
            .then(response => {
                this.$emit('uploaded', response);
            })
    }

}
</script>
