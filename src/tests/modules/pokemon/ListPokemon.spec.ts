import { setActivePinia, createPinia } from 'pinia'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import ListPokemon from '@/modules/pokemon/components/ListPokemon.vue'
import ItemPokemon from '@/modules/pokemon/components/ItemPokemon.vue'
import type { Pokemon } from '@/modules/pokemon/interface/pokemon.interface'
import { beforeEach, describe, expect, it } from 'vitest'

const pokemonList: Pokemon[] = [
  { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
  { name: 'Charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' }
]

describe('ListPokemon.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders a list of Pokémon', () => {
    const wrapper = mount(ListPokemon, {
      global: {
        mocks: {
          $t: () => {}
        },
        stubs: {
          ItemPokemon: true
        }
      },
      props: { pokemonList }
    })

    const items = wrapper.findAllComponents(ItemPokemon)
    expect(items.length).toBe(pokemonList.length)
  })
})
