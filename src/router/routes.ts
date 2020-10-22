import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'immobile/new', component: () => import('pages/CreateImmobile.vue') },
      { path: 'immobile/:id', component: () => import('pages/Details.vue') }
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
