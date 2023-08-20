<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-skyblue">
            <div class="container_small tw-mx-auto tw-px-4 tw-py-[60px]">
                <h3
                    class="tw-text-center tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-midnight -tw-tracking-wide tw-uppercase tw-mb-[30px]"
                    v-html="model.title.value"
                ></h3>
                <form>
                    <div class="form">
                        <div class="form_control tw-col-span-12">
                            <input type="text" placeholder="Comapny" />
                        </div>
                        <div
                            class="form_control tw-col-span-12 md:tw-col-span-6"
                        >
                            <input type="text" placeholder="First name" />
                        </div>
                        <div
                            class="form_control tw-col-span-12 md:tw-col-span-6"
                        >
                            <input type="text" placeholder="Last name" />
                        </div>
                        <div
                            class="form_control tw-col-span-12 md:tw-col-span-6"
                        >
                            <input type="text" placeholder="Phone number" />
                        </div>
                        <div
                            class="form_control tw-col-span-12 md:tw-col-span-6"
                        >
                            <input type="email" placeholder="Email" />
                        </div>
                        <div class="form_control tw-col-span-12">
                            <textarea
                                name=""
                                id=""
                                placeholder="Tell us about your project"
                                cols="{30}"
                                rows="{1}"
                            ></textarea>
                        </div>
                    </div>
                    <div class="tw-text-center">
                        <button
                            class="btn tw-block tw-w-fit tw-mx-auto tw-cursor-pointer tw-tracking-wide tw-mt-[14px] hover:tw-text-skyblue"
                        >
                            send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class TeamMemberContact extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "title",
            value: "",
        });
        blockAddItem(this.model, "title", {
            id: 2,
            type: StructureType.Color,
            title: "Background Color",
            value: "#B6DCE4",
        });
        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
