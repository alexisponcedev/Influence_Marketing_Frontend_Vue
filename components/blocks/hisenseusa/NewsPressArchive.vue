<template>
    <div>
        <img src="/blocks/NewsPressArchive.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";
import { Api } from "@/store";

@Component
export default class NewsPressArchive extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    Api = Api;

    async mounted() {
        await Api.Post.getAllNews();
        blockAddItem(this.model, "titleOne", {
            id: 1,
            type: StructureType.String,
            title: "Title 1",
            value: "Press Archive",
        });
        blockAddItem(this.model, "titleOneLink", {
            id: 1,
            type: StructureType.Url,
            title: "Title 1 link",
            value: "/",
            target:"_self"
        });
        blockAddItem(this.model, "titleTwo", {
            id: 2,
            type: StructureType.String,
            title: "Title 2",
            value: "Press Archive",
        });
        blockAddItem(this.model, "year_text", {
            id: 3,
            type: StructureType.String,
            title: "Year",
            value: "",
        });
        blockAddItem(this.model, "product_category", {
            id: 4,
            type: StructureType.String,
            title: "Product Category",
            value: "",
        });
        blockAddItem(this.model, "newsroom_search", {
            id: 5,
            type: StructureType.String,
            title: "Search Newsroom",
            value: "",
        });
        blockAddItem(this.model, "count", {
            id: 6,
            type: StructureType.String,
            title: "Number Of latest news post to get",
            value: 4,
        });
        blockAddItem(this.model, "selectNews", {
            id: 7,
            type: StructureType.AutoCompeleteSelect,
            title: "Exclude News",
            itemText: "page.title",
            itemValue: "id",
            value: "",
            items: () =>
                Api.Post.allNews
                    .filter((p: any) => p.hasOwnProperty("page") && p.page)
                    .sort((a: any, b: any) => (a.id < b.id ? 1 : -1)),
        });
        blockAddItem(this.model, "exclude_news", {
            id: 8,
            type: StructureType.List,
            title: "Excluded News List",
            maxLength: 0,
            newItem: {
                image: {
                    id: 0,
                    type: StructureType.Image,
                    title: "Image",
                    src: "",
                    alt: "",
                },
                title: {
                    id: 1,
                    type: StructureType.String,
                    title: "Title",
                    value: "",
                },
                tag: {
                    id: 2,
                    type: StructureType.String,
                    title: "Tag",
                    value: "",
                },
                link: {
                    id: 3,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Link",
                    value: "",
                },
            },
            value: [],
        });

        this.model = { ...this.model };
    }

    get selectNews() {
        return this.model.hasOwnProperty("selectNews")
            ? this.model.selectNews.value
            : null;
    }

    @Watch("selectNews")
    onSelectNews(value: any) {
        if (value) {
            this.model.exclude_news.value.push(
                this.addPost(Api.Post.allNews.find((item) => item.id == value))
            );
            this.model.selectNews.value = "";
        }
    }

    addPost(post: any): any {
        let newItem: any = {
            image: {
                id: 0,
                type: StructureType.Image,
                title: "Image",
                src: "",
                alt: "",
            },
            title: {
                id: 1,
                type: StructureType.String,
                title: "Title",
                value: "",
            },
            tag: {
                id: 2,
                type: StructureType.String,
                target: "_self",
                title: "Tag",
                value: "",
            },
            link: {
                id: 3,
                type: StructureType.Url,
                target: "_self",
                title: "READ ARTICLE",
                value: "",
            },
        };
        if (post) {
            let imageMeta = post.page.meta.find(
                (i: any) => i.name.includes("og:image") && i.content != null
            );
            if (imageMeta) newItem.image.src = imageMeta.content;
            newItem.title.value = post.page.title;
            newItem.link.value = post.page.route;
            newItem.tag.value = post.tags.join(", ");
            newItem.created_at = post.page.created_at;
            newItem.id = post.page.id;
        }
        return newItem;
    }
}
</script>
