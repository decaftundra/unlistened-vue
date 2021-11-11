import { createRouter, createWebHistory } from 'vue-router'

import Playlists from '../views/Playlists'
//import Unlistened from '../views/Unlistened'

const routes = [{
        path: '/',
        name: 'Playlists',
        component: Playlists
    },
    /*  {
         path: '/unlistened',
         name: 'Unlistened',
         component: Unlistened
     } */

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router