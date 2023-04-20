<template>
    <div>
        <img src="/blocks/BlogListWithBigTitleAndLittleItem.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import { Api } from "@/store";

@Component
export default class BlogListWithBigTitleAndLittleItem extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    Api = Api;

    async mounted() {
        blockAddItem(this.model, "count", {
            id: 0,
            type: StructureType.String,
            title: "Count",
            value: 4,
        });
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.Text,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "link", {
            id: 1,
            type: StructureType.Url,
            target: "_self",
            title: "Link",
            value: "",
        });
        blockAddItem(this.model, "list", {
            id: 3,
            type: StructureType.List,
            title: "List",
            newItem: {
                largePost: {
                    id: 0,
                    type: StructureType.Object,
                    title: "Large Post",
                    value: {
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
                        tagLink: {
                            id: 2,
                            type: StructureType.Url,
                            target: "_self",
                            title: "Tag Link",
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
                },
                smallPost: {
                    id: 1,
                    type: StructureType.Object,
                    title: "Small Post",
                    value: {
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
                        tagLink: {
                            id: 2,
                            type: StructureType.Url,
                            target: "_self",
                            title: "Tag Link",
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
                },
            },
            value: [],
        });

        await Api.Post.getAll();
        this.addPosts();
        this.model = { ...this.model };
    }

    addPosts() {
        this.model.list.value = [];
        let posts = Api.Post.all
            .filter((p: any) => p.hasOwnProperty("page") && p.page)
            .sort((a: any, b: any) => (a.id < b.id ? 1 : -1));
        console.log(posts);

        let max = Math.min(this.count, posts.length);
        max = max / 2 === 0 ? max : max - 1;

        for (let i = 0; i < max; i) {
            this.model.list.value.push({
                smallPost: this.addPost(posts[i++], "Small Post"),
                largePost: this.addPost(posts[i++], "Large Post"),
            });
        }
    }

    get count() {
        return this.model.hasOwnProperty("count") ? this.model.count.value : 0;
    }

    @Watch("count")
    onCountChanged() {
        this.addPosts();
    }

    addPost(post: any, title: string = "Small Title"): any {
        let newItem: any = {
            id: 1,
            type: StructureType.Object,
            title: title,
            value: {
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
                tagLink: {
                    id: 2,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Tag Link",
                    value: "",
                },
                link: {
                    id: 3,
                    type: StructureType.Url,
                    target: "_self",
                    title: "READ ARTICLE",
                    value: "",
                },
            },
        };
        if (post) {
            let imageMeta = post.page.meta.find(
                (i: any) => i.name.includes("og:image") && i.content != null
            );
            if (imageMeta) newItem.value.image.src = imageMeta.content;
            newItem.value.title.value = post.page.title;
            newItem.value.link.value = post.page.route;
        }
        return newItem;
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
