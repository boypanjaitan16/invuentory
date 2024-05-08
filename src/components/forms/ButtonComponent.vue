<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  htmlType: 'button' | 'submit' | 'reset'
  shape?: 'rounded' | 'default'
  type?: 'primary' | 'link' | 'default'
  disabled?: boolean
  loading?: boolean
}>()
</script>
<template>
  <button
    class="w-full px-5 py-3 disabled:text-gray-600 disabled:bg-gray-200"
    :class="{
      rounded: shape !== 'rounded',
      'rounded-full': shape === 'rounded',
      'bg-cyan-800 text-white': type === 'primary',
      'text-cyan-800': type === 'link',
      'bg-white border-2 border-cyan-800 text-cyan-800': !['primary', 'link'].includes(type)
    }"
    :disabled="disabled"
    :type="htmlType"
  >
    <slot></slot>
  </button>
</template>
