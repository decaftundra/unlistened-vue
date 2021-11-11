import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import Playlists from './views/Playlists.vue';

const app = createApp(App);
app.component(Playlists);
app.use(router);
app.mount('#app');
