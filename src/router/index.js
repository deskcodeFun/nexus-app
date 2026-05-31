// import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createMemoryHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

import ServiceView from '@/views/ServiceView.vue'

import AssetsView from '@/views/AssetsView.vue'
import AssetEdit from '@/components/assets/AssetEdit.vue'
import AssetAdd from '@/components/assets/AssetAdd.vue'

import EmployeeView from '@/views/EmployeeView.vue'
import EmployeeAdd from '@/components/employees/EmployeeAdd.vue'
import EmployeeEdit from '@/components/employees/EmployeeEdit.vue'
import SignIn from '@/views/SignIn.vue'

import { supabase } from '@/lib/supabaseClient'
// import ServiceAdd from '@/components/Services/ServiceAdd.vue'
import ServiceForm from '@/components/Services/ServiceForm.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sign-in',
      component: SignIn,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/services',
      name: 'service',
      component: ServiceView,
    },
    {
      path: '/addService',
      name: 'add-service',
      // component: ServiceAdd,
      component: ServiceForm,
    },
    {
      path: '/assets',
      name: 'assets',
      component: AssetsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/editAsset/:id',
      name: 'edit-asset',
      component: AssetEdit,
      meta: { requiresAuth: true },
    },
    {
      path: '/addAsset/',
      name: 'add-asset',
      component: AssetAdd,
      meta: { requiresAuth: true },
    },
    {
      path: '/services',
      name: 'service',
      component: ServiceView,
    },
    {
      path: '/employee',
      name: 'employee',
      component: EmployeeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/addEmployee',
      name: 'add-employee',
      component: EmployeeAdd,
      meta: { requiresAuth: true },
    },
    {
      path: '/editEmployee/:id',
      name: 'edit-employee',
      component: EmployeeEdit,
      meta: { requiresAuth: true },
    },

    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

//auth required guard
router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  // 1. If user isn't logged in and tries to access a restricted page
  if (requiresAuth) {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (requiresAuth && !session) {
      // next('/sing-in')
      return { name: 'sign-in' }
    }
    // 2. If user is logged in and tries to go to Login/Register
    if (session && (to.name === 'sign-in' || to.name === 'sign-up')) {
      return { name: 'home' }
    }
  }
  // 3. Otherwise, returning nothing (undefined) or true allows navigation
  return true
})

export default router
