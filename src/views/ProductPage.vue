<script setup>

import { onMounted, ref, computed, watch, watchEffect } from 'vue';

import DataProducts from '../assets/products.json'
import { useOrder } from '../stores/order-store';
import ListItem from '../components/element/ListItem.vue';
import PopUpOrder from '../components/element/PopUpOrder.vue';
import IconCloseVue from '../components/icons/IconClose.vue';

const order = useOrder()

const products = ref(DataProducts);
const category = ref('');
const name = ref('');
const price = ref('');
const merk = ref('');
const qty = ref(1);
const jumlah = ref(0)
const input = ref(null)
const search = ref('');

const filteredproducts = computed(() => {
  return products.value.filter(item => {
    item.qty = qty.value,
      item.jumlah = qty.value * parseFloat(item.price.replace('Rp', '').replace('.', ''))
    return (
      (!category.value || item.category == category.value) &&
      (!search.value || item.name.toLowerCase().includes(search.value.toLowerCase()))
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

//mengambil katagory
const uniqueItems = [
  ...new Map(paginatedproducts.value.map(item => [item.category, item])).values()
];

const addQty = () => {
  qty.value++
}
const minQty = () => {
  if (qty.value <= 1) {
    qty.value = 1
  } else {
    qty.value -= 1
  }
}

// item terselect untuk popup
const showDetail = ref(false);
const showTutup = () => {
  setTimeout(() => {
    showDetail.value = false
    input.value.val = 1
  }, 300);
}


const selectedItem = ref({});
watch(qty, (newval) => {
  qty.value = newval
})

const netral = () => {
  qty.value = 1;
}

watchEffect(() => {
  netral()
})

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

      <!--   ########### LIST ProDUK ############ -->

      <div class="flex flex-col divide-y divide-borderlight">
        <list-item class="py-2 group" v-for="(item, index) in paginatedproducts" :key="index" :name="item.name"
          :price="item.price" :category="item.category" :merk="item.merk" :qty="item.qty" :jumlah="item.jumlah">
          <button @click="order.addOrder(item)"
            class="bg-brand-2 text-primary rounded-lg py-2 px-3 group-hover:bg-light"> Order</button>
        </list-item>
      </div>
      <div class="flex gap-3 items-center pt-10">
        <button class="" @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <button class="" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>

    </div>
  </div>
  <!--   ###########POPUP tesr select ############ -->
  <div v-if="showDetail">
    <pop-up-order :id="selectedItem.id" :name="selectedItem.name"
      :price="parseFloat(selectedItem.price.replace('Rp', '').replace('.', '')) * qty" :jumlah="selectedItem.jumlah">
      <template #close>
        <button @click="showDetail = false">
          <IconCloseVue />
        </button>
      </template>
      <template #order>
        {{ qty }} <br>
        {{ order.orders }}
        <div class="flex gap-4 items-center justify-between">
          <div
            class="flex items-center justify-center text-base border border-primary rounded-lg max-w-max text-primary">
            <button @click="minQty" class="p-2 border-primary border-r"> - </button>
            <input type="number" min="1" v-model="qty" class="w-10 text-center bg-transparent">
            <button @click="addQty" class="p-2 border-primary border-l"> + </button>
          </div>
          <button @click="order.addOrder(selectedItem); showTutup()"
            class="bg-primary text-light py-2 px-5 rounded-full"> Order</button>
        </div>
      </template>
    </pop-up-order>

  </div>
</template>
