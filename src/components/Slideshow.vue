<script setup>
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css'
import { onMounted } from 'vue';

import IconNextVue from './icons/IconNext.vue';
import IconPrevVue from './icons/IconPrev.vue';

const image = [
   'img/slide-1.jpeg','img/slide-2.jpeg'
]

const slideContent = [
    {
        title: 'Gelas Plastik',
        subtitle: 'tesedia berbagai macam ukuran dari OZ 20 sampai gelas aqua',
        image: 'img/slide-1.jpeg'
    },
    {
        title: 'Styrofoam',
        subtitle: 'Menyediakan styrofoam bubur, mangkok dan ukuran kecil',
        image: 'img/slide-2.jpeg'
    },
    {
        title: 'Mika',
        subtitle: 'Berbagaimacam jenis mika dari yang besar hingga yang kecil',
        image: 'img/slide-3.jpeg'
    },
    {
        title: 'Sedotan Dan Kertas Nasi',
        subtitle: 'Ada sedotan biasa dan flexible juga kertas bungkus nasi yang bisa ada juga yang kembang',
        image: 'img/slide-4.jpeg'
    },
    {
        title: 'Aneka macam Plastik',
        subtitle: 'Plastik ukuran 1Kg, 1/2, 1/4, Plasitk clip berbagai ukuran , kantong kresek juga berbagai ukuuran',
        image: 'img/slide-6.jpeg'
    },
    {
        title: 'Aneka Bahan Kue',
        subtitle: 'Agar-agar, keju, coklat messes, coklat batangan , tepung , gula , susu, vanila dll',
        image: 'img/slide-7.jpeg'
    }
]

onMounted(() => {
    const myglide = new Glide('.glide', {
        autoplay: 4000,
        type: 'carousel',
        focusAt: 'center',
        loop: true,
        perView: 1,
        gap: 30,
    })
    myglide.mount()
})

</script>
<template>
    <div class="glide  bg-brand-2 text-light pt-9 pb-8 relative">
        <div class="glide__track " data-glide-el="track">
            <ul class="glide__slides ">
                <li class="glide__slide " v-for="item in slideContent" :key="item">
                    <div class="min-h-64 container relative rounded-lg flex flex-col justify-center items-center p-6 bg-center bg-cover text-borderlight overflow-hidden"
                        :style="{backgroundImage:`url(${item.image})`}">
                        <div class="relative z-10 slide-content text-center max-w-[600px] p-6 text-white">
                            <h2 class="text-4xl lg:text-5xl font-medium">{{ item.title }}</h2>
                            <h4 lang="text-xl">{{ item.subtitle }}</h4>
                        </div>
                        <div class="layer absolute first-letter:top-0 left-0 w-full h-full "></div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="glide__arrows container flex items-center justify-between" data-glide-el="controls ">
    <button class="glide__arrow glide__arrow--left absolute top-[45%] left-2 lg:left-5 p-3 text-xl rounded-full bg-brand-1 bg-opacity-70" data-glide-dir="<"><IconPrevVue /></button>
    <button class="glide__arrow glide__arrow--right absolute top-[45%] right-2 lg:right-5 p-3 text-xl rounded-full bg-brand-1 bg-opacity-70" data-glide-dir=">"><IconNextVue/></button>
  </div>
    </div>
</template>
<style scoped>
.glide__slide .slide-content {
    @apply opacity-0 scale-125;
}

.glide__slide--active .slide-content {
    @apply opacity-100 scale-100 ease-linear duration-300;
}

.layer {
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,0.4458158263305322) 13%, rgba(241,240,240,0) 100%);
}
</style>