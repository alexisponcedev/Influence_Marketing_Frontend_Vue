<template>
    <div>
        <img src="/blocks/NewsRoomMainBox.jpg" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";
import { Api } from "@/store";

@Component
export default class NewsRoomMainBox extends Vue {
    @VModel() model!: any;

    Api = Api;

    mounted() {
        Api.Post.getAllNews();

        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.String,
            title: "Title",
            value: "NewsRoom Main Box",
        });
        blockAddItem(this.model, "titleLink", {
            id: 0,
            type: StructureType.Url,
            title: "Title link",
            value: "/",
            target: "_self",
        });
        blockAddItem(this.model, "slider", {
            id: 1,
            type: StructureType.List,
            title: "Slider",
            newItem: {
                mobileImage: {
                    id: 0,
                    type: StructureType.Image,
                    title: "Mobile Image",
                    src: "",
                    alt: "Image Alt",
                },
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Image",
                    src: "",
                    alt: "Image Alt",
                },
                title: {
                    id: 2,
                    type: StructureType.String,
                    title: "Title",
                    value: "",
                },
                subtitle: {
                    id: 3,
                    type: StructureType.String,
                    title: "Subtitle",
                    value: "",
                },
                btn: {
                    id: 4,
                    type: StructureType.Url,
                    title: "Read More",
                    value: "",
                },
            },
            value: [],
        });

        blockAddItem(this.model, "year_text", {
            id: 2,
            type: StructureType.String,
            title: "Year",
            value: "",
        });

        blockAddItem(this.model, "product_category", {
            id: 3,
            type: StructureType.String,
            title: "Product Category",
            value: "",
        });

        blockAddItem(this.model, "newsroom_search", {
            id: 4,
            type: StructureType.String,
            title: "Search Newsroom",
            value: "",
        });

        blockAddItem(this.model, "link", {
            id: 5,
            type: StructureType.Url,
            title: "link",
            value: "",
        });

        blockAddItem(this.model, "row-1", {
            id: 6,
            type: StructureType.Select,
            title: "columns in row 1",
            value: 1,
            items: [
                { title: "1", value: 1 },
                { title: "2", value: 2 },
                { title: "3", value: 3 },
            ],
        });

        blockAddItem(this.model, "row-2", {
            id: 7,
            type: StructureType.Select,
            title: "columns in row 2",
            value: 2,
            items: [
                { title: "1", value: 1 },
                { title: "2", value: 2 },
                { title: "3", value: 3 },
            ],
        });

        blockAddItem(this.model, "row-3", {
            id: 8,
            type: StructureType.Select,
            title: "columns in row 3",
            value: 3,
            items: [
                { title: "1", value: 1 },
                { title: "2", value: 2 },
                { title: "3", value: 3 },
            ],
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
            newItem.published_at = post.published_at;
        }
        return newItem;
    }
}
</script>
