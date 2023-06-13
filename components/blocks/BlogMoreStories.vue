<template>
    <div>
        <img src="/blocks/BlogMoreStories.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import { Api } from "@/store";

@Component
export default class BlogMoreStories extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    Api = Api;

    async mounted() {
        blockAddItem(this.model, "count", {
            id: 0,
            type: StructureType.String,
            title: "Count",
            value: 0,
        });
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.String,
            title: "Title",
            value: "More Stories",
        });
        blockAddItem(this.model, "list", {
            id: 2,
            type: StructureType.List,
            hidden:true,
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
                },
            },
            value: [],
        });

        await Api.Post.getAll();
        if(this.model.list.value.length === 0) this.addPosts();
        this.model = { ...this.model };
    }

    addPosts() {
        this.model.list.value = [];
        let posts = Api.Post.all
            .filter((p: any) => p.hasOwnProperty("page") && p.page)
            .sort((a: any, b: any) => (a.id < b.id ? 1 : -1));

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
            newItem.value.tag.value = post.tags;
        }
        return newItem;
    }

    get isEmpty(): boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
