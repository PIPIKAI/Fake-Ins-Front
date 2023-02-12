<template>
<!-- 像关注列表那样的Dialog -->
  <div>
    <v-dialog
      class="pa-0 ma-0"
      v-model="Dialog"
      persistent
      width="38vh"
      @click:outside="$emit('closeDialog')"
    >
      <div>
        <v-card>
          <div class="cardtitle">
            <div class="text-h6 font-weight-bold text-center">
              {{Title}}
              <nobr class="closebtn">
                <v-btn
                  class="ma-0 pa-0"
                  icon
                  @click="$emit('closeDialog')"
                >
                  <v-icon>mdi-window-close</v-icon>
                </v-btn>
              </nobr>
            </div>
            <v-divider></v-divider>
          </div>
          <v-card
            height="20vh"
            class="ma-0 pa-0 d-flex align-content-center flex-wrap"
          >
          <div class="itemlist">
          <slot></slot>

          </div>
          </v-card>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>
<script>

export default {
  props: {
    Title: {
      type: String,
      required: true,
    },
    Dialog:{
      type: Boolean,
      required: true,
    }
  }
}
</script>
<style>
.closebtn {
  position: absolute;
  right: 0;
  padding: 0;
  margin: 0;
}

.itemlist {
  position: absolute;
  width: 100%;
  overscroll-behavior: contain;
  overflow: auto;
  height: 100%;
}
</style>
