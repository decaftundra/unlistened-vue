<template>
    <!-- Liste les playlists d'un utilisateur donné
Lien cliquable vers unlistened -->
  <div>
    <hr>
    <div class="list-unstyled" v-for="playlist in playlists" :key="playlist.playlistId">
      <li class="media">
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{playlist.playlistName}}</h4>
        </div>
      </li>
      <hr>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:4000//getUserPlaylists';
export default {
  name: 'Playlists',
  components: {},
  data: () => ({
    error: '',
    playlists: [],
  }),
  mounted() {
    fetch(API_URL).then((res) => {
      this.playlists = res;
    });
  },
};
</script>

<style>
img {
  max-width: 300px;
  height: auto;
}
</style>
