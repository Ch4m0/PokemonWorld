<template>
    <h3 class="text-3xl font-bold mb-6">Uh-oh!</h3>
    <p class="text-center w-80 md:max-w-[520px] md:w-4/5 ">You look lost on your journey!</p>
    <PokeButton name="Go Back home" active @click="$router.push({ name: 'home' })" class="mt-8" />
</template>
<script lang="ts" setup>
import PokeButton from '@/modules/common/components/PokeButton.vue';
</script>