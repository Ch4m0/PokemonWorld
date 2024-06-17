<template>

  <div v-if="loading" class="text-center h-[500px]">
    <LoadPokeBall />
  </div>


  <ListPokemon v-else :pokemon-list="filteredPokemonList" />

  <NoFoundData v-if="!loading && filteredPokemonList.length === 0" />

  <ButtonPagination v-else :has-more-data="!!pokemonList && pokemonList.length < 10" :is-first-page="page === 1"
    :page="page" class="mb-3 mt-1" />

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
import NoFoundData from '../components/NoFoundData.vue';
import LoadPokeBall from '@/modules/common/components/LoadPokeBall.vue';


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

const filterPokemonList = (list: Pokemon[] | undefined, term: string): Pokemon[] => {
  return list?.filter((pokemon: Pokemon) =>
    pokemon.name.toLowerCase().includes(term.toLowerCase())
  ) || [];
};

const filteredPokemonList = computed(() => {
  return filterPokemonList(pokemonList?.value, searchTerm.value);
});

</script>.