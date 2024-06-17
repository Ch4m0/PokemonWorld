<template>
    <li class="w-full flex justify-between bg-white rounded-[5px] h-[50px] py-[17px] px-[10px] mb-[10px] items-center transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 duration-300 cursor-pointer"
        @click="toggleFavorite(pokemon)">
        <span class="text-[22px]">
            {{ pokemon.name }}
        </span>

        <div class="rounded-full p-2">
            <StarIcon :color="starColor" />
        </div>
    </li>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { modalService } from '../../../services/modal.service'
import type { Pokemon } from '../interface/pokemon.interface'
import { usePokemonStore } from '../stores/pokemon.store'
import InfoPokemon from './InfoPokemon.vue'
import StarIcon from '@/icons/StarIcon.vue'

interface Props {
    pokemon: Pokemon
}

const store = usePokemonStore()
const props = defineProps<Props>()

const toggleFavorite = async (pokemon: { name: string; url: string }) => {
    const tab = localStorage.getItem('activeTab')
    if (tab === 'favorites') {
        showInfoPokemon(pokemon.name)
        return
    }

    if (store.isPokemonFavorite(pokemon.name)) {
        store.removeFavorite(pokemon.name)
    } else {
        store.addFavorite(pokemon)
    }
}

const showInfoPokemon = (name: string): void => {
    modalService.openModal({
        component: InfoPokemon,
        props: {
            name
        }
    })
}

const isFavorite = (pokemonName: string) => store.isPokemonFavorite(pokemonName)

const starColor = computed(() => (isFavorite(props.pokemon.name) ? '#FFD700' : '#BFBFBF'))
</script>

<style scoped>
.bg-custom-rounded-star {
    background-color: #e8e8e8;
}
</style>
