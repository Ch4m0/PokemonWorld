import { pokeApi } from '@/api/pokeApi'
import type { ResponsePokemon } from '../interface/pokemon.interface'

export const getListPokemonAction = async (page: number, limit: number = 10) => {
  try {
    console.log(page)
    const { data } = await pokeApi.get<ResponsePokemon>(
      `/pokemon?limit=${limit}&offset=${page * limit}`
    )
    console.log(data)

    return data.results
  } catch (error) {
    throw new Error('Error getting pokemon')
  }
}