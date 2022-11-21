<template>
    <div>
        <img src="/blocks/LightRejection.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class HomeLightRejection extends Vue {
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
                title: {id: 0, type: StructureType.String, title: 'Title', value: 'Ambient Light Rejecting Screen'},
                video: {
                    id: 1,
                    type: StructureType.Video,
                    title: 'Video',
                    value: 'https://player.vimeo.com/external/589889855.hd.mp4?s=0fba3ac86e1b0c5735abb3170225682f78704a5b&profile_id=175'
                },
                text: {
                    id: 2,
                    type: StructureType.Text,
                    title: 'Text',
                    value: '<div>A perfectly paired ambient light rejecting (ALR) screen means you <span class="highlight active">don’t have to kill the lights</span> to get a <span class="highlight active">killer picture</span>. Depending on where in your home you’ll place the Laser TV, we’ve got different screen options - so take a look.</div>'
                },
                tabs: {
                    id: 3, type: StructureType.List, title: 'Tabs',
                    newItem: {
                        title: {id: 0, type: StructureType.String, title: 'Tab Title', value: 'Daylight Screen'},
                        image: {
                            id: 1,
                            type: StructureType.Image,
                            title: 'Tab Image',
                            src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/section-7-daylight.jpg',
                            alt: 'Image Alt'
                        },
                    },
                    value: [
                        {
                            title: {id: 0, type: StructureType.String, title: 'Tab Title', value: 'Daylight Screen'},
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: 'Tab Image',
                                src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/section-7-daylight.jpg',
                                alt: 'Image Alt'
                            },
                        },
                        {
                            title: {id: 0, type: StructureType.String, title: 'Tab Title', value: 'Cinema Screen'},
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: 'Tab Image',
                                src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/section-7-cinema.jpg',
                                alt: 'Image Alt'
                            },
                        }
                    ]
                },
                specs: {
                    id: 3, type: StructureType.List, title: 'Specs',
                    newItem: {
                        title: {id: 0, type: StructureType.String, title: 'Tab Title', value: 'ALR Cinema Screen'},
                        text: {
                            id: 1,
                            type: StructureType.String,
                            title: 'Tab Title',
                            value: 'Best in dedicated media rooms, man caves, and light controlled spaces, the ALR Cinema Screen produces beautiful colors over wide viewing angles. With a flat packed design, screen assembly is required but the payoff is well worth it.'
                        },
                        features: {
                            id: 2, type: StructureType.List, title: 'Features',
                            newItem: {
                                title: {id: 0, type: StructureType.String, title: 'Feature Title', value: '0.4'},
                                subtitle: {
                                    id: 1,
                                    type: StructureType.String,
                                    title: 'Feature Subtitle',
                                    value: 'Screen Gain'
                                },
                            },
                            value: [
                                {
                                    title: {id: 0, type: StructureType.String, title: 'Feature Title', value: '0.4'},
                                    subtitle: {
                                        id: 1,
                                        type: StructureType.String,
                                        title: 'Feature Subtitle',
                                        value: 'Screen Gain'
                                    },
                                },
                                {
                                    title: {id: 0, type: StructureType.String, title: 'Feature Title', value: '150 °'},
                                    subtitle: {
                                        id: 1,
                                        type: StructureType.String,
                                        title: 'Feature Subtitle',
                                        value: 'Assembly Required'
                                    },
                                },
                            ]
                        },
                    },
                    value: [
                        {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Tab Title',
                                value: 'ALR Daylight Screen'
                            },
                            text: {
                                id: 1,
                                type: StructureType.String,
                                title: 'Tab Title',
                                value: 'Best in bright, airy rooms with lots of space and lots of light. The ALR Daylight Screen creates a picture that looks a lot like a flat panel TV. The DLT100B screen features a scratch-resistant surface for worry-free usage in high-traffic rooms. Screen assembly is required.'
                            },
                            features: {
                                id: 2, type: StructureType.List, title: 'Features',
                                newItem: {
                                    title: {id: 0, type: StructureType.String, title: 'Feature Title', value: '0.4'},
                                    subtitle: {
                                        id: 1,
                                        type: StructureType.String,
                                        title: 'Feature Subtitle',
                                        value: 'Screen Gain'
                                    },
                                },
                                value: [
                                    {
                                        title: {
                                            id: 0,
                                            type: StructureType.String,
                                            title: 'Feature Title',
                                            value: '1.2'
                                        },
                                        subtitle: {
                                            id: 1,
                                            type: StructureType.String,
                                            title: 'Feature Subtitle',
                                            value: 'Screen Gain'
                                        },
                                    },
                                    {
                                        title: {
                                            id: 0,
                                            type: StructureType.String,
                                            title: 'Feature Title',
                                            value: 'Zero'
                                        },
                                        subtitle: {
                                            id: 1,
                                            type: StructureType.String,
                                            title: 'Feature Subtitle',
                                            value: 'Assembly Required'
                                        },
                                    },
                                ]
                            },
                        },
                        {
                            title: {id: 0, type: StructureType.String, title: 'Tab Title', value: 'ALR Cinema Screen'},
                            text: {
                                id: 1,
                                type: StructureType.String,
                                title: 'Tab Title',
                                value: 'Best in dedicated media rooms, man caves, and light controlled spaces, the ALR Cinema Screen produces beautiful colors over wide viewing angles. With a flat packed design, screen assembly is required but the payoff is well worth it.'
                            },
                            features: {
                                id: 2, type: StructureType.List, title: 'Features',
                                newItem: {
                                    title: {id: 0, type: StructureType.String, title: 'Feature Title', value: '0.4'},
                                    subtitle: {
                                        id: 1,
                                        type: StructureType.String,
                                        title: 'Feature Subtitle',
                                        value: 'Screen Gain'
                                    },
                                },
                                value: [
                                    {
                                        title: {
                                            id: 0,
                                            type: StructureType.String,
                                            title: 'Feature Title',
                                            value: '0.4'
                                        },
                                        subtitle: {
                                            id: 1,
                                            type: StructureType.String,
                                            title: 'Feature Subtitle',
                                            value: 'Screen Gain'
                                        },
                                    },
                                    {
                                        title: {
                                            id: 0,
                                            type: StructureType.String,
                                            title: 'Feature Title',
                                            value: '150 °'
                                        },
                                        subtitle: {
                                            id: 1,
                                            type: StructureType.String,
                                            title: 'Feature Subtitle',
                                            value: 'Assembly Required'
                                        },
                                    },
                                ]
                            },
                        },
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
