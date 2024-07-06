<script setup>
import Logo from '../Logo.vue';
import IconWa from '../icons/IconWa.vue';
import { useOrder } from '../../stores/order-store';
import IconCart from '../icons/IconCart.vue';
import { ref } from 'vue';
import IconClose from '../icons/IconClose.vue';
const order = useOrder();
const bukaOrders = ref(false);

</script>
<template>

    <div class="p-4 fixed top-0 left-0 w-full bg-primary">
        <div class="container">
            <div class="flex flex-wrap justify-between items-center">
                <div class="max-w-40">
                    <Logo class="w-full h-full" @click="$router.push('/')" />
                </div>
                <div class="flex items-center gap-8">
                    <div class="relative">
                        <button @click="bukaOrders = !bukaOrders" v-if="order.orders.length > 0"
                            class="absolute -top-2 -right-5 w-7 h-7 bg-secondary rounded-full  flex items-center justify-center">
                            {{ order.orders.length }}
                        </button>
                        <IconCart class="w-6 h-6 text-light" />
                    </div>
                    <div>
                        <a href="https://wa.me/6289636192223?text=hallo%20TijarPlastik.." target="_blank">
                            <IconWa class="w-5 h-5 text-light" />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- popup orders -->
    <!-- Suggested code may be subject to a license. Learn more: ~LicenseLog:1528938069. -->
    <div class="p-6 bg-primary text-light fixed top-0 left-0 w-full min-h-full z-50" v-if="bukaOrders">
        <div class="w-full flex justify-end">
            <button class="p-4" @click="bukaOrders = false">
                <IconClose />
            </button>
        </div>

        <div class="">
            <ul class="flex flex-col gap-2">
                <li v-for="(item, index) in order.orders" :key="index" class="flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                        <span>{{ item.name }}</span>
                        <span>{{ item.qty }}</span>
                    </div>

                    <div class="flex items-center gap-3">
                        <span>{{ item.jumlah }}</span>
                        <button @click="order.removeOrder(item.name)"
                            class="text-secondary bg-white rounded-full p-1 text-sm">
                            <IconClose />
                        </button>
                    </div>
                </li>
            </ul>
            <div class="w-full flex justify-end py-5 border-top border-light">
                <span class="text-lg">Total: Rp {{ order.getTotalPrice() }}</span>
            </div>

        </div>

    </div>
</template>