<script setup lang="ts">
import { defineProps, defineModel } from 'vue'

defineProps<{
  name: string
  required?: boolean
  label?: string
  defaultValue?: string
  errors?: string[]
  options: Array<{
    value: string | number
    label: string | number
  }>
}>()

const model = defineModel()
</script>
<template>
  <div>
    <label
      v-if="label"
      :for="name"
      class="text-sm font-light"
      :class="[errors ? 'text-red-600' : 'text-gray-500']"
      >{{ label }}</label
    >
    <div class="relative mt-1">
      <select
        v-model="model"
        :name="name"
        :id="name"
        class="w-full px-3 py-2 bg-white border-[1.5px] rounded"
        :class="{ 'border-red-600': errors, 'border-gray-300': !errors }"
      >
        <option value="">Please select one</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
    <div v-if="errors">
      <p v-for="error in errors" :key="error" class="text-sm text-red-600">{{ error }}</p>
    </div>
  </div>
</template>
