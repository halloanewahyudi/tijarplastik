import { defineStore } from "pinia";
import Products from '../assets/products.json'
import { ref,computed } from "vue";
export const useProduct =  defineStore('product',()=>{

const products = ref(Products);
const category = ref('');
const name = ref('');
const price = ref('');
const qty = ref(1);
const jumlah = ref('')
const search = ref('');

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
}

const filteredproducts = computed(() => {
    return products.value.filter(item => {
      item.qty = qty.value,
       // item.jumlah = qty.value * parseFloat(item.price.replace('Rp', '').replace('.', ''))
       item.jumlah = qty.value * item.price
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

//mengambil katagor
const uniqueItems = [
  ...new Map(filteredproducts.value.map(item => [item.category, item])).values()
];

return {
    products,
    filteredproducts,
    name,
    category,
    search,
    qty,
    price,
    paginatedproducts,
    totalPages,
    itemsPerPage,
    currentPage, 
    prevPage,
    nextPage,
    uniqueItems
}

})