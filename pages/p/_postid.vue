<template>
    <v-card min-height="75vh">
    <v-row class="ma-0 pa-0">
      <v-col class="ma-0 pa-0" md="9">
        <v-carousel
          height="100%"
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          :continuous="false"
        >
          <v-carousel-item v-for="(item, i) in post.ImgUrls" :key="i">
            <v-img max-height="75vh" :src="item.Url" @click="$store.commit('commonModule/showImagePreview',item.Url) "></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col fixed md="3" class="ma-0 pa-0">
        <v-card height="75vh" class="ma-auto pa-0" flat outlined>
            <PostCardTitle
              height="6vh"
              :uid="post.UserID"
              :postid="post.ID"
              @deletePost="deleted = true"
            />
          <v-divider></v-divider>

            <div class="outer-container">
              <div class="inner-container">
                <PostComments :postid="post.ID"></PostComments>
              </div>
            </div>

          <v-divider></v-divider>
          <hr class="fucarea">
            <v-card-actions class="pa-0 mx-1">
            <LikeBtn :owner_type="posts_type" :ownerid="post.ID"></LikeBtn>
            <v-icon @click="1">mdi-chat-outline</v-icon>
            <v-icon @click="1">mdi-send-outline</v-icon>
            <v-spacer></v-spacer>
            <v-icon @click="1">mdi-bookmark-outline</v-icon>
            </v-card-actions>
            <v-card-text class="pt-2 ma-0">
              <strong> {{ post.LikesCount }}次赞 </strong>
              <strong> {{ post.CommentsCount }} 回复 </strong>
            </v-card-text>

            <v-divider></v-divider>

            <CommentInputTextArea :postid="post.ID" />
          </hr>
          
        </v-card>
      </v-col>
    </v-row>
  </v-card>

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
    CommentInputTextArea,
  },
  layout: 'default',
  middleware: 'auth',
  async asyncData({ params, store }) {
    const post = await store
      .dispatch('getPostModule/getPostsByPostId', params.postid)
      .then((res) => {
        return res.data.post
      })
    return {
      post,
    }
  },
  data: () => ({
    posts_type: 'posts',
    comment_type: 'comments',
  }),
  computed: {},
  methods: {},
}
</script>
<style scoped>
.outer-container {
  width: 100%;
  height: 59vh;
  position: relative;
  overflow: hidden;
  top: 0%;
  margin: 0%;
}

.inner-container {
  width: 100%;
  height: 59vh;
  position: absolute;
  left: 0;
  top: 0%;
  overflow-x: hidden;
  overflow-y: scroll;
  margin: 0%;
}

/* for Chrome */
.inner-container::-webkit-scrollbar {
  display: none;
}
.fucarea{
  position:absolute;
  bottom: 0%;
  margin: 0%;
  padding: 0%;
  widows: 100%;
}
</style>
