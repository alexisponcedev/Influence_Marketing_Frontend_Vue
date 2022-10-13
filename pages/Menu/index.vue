<template>
  <v-container fluid>


    <v-tabs show-arrows v-model="tab" background-color="transparent">
      <v-tab href="#Hamburger">Hamburger Menu</v-tab>
      <v-tab href="#CenterOptions">Center Options</v-tab>
      <v-tab href="#RightOptions">Right Options</v-tab>
    </v-tabs>


    <v-card>
      <v-tabs-items v-model="tab">
        <v-tab-item value="Hamburger">
          <v-card-text>
            <h6>Hamburger Menu Items</h6>
            <div class="tw-space-y-2">


              <v-row v-for="(item , index) in menu.Hamburger" :key="`hamburger_${item.name}`" align="start">
                <form-field-text :field="textField" v-model="item.name"/>

                <form-field-select-page-name
                  :field="urlField"
                  v-model="item.url"
                  :rules="[]"
                  placeholder="p"
                />
                <v-col align-self="start">
                  <button class="tw-p-4" @click="deleteFromList(menu.Hamburger , index)">
                    <v-icon class="red--text">mdi-delete</v-icon>
                  </button>
                </v-col>
              </v-row>


              <!--              <div v-for="(item , index) in menu.Hamburger" :key="`hamburger_${item.name}`"-->
              <!--                   class="tw-flex tw-items-center tw-justify-between tw-bg-gray-50 tw-rounded-lg tw-p-2">-->
              <!--                <div class="tw-text-base tw-flex-1">{{ item.name }}</div>-->
              <!--                <div class="tw-flex-1">{{ item.url }}</div>-->
              <!--                <div>-->
              <!--                  <button @click="editItem(menu.Hamburger , index)">-->
              <!--                    <v-icon small class="gray&#45;&#45;text">mdi-pencil</v-icon>-->
              <!--                  </button>-->
              <!--                  <button @click="deleteFromList(menu.Hamburger , index)">-->
              <!--                    <v-icon small class="red&#45;&#45;text">mdi-delete</v-icon>-->
              <!--                  </button>-->
              <!--                </div>-->

              <!--              </div>-->

              <button
                @click="addNewItem(menu.Hamburger)"
                class="tw-border tw-border-dashed tw-border-2 tw-border-gray-400 tw-rounded-lg tw-text-center tw-p-2">
                Add new item
              </button>

            </div>

          </v-card-text>
        </v-tab-item>
        <v-tab-item value="CenterOptions">
          <v-card-text>
            <h6>Menu Center Options</h6>







          </v-card-text>
        </v-tab-item>
        <v-tab-item value="RightOptions">
          <v-card-text>
            <h6>Menu Right Options</h6>

            <pre>{{ menu.RightOption }}</pre>

          </v-card-text>
        </v-tab-item>
      </v-tabs-items>

    </v-card>

    <v-card class="mt-5">
      <v-card-text align="end">

        <v-btn color="success" @click="submit">Save Changes</v-btn>
      </v-card-text>
    </v-card>

    <menu-item ref="menuItemEditor" v-model="menu.Hamburger"/>

    <!-- <loading-overlay :show="Api.Site.loading" /> -->
  </v-container>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {Api} from "@/store";

@Component({
  layout: "panel"
})
export default class Menus extends Vue {
  Api = Api;

  tab = "CenterOptions";

  newItem = {name: 'Menu Item Name', url: '/'};

  textField = {
    label: '',
    placeholder: 'enter name',
    rules: [],
    colAttrs: {cols: 4},
  }

  urlField = {
    label: "",
    placeholder: 'Enter page name',
    'item-text': 'title',
    'item-value': 'value',
    rules: [],
    colAttrs: {cols: 7},
  }

  menu = {
    Hamburger: [
      {name: 'Company', url: '/'},
      {name: 'Commercial', url: '/'},
      {name: 'Support', url: '/'},
      {name: 'Register', url: '/'},
      {name: 'Contact', url: '/'},
    ],
    CenterOption: [
      {
        name: 'TV + Audio',
        columns: [
          [
            {name: 'TELEVISIONS', url: '/'},
            {name: 'LASER TV', url: '/'},
            {name: '4K ULED', url: '/'},
            {name: '4K UHD', url: '/'},
            {name: 'SMART TV PLATFORMS', url: '/'},
            {name: 'ALL TVs', url: '/'},
          ],
          [
            {name: 'HOME AUDIO', 'url': ''},
            {name: '2.0 CH SOUNDBARS', 'url': ''},
            {name: '2.1 CH SOUNDBARS', 'url': ''},
            {name: '3.1 CH SOUNDBARS', 'url': ''},
            {name: 'ALL HOME AUDIO', 'url': ''},
          ]
        ],
        products: [
          {
            name: '',
            url: '/',
            image: 'https://assets.hisense-usa.com/assets/GalleryImages/Product/436/ccc5d70642/u6h__ScaleMaxWidthWzY0MF0.png'
          },
          {
            name: '',
            url: '/',
            image: 'https://assets.hisense-usa.com/assets/GalleryImages/Product/448/f5c88a7895/u8h__ScaleMaxWidthWzY0MF0.png'
          },
        ]
      },
      {
        name: 'APPLIANCES',
        columns: [
          [
            {name: 'EXPLORE HOME APPLIANCES', url: '/'},
            {name: 'DISHWASHERS', url: '/'},
            {name: 'BEVERAGE + WINE COOLERS', url: '/'},
            {name: 'REFRIGERATORS', url: '/'},
          ],
        ],
        products: [
          {
            name: '',
            url: '/',
            image: 'https://assets.hisense-usa.com/assets/GalleryImages/Product/274/e4489e1ec0/Front-min__ScaleMaxWidthWzY0MF0.png'
          },
          {
            name: '',
            url: '/',
            image: 'https://assets.hisense-usa.com/assets/GalleryImages/Product/471/596d3db992/micro-closed_ScaleMaxHeightWzc1MF0__ScaleMaxWidthWzY0MF0.png'
          },
          {
            name: '',
            url: '/',
            image: 'https://assets.hisense-usa.com/assets/GalleryImages/Product/158/7051a421d1/Carousel-5-min__ScaleMaxWidthWzY0MF0.png'
          },
        ]
      },
      {
        name: 'AIR PRODUCTS',
        columns: [
          [
            {name: 'EXPLORE AIR PRODUCTS', url: '/'},
            {name: 'WINDOW AC', url: '/'},
            {name: 'PORTABLE AC', url: '/'},
            {name: 'DEHUMIDIFIERS', url: '/'},
            {name: 'AIR PURIFIER', url: '/'},
            {name: 'ALL AIR PRODUCTS', url: '/'},
          ],
        ],
        products: [
          {
            name: '',
            url: '/',
            image: 'https://assets.hisense-usa.com/assets/GalleryImages/Product/397/761648fb97/AW0822CW1W-front__ScaleMaxWidthWzY0MF0.png'
          },
          {
            name: '',
            url: '/',
            image: 'https://assets.hisense-usa.com/assets/GalleryImages/Product/400/386becd4f1/DH5022K1W-front__ScaleMaxWidthWzY0MF0.png'
          },
          {
            name: '',
            url: '/',
            image: 'https://assets.hisense-usa.com/assets/GalleryImages/Product/396/2d8dfdfe04/1-front-AP1022TW1GD-1__ScaleMaxWidthWzY0MF0.png'
          },
        ]
      },
    ],
    RightOption: [
      {
        name: 'Commercial',
        columns: [
          [
            {name: 'Commercial Displays', url: '/'},
            {name: 'Commercial Refrigerators', url: '/'},
          ],
        ],
        products: [
          {
            name: '',
            url: '/',
            image: 'https://assets.hisense-usa.com/assets/PageMenuImage/169/f982c6d16b/Hisense-Commercial-header-menu_-Recovered__ScaleMaxWidthWzY0MF0.png'
          },
          {
            name: '',
            url: '/',
            image: 'https://assets.hisense-usa.com/assets/PageMenuImage/169/f982c6d16b/Hisense-Commercial-header-menu_-Recovered__ScaleMaxWidthWzY0MF0.png'
          },
        ]
      },
    ]
  }

  onJsonChange(value: any) {
    console.log('value:', value)
  }

  addNewItem(list: Array<any>) {
    list.push(this.newItem);
  }

  deleteFromList(list: any, index: number) {
    list.splice(index, 1);
  }

}
</script>
