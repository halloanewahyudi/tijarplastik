<script setup>
import { ref } from "vue";
import { useOrder } from "../stores/order-store";
import { useProduct } from "../stores/product-store";
import IconNextVue from "./icons/IconNext.vue";
import IconPrevVue from "./icons/IconPrev.vue";
import IconTagVue from "./icons/IconTag.vue";


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

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="(item, index) in product.paginatedproducts" :key="index"
        class=" bg-white rounded-lg text-center overflow-hidden h-full flex flex-col justify-between  border hover:border-borderlight duration-300 group">
        <div class="py-2 px-4  flex flex-col divide-y divide-borderlight">
          <h4 class="text-lg font-medium pb-3">{{ item.name }}</h4>
          <div class="flex gap-3 py-2 justify-between items-center">
            <span>Merk</span>
            <span> {{ item.merk }}</span>
          </div>
          <div class="flex gap-3 py-2 justify-between items-center">
            <span>Satuan</span>
            <span> {{ item.satuan }}</span>
          </div>
        </div>
        <div
          class="flex flex-wrap justify-between items-center gap-5 py-2 px-4 bg-borderlight mt-auto group-hover:bg-brand-3 duration-300">
          <div class="flex items-center gap-2">
            <IconTagVue /> <span class="font-bold text-brand-1">{{ formatCurrency(item.price) }}</span>
          </div>

          <button @click="order.addOrder(item)" class="py-1 px-4 rounded-full bg-brand-1 text-white"> Beli </button>
        </div>
      </div>
    </div>

    <div class="flex gap-3 items-center justify-center py-10 container">
      <button class="flex items-center gap-3 disabled:opacity-30" @click="product.prevPage"
        :disabled="product.currentPage === 1">
        <IconPrevVue /> Prev
      </button>
      <button class="flex items-center gap-3 disabled:opacity-30" @click="product.nextPage"
        :disabled="product.currentPage === product.totalPages"> Next
        <IconNextVue />
      </button>
    </div>
  </div>
</template>