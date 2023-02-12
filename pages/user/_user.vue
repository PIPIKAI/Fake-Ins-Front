<template>
  <div>
    <v-row fill-height class="ma-auto">
      <v-col md="1"> </v-col>
      <v-col  md="10" class="ma-0 pa-0">
        <v-row class="ma-auto pa-0">
          <v-col md="3"></v-col>
          <v-col class="ma-0 pa-0">
            <v-avatar size="15vh" class="ma-0 pa-0">
              <img :src="userInfo.Photo" />
            </v-avatar>
          </v-col>
          <v-col >
            <v-row>
              <v-col>
                <strong>{{ userInfo.UserName }}</strong>
                <div>{{userInfo.Name}}</div>
              </v-col>
              <v-col :hidden="!isSelf">
                <v-btn  outlined>编辑主页</v-btn>
              </v-col>
              <v-col>
                <v-btn icon>
                  <v-icon>mdi-cog</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>{{userInfo.PostsCounts}} 帖子 </v-col>
              <v-col @click="userInfo.ID == $store.state.user.ID ? $store.commit('setFansListDialog',true) : 1"> {{userInfo.FansCounts}} 粉丝 </v-col>
              <v-col @click="userInfo.ID == $store.state.user.ID ? $store.commit('setWatchedListDialogT') : 1"> {{userInfo.WatchsCounts}} 关注 </v-col>
            </v-row>
            <v-row>
              <v-col> {{userInfo.Bio}} </v-col>
              <div>{{userInfo.Website}}</div>
            </v-row>
          </v-col>
          <v-col md="3"></v-col>
        </v-row>
      
          <v-tabs v-model="tab" centered light >
            <v-tab  v-for="item in items" :key="item.tab" >
              <v-row class="ma-auto" >
                <v-icon small>{{ item.icon }}</v-icon>
                <strong>{{ item.text }}</strong>
              </v-row>
            </v-tab>
          </v-tabs>
    
          <v-tabs-items v-model="tab" mandatory>
            <v-tab-item
                v-for="item in items"
                :key="item.tab"
                width="100%"
              >
                <v-sheet  outlined>
                <nuxt-child keep-alive :tab="item.tab" :uid="userInfo.ID"></nuxt-child>
              </v-sheet>
            </v-tab-item>
          </v-tabs-items>

        
      </v-col>
      <v-col md="1"> </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  layout: 'default',
  middleware: 'auth',
  asyncData({ params,store,error }) {
    return store.dispatch("UserModule/getUserInfoByUserName",params.user).then(res=>{
        console.log("UserModule/getUserInfoByUserName",res)
        return {
          userInfo : res
        }
    }).catch(e =>{
      error({ statusCode: 404, message: 'Post not found' })
    })
  },
  data: () => ({
    tab: 'tab-post',
    items: [
      { tab: 'post', icon: 'mdi-grid', text: '帖子', to: '' },
      {
        tab: 'saved',
        icon: 'mdi-bookmark-outline',
        text: '收藏',
        to: '#saved',
      },
      {
        tab: 'marked',
        icon: 'mdi-briefcase-account-outline',
        text: '标记',
        to: '#marked',
      },
    ],
  }),
  computed:{
    isSelf(){
      return this.userInfo.ID === this.$store.state.user.ID
    }
  },
  methods:{
    log(data){
      console.log(data);
    },
    openWatchDialog(){

    }
  }
}
</script>

<style>
</style>
