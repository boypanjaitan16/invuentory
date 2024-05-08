import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAlertStore = defineStore(
  'alert',
  () => {
    const message = ref('')

    const setMessage = (msg: string) => {
      message.value = msg
    }

    const clearMessage = () => {
      message.value = ''
    }

    return { message, setMessage, clearMessage }
  },
  { persist: false }
)
