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
      >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        ></v-avatar>

        <div>john@vuetifyjs.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="playlist in playlists"
          :key="playlist.playlistId"
          link
          :to="'/'+playlist.playlistId"
        >
          <v-list-item-icon>
            <v-icon>mdi-playlist-music</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{playlist.playlistName}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <v-row v-if="playlist != null">
          <v-col
            cols="12"
          >

            <v-card v-if="loading">
              <v-subheader>Loading</v-subheader>  
              <v-list two-line>
              <template v-for="n in 10">
                  <v-skeleton-loader
                  type="list-item-avatar"
                  :key="`skel-${n}`"
                ></v-skeleton-loader>

                  <v-divider
                    v-if="n !== 10"
                    :key="`divider-${n}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>

              

            </v-card>
            <v-card v-if="!loading">
              <v-subheader>{{ playlist.name }}</v-subheader>

              <v-list two-line>
                <template v-for="(track, index) in playlist.tracks">
                  <v-list-item

                    :key="track.spotifyId"
                  >
                    <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{track.artistName}} - {{track.trackName}}</v-list-item-title>

                      <v-list-item-subtitle>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="index < (playlist.tracks.length -1)"
                    :key="`divider-${track.spotifyId}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
const API_URL = 'http://localhost:4000/getUserPlaylists';


export default {
  data: () => ({
    playlists: [],
    playlist: null,
    cards: ['Today', 'Yesterday'],
    drawer: null,
    playlistId:null,
    loading:true,
  }),
  mounted: async function() {
    fetch(API_URL)
      .then(res => res.json())
      .then(res => {
        this.playlists = res;
    })
  },
  created () {
    this.fetchTracks()
  },

  watch: {
    '$route': 'fetchTracks'
  },

  methods: {
    fetchTracks () {
        let playlistId = this.$route.params.playlistId
        this.loading = true
        if (playlistId != undefined) {
          fetch('http://localhost:4000/getDiscovery/'+ playlistId)
            .then(res => res.json())
            .then(res => {
              console.log(res);
              this.playlist = res;
              this.loading = false;
            })
        }
    }
  }

}
</script>