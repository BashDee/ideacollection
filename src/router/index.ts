import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/HitIt.vue'),
    },
    {
      path: '/hitit',
      component: () => import('../views/HitIt.vue'),
    },
    {
      path: '/register',
      component: () => import('../views/Registration.vue'),
    },
    {
      path: '/sign-in',
      component: () => import('../views/Login.vue'),
    },
  ],
})

export default router
