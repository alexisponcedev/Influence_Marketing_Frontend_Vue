<template>
  <div class="tw-flex">
    <div class="filter-box">
      <div class="group">
        <div class="title">SCREEN SIZE</div>
        <ul class="tw-list-none">

          <li class="filter tw-flex tw-items-center tw-space-x-2" v-for="j in 7 " :key="j">
            <div class="checkbox" />
            <div class="option tw-flex-1">32"</div>
            <div class="count">3</div>
          </li>
          <li>
            <div class="filter"> +Add New filter</div>
          </li>
        </ul>
        <hr class="separator" />
        <div>+Add New Group</div>
      </div>
    </div>

    <div style="background-color: #FAFAFA">
      <div class="total-result">
        <span class="total-result-title">Total Result : 77</span>
        <span class="total-result-link">View All</span>
      </div>
      <div class="tw-grid tw-grid-cols-3">
        <block-products-item v-for="i in 5" :key="i" :class="{'gray-box' : i % 2 !== 0}"/>
      </div>
    </div>

  </div>

</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class ProductGrid extends Vue {
  @Prop(Number) readonly id: number | undefined
  @VModel({type: Object}) model!: any

  mounted() {
    if (this.isEmpty)
      this.model = {
        url: {
          id: 0,
          type: StructureType.Url,
          title: 'PIM URL',
          value: 'https://load-from-pim-server.com/api',
        },
      }
  }

  get isEmpty(): Boolean {
    return this.model && Object.keys(this.model).length === 0;
  }
}
</script>

<style scoped lang="scss">
.filter-box{
  width: 232px;
  padding: 28px 16px;

   .group{
     .title{
       font-family: 'hisense' , serif;
       font-style: normal;
       font-weight: bold;
       font-size: 16px !important;
       line-height: 24px;
       color: #5A5B75;
       margin-bottom: 24px;
    }
     ul{
       padding-left: 0 !important;

       .filter{
         margin-bottom: 6px;
         .checkbox{
           width: 13px;
           height: 13px;
           border: 1px solid #5A5B75;
           border-radius: 2px;
         }
         .option{
           font-style: normal;
           font-weight: 400;
           font-size: 14px;
           line-height: 16px;
           color: #5A5B75;
         }
       }
     }

     .separator{
       margin: 24px 0;
     }
  }
}
.gray-box{
  background-color: #F1F1F2;
}
.total-result{
  font-family: 'hisense' , serif;
  background: #DCECF0;
  border-radius: 16px;
  padding: 16px;
  margin : 16px 28px;


  &-title{
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
    color: #565656;
  }

  &-link{
    font-family: 'hisense' , serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
    text-decoration-line: underline;
    color: #00AAA6;
    margin-left : 8px
  }
}
</style>
