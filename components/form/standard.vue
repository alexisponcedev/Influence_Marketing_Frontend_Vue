<template>
    <v-container>
        <v-form ref="form" @submit.prevent="submit">
            <v-row>
                <template v-for="(field, index) in fields">
                    <template v-if="!field.if || field.if()">
                        <component
                            v-if="field.modelKey"
                            :key="index"
                            :field="field"
                            :is="field.type"
                            v-model="model[field.modelKey]"
                        />
                        <template v-else>
                            <component
                                v-if="field.valueFunc"
                                :field="field"
                                v-model="model"
                                :is="field.type"
                                :key="'1-' + index"
                            />
                            <component
                                v-else
                                :field="field"
                                :is="field.type"
                                :key="'2-' + index"
                            />
                        </template>
                    </template>
                </template>
            </v-row>
            <v-row v-if="fields.length && !preview">
                <v-col>
                    <v-btn class="float-right" color="success" @click="submit">
                        {{ submitButtonText }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
        <loading-overlay :show="loading"/>
    </v-container>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from "vue-property-decorator";
import {Dictionary, FormField} from "@/models";

@Component
export default class StandardForm extends Vue {
    @Prop({default: () => <Object>{}}) readonly model?: Dictionary<String>;
    @Prop({default: "Save"}) readonly submitButtonText!: string;
    @Prop(Array) readonly fields?: Array<FormField>;
    @Prop(Boolean) readonly loading!: Boolean;
    @Prop(Boolean) readonly preview!: Boolean;

    @Emit("submit")
    submit() {
    }

    validate() {
        return (this.$refs.form as any).validate();
    }
}
</script>
