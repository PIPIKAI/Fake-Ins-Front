<template>
  <div>
    <v-dialog
      v-model="exitdialog"
      persistent
      max-width="30vh"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>放弃编辑内容？</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="abandonContent"
          >
            放弃
          </v-btn>
          <v-btn
            color="info"
            text
            @click="exitdialog = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog :persistent="postcardStatus > 0" @click:outside="clickOutside"  v-model="postDialog" flat rounded="lg" outlined  :width="dialogWidth[postcardStatus]" >
      <div v-if="postcardStatus == 0">
          <UploadCard ref="uploadcard" @nextpage="postcardStatus =1"/>
          <!-- <CropImageCard/> -->
      </div>
      <div v-else-if="postcardStatus == 1">
          <CropImageCard ref="cropcard" @prepage="statussub" @nextpage="statusadd" @abandonPost="clickOutside"/>
      </div>
      <div v-else>
          <CreatePostCard ref="postCard" @prepage="statussub"/>
      </div>
    </v-dialog>
    <v-app-bar light app flat outlined>
      <v-row class="ma-auto">
        <v-col md="4">

        </v-col>
        <v-col md="2" class="pa-1">

          <img height="50vh" lazy-src="https://picsum.photos/id/11/10/6"
            src="https://gd-hbimg.huaban.com/f4c384c25a3c7f8c6571a2e34dfe62da5218d743151e2-Q2HJ6i_fw1200">

        </v-col>
        <v-col md="2" class="pa-3">
          <v-text-field solo flat dense label="搜索" prepend-inner-icon="mdi-magnify">
          </v-text-field>
        </v-col>

        <v-col class="pa-1">

          <v-btn v-for="(items, index) in iconItems" :key="items.v" icon @click="selected = index">

            <v-icon v-if="selected == index">{{ items.cicon }}</v-icon>
            <v-icon v-else>{{ items.icon }}</v-icon>
          </v-btn>

          <v-menu bottom min-width="180px" rounded offset-y>
            <template #activator="{ on }">
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
import UploadCard from '../components/createpost/uploadCard.vue'
import CropImageCard from '../components/createpost/cropImageCard.vue'
import CreatePostCard from '../components/createpost/createPostCard.vue'

export default {
  components:{
    UploadCard,
    CropImageCard,
    CreatePostCard,
  },
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
    postcardStatus: 0,
    exitdialog: false,
    dialogWidth:['75vh','75vh','105vh']
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
        if (this.$route.path !== '/'){
          this.$router.push('/')
        }
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
    statusadd(){
      this.postcardStatus +=1
    },
    statussub(){
      this.postcardStatus -=1
    },
    clickOutside(){
      if (this.postcardStatus > 0){
        this.exitdialog = true
      }
    },
    abandonContent(){
      this.exitdialog = false;
      this.$store.commit('cteatePostModule/setFileList',null)
      this.postcardStatus=0
    }
  }

}
</script>

<style>
</style>