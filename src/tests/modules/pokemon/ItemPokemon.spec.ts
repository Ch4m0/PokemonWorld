import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ItemPokemon from '@/modules/pokemon/components/ItemPokemon.vue'
import StarIcon from '@/icons/StarIcon.vue'
import type { Pokemon } from '@/modules/pokemon/interface/pokemon.interface'
import { usePokemonStore } from '@/modules/pokemon/stores/pokemon.store'
import { setActivePinia, createPinia } from 'pinia'

const mockPokemon: Pokemon = { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }

describe('ItemPokemon.vue', () => {
  let store: any

  beforeEach(() => {
    vi.clearAllMocks()
    setActivePinia(createPinia())
    store = usePokemonStore()

    store.$state.favorites = []
    store.$state.favorites.push(mockPokemon)
  })

  it('renders the Pokémon name', () => {
    const wrapper = mount(ItemPokemon, {
      props: { pokemon: mockPokemon },
      global: {
        stubs: { StarIcon }
      }
    })

    expect(wrapper.text()).toContain(mockPokemon.name)
  })

  it('calls toggleFavorite on click', async () => {
    const wrapper = mount(ItemPokemon, {
      props: { pokemon: mockPokemon },
      global: {
        stubs: { StarIcon }
      }
    })

    const toggleFavoriteSpy = vi.spyOn(wrapper.vm, 'toggleFavorite')

    await wrapper.trigger('click')

    expect(toggleFavoriteSpy).toHaveBeenCalled()
  })

  it('adds to favorites if not already a favorite', async () => {
    store.$state.favorites = []

    const wrapper = mount(ItemPokemon, {
      props: { pokemon: mockPokemon },
      global: {
        stubs: { StarIcon }
      }
    })

    const addFavoriteSpy = vi.spyOn(store, 'addFavorite')

    await wrapper.trigger('click')

    expect(addFavoriteSpy).toHaveBeenCalledWith(mockPokemon)
  })

  it('removes from favorites if already a favorite', async () => {
    store.$state.favorites.push(mockPokemon)

    const wrapper = mount(ItemPokemon, {
      props: { pokemon: mockPokemon },
      global: {
        stubs: { StarIcon }
      }
    })

    const removeFavoriteSpy = vi.spyOn(store, 'removeFavorite')

    await wrapper.trigger('click')

    expect(removeFavoriteSpy).toHaveBeenCalledWith(mockPokemon.name)
  })

  it('shows the correct star color for favorite status', () => {
    store.$state.favorites.push(mockPokemon)

    const wrapper = mount(ItemPokemon, {
      props: { pokemon: mockPokemon },
      global: {
        stubs: { StarIcon }
      }
    })

    const starIcon = wrapper.findComponent(StarIcon)
    expect(starIcon.props('color')).toBe('#FFD700')
  })

  it('shows the correct star color for non-favorite status', () => {
    store.$state.favorites = []

    const wrapper = mount(ItemPokemon, {
      props: { pokemon: mockPokemon },
      global: {
        stubs: { StarIcon }
      }
    })

    const starIcon = wrapper.findComponent(StarIcon)
    expect(starIcon.props('color')).toBe('#BFBFBF')
  })
})
