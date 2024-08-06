<script setup lang="ts">
import { ref } from 'vue'
import AddUserModalComponent from '@/components/modals/AddUserModalComponent.vue'

const isAddUserModalVisible = ref<boolean>(false)

const showAddUserModal = () => {
  isAddUserModalVisible.value = true
}
</script>
<template>
  <AddUserModalComponent v-model:visible="isAddUserModalVisible" />
  <div class="relative">
    <div class="flex space-x-3">
      <div class="relative flex-grow">
        <div class="absolute top-0 bottom-0 left-0 flex items-center px-3">
          <span class="icon-[mdi--search] text-lg"></span>
        </div>
        <input
          type="search"
          class="w-full py-2 pl-10 pr-3 bg-white border-[1.5px] rounded"
          placeholder="Search by email, name or other attributes"
        />
      </div>
      <button
        class="flex items-center px-5 text-white rounded bg-primary-10 hover:bg-primary-9"
        @click="showAddUserModal"
      >
        <span class="icon-[mdi--account-plus-outline] text-lg"></span>
        &nbsp; Add User
      </button>
      <button
        class="flex items-center px-3 text-white rounded bg-gradient-to-l from-primary-10 to-primary-5"
      >
        <span class="icon-[mdi--reload] text-xl"></span>
      </button>
    </div>
  </div>
</template>
