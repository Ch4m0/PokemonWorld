import { flushPromises, mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { describe, it, expect, beforeEach } from 'vitest'
import BottomTabMenu from '@/modules/common/components/BottomTabMenu.vue'
import ListIcon from '@/icons/ListIcon.vue'
import StarIcon from '@/icons/StarIcon.vue'
import PokeButton from '@/modules/common/components/PokeButton.vue'

const routes = [
  {
    path: '/pokemon-list',
    name: 'pokemon-list',
    component: { template: '<div>Pokemon List</div>' }
  },
  {
    path: '/pokemon-list-favorite',
    name: 'pokemon-list-favorite',
    component: { template: '<div>Favorite Pokemon List</div>' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

describe('BottomTabMenu.vue', () => {
  let wrapper: any

  beforeEach(async () => {
    localStorage.clear()
    await router.push('/')
    wrapper = mount(BottomTabMenu, {
      global: {
        plugins: [router],
        stubs: {
          ListIcon,
          StarIcon,
          PokeButton
        }
      }
    })
  })

  it('renders the buttons', () => {
    const buttons = wrapper.findAllComponents(PokeButton)
    expect(buttons.length).toBe(2)
  })

  it('sets the correct active button based on localStorage', async () => {
    localStorage.setItem('activeTab', 'favorites')
    await router.push('/')
    wrapper = mount(BottomTabMenu, {
      global: {
        plugins: [router],
        stubs: {
          ListIcon,
          StarIcon,
          PokeButton
        }
      }
    })
    expect(wrapper.vm.activeButton).toBe('favorites')
  })

  it('changes active button on click', async () => {
    const buttons = wrapper.findAllComponents(PokeButton)
    await buttons[1].trigger('click')
    expect(wrapper.vm.activeButton).toBe('favorites')
    expect(localStorage.getItem('activeTab')).toBe('favorites')
  })

  it('navigates to the correct route on button click', async () => {
    const buttons = wrapper.findAllComponents(PokeButton)
    await buttons[1].trigger('click')
    await flushPromises()
    expect(wrapper.vm.$route.name).toBe('pokemon-list-favorite')

    await buttons[0].trigger('click')
    await flushPromises()
    expect(wrapper.vm.$route.name).toBe('pokemon-list')
  })

  it('syncs active button with route', async () => {
    await router.push({ name: 'pokemon-list-favorite' })
    expect(wrapper.vm.activeButton).toBe('favorites')

    await router.push({ name: 'pokemon-list' })
    expect(wrapper.vm.activeButton).toBe('all')
  })
})
