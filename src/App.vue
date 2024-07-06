<script setup>
import SectionOne from './components/SectionOne.vue';
import Navbar from './components/element/Navbar.vue';
</script>

<template>
    <main class=" min-h-screen ">
        <Navbar/>
        <RouterView />
    </main>
</template>
