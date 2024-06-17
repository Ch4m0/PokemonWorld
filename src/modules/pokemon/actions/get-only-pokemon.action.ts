import { pokeApi } from '@/api/pokeApi'
import type { PokemonDetails, ResponseDetailPokemon } from '../interface/pokemon.interface'

export const getOnlyPokemonAction = async (name: string) => {
  try {
    const { data } = await pokeApi.get<ResponseDetailPokemon>(`/pokemon/${name}`)

    const pokemonDetails: PokemonDetails = {
      name: data.name,
      weight: data.weight,
      type: data.types[0].type.name,
      height: data.height
    }
    return pokemonDetails
  } catch (error) {
    throw new Error('Error getting pokemon')
  }
}
