// Composables
import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import InspectionList from '@/views/CompletedInspections.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/completed',
    name: 'completed',
    component: InspectionList,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
