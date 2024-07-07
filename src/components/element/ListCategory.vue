<script setup>
import { useProduct } from "../../stores/product-store";

const product = useProduct()
</script>
<template>
    <Transition>
        <div class="container">
            <ul class="flex flex-col  divide-y divide-y-borderlight">
                <li @click="product.category = ''; product.currentPage = 1, openCategory = false"
                    class="py-2 cursor-pointer"> Semua </li>
                <li v-for="item in product.uniqueItems" :key="item"
                    @click="product.category = item.category; openCategory = false" class="py-2 cursor-pointer">
                    {{ item.category }}
                </li>
            </ul>
        </div>
    </Transition>
</template>