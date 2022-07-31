<template>
    <v-app>
      <v-row>
      <v-col cols="12" sm="3">
      </v-col>
      <v-col cols="12" sm="5">
        
        <postcards min-height="70vh" />
          <v-btn
      class="ma-2"
      outlined
      color="indigo"
      @click="btnmethods"
    >
      Outlined Button
    </v-btn>
        <postcards min-height="70vh" />

      </v-col>
  
      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">
          <!--  -->
        </v-sheet>
      </v-col>
    </v-row>
    </v-app>
  
</template>

<script>
export default {
  layout: 'default',
  
  middleware: 'auth',
  data: () => ({

  }),
  methods:{
    btnmethods(){
      this.$store.commit('sendSnackbar',"messssssage")
    }
  }
}
</script>