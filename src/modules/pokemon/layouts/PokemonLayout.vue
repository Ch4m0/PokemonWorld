<template>
    <LoadPokeBall v-if="isLoading" />
    <main v-else class="w-full max-w-[570px] mx-auto flex flex-col items-center p-py-main h-screen">
        <SearchBar />
        <router-view />
        <BottomTabMenu />
    </main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import BottomTabMenu from '@/modules/common/components/BottomTabMenu.vue';
import SearchBar from '@/modules/common/components/SearchBar.vue';
import LoadPokeBall from '@/modules/common/components/LoadPokeBall.vue';

const isLoading = ref(true);

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 3000);
});

</script>
