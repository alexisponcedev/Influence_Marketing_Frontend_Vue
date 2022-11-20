<template>
    <div>
        <img src="/blocks/FineTouches.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class HomeFineTouches extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: Object

    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
                }
            }
        } else
            this.model = {
                title: {id: 0, type: StructureType.String, title: 'Title', value: 'Fine Touches for Added Convenience'},
                tabs: {
                    id: 3, type: StructureType.List, title: 'Tabs',
                    newItem: {
                        title: {id: 0, type: StructureType.String, title: 'Tab Title', value: 'Eye Safety'},
                        video: {
                            id: 1,
                            type: StructureType.Video,
                            title: 'Tab Video',
                            value: 'https://player.vimeo.com/external/585438587.hd.mp4?s=1770fbcb09cdef7b5c319e037213a1f13dfceab6&profile_id=174',
                        },
                        text: {
                            id: 2,
                            type: StructureType.Text,
                            title: 'Tab Text',
                            value: 'To protect your eyes, proximity sensors dim the lasers when something gets too close. Also, a great way to keep small children from touching the laser console.'
                        }
                    },
                    value: [
                        {
                            title: {id: 0, type: StructureType.String, title: 'Tab Title', value: 'Eye Safety'},
                            video: {
                                id: 1,
                                type: StructureType.Video,
                                title: 'Tab Video',
                                value: 'https://player.vimeo.com/external/585438587.hd.mp4?s=1770fbcb09cdef7b5c319e037213a1f13dfceab6&profile_id=174',
                            },
                            text: {
                                id: 2,
                                type: StructureType.Text,
                                title: 'Tab Text',
                                value: 'To protect your eyes, proximity sensors dim the lasers when something gets too close. Also, a great way to keep small children from touching the laser console.'
                            }
                        },
                        {
                            title: {id: 0, type: StructureType.String, title: 'Tab Title', value: 'Side USB'},
                            video: {
                                id: 1,
                                type: StructureType.Video,
                                title: 'Tab Video',
                                value: 'https://player.vimeo.com/external/585438705.hd.mp4?s=1881f08bd39598e9145f4c9e8bc50d5b2b19ee13&profile_id=174',
                            },
                            text: {
                                id: 2,
                                type: StructureType.Text,
                                title: 'Tab Text',
                                value: 'Convenient side-access USB port for connecting media drives or other USB devices without having to dig behind the laser console.'
                            }
                        },
                        {
                            title: {id: 0, type: StructureType.String, title: 'Tab Title', value: 'Modern Ports'},
                            video: {
                                id: 1,
                                type: StructureType.Video,
                                title: 'Tab Video',
                                value: 'https://player.vimeo.com/external/585438826.hd.mp4?s=aad3ed4f0ca27ecada07002aaa60a59623bb1aad&profile_id=174',
                            },
                            text: {
                                id: 2,
                                type: StructureType.Text,
                                title: 'Tab Text',
                                value: 'High-speed HDMI, multiple audio outs, built-in TV tuner, LAN, and USB 3.0 to connect all your devices.'
                            }
                        }
                    ]
                },
            }
    }

    mounted() {
        if (this.isEmpty) this.reset();
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    @Watch('value')
    onValueChanged(newValue: any, oldValue: any) {
        if (newValue && Object.keys(newValue).length === 0) this.reset(oldValue);
    }
}
</script>
