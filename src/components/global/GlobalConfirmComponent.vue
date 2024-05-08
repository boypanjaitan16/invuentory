<script setup lang="ts">
import { useConfirmStore } from '@/stores/confirm'
import Button from '@/components/forms/ButtonComponent.vue'

const confirmStore = useConfirmStore()
</script>
<template>
  <div
    v-if="confirmStore.data.show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
  >
    <div class="p-5 mx-5 bg-white rounded shadow">
      <div class="flex space-x-5">
        <span class="w-8 h-8 text-gray-600" :class="confirmStore.data.icon"></span>
        <div class="flex flex-col">
          <h5 class="mt-0 mb-1 text-xl font-semibold leading-tight">
            {{ confirmStore.data.title }}
          </h5>
          <p>{{ confirmStore.data.message }}</p>
          <div class="flex flex-row justify-end mt-5 space-x-3">
            <Button danger @click="confirmStore.data.onCancel!()">{{
              confirmStore.data.cancelText
            }}</Button>
            <Button type="primary" @click="confirmStore.data.onConfirm!()">{{
              confirmStore.data.confirmText
            }}</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
