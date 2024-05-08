<script setup>
import { RouterView } from 'vue-router'
import GlobalAlert from '@/components/global/GlobalAlertComponent.vue'
import GlobalConfirm from './components/global/GlobalConfirmComponent.vue'
</script>
<template>
  <GlobalAlert />
  <GlobalConfirm />
  <RouterView />
</template>
