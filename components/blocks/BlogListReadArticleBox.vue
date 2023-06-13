<template>
    <div>
        <img src="/blocks/BlogListReadArticleBox.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import { Api } from "@/store";

@Component
export default class BlogListReadArticleBox extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    Api = Api;
    async mounted() {
        blockAddItem(this.model, "image", {
            id: 0,
            type: StructureType.Image,
            title: "Image",
            src: "",
            alt: "",
        });
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.String,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "tag", {
            id: 2,
            type: StructureType.String,
            title: "Tag",
            value: "",
        });
        blockAddItem(this.model, "link", {
            id: 3,
            type: StructureType.Url,
            target: "_self",
            title: "READ ARTICLE",
            value: "",
        });

        await Api.Post.getAll();
        let posts = Api.Post.all
            .filter((p: any) => p.hasOwnProperty("page") && p.page)
            .sort((a: any, b: any) => (a.id < b.id ? 1 : -1));

        let post: any = posts[0];
        if (!this.model.title.value) this.updatePost(post);
        this.model = { ...this.model };
    }

    updatePost(post: any) {
        let imageMeta = post.page.meta.find(
            (i: any) => i.name.includes("og:image") && i.content != null
        );
        if (imageMeta) this.model.image.src = imageMeta.content;
        this.model.title.value = post.page.title;
        this.model.link.value = post.page.route;
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
