import type { RouteRecordRaw } from 'vue-router'

export const pokemonRoutes: RouteRecordRaw = {
  path: '/lista-pokemon',
  name: 'list',
  component: () => import('@/modules/pokemon/layouts/PokemonLayout.vue'),
  children: [
    {
      path: '',
      name: 'pokemon-list',
      component: () => import('@/modules/pokemon/views/PokemonView.vue')
    },
    {
      path: 'favoritos',
      name: 'pokemon-list-favorite',
      component: () => import('@/modules/pokemon/views/FavoritesPokemon.vue')
    }
  ]
}
