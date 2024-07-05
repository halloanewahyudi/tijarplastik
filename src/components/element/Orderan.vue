<script setup>
import { useOrderStore } from '../../stores';
const order = useOrderStore();
</script>
<template>
   <!-- popup detail -->
    <!-- Suggested code may be subject to a license. Learn more: ~LicenseLog:1528938069. -->
    <div class="popup-detail z-50 fixed top-0 left-0 w-full h-full bg-primary flex items-center justify-center p-10">
        <div class="popup-detail-content bg-slate-200 rounded-lg p-6 max-w-[400px] w-full text-slate-700">
            <div class="flex justify-between items-center border-b border-light pb-3 mb-3">
                <h3 class="text-xl">{{ selectedItem.name }}</h3>
                <button @click="showDetail = false">
                    <IconClose />
                </button>
            </div>
            <div class="flex flex-col gap-4">
                <div class="flex justify-between items-center">
                    <span>Harga</span> <span>{{ selectedItem.price }}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span>Merk</span> <span>{{ selectedItem.merk }}</span>
                </div>
                <div>
                    <div class="flex justify-between items-center">
    <span>Harga</span>
    
     <span >{{ selectedItem.price }}</span>
</div>
<div class="flex justify-between items-center">
    <span>Jumlah</span> <input type="number" v-model="selectedItem.quantity" class="form-control w-20">
</div>
                    
                </div>
                <div>
                    <button @click="pesan" class="btm bg-secondary py-2 px-5 rounded-lg"> Order </button>
                </div>
            </div>
        </div>
    </div>
</template>