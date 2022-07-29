<template>
  <v-app id="inspire">
    <appbar></appbar>
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="3"
          >
          </v-col>
          <v-col
            cols="12"
            sm="5"
          >

              <postcards min-height="70vh"/>
              <postcards min-height="70vh"/>
           
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import appbar from '@/layouts/appbar.vue'
  export default {
  components: { appbar },
    data: () => ({
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
    }),
  }
</script>