import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const usePasswordStore = defineStore(
  'password',
  () => {
    const password = reactive<{
      show: boolean
      confirmed: boolean
    }>({
      show: false,
      confirmed: false
    })

    const confirmPassword = () => {
      password.confirmed = true
      password.show = false
    }

    const showPasswordForm = () => {
      password.show = true
      password.confirmed = false
    }

    const hidePasswordForm = () => {
      password.show = false
    }

    return { password, confirmPassword, showPasswordForm, hidePasswordForm }
  },
  { persist: false }
)
