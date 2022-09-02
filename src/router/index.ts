import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: import(
      /* webpackChunkName: "Layout" */ '@/pages/Login/index.vue'
    ),
  },
  {
    path: '/',
    component: import(/* webpackChunkName: "Layout" */ '@/Layout/index.vue'),
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: '/home',
        component: import(
          /* webpackChunkName: "Layout" */ '@/pages/Home/index.vue'
        ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
