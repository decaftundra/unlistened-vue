
<template>
  <!-- 
    Application with a fixed navigation drawer (displaying user info, playlists and settings button). Whatever the route, it'll be displayed

    -->
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" permanent app color="green lighten-3">

      <!-- user section, either login or user info -->
      <v-sheet color="grey lighten-4" class="pa-4" v-if="me == null">
        <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
        <v-btn to="/settings" color="success" class="mr-4"
          >Log in with Spotify</v-btn
        ><br />
      </v-sheet>
      <v-sheet color="green" class="pa-4" v-if="me != null">
        <v-avatar class="mb-4" color="green darken-1" size="64">
          <img :src="me.images[0].url" :alt="me.display_name" />
        </v-avatar>
        <div>{{ me.display_name }}</div>
        <small>{{ me.email }}</small>
      </v-sheet>

      <v-divider></v-divider>

      <!-- Playlists list -->
      <v-list>
        <v-list-item
          v-for="playlist in playlists"
          :key="playlist.playlistId"
          link
          :to="'/playlist/' + playlist.playlistId"
        >
          <v-list-item-icon>
            <v-icon>mdi-playlist-music</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ playlist.playlistName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>


      <template v-slot:append>
        <!-- Settings button -->
        <v-divider></v-divider>

        <div class="pa-2">
          <v-btn block to="/settings">
            <v-icon style="mr-2"> mdi-cogs </v-icon>
            Settings
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Main view section, displaying the router-view -->
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
const PLAYLIST_URL = "http://localhost:4000/getUserPlaylists";
const ME_URL = "http://localhost:4000/me";

export default {
  data: () => ({
    playlists: [],
    drawer: null,
    me: null,
  }),
  // When the view is created, fetch the current user and if the user is connected, fetch the playlists
  mounted: async function () {
    fetch(ME_URL)
      .then((res) => res.json())
      .then((res) => {
        if (res.connected != false) {
          this.me = res.me;
          fetch(PLAYLIST_URL)
            .then((res) => res.json())
            .then((res) => {
              this.playlists = res;
            });
        }
      });
  },
};
</script>