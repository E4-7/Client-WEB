import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/views/Layout/MainPage.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/base",
  },
  {
    path: "/base",
    name: "BaseMain",
    component: Main,
    beforeEnter: (to, from) => {
      if (store.state.user) {
        router.push("/main");
        return false;
      }
      return true;
    },
  },
  {
    path: "/student",
    name: "Student",
    component: () => import("@/views/Layout/Student/VerifyIdentity.vue"),
  },
  {
    path: "/set/:roomId",
    name: "SetStudent",
    component: () => import("@/views/Layout/Student/SetStudent.vue"),
    props: true,
  },
  {
    path: "/test/:roomId",
    name: "StudentExam",
    component: () => import("@/views/Layout/Student/TestRoom.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Layout/Professor/LoginProfessor.vue"),
  },
  {
    path: "/main",
    name: "Professor",
    component: () => import("@/views/Layout/Professor/MainManage.vue"),
  },
  {
    path: "/main/:roomId",
    name: "ExamRoom",
    component: () => import("@/views/Layout/ProfessorExamRoom.vue"),
  },
  {
    path: "/main/:roomId/score",
    name: "ScoreRoom",
    component: () => import("@/views/Layout/Professor/AutomaticScoring.vue"),
  },
  {
    path: "*",
    component: () => import("@/views/NotFoundPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.Base,
  routes,
});

export default router;
