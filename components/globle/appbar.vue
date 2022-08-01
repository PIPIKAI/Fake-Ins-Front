<template>
  <div>
    <v-app-bar light app flat outlined>
      <v-row class="ma-auto">
        <v-col md="4">

        </v-col>
        <v-col md="2" class="pa-1">

          <img height="50vh" lazy-src="https://picsum.photos/id/11/10/6"
            src="https://gd-hbimg.huaban.com/f4c384c25a3c7f8c6571a2e34dfe62da5218d743151e2-Q2HJ6i_fw1200"></img>

        </v-col>
        <v-col md="2" class="pa-3">
          <v-text-field solo flat dense autofocus label="搜索" prepend-inner-icon="mdi-magnify">
          </v-text-field>
        </v-col>

        <v-col class="pa-1">
          <v-btn icon>
            <v-icon>mdi-home-variant</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-send-outline</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-plus-box-outline</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-compass-outline</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-cards-heart-outline</v-icon>
          </v-btn>


          <v-menu bottom min-width="180px" rounded offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-avatar size="36">
                  <v-icon v-if="$store.state.user.Photo == ''">mdi-account-circle</v-icon>
                  <img
                    v-else
                    alt="Avatar"
                    :src="$store.state.user.Photo"
                  >
                </v-avatar>
              </v-btn>
            </template>
            <v-card flat>
              <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                  <v-avatar >
                    <v-icon v-if="$store.state.user.Photo == ''">mdi-account-circle</v-icon>
                  <img 
                  v-else
                    :src='$store.state.user.Photo'>

                  </v-avatar>
                  <h3>{{ $store.state.user.Name }}</h3>
                  <p class="text-caption mt-1">
                    {{ $store.state.user.Email }}
                  </p>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text>
                    个人信息
                  </v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text @click="logout">
                    登出
                  </v-btn>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </v-col>
      </v-row>

    </v-app-bar>
  </div>
</template>

<script>
export default {
  computed:{
    avater(){
      return this.$store.state.user.Photo
    }
  },
  methods: {
    async logout() {
      await this.$authApi.logout().then((res) => {
        console.log('res:', res.data)
        this.$cookies.remove('info')
        this.$router.replace({ name: 'login' });
      }).catch(() => {
        this.$store.commit("sendSnackbar", "error")
      })
    }
  }

}
</script>

<style>
</style>