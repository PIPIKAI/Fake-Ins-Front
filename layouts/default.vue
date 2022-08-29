<template>
  <v-app>
    <appBar></appBar>
    <v-main >
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
    <!-- <div    
      {{ new Date().getFullYear() }} — <strong>Faker Ins</strong>
      </div> -->
  </v-app>
</template>

<script>
import appBar from '../components/globle/appBar.vue';
export default {
  components:{appBar},
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
