<template>
    <div>
        <div class="tw-flex tw-flex-wrap tw-items-center tw-bg-gray-50 tw-rounded-lg">

            <template v-for="(item, index) in items">
                <div class="divider" v-if="item.type === 'divider'" :key="`divider${index}`" />
                <div class="tw-w-full" v-else-if="item.type === 'new-line'" :key="`new-line${index}`" />
                <editor-menu-item v-else :key="index" v-bind="item" />
            </template>
        </div>

        <div v-if="table.enable"
            class="tw-flex tw-items-center tw-space-x-1 tw-bg-gray-50 tw-px-2 tw-py-1 tw-rounded-lg tw-mt-2">
            <span>Insert Table , rows : </span>
            <input class="tw-px-1 tw-bg-white tw-w-10" type="number" placeholder="rows" v-model="table.rows" />
            <span> columns : </span>
            <input class="tw-px-1 tw-bg-white tw-w-10" type="number" placeholder="columns" v-model="table.columns" />
            <button @click="addTable" class="tw-px-1 tw-text-blue-500">
                Insert
            </button>
            <button @click="table.enable = false" class="tw-px-1 tw-text-red-500">
                cancel
            </button>
        </div>

        <div v-if="color.enable"
            class="tw-flex tw-items-center tw-space-x-1 tw-bg-gray-50 tw-p-2 tw-py-1 tw-rounded-lg tw-mt-2">
            <button v-for="color in color.items" :key="color" @click="setColor(color)">
                <div class="tw-w-4 tw-h-4" :style="{ backgroundColor: color }" />
            </button>

            <button @click="color.enable = false" class="tw-px-1 tw-text-red-500">
                cancel
            </button>
        </div>
        <v-dialog v-model="linkDialog" transition="dialog-bottom-transition" max-width="600">
            <v-card elevation="0" class="pa-6">
                <v-row class="mx-0">
                    <v-col cols="12">
                        <h5>
                            Please enter hyperlink address and it's open status:
                        </h5>
                    </v-col>
                    <v-col cols="12">
                        <label>Url</label>
                        <v-text-field hide-details v-model="link.url" outlined />
                    </v-col>
                    <v-col cols="12">
                        <label>Open In</label>
                        <v-select v-model="link.target" :items="targetTypes" outlined />
                    </v-col>
                    <v-col cols="12" class="text-right">
                        <v-btn color="primary" @click="setLink">Ok</v-btn>
                        <v-btn color="primary" outlined @click="closeDialog">Cancel</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";

export default {
    components: {
        MenuItem,
    },
    props: {
        editor: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            linkDialog: false,
            targetTypes: [
                { text: "Current Tab", value: "_self" },
                { text: "New Tab", value: "_blank" },
            ],
            link: { url: "", target: "_self" },
            color: {
                enable: false,
                items: [
                    "#00AAA6",
                    "#00CCCC",
                    "#000000",
                    "#101010",
                    "#252525",
                    "#FFFFFF",
                    "#EAEAEA",
                    "#D9D9D9",
                    "#F6F7FD",
                    "#9747FF",
                    "#1E518A",
                    "#0C4955",
                    "#ffbbf3",
                    "#2b0038",
                ],
                value: "",
            },
            table: {
                enable: false,
                rows: 3,
                columns: 4,
            },
            items: [
                {
                    icon: "mdi-format-bold",
                    title: "Bold",
                    action: () =>
                        this.editor.chain().focus().toggleBold().run(),
                    isActive: () => this.editor.isActive("bold"),
                },
                {
                    icon: "mdi-format-italic",
                    title: "Italic",
                    action: () =>
                        this.editor.chain().focus().toggleItalic().run(),
                    isActive: () => this.editor.isActive("italic"),
                },
                {
                    icon: "mdi-format-strikethrough-variant",
                    title: "Strike",
                    action: () =>
                        this.editor.chain().focus().toggleStrike().run(),
                    isActive: () => this.editor.isActive("strike"),
                },
                {
                    icon: "mdi-code-not-equal-variant",
                    title: "Code",
                    action: () =>
                        this.editor.chain().focus().toggleCode().run(),
                    isActive: () => this.editor.isActive("code"),
                },
                {
                    icon: "mdi-grease-pencil",
                    title: "Highlight",
                    action: () =>
                        this.editor.chain().focus().toggleHighlight().run(),
                    isActive: () => this.editor.isActive("highlight"),
                },
                {
                    type: "divider",
                },
                {
                    icon: "mdi-format-align-left",
                    title: "left",
                    action: () =>
                        this.editor.chain().focus().setTextAlign("left").run(),
                    isActive: () => this.editor.isActive("left"),
                },
                {
                    icon: "mdi-format-align-center",
                    title: "center",
                    action: () =>
                        this.editor
                            .chain()
                            .focus()
                            .setTextAlign("center")
                            .run(),
                    isActive: () => this.editor.isActive("center"),
                },
                {
                    icon: "mdi-format-align-right",
                    title: "right",
                    action: () =>
                        this.editor.chain().focus().setTextAlign("right").run(),
                    isActive: () => this.editor.isActive("right"),
                },
                {
                    icon: "mdi-format-align-justify",
                    title: "justify",
                    action: () =>
                        this.editor
                            .chain()
                            .focus()
                            .setTextAlign("justify")
                            .run(),
                    isActive: () => this.editor.isActive("justify"),
                },
                // {
                //   icon: 'mdi-format-align-left',
                //   title: 'Unset Text Align',
                //   action: () => this.editor.chain().focus().unsetTextAlign().run(),
                // },
                {
                    type: "divider",
                },
                {
                    icon: "mdi-format-color-text",
                    title: "Text Color",
                    action: this.enableColor,
                },
                {
                    type: "divider",
                },
                {
                    icon: "LI",
                    title: "Light",
                    action: () =>
                        this.editor.chain().focus().setFontWeight("300").run(),
                    isActive: () => this.editor.isActive("300"),
                },
                {
                    icon: "RE",
                    title: "Regular",
                    action: () =>
                        this.editor.chain().focus().setFontWeight("400").run(),
                    isActive: () => this.editor.isActive("400"),
                },
                {
                    icon: "ME",
                    title: "Medium",
                    action: () =>
                        this.editor.chain().focus().setFontWeight("500").run(),
                    isActive: () => this.editor.isActive("500"),
                },
                {
                    type: "divider",
                },
                {
                    icon: "H1",
                    title: "Heading 1",
                    action: () =>
                        this.editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 1 })
                            .run(),
                    isActive: () =>
                        this.editor.isActive("heading", { level: 1 }),
                },
                {
                    icon: "H2",
                    title: "Heading 2",
                    action: () =>
                        this.editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run(),
                    isActive: () =>
                        this.editor.isActive("heading", { level: 2 }),
                },
                {
                    icon: "H3",
                    title: "Heading 3",
                    action: () =>
                        this.editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 3 })
                            .run(),
                    isActive: () =>
                        this.editor.isActive("heading", { level: 3 }),
                },
                {
                    icon: "H4",
                    title: "Heading 4",
                    action: () =>
                        this.editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 4 })
                            .run(),
                    isActive: () =>
                        this.editor.isActive("heading", { level: 4 }),
                },
                {
                    icon: "H5",
                    title: "Heading 5",
                    action: () =>
                        this.editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 5 })
                            .run(),
                    isActive: () =>
                        this.editor.isActive("heading", { level: 5 }),
                },
                {
                    icon: "H6",
                    title: "Heading 6",
                    action: () =>
                        this.editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 6 })
                            .run(),
                    isActive: () =>
                        this.editor.isActive("heading", { level: 6 }),
                },
                {
                    icon: "mdi-format-paragraph",
                    title: "Paragraph",
                    action: () =>
                        this.editor.chain().focus().setParagraph().run(),
                    isActive: () => this.editor.isActive("paragraph"),
                },
                {
                    icon: "mdi-format-list-bulleted",
                    title: "Bullet List",
                    action: () =>
                        this.editor.chain().focus().toggleBulletList().run(),
                    isActive: () => this.editor.isActive("bulletList"),
                },
                {
                    icon: "mdi-format-list-bulleted",
                    title: "Ordered List",
                    action: () =>
                        this.editor.chain().focus().toggleOrderedList().run(),
                    isActive: () => this.editor.isActive("orderedList"),
                },
                {
                    icon: "mdi-format-list-checks",
                    title: "Task List",
                    action: () =>
                        this.editor.chain().focus().toggleTaskList().run(),
                    isActive: () => this.editor.isActive("taskList"),
                },
                {
                    icon: "mdi-code-tags",
                    title: "Code Block",
                    action: () =>
                        this.editor.chain().focus().toggleCodeBlock().run(),
                    isActive: () => this.editor.isActive("codeBlock"),
                },
                {
                    type: "divider",
                },
                {
                    icon: "mdi-format-quote-close",
                    title: "Blockquote",
                    action: () =>
                        this.editor.chain().focus().toggleBlockquote().run(),
                    isActive: () => this.editor.isActive("blockquote"),
                },
                {
                    icon: "mdi-dots-horizontal",
                    title: "Horizontal Rule",
                    action: () =>
                        this.editor.chain().focus().setHorizontalRule().run(),
                },
                {
                    type: "divider",
                },
                {
                    icon: "mdi-wrap",
                    title: "Hard Break",
                    action: () =>
                        this.editor.chain().focus().setHardBreak().run(),
                },
                {
                    icon: "mdi-format-clear",
                    title: "Clear Format",
                    action: () =>
                        this.editor
                            .chain()
                            .focus()
                            .clearNodes()
                            .unsetAllMarks()
                            .run(),
                },
                {
                    type: "divider",
                },
                {
                    icon: "mdi-undo",
                    title: "Undo",
                    action: () => this.editor.chain().focus().undo().run(),
                },
                {
                    icon: "mdi-redo",
                    title: "Redo",
                    action: () => this.editor.chain().focus().redo().run(),
                },

                {
                    type: "new-line",
                },

                {
                    icon: "mdi-link-variant",
                    title: "Link",
                    action: this.openDialog,
                },
                {
                    icon: "mdi-file-video",
                    title: "Insert Video",
                    action: this.addVideo,
                },
                {
                    icon: "mdi-image",
                    title: "Insert Image",
                    action: this.addImage,
                },
                {
                    type: "divider",
                },
                {
                    icon: "mdi-table",
                    title: "Insert Table",
                    action: this.enableTable,
                },

                {
                    icon: "mdi-table-column-plus-before",
                    title: "Add Column Before",
                    action: () =>
                        this.editor.chain().focus().addColumnBefore().run(),
                },
                {
                    icon: "mdi-table-column-plus-after",
                    title: "addColumnAfter",
                    action: () =>
                        this.editor.chain().focus().addColumnAfter().run(),
                },
                {
                    icon: "mdi-table-column-remove",
                    title: "deleteColumn",
                    action: () =>
                        this.editor.chain().focus().deleteColumn().run(),
                },
                {
                    icon: "mdi-table-row-plus-before",
                    title: "addRowBefore",
                    action: () =>
                        this.editor.chain().focus().addRowBefore().run(),
                },
                {
                    icon: "mdi-table-row-plus-after",
                    title: "addRowAfter",
                    action: () =>
                        this.editor.chain().focus().addRowAfter().run(),
                },
                {
                    icon: "mdi-table-row-remove",
                    title: "deleteRow",
                    action: () => this.editor.chain().focus().deleteRow().run(),
                },
                {
                    icon: "Delete",
                    title: "deleteTable",
                    action: () =>
                        this.editor.chain().focus().deleteTable().run(),
                },
                {
                    icon: "Merge Cell",
                    title: "mergeCells",
                    action: () =>
                        this.editor.chain().focus().mergeCells().run(),
                },
                {
                    icon: "Split Cell",
                    title: "splitCell",
                    action: () => this.editor.chain().focus().splitCell().run(),
                },
                {
                    icon: "TH",
                    title: "toggleHeaderColumn",
                    action: () =>
                        this.editor.chain().focus().toggleHeaderColumn().run(),
                },
                {
                    icon: "THR",
                    title: "toggleHeaderRow",
                    action: () =>
                        this.editor.chain().focus().toggleHeaderRow().run(),
                },
                {
                    icon: "THC",
                    title: "toggleHeaderCell",
                    action: () =>
                        this.editor.chain().focus().toggleHeaderCell().run(),
                },
                {
                    icon: "MS",
                    title: "mergeOrSplit",
                    action: () =>
                        this.editor.chain().focus().mergeOrSplit().run(),
                },
                // {
                //   icon: 'mdi-redo',
                //   title: 'setCellAttribute',
                //   action: () => this.editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()
                // },
                {
                    icon: "FX",
                    title: "fixTables",
                    action: () => this.editor.chain().focus().fixTables().run(),
                },
                // {
                //   type : 'new-line'
                // },

                // {
                //   icon: 'mdi-redo',
                //   title: 'goToNextCell',
                //   action: () => this.editor.chain().focus().goToNextCell().run(),
                // },
                // {
                //   icon: 'mdi-redo',
                //   title: 'goToPreviousCell',
                //   action: () => this.editor.chain().focus().goToPreviousCell().run(),
                // },
            ],
        };
    },
    methods: {
        setLink() {
            // const previousUrl = this.editor.getAttributes("link").href;
            // const url = window.prompt("URL", previousUrl);
            // const target = window.prompt("Open in", previousUrl);

            this.linkDialog = false;

            // cancelled
            if (this.link.url === null) return;
            // alert("Im not null");
            // empty
            if (this.link.url === "") {
                this.editor
                    .chain()
                    .focus()
                    .extendMarkRange("link")
                    .unsetLink()
                    .run();
                return;
            }
            // update link

            this.editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({
                    href: this.link.url,
                    target: this.link.target,
                })
                .run();
            this.link = { url: "", target: "_self" };
        },
        enableTable() {
            this.table.enable = true;
        },
        enableColor() {
            this.color.enable = true;
        },
        addTable() {
            this.editor
                .chain()
                .focus()
                .insertTable({
                    rows: this.table.rows,
                    cols: this.table.columns,
                    withHeaderRow: true,
                })
                .run();
        },
        addImage() {
            const url = window.prompt("URL");

            if (url) {
                this.editor.chain().focus().setImage({ src: url }).run();
            }
        },
        addVideo() {
            const url = prompt("Enter YouTube URL");
            if (url) {
                this.editor.commands.setYoutubeVideo({
                    src: url,
                    width: "100%",
                    // width: Math.max(320, parseInt(this.width, 10)) || 640,
                    // height: Math.max(180, parseInt(this.height, 10)) || 480,
                });
            }
        },
        setColor(color) {
            this.editor.chain().focus().setColor(color).run();
        },
        openDialog() {
            this.linkDialog = true;
        },
        closeDialog() {
            this.linkDialog = false;
            this.link = { url: "", target: "_self" };
        },
    },
};
</script>

<style lang="scss">
.divider {
    width: 2px;
    height: 1.25rem;
    background-color: rgba(#000, 0.1);
    margin-left: 0.5rem;
    margin-right: 0.75rem;
}
</style>