<template>
    <!-- Liste les playlists d'un utilisateur donné
Lien cliquable vers unlistened -->
  <h1>Playlists</h1>
  <div>
    <hr>
    <div class="list-unstyled" v-for="playlist in playlists" :key="playlist.playlistId">
      <router-link :to="{path: '/unlistened/'+ playlist.playlistId}" > <h4 class="mt-0 mb-1">{{playlist.playlistName}}</h4></router-link>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:4000/getUserPlaylists';
export default {
  name: 'Playlists',
  components: {},
  data: () => ({
    error: '',
    playlists: [],
  }),
  mounted: async function() {
    
    fetch(API_URL)
      .then(res => res.json())
      .then(res => {
        this.playlists = res;
      })
    
    
  },
};
</script>

<style>
img {
  max-width: 300px;
  height: auto;
}
</style>
