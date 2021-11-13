<template>
    <!-- Liste les playlists d'un utilisateur donné
Lien cliquable vers unlistened -->
  Playlists
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

export default {
  name: 'Playlists',
  components: {},
  data: () => ({
    error: '',
    playlists: [],
  }),

  methods: {},
};
</script>

<style>
img {
  max-width: 300px;
  height: auto;
}
</style>
