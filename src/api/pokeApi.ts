import axios from 'axios'

const pokeApi = axios.create({
  baseURL: import.meta.env.VITE_POKE_API_URL
})

export { pokeApi }
