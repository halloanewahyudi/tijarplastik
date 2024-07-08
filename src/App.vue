<script setup>
import { ref } from 'vue';
import Navbar from './components/element/Navbar.vue';
import PopupVue from './components/element/Popup.vue';
import IconCloseVue from './components/icons/IconClose.vue';

const tampil = ref(false)
setTimeout(() => {
    tampil.value = true
    setTimeout(() => {
        tampil.value = false
    }, 13000);
}, 3000);

</script>

<template>
    <main class=" min-h-screen ">
        <div v-if="tampil">
            <PopupVue>
                <button @click="tampil = false" class="p-2"><IconCloseVue class="w-5 h-5" /></button>
            </PopupVue>
        </div>
        <Navbar/>
        <RouterView />
    </main>
</template>
