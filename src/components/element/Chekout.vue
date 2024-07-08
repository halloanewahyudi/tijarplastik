<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import { useOrder } from "../../stores/order-store";
import { useProduct } from '../../stores/product-store';
import IconCloseVue from "../icons/IconClose.vue";
import IconEditVue from "../icons/IconEdit.vue";
import PopUpOrder from "../element/PopUpOrder.vue";
import PopupClearOrder from "../element/PopupClearOrder.vue"

const order = useOrder()
const selected = ref({})
const selectIndex = ref()
const jumlah = ref(0)
const qty = ref(1)
const sudahOrder = ref(false)

const editQty = (item) => {
    item.qty = qty.value
    item.jumlah = item.price * item.qty
}

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

const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

const getTotal = computed(() => {
    return order.orders.reduce((total, item) => total + item.jumlah, 0);
})

const bukaEdit = ref(false)

const cancel = () => {
    qty.value = 1
    setTimeout(() => {
        bukaEdit.value = false
    }, 200);

}

watchEffect(() => {
    qty.value
    jumlah.value
    order.orders.price = selected.value.jumlah
})

function formatMessage(data) {
    let message = "Pesanan:\n\n";
    for (const item of data) {
        message += `${item.name}: ${item.qty}  Rp ${item.jumlah}\n`;
    }
    //  const total = data.reduce((sum, item) => sum + item.price, 0);
    const total = formatCurrency(getTotal.value)
    message += `\nTotal: Rp ${total}`;
    return message;
}

function sendMessage() {
    const data = order.orders
    const message = formatMessage(data);
    const phoneNumber = '6289636192223'; // Ganti dengan nomor WhatsApp tujuan
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    // tambahan jika popup cler order
    setTimeout(() => {
        sudahOrder.value = true
    }, 3000);
}
</script>
<template>
    <div>
        <ul class="flex flex-col divide-y divide-borderlight mb-2">
            <li class="flex justify-between items-center py-2" v-for="(item, index) in order.orders" :key="index">
                <div class="flex gap-4 items-center">
                    <span> {{ item.name }} </span>
                    <span> {{ item.qty }}</span>
                </div>
                <div class="flex gap-4 items-center">
                    <span> {{ formatCurrency(item.jumlah) }} </span>
                    <button @click=" selected = item; selectIndex = index; bukaEdit = true; jumlah = item.jumlah">
                        <IconEditVue />
                    </button>
                    <button @click="order.removeOrder(item.name)">
                        <IconCloseVue />
                    </button>
                </div>
            </li>
        </ul>
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-4">
                <button class="bg-brand-4 py-2 px-5 rounded-full" @click="order.clearOrder"> Clear</button>
                <button @click="sendMessage"
                    class="bg-light text-primary py-2 px-5 rounded-full">Pesan</button>
            </div>
            <div class="text-secondary text-xl"> {{ formatCurrency(getTotal) }} </div>
        </div>
    </div>
    <!--    Selected -->

    <div v-if="bukaEdit">
        <div class="fixed top-[60px] left-0 w-full bg-brand-1 flex flex-col justify-center items-center z-50">
            <pop-up-order :name="selected.name" :price="selected.jumlah" :qty="selected.qty = qty"
                :jumlah="selected.jumlah = selected.price * selected.qty">
                <template #order>
                    <div class="flex gap-4 items-center justify-between">
                        <div
                            class="flex items-center justify-center text-base border border-primary rounded-lg max-w-max text-primary">
                            <button @click="minQty" class="p-2 border-primary border-r"> - </button>
                            <input @input="editQty(selected)" type="number" min="1" v-model="qty"
                                class="w-10 text-center bg-transparent">
                            <button @click="addQty" class="p-2 border-primary border-l"> + </button>
                        </div>
                        <div class="flex gap-4 items-center">
                            <button @click="cancel" class="bg-secondary text-light py-2 px-5 rounded-full">
                                Cancel</button>
                            <button @click="bukaEdit = false; console.log(order.orders)"
                                class="bg-primary text-light py-2 px-5 rounded-full">Ok</button>
                        </div>
                    </div>
                </template>
            </pop-up-order>
        </div>
    </div>

    <!-- Sudah Order -->
    <div v-if="sudahOrder">
        <popup-clear-order class="text-brand-1">
            <template #close>
                <button @click="sudahOrder = false" class="p-2 bg-brand-1 text-brand-2">
                    <IconCloseVue class="w-5 h-5" />
                </button>
            </template>

            <template #clear>
                <button @click="order.clearOrder ; sudahOrder = false" class="py-2 px-5 rounded-full bg-brand-1 text-brand-2"> Hapus Order
                </button>
            </template>
        </popup-clear-order>
    </div>
</template>