import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useTitleBarOptionsStore = defineStore('titleBarOptions', () => {
  const router = useRouter()
  const search = ref('')
  const isThemingBarOpen = ref(false)

  watch(router.currentRoute, newRoute => {
    if (newRoute.name !== 'home') {
      isThemingBarOpen.value = false
    }
  })

  return { search, isThemingBarOpen }
})
