<template>
  <v-row v-if="playlist != null">
          <v-col
            cols="12"
          >

            <v-card v-if="loading">
              <v-card-title>Loading</v-card-title>  
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



            <v-row dense v-if="!loading">
              <v-col cols="12">
                <h1>{{playlist.name}}</h1>  
              </v-col> 
              <v-col cols="12" v-for="track in playlist.tracks" :key="track.spotifyId">
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

            
          </v-col>
        </v-row>
</template>

<script>
export default {
  data: () => ({
    playlist: null,
    drawer: null,
    playlistId:null,
    loading:true,
  }),
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