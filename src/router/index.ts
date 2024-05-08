import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import ProfileView from '@/views/dashboard/profile/ProfileView.vue'
import DetailProfileView from '@/views/dashboard/profile/DetailProfileView.vue'
import UpdateProfileView from '@/views/dashboard/profile/UpdateProfileView.vue'
import ChangePasswordView from '@/views/dashboard/profile/ChangePasswordView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '',
          component: DashboardView
        },
        {
          path: 'profile',
          component: ProfileView,
          meta: { transition: 'slide-left' },
          children: [
            {
              path: '',
              component: DetailProfileView
            },
            {
              path: 'update',
              component: UpdateProfileView
            },
            {
              path: 'change-password',
              component: ChangePasswordView
            }
          ]
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: LoginView
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (!to.path.startsWith('/auth') && !userStore.user.data) next({ name: 'auth' })
  else next()
})

export default router
