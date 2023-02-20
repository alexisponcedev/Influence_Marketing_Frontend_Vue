<template>
    <div v-if="asset"
         class="tw-flex tw-items-center tw-space-x-2 tw-cursor-pointer hover:tw-bg-green-50 tw-transition tw-duration-200 tw-p-1.5 tw-rounded-lg">

        <div class="tw-flex-shrink-0 tw-flex tw-items-center tw-justify-center tw-w-16 tw-h-12">
            <img :src="image" @click="selected" class="tw-object-cover tw-max-h-full  tw-rounded tw-bg-gray-100"
                 alt="asset file"/>
        </div>
        <div class="tw-flex-1 tw-flex tw-flex-col tw-justify-center" @click.self="selected">
            <div class="tw-mb-1 tw-text-gray-600 tw-font-bold">{{ asset.title }}</div>
            <div>{{ asset.description }}</div>
            <div class="tw-w-72 tw-line-clamp-1" :title="asset.url">{{ asset.url }}</div>
        </div>
        <div>
            <button @click.prevent="deleteAsset">
                <v-icon light class="danger--text">mdi-delete</v-icon>
            </button>
        </div>

    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import {Api} from "~/utils/store-accessor";

@Component
export default class StructureImageEditor extends Vue {
    @Prop(Object) readonly asset!: any

    Api = Api;

    selected() {
        this.$emit('selected', this.asset);
    }

    deleteAsset() {
        Api.Asset.delete(this.asset.id).then(Api.Asset.getAll);
    }

    get image(): string | undefined {
        if (['png', 'jpeg', 'jpg', 'webp'].includes(this.asset.extension.toLowerCase()))
            return this.asset.thumb
        else
            return '/file.png'
    }
}
</script>

