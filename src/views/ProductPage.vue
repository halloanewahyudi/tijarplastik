<script setup>

import { onMounted, ref, computed } from 'vue';

import DataProducts from '../assets/products.json'
const products = ref(DataProducts);
const category = ref('');
const name = ref('');
const price = ref('');
const merk = ref('');
const search = ref('');

 const filteredproducts = computed(() => {
  return products.value.filter(item => {
    return (
      (!category.value || item.category == category.value) &&
      (!search.value || item.name.toLowerCase().includes(search.value.toLowerCase())) &&
      (!price.value || item.price === price.value) &&
      (!merk.value || item.merk === merk.value)
    );
  });
}); 

// Pagination logic
const itemsPerPage = 12;
const currentPage = ref(1);

const paginatedproducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredproducts.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredproducts.value.length / itemsPerPage);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const uniqueItems = [
  ...new Map(paginatedproducts.value.map(item => [item.category, item])).values()
];
</script>
<template>
 <div class="">
    <div class="container">
      <div class="flex flex-wrap gap-3 py-5">
        <div class="form-group">
          <label>Cari</label>
          <input type="search" v-model="search" placeholder="Cari Produk" class="form-control" />
        </div>

        <div class="form-group ">
          <label> Kategori</label>
          <select name="category" v-model="category" id="" class="form-control">
            <option value=""> Semua Kategori </option>
            <option v-for="item in uniqueItems" :key="item" :value="item.category">{{ item.category }}</option>
          </select>
       
        </div>
      </div> <!-- end filter wrap -->

      <ul class="flex flex-col divide-y divide-light">
        <li v-for="item in paginatedproducts" :key="item.phone"
          class="p-2 rounded-lg flex justify-between items-center hover:bg-light">
          <span>{{ item.name }}</span>
          <span class="bg-light text-white py-1 px-3 rounded-full">
            {{ item.price }}
        </span>
        </li>
      </ul>
   <div class="flex gap-3 items-center pt-10">
    <button class="" @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button class="" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
   </div>
    
    </div>
  </div>
</template>


