<template>
<div>
  <h2>LastFM Settings</h2>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="lastFmUserName"
      :rules="nameRules"
      label="LastFM User name"
      required
    ></v-text-field>

    <v-text-field
      v-model="lastFmApiKey"
      :rules="nameRules"
      label="LastFM API Key"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Save
    </v-btn>

    <v-btn
      :disabled="!valid"
      color="primary"
      class="mr-4"
      @click="reload"
    >
      Reload LastFM history
    </v-btn>

  </v-form>
  
  <h2>Spotify Settings</h2>

  <v-btn href="http://localhost:4000/spotifyLogin" color="success" class="mr-4">Log in with Spotify</v-btn><br>

 
  <v-snackbar
    v-model="lastFmSnackBar"
    :timeout="1000"
    color="success"
  >
   LastFM settings saved.
   <template v-slot:action="{ attrs }">
    <v-btn
      text
      v-bind="attrs"
      @click="lastFmSnackBar = false"
    >
      Close
    </v-btn>
  </template>
  </v-snackbar>


  <v-snackbar
    v-model="lastFmSnackBarTakesTime"
    color="warning"
  >
   Reloading LastFM history. Please be patient, it can take some time...
   <template v-slot:action="{ attrs }">
    <v-btn
      text
      v-bind="attrs"
      @click="lastFmSnackBarTakesTime = false"
    >
      Close
    </v-btn>
  </template>
  </v-snackbar>

  <v-snackbar
    v-model="lastFmSnackBarHistorySuccess"
    :timeout="1000"
    color="success"
  >
   LastFM history loaded successfully.
   <template v-slot:action="{ attrs }">
    <v-btn
      text
      v-bind="attrs"
      @click="lastFmSnackBarHistorySuccess = false"
    >
      Close
    </v-btn>
  </template>
  </v-snackbar>
</div>
</template>

<script>

const LASTFM_RELOAD_URL = 'http://localhost:4000/loadLastFmHistory';
export default {
  data: () => ({
    valid: true,
    lastFmSnackBar: false,
    lastFmSnackBarTakesTime: false,
    lastFmSnackBarHistorySuccess: false,
    lastFmUserName: '',
    lastFmApiKey: '',
    nameRules: [
      v => !!v || 'Required',
    ],
  }),
  created() {
    this.lastFmUserName = this.$cookies.get("lastFmUserName")
    this.lastFmApiKey = this.$cookies.get("lastFmApiKey")
  },
  methods: {
    validate () {
      this.$refs.form.validate()
      if(this.valid) {
        this.$cookies.set("lastFmUserName", this.lastFmUserName)
        this.$cookies.set("lastFmApiKey", this.lastFmApiKey)
        this.lastFmSnackBar = true
      }

    },
    reload() {
      this.lastFmSnackBarTakesTime = true
      this.$http.get(LASTFM_RELOAD_URL+"?username="+this.lastFmUserName+"&apikey="+this.lastFmApiKey)
      .then(() => {
        this.lastFmSnackBarTakesTime = false
        this.lastFmSnackBarHistorySuccess = true
      }).catch(()=>{
        this.lastFmSnackBarTakesTime = false
      })
    }
  },
}
</script>

<style>

</style>