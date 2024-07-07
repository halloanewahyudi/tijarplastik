<script setup>
import { computed, ref, watch, watchEffect } from 'vue';
import { useOrder } from '../../stores/order-store';
import IconClose from '../icons/IconClose.vue';

const props = defineProps({
    name: String,
    price: Number,
    merk: String,
    category: String,
    qty: {
        type: Number,
        default: 1
    },
    jumlah: Number
})

// mengitung jumlah @Qty

const jumlah = ref(1)
const order = useOrder()

const addQty = () => {
    props.qty++
}
const minQty = () => {
    if (props.qty <= 1) {
        props.qty = 1
    } else {
        props.qty -= 1
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

</script>
<template>
    <div class="max-w-[460px] w-full p-6 mx-auto">
        <div class="rounded-lg overflow-hidden  bg-light text-primary flex flex-col   w-full shadow-2xl">
            <div class="flex flex-col divide-y divide-borderlight mb-5 p-6">
                <div class="flex gap-4 items-center justify-between py-2">
                    <span class="text-lg font-medium"> {{ props.name }}</span>
                    <slot name="close"></slot>
                </div>
                <div class="flex gap-4 items-center justify-between py-2">
                    <span> Merk </span><span> {{ props.merk }}</span>
                </div>
                
                <div class="flex gap-4 items-center justify-between py-2">
                    <span> Banyaknya </span><span>  {{ props.qty }}  </span>
                </div>
                <div class="flex gap-4 items-center justify-between py-2">
                    <span> Harga</span><span class="font-medium"> {{ formatCurrency(props.price)}}</span>
                </div>

              <!--   <div class="flex gap-4 items-center justify-between py-2">
                    <span> jumlah</span><span> {{ props.jumlah }}</span>
                </div> -->
            </div>
            <div class="p-6 bg-brand-2">
                <slot name="order"></slot>
            </div>

        </div>
    </div>

</template>