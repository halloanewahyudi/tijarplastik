<script>

</script>
<template>

    <div class=" fixed top-0 left-0 w-full min-h-screen z-[1000] bg-brand-1 bg-opacity-70 flex flex-col justify-center items-center">
        <div class="popup-content max-w-[480px] mx-auto p-6 rounded-lg bg-borderlight relative">
            <div class="flex justify-end absolute right-0 top-0"> 
                <slot />
            </div>
            <div class="flex flex-col justify-center items-center min-h-max">
                <h5 class="text-xl">Selamat Datang di <span class="font-medium text-secondary"> Tijar</span>
                    <span class="text-brand-1">Plastik</span>
                </h5>
                <p>Silakan Lihat-lihat produk kami, bisa order langsung </p>
                <p> Saat ini list produk belum sepenuhnya ditampilkan, </p>
                <p> Bisa langsung kontak aja jika ada produk yang di tanyakan</p>
            </div>
        </div>
    </div>

</template>