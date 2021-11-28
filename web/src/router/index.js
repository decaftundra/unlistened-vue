import { createRouter, createWebHistory } from 'vue-router';

import Playlists from '../views/Playlists.vue';
import Unlistened from '../views/Unlistened.vue'

const routes = [{
  path: '/',
  name: 'Playlists',
  component: Playlists,
},
{
  path: '/unlistened/:playlistId',
  name: 'Unlistened',
  component: Unlistened,
},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
