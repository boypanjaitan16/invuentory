<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>
<template>
  <div>Hi {{ userStore.user.data?.email }}</div>
</template>
