<template>
  <vue-perfect-scrollbar
    :settings="{ suppressScrollX: true, wheelPropagation: false }"
    class="h-100 rtl-ps-none ps scroll"
    style="height: 100%"
  >
    <div class="pa-5 relative">
      <v-app-bar class="pt-1" fixed flat>
        <div class="d-flex justify-space-between align-center w-full">
          <v-text-field
            dense
            outlined
            label="Seacrh Products"
            prepend-inner-icon="mdi-magnify"
            class="mr-8 mt-5"
          ></v-text-field>
          <slot name="searchDrawerCloseButton"></slot>
        </div>
      </v-app-bar>
    </div>

    <div class="px-5 mt-10">
      <div>
        <div class="heading-label pa-0 mt-10 mb-4">recent products</div>
        <div class="d-flex align-center mb-4">
          <img
            height="40"
            width="40"
            class="w-12 h-auto"
            src="~/assets/images/products/515.png"
            alt=""
          />
          <div class="pl-2">
            <p class="ma-0">
              <a class="link-alt" href="#"> Product 1 </a>
            </p>
            <p class="text--disabled caption ma-0">Publish</p>
          </div>
        </div>
        <div class="d-flex align-center mb-4">
          <img
            height="40"
            width="40"
            class="w-12 h-auto"
            src="~/assets/images/products/526.png"
            alt=""
          />
          <div class="pl-2">
            <p class="ma-0">
              <a class="link-alt" href="#"> Product 2 </a>
            </p>
            <p class="text--disabled caption ma-0">Publish</p>
          </div>
        </div>
        <div class="d-flex align-center mb-4">
          <img
            height="40"
            width="40"
            class="w-12 h-auto"
            src="~/assets/images/products/519.png"
            alt=""
          />
          <div class="pl-2">
            <p class="ma-0">
              <a class="link-alt" href="#"> Product 3 </a>
            </p>
            <p class="text--disabled caption ma-0">Publish</p>
          </div>
        </div>
        <div class="d-flex align-center mb-4">
          <img
            height="40"
            width="40"
            class="w-12 h-auto"
            src="~/assets/images/products/517.png"
            alt=""
          />
          <div class="pl-2">
            <p class="ma-0">
              <a class="link-alt" href="#"> Product 4 </a>
            </p>
            <p class="text--disabled caption ma-0">Support Only</p>
          </div>
        </div>
        <div class="d-flex align-center mb-4">
          <img
            height="40"
            width="40"
            class="w-12 h-auto"
            src="~/assets/images/products/518.png"
            alt=""
          />
          <div class="pl-2">
            <p class="ma-0">
              <a class="link-alt" href="#"> Product 5 </a>
            </p>
            <p class="text--disabled caption ma-0">Support Only</p>
          </div>
        </div>
      </div>
    </div>
  </vue-perfect-scrollbar>
</template>
