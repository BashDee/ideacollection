import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import Login from '../views/Login.vue'
import RegistrationView from '../views/Registration.vue'
import HitIt from '../views/HitIt.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HitIt,
      meta: { requiresAuth: true },
    },
    {
      path: '/hitit',
      component: HitIt,
      meta: { requiresAuth: true },
    },
    {
      path: '/register',
      component: RegistrationView,
      meta: { requiresGuest: true },
    },
    {
      path: '/sign-in',
      component: Login,
      meta: { requiresGuest: true },
    },
  ],
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject,
    )
  })
}

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest)

  const isLoggedIn = await getCurrentUser()

  if (requiresAuth && !isLoggedIn) {
    // This route requires auth, but the user is not logged in.
    next('/sign-in')
  } else if (requiresGuest && isLoggedIn) {
    // This route is for guests, but the user is logged in.
    // Redirect to the home page.
    next('/')
  } else {
    // In all other cases, let the user proceed.
    next()
  }
})

export default router
