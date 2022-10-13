<template>
  <v-container fluid>

    <v-row>
      <v-col>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
          <v-tab>Menus</v-tab>
          <v-tab>Savings</v-tab>
          <v-tab>Datas</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card >
          <v-card-text> {{ tab }} </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- <loading-overlay :show="Api.Site.loading" /> -->
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Api } from "@/store";

@Component({ layout: "panel" })
export default class Menus extends Vue {
  Api = Api;

  tab = "";

  menu = {
    Hamburger : [
      {name: 'Company'     , url : ''},
      {name: 'Commercial'  , url : ''},
      {name: 'Support'     , url : ''},
      {name: 'Register'    , url : ''},
      {name: 'Contact'     , url : ''},
    ],
    CenterOption : [
      {
        name: 'TV + Audio',
        columns : [
          [
            {name : 'TELEVISIONS' , url : ''},
            {name : 'LASER TV' , url : ''},
            {name : '4K ULED' , url : ''},
            {name : '4K UHD' , url : ''},
            {name : 'SMART TV PLATFORMS' , url : ''},
            {name : 'ALL TVs' , url : ''},
          ],
          [
            { name : 'HOME AUDIO' , 'url' : ''},
            { name : '2.0 CH SOUNDBARS' , 'url' : ''},
            { name : '2.1 CH SOUNDBARS' , 'url' : ''},
            { name : '3.1 CH SOUNDBARS' , 'url' : ''},
            { name : 'ALL HOME AUDIO' , 'url' : ''},
          ]
        ],
        products : [
          {name : '' , url : '' , image : 'https://assets.hisense-usa.com/assets/GalleryImages/Product/436/ccc5d70642/u6h__ScaleMaxWidthWzY0MF0.png'},
          {name : '' , url : '' , image : 'https://assets.hisense-usa.com/assets/GalleryImages/Product/448/f5c88a7895/u8h__ScaleMaxWidthWzY0MF0.png'},
        ]
      },
      {
        name: 'APPLIANCES',
        columns : [
          [
            { name : 'EXPLORE HOME APPLIANCES' , url : ''},
            { name : 'DISHWASHERS' , url : ''},
            { name : 'BEVERAGE + WINE COOLERS' , url : ''},
            { name : 'REFRIGERATORS' , url : ''},
          ],
        ],
        products : [
          {name : '' , url : '' , image : 'https://assets.hisense-usa.com/assets/GalleryImages/Product/274/e4489e1ec0/Front-min__ScaleMaxWidthWzY0MF0.png'},
          {name : '' , url : '' , image : 'https://assets.hisense-usa.com/assets/GalleryImages/Product/471/596d3db992/micro-closed_ScaleMaxHeightWzc1MF0__ScaleMaxWidthWzY0MF0.png'},
          {name : '' , url : '' , image : 'https://assets.hisense-usa.com/assets/GalleryImages/Product/158/7051a421d1/Carousel-5-min__ScaleMaxWidthWzY0MF0.png'},
        ]
      },
      {
        name: 'AIR PRODUCTS',
        columns : [
          [
            { name : 'EXPLORE AIR PRODUCTS' , url : ''},
            { name : 'WINDOW AC' , url : ''},
            { name : 'PORTABLE AC' , url : ''},
            { name : 'DEHUMIDIFIERS' , url : ''},
            { name : 'AIR PURIFIER' , url : ''},
            { name : 'ALL AIR PRODUCTS' , url : ''},
          ],
        ],
        products : [
          {name : '' , url : '' , image : 'https://assets.hisense-usa.com/assets/GalleryImages/Product/397/761648fb97/AW0822CW1W-front__ScaleMaxWidthWzY0MF0.png'},
          {name : '' , url : '' , image : 'https://assets.hisense-usa.com/assets/GalleryImages/Product/400/386becd4f1/DH5022K1W-front__ScaleMaxWidthWzY0MF0.png'},
          {name : '' , url : '' , image : 'https://assets.hisense-usa.com/assets/GalleryImages/Product/396/2d8dfdfe04/1-front-AP1022TW1GD-1__ScaleMaxWidthWzY0MF0.png'},
        ]
      },
    ],
    RightOption : [
      {
        name: 'Commercial',
        columns : [
          [
            {name : 'Commercial Displays' , url : ''},
            {name : 'Commercial Refrigerators' , url : ''},
          ],
        ],
        products : [
          {name : '' , url : '' , image : 'https://assets.hisense-usa.com/assets/PageMenuImage/169/f982c6d16b/Hisense-Commercial-header-menu_-Recovered__ScaleMaxWidthWzY0MF0.png'},
          {name : '' , url : '' , image : 'https://assets.hisense-usa.com/assets/PageMenuImage/169/f982c6d16b/Hisense-Commercial-header-menu_-Recovered__ScaleMaxWidthWzY0MF0.png'},
        ]
      },
    ]
  }
}
</script>
