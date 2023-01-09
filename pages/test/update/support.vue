<template>
    <v-container>
        <div class="tw-mb-2 tw-flex tw-items-center tw-space-x-2">
            <div>Updating support pages</div>
            <button @click="start" :disabled="loading" class="tw-bg-green-400 tw-px-2 tw-py-1 tw-rounded-lg">start
            </button>
        </div>

        <ul class="list-unstyled tw-pl-0 tw-space-y-2 tw-grid tw-grid-cols-2 tw-gap-2">
            <li v-for="(page, index ) in pages"
                class="tw-flex tw-items-center tw-space-x-2 tw-bg-gray-50 tw-rounded-lg tw-px-2 tw-py-1">
                <div class="tw-w-10 tw-text-center">{{ index + 1 }}</div>
                <div class="tw-flex-1">
                    <nuxt-link target="_blank" :to="`/page/edit/${page.id}/page-builder`"
                        class="tw-line-clamp-1 hover:tw-text-blue-500">{{ page.title }}
                    </nuxt-link>
                    <div class="tw-text-xs tw-text-gray-500 tw-line-clamp-1">{{ page.route }}</div>
                </div>
                <div class="tw-w-20 tw-text-right" :class="{
                    'tw-text-red-500': page.status === 'queued',
                    'tw-text-orange-500': page.status === 'in progress',
                    'tw-text-blue-500': page.status === 'updating',
                    'tw-text-red-500': page.status === 'error',
                    'tw-text-green-500': page.status === 'done',
                
                }">
                    {{ page.status }}
                </div>
            </li>
        </ul>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Api } from "@/store";
import { Page } from "~/repositories";
import { StructureType } from "~/models/StructureType";

@Component
export default class Index extends Vue {
    Api = Api;

    pages: any[] = [];

    loading: boolean = false;

    async mounted() {
        this.pages = (await Api.Page.getAll() as any[]).filter(i => i.model_type === 'support')
            .map(j => {
                return { ...j, status: 'queued', widgets: [] }
            });
    }

    async delay(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }


    async start() {
        this.loading = true;

        for (const page of this.pages) {
            page.status = 'in progress';
            let loadedPage: Page = await Api.Page.get(page.id) as Page;
            await this.delay(1000);
            if (Array.isArray(loadedPage.widgets)) {
                loadedPage.widgets = (loadedPage.widgets as any[]).map(c => {

                    if (c.name === 'ProductSupportRegister')
                        c.structure = {
                            theme: c.structure.theme,
                            title: c.structure.title,
                            subtitle: c.structure.subtitle,
                            secondTitle: {
                                id: 3,
                                type: StructureType.String,
                                title: 'Second Title',
                                value: 'PARTS & SERVICE SUPPORT'
                            },
                            secondSubtitle: {
                                id: 4,
                                type: StructureType.String,
                                title: 'Second Subtitle',
                                value: 'PARTS & SERVICE SUPPORT'
                            },
                            modelText: c.structure.modelText
                        }
                    return c;
                })
                page.status = 'locked';
                await Api.Page.lockPage(page.id);
                await this.delay(300);

                page.status = 'updating';
                await Api.Page.savePageWidgets({ widgets: loadedPage.widgets, page_id: loadedPage.id })
                await this.delay(300);

                page.status = 'unlocked';
                await Api.Page.unlockPage(page.id);
                await this.delay(300);
                page.status = 'done';
            }
        }
        this.loading = false;
    }
}
</script>
