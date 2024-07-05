<script setup>

import { onMounted, ref, computed, watchEffect, watch } from 'vue';
import IconNext from '../components/icons/IconNext.vue'
import IconPrev from '../components/icons/IconPrev.vue'
import DataProducts from '../assets/products.json'
import { useOrderStore } from '../stores';
import IconClose from '../components/icons/IconClose.vue';
import Orderan from '../components/element/Orderan.vue';


const order = useOrderStore();

const products = ref(DataProducts);
const category = ref('');
const name = ref('');
const price = ref('');
const merk = ref('');
const search = ref('');
// popup show detail
const showDetail = ref(false);
const selectedItem = ref({});

onMounted(() => {
    products.value = DataProducts;
});

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
const pesan = () => {
    order.addOrder(selectedItem.value)
    setTimeout(() => {
        showDetail.value = false;
    }, 200);
}

// detail order
const editQty = ref(1)
const abisEdit = computed(() => {
    const harga = parseFloat(selectedItem.price.replace('Rp', '').replace('.', ''))
    const jumlah = editQty.value * harga
    return jumlah
})

watchEffect(() => {
    abisEdit
})

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
        <!--  content -->
        <div class="container">
            <ul class="flex flex-col divide-y divide-light">
                <li v-for="item in paginatedproducts" :key="item.phone"
                    class="p-2 rounded-lg flex justify-between items-center hover:bg-light">
                    <span>{{ item.name }}</span>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <span class="bg-light text-white py-1 px-3 rounded-full">
                            {{ item.price }}
                        </span>
                        <button @click="selectedItem = item; showDetail = true; order.getOrder(item)"
                            class="py-1 px-2 rounded-full bg-secondary bg-opacity-35"> Pesan </button>
                    </div>

                </li>
            </ul>

            <!--  pagination -->
            <div class="flex gap-3 items-center justify-center py-6">
                <button class="flex items-center gap-2" @click="prevPage" :disabled="currentPage === 1">
                    <IconPrev /> Kembali
                </button>
                <button class="flex items-center gap-2" @click="nextPage"
                    :disabled="currentPage === totalPages">Selanjutnya
                    <IconNext />
                </button>
            </div>
        </div>
    </div>
    <!--  popup -->
    <div v-if="showDetail">
        <div class="fixed top-0 left-0 w-full h-full bg-primary flex flex-col justify-center items-center">
            <div class="max-w-[600px] w-full p-6">
                <div class="rounded-lg p-6 bg-slate-100 text-primary flex flex-col gap-3">
                    {{ order.orders }}
                    <div class="flex justify-between ">
                        <h4 class="text-lg font-medium ">{{ selectedItem.name }}</h4> <button class="flex-shrink-0"
                            @click="showDetail = false">
                            <IconClose />
                        </button>
                    </div>
                    <div class="flex justify-between items-center">
                        <span> Harga</span> <span>{{ selectedItem.price }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span> Merk</span> <span>{{ selectedItem.merk }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <input type="number" v-model="editQty" id="" class="form-control"> <button @click="order.addOrder" class="py-2 px-4 bg-secondary rounded-full">Order</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
