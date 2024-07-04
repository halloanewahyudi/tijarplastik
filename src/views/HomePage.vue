<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import DataProducts from '../assets/products.json'
const data = ref([]);
const search = ref('plastik')
</script>
<template>
    <div class="container">
       <ul class="flex flex-col  divide-y divide-light">
        <li v-for="item in DataProducts" :key="item.id" class="flex  items-center justify-between gap-4 p-2 hover:bg-light dura rounded-lg">
            <div class="flex gap-3 items-center">
               <span> {{ item.name }}  </span>
                <span class="w-max shrink-0">  {{ item.amount }} </span>
            </div>
        <span class="bg-light text-white py-1 px-3 rounded-full">
            {{ item.price }}
        </span>
        </li>
       </ul>
    </div>
</template>