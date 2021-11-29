<template>
  <v-card >
    <v-app-bar
      color="success accent-4"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-toolbar-title v-if="playlist != null && !loading">Playlist {{playlist.name}}</v-toolbar-title>
      <v-toolbar-title v-if="loading">Loading</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-switch
        v-model="onlyNew"
        label="Only new?"
        hide-details
      ></v-switch>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-6"
      class="overflow-y-auto"
    >
      <v-container>
        <div v-if="loading">
          <template v-for="n in 10" >
            <v-skeleton-loader
            type="article, actions"
            :key="`skel-${n}`"
          ></v-skeleton-loader>

          
          </template>
        </div>

        <v-row dense v-if="!loading">
          <v-col cols="12" v-for="track in filteredTracks" :key="track.spotifyId">
            <v-card
                
            >
              <div class="d-flex  justify-space-between" >
                <div>
                  <v-card-title
                    

                    v-text="track.trackName"
                  ></v-card-title>

                  <v-card-subtitle v-text="track.artistName"></v-card-subtitle>

                  <v-card-actions>
                    <v-btn
                      color="success"
                      class="ml-2 mt-5"
                      rounded
                      small
                      :href="track.spotifyWebURL"
                      target="_blank"
                    >
                      LISTEN ON SPOTIFY
                    </v-btn>
                    <v-chip 
                      v-if="track.listenCount == 0"
                      class="ml-2 mt-5"
                      color="pink"
                      label
                      text-color="white"
                    >
                      <v-icon left>
                        mdi-new-box
                      </v-icon>
                      NEW
                    </v-chip>
                  </v-card-actions>
                </div>
                <v-avatar 
                  v-if="track.track.album.images != null && track.track.album.images.length > 0"
                  class="ma-3"
                  size="125"
                  tile
                >
                  <v-img :src="track.track.album.images[0].url"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>



      </v-container>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    playlist: null,
    drawer: null,
    playlistId:null,
    loading:true,
    onlyNew:true,
  }),

  computed: {
    filteredTracks: function () {
      if(!this.playlist){
        return [];
      }
      if(this.onlyNew){
        return this.playlist.tracks.filter(track => track.listenCount == 0)      
      }
      return this.playlist.tracks;
    }
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