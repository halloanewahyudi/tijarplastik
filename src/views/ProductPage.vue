<script setup>
import { useSheetDBStore } from '../stores';
const store = useSheetDBStore()
</script>
<template>
  <div>
    <ul>
      <li v-for="item in store.paginatedData" :key="item.id">
        {{ item.name }}{{ item.price }}   
      </li>
    </ul>
  </div>
</template>


