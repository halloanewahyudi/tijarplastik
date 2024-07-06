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

</script>
<template>
    <div class="fixed top-0 left-0 w-full h-full bg-primary flex flex-col justify-center items-center">
        <div class="max-w-[460px] w-full p-6">

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
                        <span> Harga</span><span> {{ props.price }}</span>
                    </div>
                </div>
                <div class="p-6 bg-brand-2">
                    <slot  name="order"></slot>
                </div>
                
            </div>
        </div>
    </div>
</template>