import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  createMemoryHistory,
} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('@/pages/Login/index.vue'),
  },
  {
    path: '/',
    component: () => import('@/Layout/index.vue'),
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: '/home',
        component: () => import('@/pages/Home/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes,
});

export default router;
