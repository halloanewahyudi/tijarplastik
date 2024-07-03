<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
const data = ref([]);

const products = ()=>{
    axios.get('https://sheetdb.io/api/v1/kkknsizl0rqyp')
    .then(response => {
        data.value = response.data;
    })
    .catch(error => {
        console.log(error);
    })
}
onMounted(()=>{
    products();
})

</script>
<template>
    <div class="container">
       <ul class="flex flex-col  divide-y divide-light">
        <li v-for="item in data" :key="item.id" class="flex  items-center justify-between gap-4 p-2 hover:bg-light dura rounded-lg">
            <div class="flex gap-3 items-center">
               <span> {{ item.Nama }}  </span>
                <span class="w-max shrink-0">  {{ item.Jumlah }} </span>
            </div>
            
        <span class="bg-light text-white py-1 px-3 rounded-full">
            {{ item.Harga }}
        </span>
        </li>
       </ul>
    </div>
</template>