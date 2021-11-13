import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import Playlists from './views/Playlists.vue';
import Unlistened from './views/Unlistened.vue';

const app = createApp(App);
app.component(Playlists);
app.component(Unlistened);
app.use(router);
app.mount('#app');
