import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAlertStore = defineStore(
  'alert',
  () => {
    const alert = reactive<{
      type: 'error' | 'warning' | 'success' | 'info'
      message?: string
      timer?: number
      asToast?: boolean
    }>({
      type: 'info',
      timer: 5000
    })

    const setAlert = (param: typeof alert) => {
      alert.message = param.message
      alert.type = param.type
      alert.asToast = param.asToast

      if (param.timer) {
        alert.timer = param.timer
      }
    }

    const clearAlert = () => {
      alert.type = 'info'
      alert.message = undefined
      alert.timer = 5000
      alert.asToast = false
    }

    return { alert, setAlert, clearAlert }
  },
  { persist: false }
)
