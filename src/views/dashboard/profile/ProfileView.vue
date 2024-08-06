<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
const menuItems = [
  {
    title: 'Profile',
    link: '/profile',
    icon: 'icon-[mdi--user-outline]'
  },
  {
    title: 'Update Profile',
    link: '/profile/update',
    icon: 'icon-[mdi--user-check-outline]'
  },
  {
    title: 'Change Password',
    link: '/profile/change-password',
    icon: 'icon-[mdi--user-lock-outline]'
  },
  {
    title: 'Approval',
    link: '/profile/approval',
    icon: 'icon-[mdi--controller-circle-outline]'
  }
]

const { user } = useUserStore()
</script>
<template>
  <div class="flex flex-row flex-grow space-x-5 divide-x">
    <div>
      <div
        class="flex items-center p-5 space-x-3 rounded shadow bg-gradient-to-r from-primary-10 to-primary-3"
      >
        <span class="icon-[mdi--user-circle] w-8 h-8 text-white"></span>
        <div class="flex-grow">
          <h4 class="text-lg font-semibold text-white">{{ user.data?.name ?? 'User' }}</h4>
          <p class="text-white">{{ user.data?.email }}</p>
        </div>
      </div>
      <ul class="flex flex-col mt-5 space-y-1 list-menu">
        <li
          v-for="item in menuItems"
          :key="item.link"
          :class="{ active: item.link === route.path }"
        >
          <router-link :to="item.link">
            <span :class="item.icon" class="text-lg"></span>
            <span>{{ item.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="flex-grow md:pl-5">
      <RouterView />
    </div>
  </div>
</template>
<style scoped>
.list-menu li {
  @apply px-5 py-2 rounded hover:bg-gray-200 cursor-pointer;
}
.list-menu li.active {
  @apply bg-gray-200;
}
.list-menu li a {
  @apply flex items-center space-x-2;
}
</style>
