<template>
    <div>
        <img src="/blocks/BlogListSoundBarItemsBox.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Api } from "@/store";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BlogListSoundBarItemsBox extends Vue {
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
        blockAddItem(this.model, "list", {
            id: 2,
            type: StructureType.List,
            title: "List",
            hidden:true,
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

        for (let i = 0; i < this.model.count.value; i++) {
            this.model.list.value.push(this.addPost(posts[i]));
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
        };
        if (post) {
            let imageMeta = post.page.meta.find(
                (i: any) => i.name.includes("og:image") && i.content != null
            );
            if (imageMeta) newItem.image.src = imageMeta.content;
            newItem.title.value = post.page.title;
            newItem.link.value = post.page.route;
        }
        return newItem;
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
