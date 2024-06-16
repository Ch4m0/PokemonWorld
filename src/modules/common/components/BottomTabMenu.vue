<template>
    <nav class="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center h-24 shadow-nav ">
        <div class="max-w-[570px] w-full flex justify-between gap-4 px-4">


            <PokeButton full-width name="All" @click="setActiveButton('all')" :active="activeButton === 'all'">
                <template #icon>
                    <ListIcon />
                </template>
            </PokeButton>


            <PokeButton full-width name="Favorites" @click="setActiveButton('favorites')"
                :active="activeButton === 'favorites'">
                <template #icon>
                    <StarIcon />
                </template>
            </PokeButton>

        </div>
    </nav>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import ListIcon from '@/icons/ListIcon.vue';
import StarIcon from '@/icons/StarIcon.vue';

import PokeButton from './PokeButton.vue';


const router = useRouter();
const route = useRoute();

const activeButton = ref(localStorage.getItem('activeTab') || 'all');

const setActiveButton = (buttonName: string) => {
    activeButton.value = buttonName;
    localStorage.setItem('activeTab', buttonName);
    if (buttonName === 'all') {
        router.push({ name: 'pokemon-list' });
    } else if (buttonName === 'favorites') {
        router.push({ name: 'pokemon-list-favorite' });
    }
};

onMounted(() => {
    const currentRoute = route.name;
    if (currentRoute === 'pokemon-list' || currentRoute === 'pokemon-list-favorite') {
        activeButton.value = currentRoute === 'pokemon-list' ? 'all' : 'favorites';
        localStorage.setItem('activeTab', activeButton.value);
    } else {
        setActiveButton(activeButton.value);
    }
});

watch(() => route.name, (newRouteName) => {
    if (newRouteName === 'pokemon-list' || newRouteName === 'pokemon-list-favorite') {
        activeButton.value = newRouteName === 'pokemon-list' ? 'all' : 'favorites';
        localStorage.setItem('activeTab', activeButton.value);
    }
});

</script>

<style scoped>
nav {
    z-index: 10;
}

.shadow-nav {
    box-shadow: 0px -5px 4px 0px rgba(0, 0, 0, 0.05);
}
</style>