<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  htmlType?: 'button' | 'submit' | 'reset'
  shape?: 'rounded' | 'default'
  type?: 'primary' | 'link' | 'default'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  danger?: boolean
}>()
</script>
<template>
  <button
    class="flex items-center justify-center px-5 h-11 disabled:text-gray-600 disabled:bg-gray-200"
    :class="{
      rounded: shape !== 'rounded',
      'rounded-full': shape === 'rounded',
      'bg-primary-10 hover:bg-primary-9 text-white': type === 'primary' && !danger,
      'text-primary-10': type === 'link' && !danger,
      'bg-white border-2 border-cyan-800 text-cyan-800': (!type || type === 'default') && !danger,
      'bg-red-700 hover:bg-red-600 text-white': danger,
      'w-full': block
    }"
    :disabled="disabled || loading"
    :type="htmlType ?? 'button'"
  >
    <span v-if="loading" class="icon-[eos-icons--three-dots-loading] text-4xl"></span>
    <slot v-else></slot>
  </button>
</template>
