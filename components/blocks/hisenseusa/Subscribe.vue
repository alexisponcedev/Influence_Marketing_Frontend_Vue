<template>
    <div
        v-if="!isEmpty"
        class="main-container tw-flex tw-items-center tw-justify-around"
    >
        <div class="title">{{ model.title.value }}</div>
        <div class="xBorder tw-flex tw-items-center tw-justify-between">
            <div class="xPlaceholder">Enter Your Email here</div>
            <div class="xButton">Subscribe</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";

@Component
export default class LandingVideoPlayer extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    reset(oldValue: any = {}) {
        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue,
                ...{
                    backgroundColor: {
                        id: 7,
                        type: StructureType.Color,
                        title: "Background color",
                        value: "#fff",
                    },
                },
            };
        } else
            this.model = {
                title: {
                    id: 0,
                    type: StructureType.String,
                    title: "Title",
                    value:
                        "Stay up to date with emails\n" +
                        "about new products & other news",
                },
                Url: {
                    id: 1,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Submit URL",
                    value: "https://imcrm.dev-api.hisenseportal.com/api/hisense/lead",
                },
            };
    }

    mounted() {
        if (this.isEmpty) this.reset();
    }

    // clicked() {
    //   console.log('you have clicked me easily ');
    //   this.$emit('click');
    // }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    @Watch("isEmpty")
    onValueChanged() {
        if (this.isEmpty) this.reset();
    }
}
</script>

<style scoped>
.main-container {
    background-color: #1e1e1e;
    height: 312px;
}

.title {
    font-family: "hisense", serif !important;
    font-style: normal;
    font-weight: 500;
    font-size: 26px !important;
    line-height: 48px;
    color: #ffffff;
    max-width: 500px;
}

.xBorder {
    min-width: 443px;
    border-bottom: 1px solid #545454;
}

.xPlaceholder {
    font-family: "hisense", serif !important;
    font-style: normal;
    font-weight: 500;
    font-size: 20px !important;
    line-height: 48px !important;
    color: #ffffff;
    opacity: 0.25;
}

.xButton {
    font-family: "hisense", serif !important;
    font-style: normal;
    font-weight: 500;
    font-size: 20px !important;
    line-height: 48px;
    color: #ffffff;
}
</style>
