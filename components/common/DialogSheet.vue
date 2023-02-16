<template lang="">
  <div>
    <v-dialog
      class="pa-0 ma-0"
      v-model="dialog"
      persistent
      :width="width"
      @click:outside="$store.commit('setWatchedListDialogF')"
    >
      <v-card>
        <div class="text-h6 font-weight-bold text-center">
          {{ title }}
          <nobr class="closebtn">
            <v-btn
              class="ma-0 pa-0"
              icon
              @click="$store.commit('setWatchedListDialogF')"
            >
              <v-icon>mdi-window-close</v-icon>
            </v-btn>
          </nobr>
        </div>

        <v-divider></v-divider>
        <v-row fill-height class="ma-auto">
          <v-sheet
            :width="width"
            :height="height"
            class="ma-auto d-flex align-content-center flex-wrap"
          >
            <v-col class="ma-0 pa-0"> 
                
            </v-col>
          </v-sheet>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
    props: {
        dialog: {
            equired: true
        },
        title: {
            type: String,
            required: true,
        },
        width: {
            type: String,
            required: true,
        },
        height: {
            type: String,
            required: true,
        },
    },
}
</script>
<style lang=""></style>
