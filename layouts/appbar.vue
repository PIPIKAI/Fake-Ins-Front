<template>
  <div>
    <v-dialog v-model="postDialog" flat rounded="lg" outlined width="80vh">

      <v-card min-height="73vh">
        <div class="text-h6 font-weight-bold text-center">
          创建新帖子
        </div>
        <v-divider></v-divider>
        <v-row fill-height class="ma-auto">
          <v-sheet  min-height="69vh" class="ma-auto d-flex align-content-center flex-wrap" outlined>
            <v-col class="ma-0 pa-0">
              <el-upload 
              class="upload"
              drag
              action
              multiple 
              :limit="limitfilenum" 
              :on-exceed="onExceed" 
              auto-upload="false"
              list-type="picture"
             
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
            </v-col>

          </v-sheet>
        </v-row>
        <v-card-actions>

          <v-spacer></v-spacer>
          <v-btn  color="primary" text>下一步</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
    <v-app-bar light app flat outlined>
      <v-row class="ma-auto">
        <v-col md="4">

        </v-col>
        <v-col md="2" class="pa-1">

          <img height="50vh" lazy-src="https://picsum.photos/id/11/10/6"
            src="https://gd-hbimg.huaban.com/f4c384c25a3c7f8c6571a2e34dfe62da5218d743151e2-Q2HJ6i_fw1200"></img>

        </v-col>
        <v-col md="2" class="pa-3">
          <v-text-field solo flat dense label="搜索" prepend-inner-icon="mdi-magnify">
          </v-text-field>
        </v-col>

        <v-col class="pa-1">

          <v-btn icon v-for="(items, index) in iconItems" :key="items.v" @click="selected = index">

            <v-icon v-if="selected == index">{{ items.cicon }}</v-icon>
            <v-icon v-else>{{ items.icon }}</v-icon>
          </v-btn>

          <v-menu bottom min-width="180px" rounded offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-avatar size="36">
                  <v-icon v-if="$store.state.user.Photo == ''">mdi-account-circle</v-icon>
                  <img v-else alt="Avatar" :src="$store.state.user.Photo">
                </v-avatar>
              </v-btn>
            </template>
            <v-card flat>
              <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                  <v-avatar>
                    <v-icon v-if="$store.state.user.Photo == ''">mdi-account-circle</v-icon>
                    <img v-else :src='$store.state.user.Photo'>

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
  data: () => ({
    addpost: false,
    iconItems: [
      { v: '主页', icon: 'mdi-home-variant-outline', cicon: 'mdi-home-variant' },
      { v: '发消息', icon: 'mdi-send-outline', cicon: 'mdi-send' },
      { v: '发帖', icon: 'mdi-plus-box-outline', cicon: 'mdi-plus-box' },
      { v: '发现', icon: 'mdi-compass-outline', cicon: 'mdi-compass' },
      { v: '被点赞', icon: 'mdi-cards-heart-outline', cicon: 'mdi-cards-heart' },
    ],
    selected: 0,
    postDialog: false,
    limitfilenum: 9,
  }),
  computed: {
    avater() {
      return this.$store.state.user.Photo
    }
  },
  watch: {
    selected(newdata, _) {
      if (newdata === 3) {
        this.$router.replace('/exploer')
      } else if (newdata === 2) {
        this.postDialog = true
      } else if (newdata === 0) {
        this.$router.replace('/')
      }
    },
    postDialog(newdata, _) {
      if (newdata === false) {
        this.selected = 0
      }
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
    },
    onExceed(){
      this.$store.commit("sendSnackbar","超过最大文件上传个数")
    }

  }


}
</script>

<style>
</style>