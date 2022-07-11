import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import AppView from '@/views/AppView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/app',
    name: 'App',
    component: AppView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not-Found',
    component: AppView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
