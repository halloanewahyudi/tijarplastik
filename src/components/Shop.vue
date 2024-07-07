<script setup>
import { ref } from "vue";
import { useOrder } from "../stores/order-store";
import { useProduct } from "../stores/product-store";
import IconNextVue from "./icons/IconNext.vue";
import IconPrevVue from "./icons/IconPrev.vue";

const order = useOrder()
const product = useProduct()
const category = ref('')

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
}).format(value);
}


</script>
<template>
    <div class="container">
      <ul class="flex flex-wrap justify-center items-center gap-3  pb-10">
          <button  @click="product.category = '' ; product.currentPage = 1" class="py-2 px-4 rounded-lg bg-borderlight" > Semua </button>
          <button v-for="item in product.uniqueItems" :key="item"  @click="product.category = item.category"  class="py-2 px-4 rounded-lg bg-borderlight">
            {{ item.category }}
          </button>
      </ul>
     
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div v-for="(item,index) in product.paginatedproducts" :key="index" class=" bg-white rounded-lg text-center overflow-hidden h-full flex flex-col justify-between hover:shadow-xl duration-300 ">
          <div class="p-6  flex flex-col divide-y divide-borderlight">
            <h4 class="text-lg font-medium pb-3">{{ item.name }}</h4>
            <div class="flex gap-3 py-2 justify-between items-center">
              <span>Merk</span>
              <span> {{ item.merk }}</span>
            </div>
            <div class="flex gap-3 py-2 justify-between items-center">
              <span>Satuan</span>
              <span> {{ item.amount }}</span>
            </div>
          </div>
          
           <div class="flex flex-wrap justify-between items-center gap-5 p-4 bg-borderlight mt-auto">
            <span class="font-bold text-brand-1">{{formatCurrency(item.price)}}</span>
            <button @click="order.addOrder(item)" class="py-2 px-4 rounded-full bg-brand-1 text-white"> Beli </button>
           </div>
            </div>
        </div>

        <div class="flex gap-3 items-center justify-center py-10 container">
        <button class="flex items-center gap-3 disabled:opacity-30" @click="product.prevPage" :disabled="product.currentPage === 1"> <IconPrevVue/> Prev </button>
        <button class="flex items-center gap-3 disabled:opacity-30" @click="product.nextPage" :disabled="product.currentPage === totalPages"> Next <IconNextVue/> </button>
      </div>
    </div>
</template>