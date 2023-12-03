<template>
    <div>
        <img src="/blocks/NewsPressArchive.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";
import { Api } from "@/store";

@Component
export default class CESArticles extends Vue {
    @VModel({ type: Object }) model!: any;

    async mounted() {
        Api.Post.getAllNews();

        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.String,
            title: "Title",
            value: "",
        });

        blockAddItem(this.model, "selectNews", {
            id: 9,
            type: StructureType.AutoCompeleteSelect,
            title: "Add News",
            itemText: "page.title",
            itemValue: "id",
            value: "",
        });

        this.model.selectNews.items = () =>
            Api.Post.allNews
                .filter((p: any) => p.hasOwnProperty("page") && p.page)
                .sort((a: any, b: any) => (a.id < b.id ? 1 : -1));

        blockAddItem(this.model, "list", {
            id: 10,
            type: StructureType.List,
            title: "List",
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
                postId: {
                    id: 4,
                    type: StructureType.String,
                    hidden: true,
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
    onCountChanged(value: any) {
        if (value) {
            this.model.list.value.push(
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
            postId: {
                id: 4,
                type: StructureType.String,
                hidden: true,
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
            newItem.postId.value = post.id;
        }
        return newItem;
    }
}
</script>
