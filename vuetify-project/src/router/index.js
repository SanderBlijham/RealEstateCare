// Composables
import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/views/HomePage.vue";
import CompletedInspections from "@/views/CompletedInspections.vue";
import OpenInspections from "@/views/OpenInspections.vue";
import KnowledgeBase from "@/views/KnowledgeBase.vue";
import Settings from "@/views/SettingsPage.vue";
import LoginScreen from "@/views/LoginScreen.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
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
  },
  {
    path: "/scheduled",
    name: "scheduled",
    component: OpenInspections,
  },
  {
    path: "/knowledge-base",
    name: "knowledge-base",
    component: KnowledgeBase,
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
