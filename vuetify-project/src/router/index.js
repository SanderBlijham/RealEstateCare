// Composables
import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import CompletedInspections from '@/views/CompletedInspections.vue'
import OpenInspections from '@/views/OpenInspections.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/completed',
    name: 'completed',
    component: CompletedInspections,
  },
  {
    path: '/scheduled',
    name: 'scheduled',
    component: OpenInspections,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
