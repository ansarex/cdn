import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'

import Register from '@/views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
    },

    {
      path: '/login',
      component: Login,
    },
    {
      path: '/profile/:id',
      component: Profile,
      meta: { requiresAuth: true },
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/home',
      component: Home,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('login')
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
    // Redirect to login page if not logged in
    next('/login')
  } else {
    next() // Allow navigation if logged in or if route doesn't require auth
  }
})

export default router
