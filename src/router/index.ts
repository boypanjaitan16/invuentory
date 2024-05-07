import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LegacyView from '@/views/LegacyView.vue'
import LoginView from '@/views/auth/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/legacy',
      name: 'legacy',
      component: LegacyView
    },
    {
      path: '/auth',
      name: 'auth',
      component: LoginView
    }
  ]
})

export default router
