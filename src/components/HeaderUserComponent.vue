<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useConfirmStore } from '@/stores/confirm'

const router = useRouter()
const { user, clearUser } = useUserStore()
const { confirm } = useConfirmStore()

const handleLogout = () => {
  confirm({
    icon: 'icon-[mdi--logout]',
    title: 'Sign Out',
    message: 'Are you sure to sign out from your current session?',
    onConfirm: () => {
      clearUser()
      router.replace('/auth')
    }
  })
}
</script>
<template>
  <div class="user-info-btn">
    <button type="button" class="text-white">
      <span class="icon-[mdi--user-circle-outline] h-6 w-6"></span>
    </button>
    <div
      class="user-info-dropdown z-40 absolute right-0 bg-white border rounded shadow min-w-[260px]"
    >
      <div class="p-4">
        <span class="text-xs uppercase">Account</span>
        <div class="flex items-center mt-2 space-x-3">
          <span class="icon-[mdi--shield-user-outline] w-7 h-7"></span>
          <div class="flex-grow">
            <h4>{{ user.data?.name ?? 'User' }}</h4>
            <p class="text-sm text-gray-500">{{ user.data?.email }}</p>
          </div>
        </div>
      </div>
      <ul class="user-info-menu">
        <li>
          <router-link to="/profile">
            <span class="icon-[mdi--user-online-outline] text-lg"></span>
            <span>My Profile</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin">
            <span class="icon-[mdi--cog-outline] text-lg"></span>
            <span>Administrator</span>
          </router-link>
        </li>
      </ul>
      <div class="p-1">
        <button
          @click="handleLogout"
          type="button"
          class="w-full px-4 py-2 text-left bg-white rounded hover:bg-gray-200"
        >
          Sign out
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.user-info-dropdown {
  @apply hidden;
}
.user-info-btn:hover .user-info-dropdown {
  @apply block;
}
.user-info-menu {
  @apply flex flex-col space-y-1 border-t border-b;
}
.user-info-menu li a,
.user-info-menu li button {
  @apply text-sm px-4 py-2 bg-white hover:bg-gray-200 cursor-pointer flex items-center space-x-2;
}
</style>
