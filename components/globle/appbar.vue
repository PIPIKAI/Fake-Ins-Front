<template>
  <div>
    <v-dialog
      v-model="exitdialog"
      persistent
      max-width="30vh"
    >
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
    <v-system-bar height="50" app>
      <v-row class="ma-auto">
        <v-col md="4">

        </v-col>
        <v-col  class="pa-0 ma-0">

          <img height="42vh"
            src="http://pic.kiass.top/logo2.png">
        </v-col>
        <v-col md="2" class="ma-0 pt-2">
          <v-text-field solo flat dense label="搜索" prepend-inner-icon="mdi-magnify">
          </v-text-field>
        </v-col>

        <v-col class="pa-1">
          <v-btn v-for="(items, index) in iconItems" :key="items.v" icon @click="changeSelected(index)">

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
              <v-list-item-content>
                <div class="text-center">
                  <v-avatar>
                    <v-icon v-if="$store.state.user.Photo == ''">mdi-account-circle</v-icon>
                    <img v-else :src='$store.state.user.Photo'>

                  </v-avatar>
                  <h3>{{ $store.state.user.Name }}</h3>
                  <p class="text-caption mt-1">
                    {{ $store.state.user.Email }}
                  </p>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text @click="$router.push({path: '/user/' +$store.state.user.UserName});selected=null">
                    个人信息
                  </v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text @click="$store.commit('setWatchedListDialogT')">
                    我的关注
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

    </v-system-bar>
  </div>
</template>

<script>
import UploadCard from '../createpost/UploadCard'
import CropImageCard from '../createpost/CropImageCard'
import CreatePostCard from '../createpost/CreatePostCard'

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
    postDialog: false,
    postcardStatus: 0,
    exitdialog: false,
    dialogWidth:['75vh','75vh','105vh'],
    wathchedListDialog: false,
    selected: 0
  }),
  computed: {
  },
  watch: {
    postDialog(newdata, _) {
      if (newdata === false) {
        if (this.$route.path === '/'){
          this.selected = 0
        }else{
          this.selected = null
        }
        
      }
    }
  },
  methods: {
    async logout() {
      await this.$authApi.logout().then(() => {
        // console.log('res:', res.data)
        this.$cookies.remove('info')
        this.$router.push('/login');
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
      this.$store.commit('createPostModule/setFileList',null)
      this.postcardStatus=0
    },
    changeSelected(newdata){
      this.selected = newdata
      if (newdata === 3) {
        this.$router.push('/exploer')
      } else if (newdata === 2) {
        this.postDialog = true
      } else if (newdata === 0) {
          this.$router.push('/')
      }
    }
  }

}
</script>

<style>
</style>