<script setup lang="ts">
import { useAlertStore } from '@/stores/alert'

const alert = useAlertStore()
</script>
<template>
  <div
    v-if="alert.message"
    class="fixed z-50 flex flex-row items-center justify-between px-5 py-3 text-white bg-red-600 rounded shadow top-5 inset-x-5"
  >
    <span>{{ alert.message }}</span>
    <button @click="alert.clearMessage()">
      <span class="icon-[mdi--window-close]"></span>
    </button>
  </div>
</template>
