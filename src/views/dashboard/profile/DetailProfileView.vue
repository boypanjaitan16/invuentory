<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const { user } = useUserStore()
</script>
<template>
  <div>Hi {{ user.data?.email }}</div>
</template>
