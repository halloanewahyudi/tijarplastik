<script setup>
import { computed } from 'vue'
import {useRouter, useRoute} from 'vue-router'
import { useOrderStore } from '../stores'
const router = useRouter()
const route = useRoute()
const order = useOrderStore()
// search by id
const showOrder = computed(()=>{
  return  order.getOrder()
})
// get product 
</script>
<template>
    <div class="container">
   <div class="min-h-screen flex flex-col justify-center items-center">
    <div class="max-w-[600px] w-full p-6">
      <div class="bg-slate-50 w-full text-primary">
       
         {{ showOrder }}
      </div>
    </div>
   </div>
      
    </div>
</template>