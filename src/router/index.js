import { createRouter, createWebHistory } from 'vue-router'
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

// import ComputerAdd from '@/components/computers/ComputerAdd.vue'
// import ComputerEdit from '@/components/computers/ComputerEdit.vue'
import PrinterAdd from '@/components/printers/PrinterAdd.vue'
import PrinterEdit from '@/components/printers/PrinterEdit.vue'

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
      path: '/editAsset/:id',
      name: 'edit-asset',
      component: AssetEdit,
    },
    {
      path: '/addAsset/',
      name: 'add-asset',
      component: AssetAdd,
    },

    // {
    //   path: '/addComputer',
    //   name: 'add-computer',
    //   component: ComputerAdd,
    // },
    // {
    //   path: '/editComputer/:id',
    //   name: 'edit-computer',

    //   component: ComputerEdit,
    // },
    {
      path: '/addPrinter',
      name: 'add-printer',
      component: PrinterAdd,
    },
    {
      path: '/editPrinter/:id',
      name: 'edit-printer',

      component: PrinterEdit,
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
    },
    {
      path: '/addEmployee',
      name: 'add-employee',

      component: EmployeeAdd,
    },
    {
      path: '/editEmployee/:id',
      name: 'edit-employee',

      component: EmployeeEdit,
    },

    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
