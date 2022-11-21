<template>
    <v-col class="py-0" v-bind="field.colAttrs">
        <label>
            {{ field.label }}
        </label>
        <v-list v-if="files && files.length" subheader two-line>
            <v-list-item v-for="(file, index) in files" :key="index">
                <v-list-item-avatar>
                    <v-icon class="primary" dark> mdi-file-document-outline</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title v-text="file.name"/>
                    <v-list-item-subtitle v-text="'Size: ' + formatFileSize(file.size)"/>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn icon @click="removeFile(file)">
                        <v-icon color="danger">mdi-delete</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
        <v-card
            v-if="multiple || (!multiple && files && files.length == 0)"
            flat
            v-cloak
            @dragover.prevent
            @drop.prevent="dropFile"
            class="upload-container mb-4"
            @click="$refs.file.$refs.input.click()"
        >
            <v-card-text class="text-center">
                <v-icon x-large> mdi-cloud-upload-outline</v-icon>
                <br/>
                <strong> Upload a file or drag and drop </strong>
                <br/>
                <small>
                    {{ field.placeholder }}
                </small>
            </v-card-text>
        </v-card>
        <v-file-input
            multiple
            ref="file"
            hide-input
            prepend-icon=""
            @change="addFiles"
        />
        <div class="display-none">
            <v-text-field v-model="files.length" :rules="field.rules"/>
        </div>
    </v-col>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Emit} from "vue-property-decorator";
import {formatFileSize} from "@/utils/formatHelper";
import {FormField} from "@/models";

@Component
export default class MultipleFileFormField extends Vue {
    @Prop({default: true}) readonly multiple!: Boolean;
    @Prop(Object) readonly field!: FormField;
    @VModel() model?: Array<any> | any;

    formatFileSize = formatFileSize;

    files: Array<any> = [];

    dropFile(e: any) {
        const droppedFiles = e.dataTransfer.files;
        if (!droppedFiles) return;
        this.addFiles(droppedFiles);
    }

    @Emit("filesAdded")
    addFiles(files: Array<any>) {
        [...files].forEach(async file => {
            this.files.push(file);
        });
        this.updateModel();
        return files;
    }

    @Emit("fileRemoved")
    removeFile(file: any) {
        this.files = this.files.filter(f => f != file);
        this.updateModel();
        return file;
    }

    updateModel() {
        if (this.multiple) this.model = [...this.files];
        else this.model = this.files[0] || undefined;
    }
}
</script>

<style scoped>
.upload-container {
    min-height: 100px;
    border: 1px solid #ccc;
    border-style: dashed;
}
</style>
