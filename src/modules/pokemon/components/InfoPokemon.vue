<template>
    <div>
        <img :src="imgPokemon" :alt="pokemonDetails?.name" class="h-[350px] object-cover">
        <p class="border-b py-4">Name: {{ pokemonDetails?.name }}</p>
        <p class="border-b py-4">Height: {{ pokemonDetails?.height }}</p>
        <p class="border-b py-4">Weight: {{ pokemonDetails?.weight }}</p>
        <p class="border-b py-4">Type: {{ pokemonDetails?.type }}</p>
    </div>
    <div class="flex justify-between mt-4">

        <PokeButton name="Share to my friends" active @click="copy" />

        <div class="rounded-full p-3 bg-[#BFBFBF]">
            <StarIcon color="#FFD700" width="25px" height="25px" />
        </div>

    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

import { getOnlyPokemonAction } from '../actions/get-only-pokemon.action';
import PokeButton from '@/modules/common/components/PokeButton.vue';
import StarIcon from '@/icons/StarIcon.vue';
import useClipboard from '@/modules/common/composables/useClipboard'

//import useClipboard from 'vue-clipboard3'
//const { toClipboard } = useClipboard()

const props = defineProps<{ name: string }>()
const imgPokemon = `${import.meta.env.VITE_POKE_IMG_URL}/${props.name}.jpg`

const { toClipboard } = useClipboard()


const { data: pokemonDetails } = useQuery({
    queryKey: ["DETAIL_POKEMON", { name: props.name }],
    queryFn: () => getOnlyPokemonAction(props.name),
});

const copy = async () => {
    try {
        if (pokemonDetails.value) {
            const details = Object.entries(pokemonDetails.value)
                .map(([key, value]) => `${key}: ${value}`)
                .join(', ');

            await toClipboard(details);
            alert("Copied to Clipboard! :D")
        } else {
            alert("Could not be copied! Try Again :(")
        }
    } catch (e) {
        console.error(e);
    }
};
</script>