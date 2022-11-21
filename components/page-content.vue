<template>
    <v-card>
        <v-card-title>
            <v-btn outlined small color="primary" @click="addKey">
                <v-icon left>mdi-plus</v-icon>
                Add New Key
            </v-btn>
            <v-spacer/>
            <v-btn
                outlined
                small
                color="danger"
                @click="
          AppStore.showDeleteConfirmationModal({
            deleteItemTitle: 'this page',
            agreeButton: {
              callback: (page) => $emit('delete-page', page),
            },
          })
        "
            >
                <v-icon left>mdi-delete</v-icon>
                Delete Page
            </v-btn>
        </v-card-title>
        <v-card-text>
            <v-row v-for="(content, index) in contentsArray" :key="index">
                <v-col cols="2">
                    <v-text-field
                        hide-details
                        v-model="content.key"
                        prepend-icon="mdi-minus"
                        @click:prepend="removeKey(index)"
                    />
                </v-col>
                <v-col cols="10">
                    <v-text-field hide-details v-model="content.value"/>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import {AppStore} from "@/store";

@Component
export default class PageContent extends Vue {
    @Prop(String) readonly data!: string;

    AppStore = AppStore;

    pageContents: any = JSON.parse(this.data || "{}") || {};
    contentsArray: Array<{ key: string; value: string }> = Object.keys(
        this.pageContents
    ).map((key) => <any>{key: key, value: this.pageContents[key]});

    @Watch("contentsArray", {deep: true})
    dataUpdated() {
        this.$emit(
            "update:data",
            JSON.stringify(
                this.contentsArray.reduce((accumulator, content) => {
                    return {...accumulator, [content.key]: content.value};
                }, {})
            )
        );
    }

    addKey() {
        this.contentsArray.push({key: "key", value: "value"});
    }

    removeKey(index: number) {
        this.contentsArray.splice(index, 1);
    }
}
</script>
