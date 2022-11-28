<template>
    <div>
        <!--    <img src="/blocks/ProductsCategoriesWithSearch.png" alt=""/>-->
        <img src="/blocks/ProductsCategoriesWithSearch-old.png" alt=""/>
    </div>

</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";


@Component
export default class ProductsCategoriesWithSearch extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    categories: Array<any> = [];

    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
                }
            }
        } else
            this.model = {
                title: {
                    id: 0,
                    type: StructureType.String,
                    title: 'Top Title',
                    value: 'Select a product category to get started.'
                },
                list: {
                    id: 1,
                    type: StructureType.List,
                    title: 'Items',
                    newItem: {
                        image: {
                            id: 0,
                            type: StructureType.Image,
                            title: 'Upload Image',
                            src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png',
                            alt: 'Some note about this image',
                        },
                        title: {id: 1, type: StructureType.String, title: 'Title', value: 'Televisions'},
                        link: {id: 2, type: StructureType.Url, title: 'Shop Now', value: '/products'},
                        category: {
                            id: 3,
                            type: StructureType.Select,
                            title: 'Select Category',
                            value: this.categories.length > 0 ? this.categories[0].id : 0,
                            itemText: 'name',
                            itemValue: 'id',
                            items: this.categories
                        },
                    },
                    value: [
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: 'Upload Image',
                                src: 'https://assets.hisense-usa.com/assets/ProductCategorySupportSVGs/8d966a77dd/televisions.svg',
                                alt: 'Some note about this image',
                            },
                            title: {id: 1, type: StructureType.String, title: 'Title', value: 'Televisions'},
                            link: {id: 2, type: StructureType.Url, title: 'Shop Now', value: '/products'},
                            category: {
                                id: 3,
                                type: StructureType.Select,
                                title: 'Select Category',
                                value: this.categories.length > 0 ? this.categories[0].id : 0,
                                itemText: 'name',
                                itemValue: 'id',
                                items: this.categories
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: 'Upload Image',
                                src: 'https://assets.hisense-usa.com/assets/ProductCategorySupportSVGs/d8bed23318/refrigerators.svg',
                                alt: 'Some note about this image',
                            },
                            title: {id: 1, type: StructureType.String, title: 'Title', value: 'Soundbars'},
                            link: {id: 2, type: StructureType.Url, title: 'Shop Now', value: '/products'},
                            category: {
                                id: 3,
                                type: StructureType.Select,
                                title: 'Select Category',
                                value: this.categories.length > 0 ? this.categories[0].id : 0,
                                itemText: 'name',
                                itemValue: 'id',
                                items: this.categories
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: 'Upload Image',
                                src: 'https://assets.hisense-usa.com/assets/ProductCategorySupportSVGs/15307d4fe8/CONTENT_I-PORTABLE-AC-min.svg',
                                alt: 'Some note about this image',
                            },
                            title: {id: 1, type: StructureType.String, title: 'Title', value: 'Air Products'},
                            link: {id: 2, type: StructureType.Url, title: 'Shop Now', value: '/products'},
                            category: {
                                id: 3,
                                type: StructureType.Select,
                                title: 'Select Category',
                                value: this.categories.length > 0 ? this.categories[0].id : 0,
                                itemText: 'name',
                                itemValue: 'id',
                                items: this.categories
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: 'Upload Image',
                                src: 'https://assets.hisense-usa.com/assets/ProductCategorySupportSVGs/8c317bbc8c/dishwasher.svg',
                                alt: 'Some note about this image',
                            },
                            title: {id: 1, type: StructureType.String, title: 'Title', value: 'Refrigeration'},
                            link: {id: 2, type: StructureType.Url, title: 'Shop Now', value: '/products'},
                            category: {
                                id: 3,
                                type: StructureType.Select,
                                title: 'Select Category',
                                value: this.categories.length > 0 ? this.categories[0].id : 0,
                                itemText: 'name',
                                itemValue: 'id',
                                items: this.categories
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: 'Upload Image',
                                src: 'https://assets.hisense-usa.com/assets/ProductCategorySupportSVGs/f914ea6411/microwave-oven.svg',
                                alt: 'Some note about this image',
                            },
                            title: {id: 1, type: StructureType.String, title: 'Title', value: 'Ranges'},
                            link: {id: 2, type: StructureType.Url, title: 'Shop Now', value: '/products'},
                            category: {
                                id: 3,
                                type: StructureType.Select,
                                title: 'Select Category',
                                value: this.categories.length > 0 ? this.categories[0].id : 0,
                                itemText: 'name',
                                itemValue: 'id',
                                items: this.categories
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: 'Upload Image',
                                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png',
                                alt: 'Some note about this image',
                            },
                            title: {id: 1, type: StructureType.String, title: 'Title', value: 'Dishwashers'},
                            link: {id: 2, type: StructureType.Url, title: 'Shop Now', value: '/products'},
                            category: {
                                id: 3,
                                type: StructureType.Select,
                                title: 'Select Category',
                                value: this.categories.length > 0 ? this.categories[0].id : 0,
                                itemText: 'name',
                                itemValue: 'id',
                                items: this.categories
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: 'Upload Image',
                                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png',
                                alt: 'Some note about this image',
                            },
                            title: {id: 1, type: StructureType.String, title: 'Title', value: 'Microwave Ovens'},
                            link: {id: 2, type: StructureType.Url, title: 'Shop Now', value: '/products'},
                            category: {
                                id: 3,
                                type: StructureType.Select,
                                title: 'Select Category',
                                value: this.categories.length > 0 ? this.categories[0].id : 0,
                                itemText: 'name',
                                itemValue: 'id',
                                items: this.categories
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: 'Upload Image',
                                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png',
                                alt: 'Some note about this image',
                            },
                            title: {id: 1, type: StructureType.String, title: 'Title', value: 'Kitchen-Suite'},
                            link: {id: 2, type: StructureType.Url, title: 'Shop Now', value: '/products'},
                            category: {
                                id: 3,
                                type: StructureType.Select,
                                title: 'Select Category',
                                value: this.categories.length > 0 ? this.categories[0].id : 0,
                                itemText: 'name',
                                itemValue: 'id',
                                items: this.categories
                            },
                        },
                    ]
                },
            }
    }

    async mounted() {
        this.categories = (await this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/getCategories')).data
        if (this.isEmpty) this.reset();
        else {
            this.model.list.value.forEach((item: any) => {
                if (item.category) item.category.items = this.categories;
            })
            if (this.model.list.newItem.category)
                this.model.list.newItem.category.items = this.categories;
        }

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

<style scoped>
.main-title {
    font-family: 'hisense', serif;
    font-style: normal;
    font-weight: 500;
    font-size: 42px;
    line-height: 48px;

    text-align: center;
    color: #000000;
    margin-top: 70px;
    margin-bottom: 72px;
}
</style>
