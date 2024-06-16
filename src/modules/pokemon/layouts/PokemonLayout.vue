<template>
    <main class="w-full max-w-[570px] mx-auto flex flex-col items-center p-py-main h-screen">
        <SearchBar />
        <router-view />
        <BottomTabMenu />
    </main>
</template>

<script lang="ts" setup>
import BottomTabMenu from '@/modules/common/components/BottomTabMenu.vue';
import SearchBar from '@/modules/common/components/SearchBar.vue';
</script>
