import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTitleBarOptionsStore = defineStore('titleBarOptions', () => {
  const search = ref('')
  return { search }
})
