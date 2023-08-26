<template>
    <div>
        <img src="/blocks/AndroidTv.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class HomeAndroidTv extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        this.addItem('title', {
            id: 0,
            type: StructureType.Text,
            title: 'Title',
            value: '<h2>Android TV.</h2><h2>A Smart TV Platform.</h2>'
        });
        this.addItem('list', {
            id: 3, type: StructureType.List,
            title: 'List',
            newItem: {
                image: {
                    id: 0,
                    type: StructureType.Image,
                    title: 'Image',
                    src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/section-11-android.jpg',
                    alt: 'Image Alt'
                },
                title: {id: 1, type: StructureType.String, title: 'Tab Title', value: 'Android TV'},
                text: {
                    id: 2,
                    type: StructureType.Text,
                    title: 'Tab Text',
                    value: 'Bring great content to the biggest screen in your home. With a super clean and "easy to use" interface, you can install apps from the Google Play Store, stream content from your favorite streaming services, and even use Chromecast to mirror your phone or tablet directly to the big screen.'
                }
            },
            value: [
                {
                    image: {
                        id: 0,
                        type: StructureType.Image,
                        title: 'Image',
                        src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/section-11-android.jpg',
                        alt: 'Image Alt'
                    },
                    title: {id: 1, type: StructureType.String, title: 'Tab Title', value: 'Android TV'},
                    text: {
                        id: 2,
                        type: StructureType.Text,
                        title: 'Tab Text',
                        value: 'Bring great content to the biggest screen in your home. With a super clean and "easy to use" interface, you can install apps from the Google Play Store, stream content from your favorite streaming services, and even use Chromecast to mirror your phone or tablet directly to the big screen.'
                    }
                },
                {
                    image: {
                        id: 0,
                        type: StructureType.Image,
                        title: 'Image',
                        src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/section-11-google.jpg',
                        alt: 'Image Alt'
                    },
                    title: {
                        id: 1,
                        type: StructureType.String,
                        title: 'Tab Title',
                        value: 'Works with Hey Google'
                    },
                    text: {
                        id: 2,
                        type: StructureType.Text,
                        title: 'Tab Text',
                        value: 'The elegant voice remote works with Hey Google so you can use your voice to quickly navigate to your favorite content, change the volume, search YouTube, and many other shortcuts so you spend less time button mashing and more time enjoying your content.'
                    }
                },
            ]
        });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    addItem(name: string, item: any) {
        if (!this.model.hasOwnProperty(name)) this.model[name] = item;
        this.model[name].id = item.id;

        if (this.model[name].type !== item.type) this.model[name].type = item.type;
        if (item.type === StructureType.Image) {
            this.model[name].src = '';
            this.model[name].alt = 'Image Alt';
        }
        if (item.type === StructureType.List) {
            this.model[name].newItem = item.newItem;
        }
        if (item.type === StructureType.Select) {
            this.model[name].items = item.items;
        }
    }
}
</script>
