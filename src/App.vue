<script setup>
import SectionOne from './components/SectionOne.vue';
import Navbar from './components/element/Navbar.vue';
</script>

<template>
    <main class="bg-primary text-green-50 min-h-screen ">
        <Navbar/>
        <RouterView />
    </main>
</template>
