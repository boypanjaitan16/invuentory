<script setup lang="ts">
import SearchBox from '@/components/HeaderSearchboxComponent.vue'
import HeaderUser from '@/components/HeaderUserComponent.vue'
</script>
<template>
  <header
    class="flex items-center px-5 py-3 space-x-5 md:px-10 md:space-x-10 lg:space-x-20 bg-primary-10"
  >
    <router-link to="/">
      <span class="text-xl font-semibold text-white">Invuentory</span>
    </router-link>
    <SearchBox />
    <div class="relative flex items-center space-x-5">
      <button type="button" class="text-white">
        <span class="icon-[mdi--notifications-none] h-6 w-6"></span>
      </button>
      <button type="button" class="text-white">
        <span class="icon-[mdi--message-text-outline] h-6 w-6"></span>
      </button>
      <HeaderUser />
    </div>
  </header>
</template>
