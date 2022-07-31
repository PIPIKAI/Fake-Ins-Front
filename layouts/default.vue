<template>
  <v-app>
    <appbar></appbar>
    <v-main class="grey lighten-3">
      <v-container>
        <v-snackbar v-model="data.snackbar" :timeout="$store.state.timeout" light>
          {{ $store.state.snackbarText}}
          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="$store.commit('SnackbarReset')">
              Close
            </v-btn>
          </template>
        </v-snackbar>

        <nuxt />
      </v-container>
    </v-main>
    <appfooter></appfooter>
  </v-app>
</template>

<script>
import appbar from './appbar.vue'
import appfooter from './appfooter.vue'
export default {
  components: { appbar, appfooter },

  computed :{
    data(){
      return {
        snackbar: this.$store.state.snackbar
      }
    }
  },
  watch: {
    data(newValue, oldValue) {
        console.log(newValue.snackbar);
        if (newValue.snackbar){
          const sleep = time => {
          return new Promise(resolve => setTimeout(resolve,time))
          }
          sleep(2000).then(()=>{
          this.$store.commit("SnackbarReset")
        })
        }
        
        
        
    }
},

}
</script>
