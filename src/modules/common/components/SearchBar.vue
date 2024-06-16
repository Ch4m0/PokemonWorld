<template>
  <div class="relative flex items-center w-full">
    <SearchIcon class="absolute left-2 top-1/2 transform -translate-y-1/2" />
    <input v-model="searchTerm"
      class="flex h-[50px] w-full rounded-md border border-input bg-background px-6 py-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8"
      placeholder="Buscar..." type="search" @change="handleSearch" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SearchIcon from '@/icons/SearchIcon.vue';

const route = useRoute();
const router = useRouter();

const searchTerm = ref(route.query.search || '');

const handleSearch = () => {
  const query = { ...route.query, search: searchTerm.value || undefined };

  if (!searchTerm.value) {
    delete query.search;
  }
  router.push({ query });
};

watch(
  () => route.query.search,
  (newSearch) => {
    searchTerm.value = newSearch || '';
  }
);
</script>
