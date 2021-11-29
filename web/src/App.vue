<template>
  <v-app id="inspire">
  

    <v-navigation-drawer
      v-model="drawer"
      permanent
      app
    >
      <v-sheet
        color="grey lighten-4"
        class="pa-4"
        v-if="me == null"
      >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        ></v-avatar>
        <v-btn to="/settings" color="success" class="mr-4">Log in with Spotify</v-btn><br>
      </v-sheet>
      <v-sheet
        color="grey lighten-4"
        class="pa-4"
        v-if="me != null"
      >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        >
          <img
            :src="me.images[0].url"
            :alt="me.display_name"
          >
        </v-avatar>
        <div>{{me.display_name}}</div>
        <small>{{me.email}}</small>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="playlist in playlists"
          :key="playlist.playlistId"
          link
          :to="'/playlist/'+playlist.playlistId"
        >
          <v-list-item-icon>
            <v-icon>mdi-playlist-music</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{playlist.playlistName}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block to="/settings">
            <v-icon
              
            >
              mdi-cogs
            </v-icon>
            Settings
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
const PLAYLIST_URL = 'http://localhost:4000/getUserPlaylists';
const ME_URL = 'http://localhost:4000/me';


export default {
  data: () => ({
    playlists: [],
    drawer: null,
    me:null,
  }),
  mounted: async function() {
    fetch(ME_URL)
    .then(res => res.json())
    .then(res => {
      if(res.connected != false){
        this.me = res.me
        fetch(PLAYLIST_URL)
          .then(res => res.json())
          .then(res => {
            this.playlists = res;
        })
      }
    });


  },
  
}
</script>