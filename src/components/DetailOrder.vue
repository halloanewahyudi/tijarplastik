<script setup>
import { useOrderStore } from '../stores';
const order = useOrderStore();
// Suggested code may be subject to a license. Learn more: ~LicenseLog:243968537.
const updateItemQuantity = (item) => {
    order.updateItemQuantity(item);
};

</script>
<template>
    <div>
   <div v-for="item in order.detailOrder" :key="item.id">
    <div class="flex justify-between">
        <div>{{ item.product.name }}</div>
        <div>
            <input type="number" v-model="item.quantity" @input="updateItemPrice(item)"">
            <span>{{ item.product.price }}</span>
           
        </div>
    </div>
</div>
   
    </div>
</template>
