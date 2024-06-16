<template>

  <div v-if="loading" class="text-center h-[500px]">
    <h1 class="text-xl">
      Cargando Productos
    </h1>
    <p>Espere por favor</p>
  </div>

  <ListPokemon v-else :pokemon-list="filteredPokemonList" />
  <ButtonPagination :has-more-data="!!pokemonList && pokemonList.length < 10" :is-first-page="page === 1" :page="page"
    class="mb-3 mt-3" />

</template>
<script lang="ts" setup>
import { computed, onMounted, watchEffect } from 'vue';
import { getListPokemonAction } from '../actions/get-list-pokemon.action';
import ListPokemon from '../components/ListPokemon.vue';

import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import { usePagination } from '@/modules/common/composables/usePagination';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { useSearch } from '../../common/composables/useSearch';
import type { Pokemon } from '../interface/pokemon.interface';
import { usePokemonStore } from '../stores/pokemon.store';



const { page } = usePagination();
const { searchTerm } = useSearch()

const queryClient = useQueryClient();
const store = usePokemonStore();


onMounted(() => {
  store.loadFavorites();
});


const { data: pokemonList, isLoading: loading } = useQuery({
  queryKey: ["POKEMON_LIST", { page: page }],
  queryFn: () => getListPokemonAction(page.value),
});

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ["POKEMON_LIST", { page: page.value + 1 }],
    queryFn: () => getListPokemonAction(page.value + 1),
  });
});

const filteredPokemonList = computed(() => {
  return pokemonList?.value?.filter((pokemon: Pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  ) || [];
});

</script>.