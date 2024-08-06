<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/HeaderComponent.vue'
</script>
<template>
  <Header />
  <main class="flex flex-col flex-grow p-5 md:px-10">
    <RouterView />
  </main>
</template>
