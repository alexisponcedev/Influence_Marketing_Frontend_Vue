<template>
    <div>
        <img src="/blocks/FeatureBadges.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlockFeatureBadges extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({type: Object}) model!: any;

    Theme = Theme;

    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
                }
            }
        } else
            this.model = {
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        {title: "Light", value: this.Theme.light},
                        {title: "Dark", value: this.Theme.dark},
                    ],
                },


                list: {
                    id: 1,
                    type: StructureType.List,
                    title: 'Items',
                    newItem: {
                        link: {id: 0, type: StructureType.Url, title: 'Link URL', value: '/'},
                        image: {
                            id: 1,
                            type: StructureType.Image,
                            title: 'Image',
                            src: 'https://assets.hisense-usa.com/resources/themes/default/images/common/logo.svg',
                            alt: 'Image Data',
                        },
                    },
                    value: [
                        {
                            title: {
                                id: 1,
                                type: StructureType.String,
                                title: 'Title',
                                value: '“The Hisense U8H is the sort of TV that makes a mockery of much more expensive TVs that literally pale in comparison”'
                            },

                            image: {
                                id: 2,
                                type: StructureType.Image,
                                title: 'Image',
                                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/e1ace38e4e/dt_logo__ScaleMaxWidthWzMwNDhd.png-es25z4.png',
                                alt: 'Image Alt'
                            },
                        }
                    ]
                },
            };
    }

    mounted() {
        if (this.isEmpty) this.reset();
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    @Watch('isEmpty')
    onValueChanged() {

        if (this.isEmpty) this.reset();
    }
}
</script>
