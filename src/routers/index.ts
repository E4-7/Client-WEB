import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("@/views/MainView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/NotFound.vue"),
    meta: { title: "Page not found" },
  },
] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
