<template>
  <v-app>
    <AppBar></AppBar>
    <v-main>
      <v-container>
        <v-snackbar
          v-model="data.snackbar"
          :timeout="$store.state.timeout"
          light
        >
          {{ $store.state.snackbarText }}
          <template v-slot:action="{ attrs }">
            <v-btn
              color="blue"
              text
              v-bind="attrs"
              @click="$store.commit('SnackbarReset')"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>

        <FanDialogs/>
        <WatchDialogs/>
        <nuxt />
      </v-container>
    </v-main>
    <!-- <div    
      {{ new Date().getFullYear() }} — <strong>Faker Ins</strong>
      </div> -->
  </v-app>
</template>

<script>
import WatchDialogs from '~/components/dialogs/WatchDialogs'
import FanDialogs from '~/components/dialogs/FanDialogs'
import AppBar from '../components/globle/AppBar'
export default {
  components: { AppBar, WatchDialogs, FanDialogs },
  computed: {
    data() {
      return {
        snackbar: this.$store.state.snackbar,
        watchedListDialog: this.$store.state.watchedListDialog,
      }
    },
  },
  watch: {
    data(newValue, oldValue) {
      // console.log(newValue.snackbar);
      if (newValue.snackbar) {
        const sleep = (time) => {
          return new Promise((resolve) => setTimeout(resolve, time))
        }
        sleep(2000).then(() => {
          this.$store.commit('SnackbarReset')
        })
      }
    },
  },
}
</script>
