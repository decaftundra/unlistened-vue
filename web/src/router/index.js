import { createRouter, createWebHistory } from 'vue-router';

import Playlists from '../views/Playlists.vue';
// import Unlistened from '../views/Unlistened'

const routes = [{
  path: '/',
  name: 'Playlists',
  component: Playlists,
},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
