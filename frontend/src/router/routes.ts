import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
      { path: 'register-account', component: () => import('pages/RegisterAccountPage.vue') },
      { path: 'recover-password', component: () => import('pages/RecoverPasswordPage.vue') },
      { path: 'verify-account/:email/:token?', component: () => import('pages/VerifyAccountPage.vue') }
    ],
  },
  {
    path: '/control-panel',
    component: () => import('layouts/ControlPanelLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SchoolsPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
