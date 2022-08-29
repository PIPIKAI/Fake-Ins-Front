<template>
  <v-sheet outlined>
    <v-container fill-height>
      <div class="ma-auto">
        <v-row>
          <v-col class="ma-0 pa-0">
            <v-card flat>
              <v-carousel
                hide-delimiter-background
                delimiter-icon="mdi-minus"
                width="auto"
                height="auto"
                :continuous="false"
              >
                <v-carousel-item v-for="(item, i) in post.ImgUrls" :key="i">
                  <v-img :src="item.Url" height="50vh" width="50vh"></v-img>
                </v-carousel-item>
              </v-carousel>
            </v-card>
          </v-col>
          <v-col class="ma-0 pa-0">
            <v-card height="50vh" class="ma-auto pa-0" flat outlined>
              <!-- 头像 -->
              <v-card-actions class="ma-0">
                <v-avatar size="30" class="mx-1">
                  <img alt="Avatar" :src="user.Photo" />
                </v-avatar>
                {{ user.Name }}
                <v-spacer></v-spacer>
                <!-- <strong>
              已关注
            </strong> -->
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon> mdi-dots-horizontal </v-icon>
                </v-btn>
              </v-card-actions>

              <v-divider></v-divider>
              <!-- 评论 -->
              <PostComments :comments="post.Comments"></PostComments>
              <v-card-actions class="pa-0 ma-1">
                <v-list>
                  <v-list-item> dsadas </v-list-item>
                </v-list>
              </v-card-actions>

              <v-divider></v-divider>
              <v-card-actions class="pa-0 mx-1">
                <LikeBtn :owner_type="posts_type" :ownerid="post.ID"></LikeBtn>
                <v-icon @click="1">mdi-chat-outline</v-icon>
                <v-icon @click="1">mdi-send-outline</v-icon>
                <v-spacer></v-spacer>
                <v-icon @click="1">mdi-bookmark-outline</v-icon>
              </v-card-actions>
              <v-card-text>
                <strong> {{ post.LikesCount }}次赞 </strong>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions fixed class="pa-0 ma-0">
                <el-input
                  v-model="comment"
                  prefix-icon="el-icon-s-comment"
                  placeholder="添加评论..."
                  maxlength="220"
                >
                </el-input>
                <v-btn color="blue" text @click="1"> 发布 </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-sheet>
</template>
<script>
import PostComments from '@/components/postcards/postcomments.vue'
import LikeBtn from '~/components/common/LikeBtn.vue'
export default {
  components:{
    PostComments,
    LikeBtn
  },
  layout: 'default',
  middleware: 'auth',
  asyncData({ params, store, error }) {
     return store
      .dispatch('getPostModule/getPostsByPostId', params.postid)
      .then((res) => {
        const post =res.data.post
        return store.dispatch('UserModule/getUserByUid', post.UserID).then(res=>{
          return {
          post,
          user:res.data.data
          }
        }).catch(()=>{
        error({ statusCode: 404, message: 'Post not found' })
        })
        
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Post not found' })
      })
    
      
  },
  data: () => ({
    comment: '',
    posts_type:'posts',
    comment_type:'comments',
  }),
}
</script>
<style></style>
