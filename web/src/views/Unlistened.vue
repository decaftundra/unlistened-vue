
<!-- Comment -->
prends un parametre :spotifyId pour récupérer ID playlist

<template>
    <!-- Liste les playlists d'un utilisateur donné
Lien cliquable vers unlistened -->
  <h1>{{playlist.name}}</h1>
  <div>
    <hr>
    <div class="list-unstyled" v-for="track in playlist.tracks" :key="track.spotifyId">
      <h4 class="mt-0 mb-1">{{track.artistName + ' - ' + track.trackName + ' (' + track.listenCount + ')'}}</h4>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Unlistened',
  components: {},
  data: () => ({
    error: '',
    playlist: {},
  }),
  mounted:  function() {
    
    fetch('http://localhost:4000/getDiscovery/'+ this.$route.params.playlistId)
      .then(res => res.json())
      .then(res => {
         console.log(res);
        this.playlist = res;
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
