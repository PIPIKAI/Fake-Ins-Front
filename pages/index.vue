<template>
  <v-app>
    <v-row>
      <v-col cols="12" md="3">
      </v-col>
      <v-col cols="12" md="5">
        <div v-for="(post,index) in posts" :key="index">
          <PostCards :post-contend="post" min-height="70vh" />
        </div>

      </v-col>

      <v-col cols="12" md="3">
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
                <v-btn color="primary" outlined>
                  切换
                </v-btn>
              </v-list-item-action>
            </v-subheader>
            <v-subheader >
              <strong>为你推荐</strong>
              
              <v-spacer></v-spacer>
              查看全部
            </v-subheader>
            <v-list-item v-for="recommend_user in recommendUsers" :key="recommend_user.ID">
              <v-list-item-avatar>
                <img :src='recommend_user.Photo'>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="recommend_user.Name"></v-list-item-title>

                <v-list-item-subtitle >推荐用户</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn color="primary" @click="watchUser(recommend_user.ID)" outlined>
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
import PostCards from '~/components/postcards/PostCards'
export default {
  components:{PostCards},
  layout: 'default',
  middleware: 'auth',
  async asyncData({ store}) {
    const data = await store.dispatch('getPostModule/getHomePosts')
    const posts = data.data
    const page = data.page
    const pageSize = data.page_size
    const recommendUsers = await store.dispatch('UserModule/getCommendUsers')
    return { 
      posts,
      page,
      pageSize,
      recommendUsers
    }
  },
  data: () => ({
  }),
  methods: {
    btnmethods() {
      this.$store.commit('sendSnackbar', "messssssage")
    },
    async watchUser(uid){
      await this.$store.dispatch('UserModule/watchUser',uid).then(res=>{
        console.log("res",res)
        if (res.code === 200){
          this.$message.success("关注成功！")
        }else{
          this.$message.error(res.response.data.msg)
        }
        
      })
    }
  }
}
</script>