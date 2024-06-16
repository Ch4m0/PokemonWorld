<template>
    <ListPokemon :pokemon-list="filteredPokemonList" />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import ListPokemon from '../components/ListPokemon.vue';
import { usePokemonStore } from '../stores/pokemon.store';
import { useSearch } from '../../common/composables/useSearch';
import type { Pokemon } from '../interface/pokemon.interface';

const store = usePokemonStore();


onMounted(() => {
    store.loadFavorites();
});

const { searchTerm } = useSearch()

const favoritePokemons = computed(() => store.favorites);




const filteredPokemonList = computed(() => {
    return favoritePokemons?.value?.filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    ) || [];
});
</script>