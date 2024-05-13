<script setup lang="ts">
import { defineProps, defineModel, ref } from 'vue'

const props = defineProps<{
  type: 'email' | 'password' | 'text' | 'date'
  name: string
  required?: boolean
  placeholder?: string
  label?: string
  defaultValue?: string
  errors?: string[]
}>()

const typeRef = ref(props.type)
const model = defineModel()

const togglePassword = () => {
  typeRef.value = typeRef.value === 'password' ? 'text' : 'password'
}
</script>
<template>
  <div>
    <label
      v-if="label"
      :for="name"
      class="text-sm font-light"
      :class="[errors ? 'text-red-600' : 'text-gray-500']"
      >{{ label }}
    </label>

    <div class="relative">
      <input
        v-model="model"
        :type="typeRef"
        :name="name"
        :id="name"
        :placeholder="placeholder"
        class="w-full px-3 py-2 border-2 rounded"
        :class="{ 'border-red-600': errors }"
      />
      <button
        v-if="type === 'password'"
        @click="togglePassword"
        type="button"
        class="absolute top-0 bottom-0 right-0 flex items-center justify-center px-3"
      >
        <span
          class="text-xl"
          :class="[
            typeRef === 'password' ? 'icon-[mdi--eye-outline]' : 'icon-[mdi--eye-off-outline]'
          ]"
        ></span>
      </button>
    </div>
    <div v-if="errors">
      <p v-for="error in errors" :key="error" class="text-sm text-red-600">{{ error }}</p>
    </div>
  </div>
</template>
