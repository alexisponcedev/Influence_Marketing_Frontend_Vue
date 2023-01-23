<template>
    <div class="width-100">
        <v-dialog
            v-model="dialog"
            width="500"
            scrollable
            content-class="dialog-box"
        >
            <v-card class="ma-0 pa-5">
                <v-container>
                    <v-row justify="space-between" align="center" class="mx-0 tw-mb-7">
                        <p
                            class="tw-font-semibold tw-text-xl tw-text-[#212121]"
                        >
                            Want to save changes to “page name”?
                        </p>
                        <button @click="dialog = false">
                            <v-icon color="black" large>mdi-close</v-icon>
                        </button>
                    </v-row>
                    <v-row justify="space-between" align="center" class="mx-0">
                        <v-btn
                            outlined
                            color="grey darken-4"
                            class="control-btns tw-w-[48%] tw-py-7"
                            elevation="0"
                            @click="checkLockAndExit"
                        >
                            Don’t save
                        </v-btn>
                        <v-btn
                            color="grey darken-4 white--text"
                            class="control-btns tw-w-[48%] tw-py-7"
                            elevation="0"
                            @click="dialogSave"
                        >
                            Save and exit
                        </v-btn>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from "vue-property-decorator";

@Component
export default class PageDiscardDialog extends Vue {
    @Prop(Function) readonly dialogSave!: ()=>{};
    @Prop(Function) readonly checkLockAndExit!: ()=>{};
    @VModel({type: Boolean}) dialog!: boolean;
}
</script>
