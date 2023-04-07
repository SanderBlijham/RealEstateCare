// Composables
import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/views/HomePage.vue";
import CompletedInspections from "@/views/CompletedInspections.vue";
import OpenInspections from "@/views/OpenInspections.vue";
import KnowledgeBase from "@/views/KnowledgeBase.vue";
import Settings from "@/views/SettingsPage.vue";
import LoginScreen from "@/views/LoginScreen.vue";
import RegisterScreen from "@/views/RegisterScreen.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterScreen,
  },
  {
    path: "/login",
    name: "login",
    component: LoginScreen,
  },
  {
    path: "/completed",
    name: "completed",
    component: CompletedInspections,
    meta: { requiresAuth: true },
  },
  {
    path: "/scheduled",
    name: "scheduled",
    component: OpenInspections,
    meta: { requiresAuth: true },
  },
  {
    path: "/knowledge-base",
    name: "knowledge-base",
    component: KnowledgeBase,
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !localStorage.getItem('authenticated')) {
    next('/login');
  } else {
    next();
  }
});

export default router;
