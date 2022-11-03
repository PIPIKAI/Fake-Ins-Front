<template>
  <div v-if="!deleted">
    <v-card :loading="loading" flat rounded="lg" outlined class="mx-auto my-5 pa-0" max-width="500">
      <PostCardTitle :uid="postContend.UserID" :postid="postContend.ID" @deletePost="deleted = true" />
      <!-- 轮播图 -->
      <v-carousel hide-delimiter-background delimiter-icon="mdi-minus" height="auto" min-height="200">
        <v-carousel-item v-for="(item, i) in postContend.ImgUrls" :key="i" eager height="auto" :src="item.Url">
        </v-carousel-item>
      </v-carousel>
      <v-card-actions class="pa-1 mx-1">
        <LikeBtn :ownerid="postContend.ID" :owner_type="ownertype"></LikeBtn>
        <v-icon @click="1">mdi-chat-outline</v-icon>
        <v-icon @click="1">mdi-send-outline</v-icon>
        <v-spacer></v-spacer>
        <v-icon @click="1">mdi-bookmark-outline</v-icon>
      </v-card-actions>

      <v-list-item dense class="pa-0 mx-1">
        <v-list-item-content>
          <v-list-item-title>
            <strong>麻花腾</strong>和<strong>其他用户</strong>赞了
          </v-list-item-title>
          <v-list-item-subtitle v-if="postContend.Explain">
            <strong>{{ user.Name }}</strong>
            {{ postContend.Explain }}
          </v-list-item-subtitle>
          <v-list-item-subtitle> 全部4399条评论 </v-list-item-subtitle>
          <v-list-item-subtitle>
            <strong>真ikun</strong> 苏珊
            <v-icon class="float-right" small> mdi-cards-heart-outline </v-icon>
          </v-list-item-subtitle>

          <v-list-item-subtitle>
            <strong>守护世界最好的坤坤</strong> 🐓你太美

            <v-icon class="float-right" small> mdi-cards-heart-outline </v-icon>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-card-actions class="pa-0">
        <el-input v-model="textarea1" prefix-icon="el-icon-s-comment" placeholder="评论" maxlength="220">
        </el-input>

        <v-btn color="blue" text @click="reserve"> 发布 </v-btn>
      </v-card-actions>
      <!-- {{postContend}} -->
    </v-card>
  </div>

</template>
<script>
import LikeBtn from '../common/LikeBtn'
import PostCardTitle from '@/components/postcards/PostCardTitle'
export default {
  name: 'PostCards',
  components: {
    LikeBtn,
    PostCardTitle
  },
  props: {
    postContend: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    loading: false,
    selection: 1,
    textarea1: '',
    user: { Photo: '', Name: '', ID: '' },
    menuDialog: false,
    deleted:false,
    ownertype:'posts'
  }),
  computed:{
    self(){
      return this.$store.state.user
    }
  },
  async mounted() {
    const user = await this.$store.dispatch('UserModule/getUserByUid', this.postContend.UserID)
    this.user = user
  },
  methods: {
    reserve() {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
    
  },
}
</script>
<style scoped>
.right {
  float: right;
}
</style>
