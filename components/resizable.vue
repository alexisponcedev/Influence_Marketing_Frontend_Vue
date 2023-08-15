<template>
    <div :style="style">
        <div
            ref="resizable"
            :class="innerClass"
            class="resizable_panel tw-flex"
            :style="style"
            @mousedown="startResize"
        >
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel, Watch, Prop } from "vue-property-decorator";

@Component
export default class ResizablePanel extends Vue {
    @VModel({ type: Number, default: 370 }) Width!: any;
    @Prop({ type: String, default: "resizable" }) localStorageKey!: string;
    @Prop({ type: String, default: "" }) innerClass!: string;

    start_width: number = 0;
    mouse_pos: number = 0;
    dx: number = 0;

    mounted() {
        this.Width =
            Number(localStorage.getItem(this.localStorageKey)) || this.Width;
    }

    get style() {
        return { width: this.Width + "px" };
    }

    startResize(e: MouseEvent) {
        if (e.offsetX < 4) {
            this.mouse_pos = e.x;
            this.start_width = this.Width;
            this.pauseEvent(e);
            document.addEventListener("mousemove", this.resize, false);
            document.addEventListener(
                "mouseup",
                () => {
                    document.removeEventListener(
                        "mousemove",
                        this.resize,
                        false
                    );
                },
                false
            );
        }
    }

    resize(e: MouseEvent) {
        console.log("mouse x : ", e.x);
        this.dx = this.mouse_pos - e.x;
        this.Width = this.start_width + this.dx;
    }

    @Watch("Width")
    onWidthChanged() {
        localStorage.setItem(this.localStorageKey, this.Width);
    }

    pauseEvent(e: any) {
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    }
}
</script>
<style lang="scss">
.resizable_panel {
    position: absolute;
    padding-left: 4px;
    right: 0;

    &::after {
        content: "";
        background-color: #ccc;
        position: absolute;
        left: 0;
        width: 4px;
        height: 100%;
        cursor: ew-resize;
    }
}
</style>
