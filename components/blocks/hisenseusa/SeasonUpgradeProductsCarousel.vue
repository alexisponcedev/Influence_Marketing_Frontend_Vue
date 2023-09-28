<template>
    <div>
        <img src="/blocks/SeasonUpgradeProductsCarousel.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import getActiveBrand from "@/utils/getActiveBrand";
import blockAddItem from "@/utils/blockAddItem";
import { Theme } from "@/interfaces/ThemeEnum";

@Component
export default class SeasonUpgradeProductsCarousel extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    loading: boolean = false;
    products: Array<any> = [];

    mounted() {
        this.getAllProducts();
        this.init();
    }

    init() {
        blockAddItem(this.model, "template", {
            id: 0,
            type: StructureType.Select,
            title: "Template",
            value: "v1",
            items: [
                { title: "Version 1", value: "v1" },
                { title: "Version 2", value: "v2" },
            ],
        });

        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });

        blockAddItem(this.model, "subtitle", {
            id: 2,
            type: StructureType.String,
            title: "Subtitle",
            value: "",
        });

        blockAddItem(this.model, "text", {
            id: 3,
            type: StructureType.Select,
            title: "Theme",
            value: "light",
            items: [
                { title: "Light", value: "light" },
                { title: "Gradient", value: "gradient" },
                { title: "Transparent", value: "transparent" },
            ],
        });

        blockAddItem(this.model, "direction", {
            id: 4,
            type: StructureType.Select,
            title: "Carousel Start Direction",
            value: "left",
            items: [
                { title: "Left", value: "left" },
                { title: "Right", value: "right" },
            ],
        });

        blockAddItem(this.model, "disclaimer", {
            id: 5,
            type: StructureType.SimpleText,
            title: "Disclaimer",
            hidden: true,
            value: "",
        });

        blockAddItem(this.model, "backgroundImage", {
            id: 6,
            type: StructureType.Image,
            title: "Background Image",
            hidden: true,
            src: "",
            alt: "",
        });

        blockAddItem(this.model, "selectProducts", {
            id: 7,
            type: StructureType.AutoCompeleteSelect,
            title: "Select Products",
            itemText: "name",
            itemValue: "id",
            value: "",
            items: () => this.products,
            loading: () => this.loading,
        });

        blockAddItem(this.model, "selected_products", {
            id: 8,
            type: StructureType.List,
            title: "Selected Products List",
            maxLength: 0,
            value: [],
            newItem: {
                id: {
                    id: 0,
                    type: StructureType.TextPreview,
                    value: "",
                    title: "Product id",
                    hidden: true,
                },
                name: {
                    id: 1,
                    type: StructureType.TextPreview,
                    title: "Product name",
                    value: "",
                },
                customImage: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Product Custom Image",
                    src: "",
                    alt: "",
                },
                series_products: {
                    id: 2,
                    type: StructureType.List,
                    title: "Series Products",
                    maxLength: 0,
                    value: [],
                    newItem: {
                        id: {
                            id: 0,
                            type: StructureType.TextPreview,
                            value: "",
                            title: "Product id",
                            hidden: true,
                        },
                        name: {
                            id: 1,
                            type: StructureType.TextPreview,
                            title: "Product name",
                            value: "",
                        },
                        old_price: {
                            id: 2,
                            type: StructureType.String,
                            value: "",
                            title: "Old Price",
                        },
                        new_price: {
                            id: 3,
                            type: StructureType.String,
                            value: "",
                            title: "New Price",
                        },
                        discount_amount: {
                            id: 4,
                            type: StructureType.String,
                            value: "",
                            title: "Discount Amount",
                        },
                        features: {
                            id: 5,
                            type: StructureType.List,
                            title: "Product Features",
                            value: [],
                            newItem: {
                                text: {
                                    id: 1,
                                    type: StructureType.SimpleText,
                                    value: "",
                                    title: "Spec",
                                },
                            },
                        },
                        retailers: {
                            id: 6,
                            title: "Retailers",
                            type: StructureType.List,
                            maxLength: 0,
                            newItem: {
                                id: {
                                    id: 1,
                                    type: StructureType.TextPreview,
                                    value: "",
                                    title: "Retialer id",
                                    hidden: true,
                                },
                                name: {
                                    id: 2,
                                    type: StructureType.TextPreview,
                                    title: "Retialer name",
                                    value: "",
                                },
                                status: {
                                    id: 3,
                                    type: StructureType.Select,
                                    title: "Status",
                                    value: "deactive",
                                    items: [
                                        { title: "Active", value: "active" },
                                        {
                                            title: "Deactive",
                                            value: "deactive",
                                        },
                                    ],
                                },
                            },
                            value: [],
                        },
                    },
                },
            },
        });

        this.model = { ...this.model };
    }

    async getAllProducts() {
        this.loading = true;
        await this.$axios
            .$get(
                process.env.PIM_API_URL +
                    `/cms/getProductsList?brand_id=${getActiveBrand()}`
            )
            .then((res) => {
                this.products = res.data;
            })
            .finally(() => {
                this.loading = false;
            });
        this.loading = false;

        this.updateOldStructure();
    }

    get selectProducts() {
        return this.model.hasOwnProperty("selectProducts")
            ? this.model.selectProducts.value
            : null;
    }

    @Watch("selectProducts")
    onselectProducts(value: any) {
        const product = this.products.find((item) => item.id == value);
        if (value) {
            this.model.selected_products.value.push({
                id: {
                    id: 0,
                    type: StructureType.TextPreview,
                    value: product.id,
                    title: "Product id",
                    hidden: true,
                },
                name: {
                    id: 1,
                    type: StructureType.TextPreview,
                    title: "Product name",
                    value: product.name,
                },
                customImage: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Product Custom Image",
                    src: "",
                    alt: "",
                },
                series_products: {
                    id: 2,
                    type: StructureType.List,
                    title: "Series Products",
                    maxLength: 0,
                    value:
                        product.productSeries && product.productSeries.length
                            ? product.productSeries[0].values.map(
                                  (item: any) =>
                                      <any>{
                                          id: {
                                              id: 0,
                                              type: StructureType.TextPreview,
                                              value: item.products[0],
                                              title: "Product id",
                                              hidden: true,
                                          },
                                          name: {
                                              id: 1,
                                              type: StructureType.TextPreview,
                                              title: "Product name",
                                              value: item.title,
                                          },
                                          old_price: {
                                              id: 2,
                                              type: StructureType.String,
                                              value: "",
                                              title: "Old Price",
                                          },
                                          new_price: {
                                              id: 3,
                                              type: StructureType.String,
                                              value: "",
                                              title: "New Price",
                                          },
                                          discount_amount: {
                                              id: 4,
                                              type: StructureType.String,
                                              value: "",
                                              title: "Discount Amount",
                                          },
                                          features: {
                                              id: 5,
                                              type: StructureType.List,
                                              title: "Product Features",
                                              value: [],
                                              newItem: {
                                                  text: {
                                                      id: 1,
                                                      type: StructureType.SimpleText,
                                                      value: "",
                                                      title: "Spec",
                                                  },
                                              },
                                          },
                                          retailers: {
                                              id: 6,
                                              title: "Retailers",
                                              type: StructureType.List,
                                              maxLength: 0,
                                              newItem: {
                                                  id: {
                                                      id: 1,
                                                      type: StructureType.TextPreview,
                                                      value: "",
                                                      title: "Retialer id",
                                                      hidden: true,
                                                  },
                                                  name: {
                                                      id: 2,
                                                      type: StructureType.TextPreview,
                                                      title: "Retialer name",
                                                      value: "",
                                                  },
                                                  status: {
                                                      id: 3,
                                                      type: StructureType.Select,
                                                      title: "Status",
                                                      value: "deactive",
                                                      items: [
                                                          {
                                                              title: "Active",
                                                              value: "active",
                                                          },
                                                          {
                                                              title: "Deactive",
                                                              value: "deactive",
                                                          },
                                                      ],
                                                  },
                                              },
                                              value: product.retailers.map(
                                                  (retailer: any) =>
                                                      <any>{
                                                          id: {
                                                              id: 0,
                                                              type: StructureType.TextPreview,
                                                              value: retailer.id,
                                                              title: "Retialer id",
                                                              hidden: true,
                                                          },
                                                          name: {
                                                              id: 1,
                                                              type: StructureType.TextPreview,
                                                              title: "Retialer name",
                                                              value: retailer.name,
                                                          },
                                                          status: {
                                                              id: 3,
                                                              type: StructureType.Select,
                                                              title: "Status",
                                                              value: "deactive",
                                                              items: [
                                                                  {
                                                                      title: "Active",
                                                                      value: "active",
                                                                  },
                                                                  {
                                                                      title: "Deactive",
                                                                      value: "deactive",
                                                                  },
                                                              ],
                                                          },
                                                      }
                                              ),
                                          },
                                      }
                              )
                            : [
                                  {
                                      id: {
                                          id: 0,
                                          type: StructureType.TextPreview,
                                          value: product.id,
                                          title: "Product id",
                                          hidden: true,
                                      },
                                      name: {
                                          id: 1,
                                          type: StructureType.TextPreview,
                                          title: "Product name",
                                          value: product.name,
                                      },
                                      old_price: {
                                          id: 2,
                                          type: StructureType.String,
                                          value: "",
                                          title: "Old Price",
                                      },
                                      new_price: {
                                          id: 3,
                                          type: StructureType.String,
                                          value: "",
                                          title: "New Price",
                                      },
                                      discount_amount: {
                                          id: 4,
                                          type: StructureType.String,
                                          value: "",
                                          title: "Discount Amount",
                                      },
                                      features: {
                                          id: 5,
                                          type: StructureType.List,
                                          title: "Product Features",
                                          value: [],
                                          newItem: {
                                              text: {
                                                  id: 1,
                                                  type: StructureType.SimpleText,
                                                  value: "",
                                                  title: "Spec",
                                              },
                                          },
                                      },
                                      retailers: {
                                          id: 6,
                                          title: "Retailers",
                                          type: StructureType.List,
                                          maxLength: 0,
                                          newItem: {
                                              id: {
                                                  id: 1,
                                                  type: StructureType.TextPreview,
                                                  value: "",
                                                  title: "Retialer id",
                                                  hidden: true,
                                              },
                                              name: {
                                                  id: 2,
                                                  type: StructureType.TextPreview,
                                                  title: "Retialer name",
                                                  value: "",
                                              },
                                              status: {
                                                  id: 3,
                                                  type: StructureType.Select,
                                                  title: "Status",
                                                  value: "deactive",
                                                  items: [
                                                      {
                                                          title: "Active",
                                                          value: "active",
                                                      },
                                                      {
                                                          title: "Deactive",
                                                          value: "deactive",
                                                      },
                                                  ],
                                              },
                                          },
                                          value: product.retailers.map(
                                              (retailer: any) =>
                                                  <any>{
                                                      id: {
                                                          id: 0,
                                                          type: StructureType.TextPreview,
                                                          value: retailer.id,
                                                          title: "Retialer id",
                                                          hidden: true,
                                                      },
                                                      name: {
                                                          id: 1,
                                                          type: StructureType.TextPreview,
                                                          title: "Retialer name",
                                                          value: retailer.name,
                                                      },
                                                      status: {
                                                          id: 3,
                                                          type: StructureType.Select,
                                                          title: "Status",
                                                          value: "deactive",
                                                          items: [
                                                              {
                                                                  title: "Active",
                                                                  value: "active",
                                                              },
                                                              {
                                                                  title: "Deactive",
                                                                  value: "deactive",
                                                              },
                                                          ],
                                                      },
                                                  }
                                          ),
                                      },
                                  },
                              ],
                    newItem: {
                        id: {
                            id: 0,
                            type: StructureType.TextPreview,
                            value: "",
                            title: "Product id",
                            hidden: true,
                        },
                        name: {
                            id: 1,
                            type: StructureType.TextPreview,
                            title: "Product name",
                            value: "",
                        },
                        old_price: {
                            id: 2,
                            type: StructureType.String,
                            value: "",
                            title: "Old Price",
                        },
                        new_price: {
                            id: 3,
                            type: StructureType.String,
                            value: "",
                            title: "New Price",
                        },
                        discount_amount: {
                            id: 4,
                            type: StructureType.String,
                            value: "",
                            title: "Discount Amount",
                        },
                        features: {
                            id: 5,
                            type: StructureType.List,
                            title: "Product Features",
                            value: [],
                            newItem: {
                                text: {
                                    id: 1,
                                    type: StructureType.SimpleText,
                                    value: "",
                                    title: "Spec",
                                },
                            },
                        },
                        retailers: {
                            id: 6,
                            title: "Retailers",
                            type: StructureType.List,
                            maxLength: 0,
                            newItem: {
                                id: {
                                    id: 1,
                                    type: StructureType.TextPreview,
                                    value: "",
                                    title: "Retialer id",
                                    hidden: true,
                                },
                                name: {
                                    id: 2,
                                    type: StructureType.TextPreview,
                                    title: "Retialer name",
                                    value: "",
                                },
                                status: {
                                    id: 3,
                                    type: StructureType.Select,
                                    title: "Status",
                                    value: "deactive",
                                    items: [
                                        { title: "Active", value: "active" },
                                        {
                                            title: "Deactive",
                                            value: "deactive",
                                        },
                                    ],
                                },
                            },
                            value: product.retailers.map(
                                (retailer: any) =>
                                    <any>{
                                        id: {
                                            id: 0,
                                            type: StructureType.TextPreview,
                                            value: retailer.id,
                                            title: "Retialer id",
                                            hidden: true,
                                        },
                                        name: {
                                            id: 1,
                                            type: StructureType.TextPreview,
                                            title: "Retialer name",
                                            value: retailer.name,
                                        },
                                        status: {
                                            id: 3,
                                            type: StructureType.Select,
                                            title: "Status",
                                            value: "deactive",
                                            items: [
                                                {
                                                    title: "Active",
                                                    value: "active",
                                                },
                                                {
                                                    title: "Deactive",
                                                    value: "deactive",
                                                },
                                            ],
                                        },
                                    }
                            ),
                        },
                    },
                },
            });

            this.model.selectProducts.value = "";
        }
    }

    @Watch("model.template.value")
    templateUpdated() {
        if (this.model.template.value == "v1") {
            this.model.disclaimer.hidden = true;
            this.model.backgroundImage.hidden = true;
        } else {
            this.model.disclaimer.hidden = false;
            this.model.backgroundImage.hidden = false;
        }

        this.$forceUpdate();
    }

    updateOldStructure() {
        this.model?.selected_products?.value.map((item: any) => {
            if (!item?.series_products?.value.length) {
                if (item?.id?.value) {
                    const product = this.products.find(
                        (p) => p.id == item?.id?.value
                    );

                    item.series_products.value =
                        product.productSeries && product.productSeries.length
                            ? product.productSeries[0].values.map(
                                  (ps: any) =>
                                      <any>{
                                          id: {
                                              id: 0,
                                              type: StructureType.TextPreview,
                                              value: ps.products[0],
                                              title: "Product id",
                                              hidden: true,
                                          },
                                          name: {
                                              id: 1,
                                              type: StructureType.TextPreview,
                                              title: "Product name",
                                              value: ps.title,
                                          },
                                          old_price: {
                                              ...item.old_price,
                                              hidden: undefined,
                                          },
                                          new_price: {
                                              ...item.new_price,
                                              hidden: undefined,
                                          },
                                          discount_amount: {
                                              ...item.discount_amount,
                                              hidden: undefined,
                                          },
                                          features: {
                                              ...item.features,
                                              hidden: undefined,
                                          },
                                          retailers: {
                                              ...item.retailers,
                                              hidden: undefined,
                                          },
                                      }
                              )
                            : [
                                  {
                                      id: {
                                          id: 0,
                                          type: StructureType.TextPreview,
                                          value: product.id,
                                          title: "Product id",
                                          hidden: true,
                                      },
                                      name: {
                                          id: 1,
                                          type: StructureType.TextPreview,
                                          title: "Product name",
                                          value: product.name,
                                      },
                                      old_price: {
                                          ...item.old_price,
                                          hidden: undefined,
                                      },
                                      new_price: {
                                          ...item.new_price,
                                          hidden: undefined,
                                      },
                                      discount_amount: {
                                          ...item.discount_amount,
                                          hidden: undefined,
                                      },
                                      features: {
                                          ...item.features,
                                          hidden: undefined,
                                      },
                                      retailers: {
                                          ...item.retailers,
                                          hidden: undefined,
                                      },
                                  },
                              ];
                }
            }
        });
    }
}
</script>
