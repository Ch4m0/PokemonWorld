<template>
    <section class="flex flex-col items-center justify-center h-screen">
        <PikachuSvg />

        <h1 class="text-3xl font-bold mb-8">
            Welcome to Pokédex
        </h1>
        <p class="text-center w-80 md:max-w-[520px] md:w-4/5">
            The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.
        </p>
        <PokeButton name="Get started" active class="mt-9" @click="$router.push({ name: 'pokemon-list' })" />
    </section>
</template>

<script lang="ts" setup>
import PokeButton from '@/modules/common/components/PokeButton.vue';
import PikachuSvg from '../components/PikachuSvg.vue';
</script>
