import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/interfaces/User'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = reactive<{ data?: User }>({ data: undefined })

    const setUser = (usr: User) => {
      user.data = usr
    }

    const clearUser = () => {
      user.data = undefined
    }

    return { user, persists: true, setUser, clearUser }
  },
  {
    persist: true
  }
)
