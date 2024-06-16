import { defineStore } from 'pinia'
import type { Pokemon } from '../interface/pokemon.interface'

export const usePokemonStore = defineStore('pokemonStore', {
  state: () => ({
    favorites: [] as Pokemon[]
  }),
  getters: {
    isPokemonFavorite: (state) => (pokemonName: string) =>
      state.favorites.some((pokemon) => pokemon.name === pokemonName)
  },
  actions: {
    addFavorite(pokemon: Pokemon) {
      if (!this.isPokemonFavorite(pokemon.name)) {
        this.favorites.push(pokemon)
        this.saveFavorites()
      }
    },

    removeFavorite(pokemonName: string) {
      const index = this.favorites.findIndex((pokemon) => pokemon.name === pokemonName)
      if (index !== -1) {
        this.favorites.splice(index, 1)
        this.saveFavorites()
      }
    },

    loadFavorites() {
      const favorites = localStorage.getItem('pokemonFavorites')
      if (favorites) {
        this.favorites = JSON.parse(favorites)
      }
    },

    saveFavorites() {
      localStorage.setItem('pokemonFavorites', JSON.stringify(this.favorites))
    }
  }
})
