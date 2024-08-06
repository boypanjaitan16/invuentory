<script setup lang="ts">
import { useAlertStore } from '@/stores/alert'
import { watch } from 'vue'

const { alert, clearAlert } = useAlertStore()
watch(
  () => alert.message,
  (newMessage) => {
    if (newMessage) {
      setTimeout(() => {
        clearAlert()
      }, alert.timer)
    }
  }
)
</script>
<template>
  <div
    v-if="alert.message"
    :class="[
      {
        'bg-red-600': alert.type === 'error',
        'bg-yellow-600': alert.type === 'warning',
        'bg-green-600': alert.type === 'success',
        'bg-cyan-600': alert.type === 'info'
      },
      alert.asToast ? 'right-5' : 'inset-x-5 md:inset-x-10'
    ]"
    class="fixed z-50 flex flex-row items-center px-5 py-3 space-x-2 text-white rounded shadow-lg top-2"
  >
    <span v-if="alert.type === 'info'" class="icon-[mdi--information] w-5 h-5"></span>
    <span v-else-if="alert.type === 'success'" class="icon-[mdi--check-circle] w-5 h-5"></span>
    <span v-else-if="alert.type === 'error'" class="icon-[mdi--alert] w-5 h-5"></span>
    <span v-else-if="alert.type === 'warning'" class="icon-[mdi--warning-octagon] w-5 h-5"></span>
    <p class="flex-grow">{{ alert.message }}</p>
    <button @click="clearAlert()" class="flex items-center">
      <span class="icon-[mdi--window-close] w-5 h-5"></span>
    </button>
  </div>
</template>
