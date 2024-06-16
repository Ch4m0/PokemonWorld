<template>
    <ul class="w-full mt-[40px]">
        <ItemPokemon v-for="(pokemon, idx) in pokemonList" :key="idx" :pokemon="pokemon" />
    </ul>
</template>

<script lang="ts" setup>
import type { Pokemon } from '../interface/pokemon.interface';
import ItemPokemon from './ItemPokemon.vue';


interface Props {
    pokemonList: Pokemon[]
}

defineProps<Props>()

</script>