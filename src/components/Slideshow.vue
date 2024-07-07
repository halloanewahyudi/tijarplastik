<script setup>
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css'
import { onMounted } from 'vue';

onMounted(() => {
    const myglide = new Glide('.glide', {
        autoplay: 4000,
        type:'carousel',
        focusAt:'center',
        loop:true,
        perView:1,
        gap:30,
    })
    myglide.mount()
})

</script>
<template>
        <div class="glide  bg-primary text-light py-10">
            <div class="glide__track " data-glide-el="track">
                <ul class="glide__slides ">
                    <li class="glide__slide w-full" v-for="item in 7" :key="item">
         <div class="min-h-64 container relative rounded-lg flex flex-col justify-center items-center p-6 bg-center bg-cover text-borderlight"
         :style="{backgrond:`url(img/slide-${item}.jpeg)`}">
         <img :src="`img/slide-${item}.jpeg`" alt="" srcset="" class="absolute rounded-lg h-64 object-cover w-full">
         </div>
                    </li>
                </ul>
            </div>
        </div>
</template>
<style scoped>
.glide__slide .slide-content{
    @apply opacity-0 scale-125 ;
}
.glide__slide--active .slide-content{
    @apply opacity-100 scale-100 ease-linear duration-300 ;
}
</style>