<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  type: 'error' | 'warning' | 'info' | 'success'
  className?: string
}>()
</script>
<template>
  <div
    class="flex items-center justify-between px-4 py-3 border rounded shadow"
    :class="[
      {
        'border-red-700 text-red-700 bg-red-200': type === 'error',
        'border-yellow-600 text-yellow-600 bg-yellow-200': type === 'warning',
        'border-blue-700 text-blue-700 bg-blue-200': type === 'info',
        'border-green-700 text-green-700 bg-green-200': type === 'success'
      },
      className
    ]"
  >
    <span><slot></slot></span>
    <button type="button" @click="$emit('onDismiss')">
      <span class="icon-[mdi--window-close]"></span>
    </button>
  </div>
</template>
