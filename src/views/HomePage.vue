<script setup>
import Slideshow from '../components/Slideshow.vue';
import {useProduct} from '../stores/product';
const product = useProduct()
</script>
<template>
    <Slideshow />
    <div class="container py-16">
        <h4 class="text-xl font-medium">
            Selamat datang di TijarPlastik 
        </h4>
        <p>
            Silakan di lihat lihat barang kami barangkali ada yang cocok langsung aja order
        </p>
       <ul>
        <input type="search" v-model="product.search" placeholder="Cari Produk" class="form-control" />
        <li v-for="(item,index) in product.paginatedproducts" :key="index">
            {{ item.name }}
        </li>
       </ul>
       <div class="flex gap-3 items-center pt-10">
        <button class="" @click="product.prevPage" :disabled="product.currentPage === 1">Previous</button>
        <button class="" @click="product.nextPage" :disabled="product.currentPage === totalPages">Next</button>
      </div>
    </div>
</template>