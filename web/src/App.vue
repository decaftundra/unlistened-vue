<template>
  <div>
    <hr>
    <div class="list-unstyled" v-for="track in discoveryList" :key="track.spotifyId">
      <li class="media">
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{track.artistName}}</h4>
          <h5 class="mt-0 mb-1">{{track.trackName}}</h5>
          <a v-bind:href="track.spotifyWebURL" target="_blank">Listen on Spotify</a>
          <br />
          <small>{{track.listenCount}}</small>
        </div>
      </li>
      <hr>
    </div>
  </div>
</template>

<script>
import Playlists from './components/Playlists'
import Unlistened from './components/Unlistened'

const API_URL = 'http://localhost:4000/getDiscovery';

export default {
  name: 'App',
  data: () => ({
    error: '',
    discoveryList: [],
  }),

  mounted() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => {
        this.discoveryList = result;
      });
  },
  methods: {},
};
</script>

<style>
img {
  max-width: 300px;
  height: auto;
}
</style>
