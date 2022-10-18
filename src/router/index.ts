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
      {
        path: '/detail/:id',
        component: () => import('@/pages/Detail/index.vue'),
      },
    ],
  },
];

export default function createSSRRouter() {
  return createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });
}
