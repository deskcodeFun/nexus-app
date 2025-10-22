import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

import NotFoundView from '@/views/NotFoundView.vue'
// import ComputerDetail from '@/components/computer/ComputerDetail.vue'

import ServiceView from '@/views/ServiceView.vue'
import UserAdd from '@/components/users/UserAdd.vue'

import UserView from '@/views/UserView.vue'
// import ComputerAdd from '@/components/computer/ComputerAdd.vue'
// import UserAdd from '@/components/user/userAdd.vue'

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

    // {
    //   path: '/computer/:id',
    //   name: 'computer-detail',

    //   component: ComputerDetail,
    // },
    // {
    //   path: '/computer/computer-add',
    //   name: 'computer-add',

    //   component: ComputerAdd,
    // },
    // {
    //   path: '/computer/user-add',
    //   name: 'user-add',

    //   component: UserAdd,
    // },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
