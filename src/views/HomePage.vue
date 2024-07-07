<script setup>
import Slideshow from '../components/Slideshow.vue';
import { useProduct } from '../stores/product-store';
import Shop from '../components/Shop.vue';
const product = useProduct()
</script>
<template>

    <Slideshow />
    <div class="py-16">
        <Shop />
    </div>
</template>