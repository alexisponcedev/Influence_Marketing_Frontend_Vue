<template>
    <div v-if="editor">
        <Editor-menu-bar :editor="editor" class="tw-mb-1" />
        <editor-content :editor="editor" />
    </div>
</template>

<script>
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-2";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

import Bold from "@tiptap/extension-bold";

const BoldExtend = Bold.extend({

    addAttributes() {
        return {
            fontWeight: {
                default: '400',
                parseHTML: element => element.style.fontWeight || '400',
                renderHTML: attributes => {
                    return { style: `font-weight: ${attributes.fontWeight}` }
                },
            },
        }
    },

    addCommands() {
        return {
            setFontWeight: (weight) => ({ commands }) => {
                return commands.setMark(this.name, { fontWeight: weight })
            },

            unsetFontWeight: () => ({ commands }) => {
                return commands.resetAttributes('fontWeight')
            },
        }
    },

});

export default {
    components: {
        EditorContent,
    },

    props: {
        value: {
            type: String,
            default: "",
        },
    },

    emits: ["update:value"],

    data() {
        return {
            editor: null,
        };
    },

    watch: {
        value(value) {
            // HTML
            const isSame = this.editor.getHTML() === value;

            // JSON
            // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

            if (isSame) {
                return;
            }

            this.editor.commands.setContent(value, false);
        },
    },

    mounted() {
        this.editor = new Editor({
            extensions: [
                StarterKit,
                Document,
                BoldExtend,
                Paragraph,
                Link.configure({
                    // protocols: ['ftp', 'mailto'],
                }),
                Text,
                TextStyle,
                TextAlign.configure({
                    types: ["heading", "paragraph"],
                }),
                Image,
                Youtube.configure({
                    inline: true,
                    width: "100%",
                }),
                Table.configure({
                    resizable: true,
                }),
                TableCell,
                TableRow,
                TableHeader,
                Color,
                Heading.configure({
                    levels: [1, 2, 3, 4, 5, 6],
                }),
            ],
            content: this.value,
            onUpdate: () => {
                // HTML
                // this.$emit('update:modelValue', this.editor.getHTML())
                this.$emit("input", this.editor.getHTML());

                // JSON
                // this.$emit('update:modelValue', this.editor.getJSON())
            },
        });
    },

    beforeUnmount() {
        this.editor.destroy();
    },
};
</script>

<style lang="scss">
.ProseMirror {
    padding: 7px;
    border: 1px solid #919191;
    border-radius: 6px;

    table {
        border-collapse: collapse;
        table-layout: fixed;
        width: 100%;
        margin: 0;
        overflow: hidden;

        td,
        th {
            min-width: 1em;
            border: 2px solid #ced4da;
            padding: 3px 5px;
            vertical-align: top;
            box-sizing: border-box;
            position: relative;

            >* {
                margin-bottom: 0;
            }
        }

        th {
            font-weight: bold;
            text-align: left;
            background-color: #f1f3f5;
        }

        .selectedCell:after {
            z-index: 2;
            position: absolute;
            content: "";
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: rgba(200, 200, 255, 0.4);
            pointer-events: none;
        }

        .column-resize-handle {
            position: absolute;
            right: -2px;
            top: 0;
            bottom: -2px;
            width: 4px;
            background-color: #adf;
            pointer-events: none;
        }

    }

    /* strong {
        font-weight: bold;
    } */

    p {
        margin-bottom: 2px;
    }

    a {
        //color: #68CEF8;
        text-decoration: underline;
    }

    img {
        max-width: 100%;
        height: auto;

        &.ProseMirror-selectednode {
            outline: 3px solid #68cef8;
        }
    }
}

.is-active {
     font-weight: bold;
}
</style>