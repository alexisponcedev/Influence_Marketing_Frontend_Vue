<template>
    <div>
        <img src="/blocks/AdditionalResourcesModule.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";
import { Api } from "@/store";

@Component
export default class AdditionalResourcesModule extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
        this.init();
    }

    async init() {
        if (!Api.Post.all.length) await Api.Post.getAll();
        if (!Api.Post.allNews.length) await Api.Post.getAllNews();

        this.prepare();
    }

    prepare() {
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });

        blockAddItem(this.model, "selectType", {
            id: 2,
            type: StructureType.AutoCompeleteSelect,
            title: "Add New Item",
            itemText: "title",
            itemValue: "value",
            value: "",
            items: [
                { title: "Lightbox", value: "lightbox" },
                { title: "Link", value: "link" },
                { title: "Download", value: "download" },
                { title: "News", value: "news" },
                { title: "Blog", value: "blog" },
            ],
        });

        blockAddItem(this.model, "list", {
            id: 3,
            type: StructureType.List,
            maxLength: 0,
            title: "List",
            newItem: {
                type: {
                    id: 0,
                    type: StructureType.TextPreview,
                    title: "Item Type",
                    value: "",
                },
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Image",
                    src: "",
                    alt: "",
                },
                video: {
                    id: 2,
                    type: StructureType.String,
                    title: "Video Url",
                    value: "",
                },
                subtitle: {
                    id: 3,
                    type: StructureType.String,
                    title: "Subtitle",
                    value: "",
                },
                title: {
                    id: 4,
                    type: StructureType.SimpleText,
                    title: "Title",
                    value: "",
                },
                date: {
                    id: 5,
                    type: StructureType.String,
                    title: "date",
                    value: "",
                },
                button_title: {
                    id: 6,
                    type: StructureType.String,
                    title: "Button Title",
                    value: "",
                },
                link: {
                    id: 7,
                    type: StructureType.Url,
                    title: "link",
                    value: "/",
                },
                lightbox: {
                    id: 8,
                    type: StructureType.PopupObject,
                    title: "Lightbox",
                    value: {
                        caption: {
                            id: 1,
                            type: StructureType.SimpleText,
                            title: "Caption",
                            value: "",
                        },
                        video: {
                            id: 2,
                            type: StructureType.String,
                            title: "Video Url",
                            value: "",
                        },
                        image: {
                            id: 3,
                            type: StructureType.Image,
                            title: "Image",
                            src: "",
                            alt: "",
                        },
                        link: {
                            id: 4,
                            type: StructureType.Url,
                            title: "link",
                            value: "/",
                        },
                    },
                },
                selected_news: {
                    id: 9,
                    type: StructureType.AutoCompeleteSelect,
                    title: "Selected News",
                    itemText: "page.title",
                    itemValue: "id",
                    value: "",
                    data: {
                        icon: "mdi-check",
                    },
                },
                selected_blog: {
                    id: 10,
                    type: StructureType.AutoCompeleteSelect,
                    title: "Selected Blog",
                    itemText: "page.title",
                    itemValue: "id",
                    value: "",
                    data: {
                        icon: "mdi-check",
                    },
                },
            },
            value: [],
        });
        this.postProcessing();
    }

    postProcessing() {
        if (this.model.list && this.model.list.value.length)
            this.model.list.value.forEach((item: any) => {
                switch (item.type.value) {
                    case "lightbox":
                        item.link.hidden = true;
                        item.selected_news.hidden = true;
                        item.selected_blog.hidden = true;
                        break;
                    case "link":
                        item.lightbox.hidden = true;
                        item.selected_news.hidden = true;
                        item.selected_blog.hidden = true;
                        break;
                    case "download":
                        item.lightbox.hidden = true;
                        item.selected_news.hidden = true;
                        item.selected_blog.hidden = true;
                        break;
                    case "news":
                        item.link.hidden = true;
                        item.lightbox.hidden = true;
                        item.selected_blog.hidden = true;
                        item.selected_news.items = () =>
                            Api.Post.allNews
                                .filter(
                                    (p: any) =>
                                        p.hasOwnProperty("page") && p.page
                                )
                                .sort((a: any, b: any) =>
                                    a.id < b.id ? 1 : -1
                                );
                        break;
                    case "blog":
                        item.link.hidden = true;
                        item.lightbox.hidden = true;
                        item.selected_news.hidden = true;
                        item.selected_blog.items = () =>
                            Api.Post.all
                                .filter(
                                    (p: any) =>
                                        p.hasOwnProperty("page") && p.page
                                )
                                .sort((a: any, b: any) =>
                                    a.id < b.id ? 1 : -1
                                );
                        break;
                }
            });

        this.model = { ...this.model };
    }

    get selectType() {
        return this.model.hasOwnProperty("selectType")
            ? this.model.selectType.value
            : null;
    }

    @Watch("selectType")
    onSelectTypeChanged(value: any) {
        if (value) {
            this.model.list.value.push({
                ...this.model.list.newItem,
                type: {
                    id: 0,
                    type: StructureType.TextPreview,
                    title: "Item Type",
                    value,
                },
            });

            this.model.selectType.value = "";
            this.prepare();
        }
    }
}
</script>
