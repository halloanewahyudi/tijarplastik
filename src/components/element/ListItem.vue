<script setup>
const props = defineProps({
  name:String,
  price:Number,
  merk:String,
  category:String,
  qty:{
    type:Number,
    default:1
  },
  jumlah:Number
})
</script>
<template>
  <div class="flex justify-between items-center gap-4 px-4  hover:bg-brand-2 hover:rounded-lg duration-300 ">
    <span>{{ props.name }}</span>
    <div class="flex gap-3 items-center">
      <span>{{ props.price }}</span>
      <slot/>
    </div>
  </div>
</template>