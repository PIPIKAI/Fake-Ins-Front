<template>
  <v-app>
    <v-row>
      <v-col cols="12" md="3">
      </v-col>
      <v-col cols="12" md="5">

        <postcards min-height="70vh" />
        <postcards min-height="70vh" />

      </v-col>

      <v-col cols="12" md="2">
        <v-sheet rounded="lg" class="mx-auto my-5 pa-1"   min-height="268">
          <v-list subheader two-line>
            
            <v-subheader >
              <v-avatar class="mr-4">
                  <v-icon v-if="$store.state.user.Photo == ''">mdi-account-circle</v-icon>
                  <img 
                  v-else
                    :src='$store.state.user.Photo'>

              </v-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="$store.state.user.Username"></v-list-item-title>

                <v-list-item-subtitle v-text="$store.state.user.Name"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn color="primary" text>
                  切换
                </v-btn>
              </v-list-item-action>
            </v-subheader>
            <v-subheader >
              <strong>为你推荐</strong>
              <v-spacer></v-spacer>
              查看全部
            </v-subheader>
            <v-list-item v-for="folder in folders" :key="folder.title">
              <v-list-item-avatar>
                <v-icon
                x-large
                >mdi-account-circle</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="folder.title"></v-list-item-title>

                <v-list-item-subtitle >推荐用户</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn color="primary" text>
                  关注
                </v-btn>
              </v-list-item-action>
            </v-list-item>


            <v-subheader >关于.帮助.API.工作.隐私.条款.地点.语言</v-subheader>
            <v-subheader >@2021 INSTANCE FROM METAA</v-subheader>

          </v-list>
          
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
    files: [
      {
        color: 'blue',
        icon: 'mdi-clipboard-text',
        subtitle: 'Jan 20, 2014',
        title: 'Vacation itinerary',
      },
      {
        color: 'amber',
        icon: 'mdi-gesture-tap-button',
        subtitle: 'Jan 10, 2014',
        title: 'Kitchen remodel',
      },
    ],
    folders: [
      {
        subtitle: 'Jan 9, 2014',
        title: 'Photos',
      },
      {
        subtitle: 'Jan 17, 2014',
        title: 'Recipes',
      },
      {
        subtitle: 'Jan 28, 2014',
        title: 'Work',
      },
    ],
  }),
  methods: {
    btnmethods() {
      this.$store.commit('sendSnackbar', "messssssage")
    }
  }
}
</script>