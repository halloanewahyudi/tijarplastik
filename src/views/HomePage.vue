<script setup>

import { onMounted, ref, computed } from 'vue';
import IconNext from '../components/icons/IconNext.vue'
import IconPrev from '../components/icons/IconPrev.vue'

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
    <div>
        <div class="border-b border-light mb-5">
            <div class="px-5">
                <div class="flex justify-center gap-2 py-5">
                    <div class="form-group">
                        <input type="search" v-model="search" placeholder="Cari Produk" class="form-control " />
                    </div>

                    <div class="form-group ">
                        <select name="category" v-model="category" id="" class="form-control">
                            <option value=""> Pilih Kategori </option>
                            <option v-for="item in uniqueItems" :key="item" :value="item.category">{{ item.category }}
                            </option>
                        </select>

                    </div>
                </div> <!-- end filter wrap -->
            </div>
        </div>
        <div class="container">
            <ul class="flex flex-col divide-y divide-light">
                <li v-for="item in paginatedproducts" :key="item.phone"
                    class="p-2 rounded-lg flex justify-between items-center hover:bg-light">
                    <span>{{ item.name }}</span>
                    <span class="bg-light text-white py-1 px-3 rounded-full">
                        {{ item.price }}
                    </span>
                </li>
            </ul>
            <div class="flex gap-3 items-center justify-center py-6">
                <button class="flex items-center gap-2" @click="prevPage" :disabled="currentPage === 1">
                    <IconPrev /> Kembali
                </button>
                <button class="flex items-center gap-2" @click="nextPage" :disabled="currentPage === totalPages">Selanjutnya
                    <IconNext />
                </button>
            </div>
        </div>
    </div>
</template>
