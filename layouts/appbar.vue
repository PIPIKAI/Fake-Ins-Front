<template>
  <div>
    <v-app-bar
    class="pa-md-4 pa-lg-4"
      app
      flat
    >
    <v-row>
         <v-col
          sm="3"
        >
        </v-col>
        <v-col
          sm="3"
        >
        <v-img
        class="pa-md-4"
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="68"
        max-width="151"
        src="http://moxiangxu.com/uploadfiles/202004/20200430112748344834.jpg"
        ></v-img>
        </v-col>
        <v-col
          sm="2"
        >
        <v-text-field
        class="pa-md-4"
        solo
        flat
        dense
        autofocus
        label="搜索"
        prepend-inner-icon="mdi-map-marker"
        ></v-text-field>
        </v-col>
        <v-col
          sm="1"
        >
        </v-col>
        <v-col
          sm="2"
        >
        </v-col>


      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>