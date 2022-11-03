<template>
  <v-sheet outlined>
    <v-container fill-height>
      <div class="ma-auto">
        <v-row>
          <v-col class="ma-0 pa-0">
            <v-card flat>
              <v-carousel hide-delimiter-background delimiter-icon="mdi-minus" width="auto" height="auto"
                :continuous="false">
                <v-carousel-item v-for="(item, i) in post.ImgUrls" :key="i">
                  <v-img :src="item.Url" height="60vh" width="60vh"></v-img>
                </v-carousel-item>
              </v-carousel>
            </v-card>
          </v-col>
          <v-col class="ma-0 pa-0">

            <v-card max-height="60vh" max-width="45vh" class="ma-auto pa-0" flat outlined>
              <!-- 头像 -->
              <PostCardTitle height="6vh" :uid="post.UserID" :postid="post.ID" @deletePost="deleted = true" />
              <v-divider></v-divider>
              <!-- 评论 -->
              <div class="outer-container">
                <div class="inner-container">
                  <PostComments :postid="post.ID"></PostComments>
                </div>
              </div>
              <v-divider></v-divider>
              <!-- 点赞帖子 -->
              <v-card-actions class="pa-0 mx-1">
                <LikeBtn :owner_type="posts_type" :ownerid="post.ID"></LikeBtn>
                <v-icon @click="1">mdi-chat-outline</v-icon>
                <v-icon @click="1">mdi-send-outline</v-icon>
                <v-spacer></v-spacer>
                <v-icon @click="1">mdi-bookmark-outline</v-icon>
              </v-card-actions >
              <v-card-text class="pt-1 ma-0">
                <strong> {{ post.LikesCount }}次赞 </strong>
                <strong> {{ post.CommentsCount }} 回复 </strong>
              </v-card-text>
              <v-divider></v-divider>
              <!-- 评论输入框和提交按钮 -->
              <commentInputTextArea :postid="post.ID"/>
            </v-card>
          </v-col>
          
        </v-row>
      </div>
    </v-container>
  </v-sheet>
</template>
<script>
import PostComments from '~/components/postcards/PostComments'
import LikeBtn from '~/components/common/LikeBtn'
import PostCardTitle from '@/components/postcards/PostCardTitle'
import CommentInputTextArea from '@/components/comment/CommentInputTextArea'
export default {
  components: {
    PostComments,
    LikeBtn,
    PostCardTitle,
    CommentInputTextArea
  },
  layout: 'default',
  middleware: 'auth',
  async asyncData({ params, store }) {
    const post = await store.dispatch('getPostModule/getPostsByPostId', params.postid).then(res => {
      return res.data.post
    })
    return {
      post
    }
  },
  data: () => ({
    posts_type: 'posts',
    comment_type: 'comments',
  }),
  computed:{
  },  
  methods: {
  },
}
</script>
<style scoped>
.outer-container {
  width: 100%;
  height: 44vh;
  position: relative;
  overflow: hidden;
}

.inner-container {
  width: 100%;
  height: 44vh;
  position: absolute;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}

/* for Chrome */
.inner-container::-webkit-scrollbar {
  display: none;
}
</style>
