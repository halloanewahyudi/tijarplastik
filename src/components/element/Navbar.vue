<script setup>
import Logo from '../Logo.vue';
import IconWa from '../icons/IconWa.vue';
import { useOrder } from '../../stores/order-store';
import IconCart from '../icons/IconCart.vue';
import { computed, ref, watchEffect } from 'vue';
import IconClose from '../icons/IconClose.vue';
import IconEditVue from '../icons/IconEdit.vue';
import PopUpOrder from '../element/PopUpOrder.vue'
import IconTagVue from '../icons/IconTag.vue';
import IconSearch from '../icons/IconSearch.vue';
import { useProduct } from '../../stores/product-store';
import Checkout from '../element/Chekout.vue'
import IconMenuVue from '../icons/IconMenu.vue';
import IconResetVue from '../icons/IconReset.vue';



const order = useOrder();
const product = useProduct()
const bukaOrders = ref(false);
const showDetail = ref(false)
const selectedItem = ref({})
const selectedIndex = ref()
const openSearch = ref(false)
const openCategory = ref(false)

const qty = ref(1)
const jumlah = ref(0)

const addQty = () => {
    qty.value++
}
const minQty = () => {
    if (qty.value <= 1) {
        qty.value = 1
    } else {
        qty.value -= 1
    }
}

const resetQty = () => {
    if (qty.value > 1) {
        qty.value = 1
    }
}

watchEffect(() => {
    order.getTotalPrice()
})

function formatMessage(data) {
    let message = "Pesanan:\n\n";
    for (const item of data) {
        message += `${item.name}: Rp ${item.price}\n`;
    }
    //  const total = data.reduce((sum, item) => sum + item.price, 0);
    const total = order.getTotalPrice()
    message += `\nTotal: Rp ${total}`;
    return message;
}

function sendMessage() {
    const data = order.orders
    const message = formatMessage(data);
    const phoneNumber = '628979134998'; // Ganti dengan nomor WhatsApp tujuan
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

</script>
<template>

    <div class="p-4 fixed top-0 left-0 w-full bg-primary z-50">
        <div class="">
            <div class="flex flex-wrap justify-between items-center">
                <!-- <div class="max-w-40">
                    <Logo class="w-full h-full" @click="$router.push('/')" />
                </div> -->
                <router-link to="/" class="text-2xl text-light" @click="product.category = ''"> <span
                        class="font-semibold">Tijar</span>Plastik</router-link>
                <div class="flex items-center gap-4">
                    <button @click="openSearch = !openSearch">
                        <IconSearch class="w-5 h-5 text-light" />
                    </button>
                    <div class="relative">
                        <button @click="bukaOrders = !bukaOrders" v-if="order.orders.length > 0"
                            class="absolute -top-2 -right-5 w-7 h-7 bg-secondary text-white rounded-full  flex items-center justify-center">
                            {{ order.orders.length }}
                        </button>
                        <IconCart class="w-6 h-6 text-light" />
                    </div>
                    <a href="https://wa.me/6289636192223?text=hallo%20TijarPlastik.." target="_blank">
                        <IconWa class="w-6 h-6 text-light" />
                    </a>
                    <button @click="product.category = ''"><IconResetVue  class="w-6 h-6 text-light" /></button>
                    <button @click="openCategory = !openCategory">
                        <IconMenuVue class="w-6 h-6 text-light" />
                    </button>
                </div>

            </div>
        </div>
    </div>
    <div v-if="openSearch">
        <div class="fixed top-0 left-0 w-full bg-brand-1 text-light py-2 z-50">
            <div class="container">
                <div class="flex items-center gap-3 ">
                    <input type="search" v-model="product.search" class="p-2 rounded-lg w-full text-brand-1">
                    <button @click="openSearch = false; product.search = ''" class="p-2 rounded-full bg-brand-4">
                        <icon-close class="w-5 h-5"></icon-close></button>
                </div>
            </div>
        </div>

    </div>
    <!-- popup orders -->
    <!-- Suggested code may be subject to a license. Learn more: ~LicenseLog:1528938069. -->
    <div class="p-6 bg-primary text-light fixed top-[60px] left-0 w-full min-h-full z-40" v-if="bukaOrders">
        <div class="flex justify-end py-2">
            <button @click="bukaOrders = false" class="bg-brand-4 p-2 rounded-full">
                <IconClose class="w-5 h-5" />
            </button>
        </div>
        <Checkout />
    </div>

    <!--  Menu Category -->
    <div v-if="openCategory">
        <Transition>
            <div class="fixed top-0 left-0 w-full min-h-full flex justify-center items-center p-6 z-50 bg-brand-1">
                <div class="bg-brand-2 rounded-lg p-6 w-full max-w-[600px]">
                    <div class="flex justify-end ">
                        <button @click="openCategory = false" class="rounded-full bg-primary text-light p-2">
                            <IconClose class="w-5 h-5" />
                        </button>
                    </div>
                    <ul class="flex flex-col  divide-y divide-brand-1 divide-opacity-30 ">
                        <li @click="product.category = ''; product.currentPage = 1, openCategory = false"
                            class="py-2 cursor-pointer"> Semua </li>
                        <li v-for="item in product.uniqueItems" :key="item"
                            @click="product.category = item.category; openCategory = false" class="py-2 cursor-pointer">
                            {{ item.category }}
                        </li>
                    </ul>
                </div>

            </div>
        </Transition>
    </div>
</template>