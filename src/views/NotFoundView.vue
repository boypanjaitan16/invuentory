<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="max-w-lg m-5">
      <span class="text-red-600 uppercase">Error 404</span>
      <h1 class="text-xl font-semibold text-red-800">
        Oops! Looks like you've wandered into the digital wilderness.
      </h1>
      <p class="my-5 text-gray-500">
        The page you're searching for seems to be playing hide and seek with us. While our team of
        cyber explorers embarks on a quest to retrieve it, why not take a moment to contemplate the
        mysteries of the internet?
      </p>
      <button
        @click="router.back()"
        class="flex items-center space-x-2 font-semibold text-primary-10 hover:text-primary-7"
      >
        <span class="icon-[mdi--arrow-back]"></span>
        <span>Go back</span>
      </button>
    </div>
  </div>
</template>
