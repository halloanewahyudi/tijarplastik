<script setup>
import Logo from '../Logo.vue';
import IconWa from '../icons/IconWa.vue';
import { useOrder } from '../../stores/order-store';
import IconCart from '../icons/IconCart.vue';
import { computed, ref, watchEffect } from 'vue';
import IconClose from '../icons/IconClose.vue';
import IconEditVue from '../icons/IconEdit.vue';
import PopUpOrder from '../element/PopUpOrder.vue'

const order = useOrder();
const bukaOrders = ref(false);
const showDetail = ref(false)
const selectedItem = ref({})
const selectedIndex = ref()
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
    const phoneNumber = '6289636192223'; // Ganti dengan nomor WhatsApp tujuan
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}



</script>
<template>

    <div class="p-4 fixed top-0 left-0 w-full bg-primary z-50">
        <div class="container">
            <div class="flex flex-wrap justify-between items-center">
                <!-- <div class="max-w-40">
                    <Logo class="w-full h-full" @click="$router.push('/')" />
                </div> -->
                <router-link to="/" class="text-2xl text-kuning-3"> <span class="font-semibold">Tijar</span>Plastik</router-link>
                <router-link to="/product" class="text-light"> Produk</router-link>
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
    <div class="p-6 bg-primary text-light fixed top-[60px] left-0 w-full min-h-full z-40" v-if="bukaOrders">
        <div class="w-full flex justify-end mb-4 container">
            <button class="p-2 bg-secondary rounded-full" @click="bukaOrders = false">
                <IconClose />
            </button>
        </div>
        <div class="container">
            <ul class="flex flex-col divide-y divide-borderlight">
                <li v-for="(item, index) in order.orders" :key="index" class="flex items-center justify-between gap-4 py-2">
                    <div class="flex items-center gap-3">
                        <span>{{ item.name }}</span>
                        <span class="w-6 h-6 rounded-full flex justify-center items-center bg-secondary">{{ item.qty }}</span>
                    </div>

                    <div class="flex items-center gap-3">
                        <span>{{ item.jumlah }}</span>
                        <button @click="order.removeOrder(item.name)"
                            class="text-secondary bg-white rounded-full p-1 text-sm">
                            <IconClose />
                        </button>
                        <button
                            @click="selectedItem = item; showDetail = true; order.editOrder(index, selectedItem); jumlah = item.jumlah; resetQty()">
                            <IconEditVue />
                        </button>
                    </div>
                </li>
            </ul>
            <div class="w-full flex justify-between gap-4 py-5 border-top border-light">
                <button @click="sendMessage" class="bg-light text-primary py-2 px-5 rounded-full">Pesan</button>  <span class="text-lg">Total: Rp {{ order.getTotalPrice() }}</span>
            </div>
            
        </div>
    </div>

    <!--  Modal edit -->
    <div v-if="showDetail">
        <div class="fixed top-20 left-0 w-full flex flex-col justify-center items-center min-screen z-50">
            <pop-up-order :name="selectedItem.name" :price="selectedItem.price" :qty="selectedItem.qty = qty"
                :jumlah="selectedItem.jumlah = jumlah * qty">
                <template #order>
                    <div class="flex gap-4 items-center justify-between">
                        <div
                            class="flex items-center justify-center text-base border border-primary rounded-lg max-w-max text-primary">
                            <button @click="minQty" class="p-2 border-primary border-r"> - </button>
                            <input type="number" min="1" v-model="qty" class="w-10 text-center bg-transparent">
                            <button @click="addQty" class="p-2 border-primary border-l"> + </button>
                        </div>
                        <div class="flex gap-4 items-center">
                            <button @click="showDetail = false" class="bg-secondary text-light py-2 px-5 rounded-full"> Cancel</button>
                        <button @click="showDetail = false" class="bg-primary text-light py-2 px-5 rounded-full">Ok</button>
                   
                        </div>
                   </div>
                </template>
            </pop-up-order>
        </div>
    </div>
</template>