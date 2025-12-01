import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ServiceView from '@/views/ServiceView.vue'
import AssetsView from '@/views/AssetsView.vue'
// import UserAdd from '@/components/users/UserAdd.vue'

import UserView from '@/views/UserView.vue'
import UserAdd from '@/components/users/UserAdd.vue'
import UserEdit from '@/components/users/UserEdit.vue'
import AssetsNPA from '@/components/assets/AssetsNPA.vue'
import AssetsNPC from '@/components/assets/AssetsNPC.vue'
import AssetsNPM from '@/components/assets/AssetsNPM.vue'
import AssetsNRA from '@/components/assets/AssetsNRA.vue'
import AssetsNRT from '@/components/assets/AssetsNRT.vue'
import AssetsOHO from '@/components/assets/AssetsOHO.vue'
import AssetsConspire from '@/components/assets/AssetsConspire.vue'

// import ComputerAdd from '@/components/computer/ComputerAdd.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',

      component: AboutView,
    },
    {
      path: '/assets',
      name: 'assets',
      component: AssetsView,
    },
    {
      path: '/npa',
      name: 'assets-npa',
      component: AssetsNPA,
    },
    {
      path: '/npc',
      name: 'assets-npc',
      component: AssetsNPC,
    },
    {
      path: '/npm',
      name: 'assets-npm',
      component: AssetsNPM,
    },
    {
      path: '/nra',
      name: 'assets-nra',
      component: AssetsNRA,
    },
    {
      path: '/nrt',
      name: 'assets-nrt',
      component: AssetsNRT,
    },
    {
      path: '/oho',
      name: 'assets-oho',
      component: AssetsOHO,
    },
    {
      path: '/conspire',
      name: 'assets-conspire',
      component: AssetsConspire,
    },

    {
      path: '/services',
      name: 'service',

      component: ServiceView,
    },
    {
      path: '/user',
      name: 'user',

      component: UserView,
    },
    {
      path: '/addUser',
      name: 'add-user',

      component: UserAdd,
    },
    {
      path: '/editUser/:id',
      name: 'edit-user',

      component: UserEdit,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
