import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useSearch() {
  const route = useRoute()
  const router = useRouter()
  const searchTerm = ref(String(route.query.search || ''))

  watch(
    () => route.query.search,
    (newSearch) => {
      searchTerm.value = String(newSearch || '')
    }
  )

  watch(searchTerm, (newTerm) => {
    const query = { ...route.query, search: newTerm || undefined }
    if (!newTerm) delete query.search
    router.push({ query })
  })

  return { searchTerm }
}
