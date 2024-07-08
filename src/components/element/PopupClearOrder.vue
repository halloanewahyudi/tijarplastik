<script>
import { useOrder } from "../../stores/order-store";
import IconCloseVue from "../icons/IconClose.vue";

</script>
<template>

    <div class=" fixed top-0 left-0 w-full min-h-screen z-[1000] bg-brand-1 bg-opacity-70 flex flex-col justify-center items-center">
        <div class="popup-content max-w-[480px] mx-auto p-6 rounded-lg bg-borderlight relative">
            <div class="flex justify-end absolute right-0 top-0"> 
                <slot name="close" />
            </div>
            <div class="flex flex-col gap-4 justify-center items-center min-h-max">
                <h5 class="text-xl"> Jika pesanan anda sudah terkirim  </h5>
                <p>Silakan hapus ordernya </p>
               <slot name="clear" />
            </div>
        </div>
    </div>

</template>