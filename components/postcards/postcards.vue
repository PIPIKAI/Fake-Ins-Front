<template>
  <div v-if="!deleted">
    <v-card :loading="loading" flat rounded="lg" outlined class="mx-auto my-5 pa-0" max-width="500">
      <PostCardTitle :uid="postContend.UserID" :postid="postContend.ID" @deletePost="deleted = true" />
      <!-- 轮播图 -->
      <v-carousel hide-delimiter-background delimiter-icon="mdi-minus" height="auto" min-height="200" :show-arrows="postContend.ImgUrls.length > 1">
        <v-carousel-item eager v-for="(item, i) in postContend.ImgUrls" :key="i" >
          <img width="500"
            :src="item.Url">
        </v-carousel-item>
      </v-carousel>
      <v-card-actions class="pa-1 mx-1">
        <LikeBtn :ownerid="postContend.ID" :owner_type="ownertype"></LikeBtn>
        <v-icon @click="1">mdi-chat-outline</v-icon>
        <v-icon @click="1">mdi-send-outline</v-icon>
        <v-spacer></v-spacer>
        <v-icon @click="1">mdi-bookmark-outline</v-icon>
      </v-card-actions>

      <PostCardComments :post="postContend"></PostCardComments>
      <!-- {{postContend}} -->
    </v-card>
  </div>

</template>
<script>
import LikeBtn from '../common/LikeBtn'
import PostCardTitle from '@/components/postcards/PostCardTitle'
import PostCardComments from './PostCardComments'
export default {
  name: 'PostCards',
  components: {
    LikeBtn,
    PostCardTitle,
    PostCardComments
  },
  props: {
    postContend: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    loading:false,
    user: { Photo: '', Name: '', ID: '' },
    deleted:false,
    ownertype:'posts'
  }),
  async mounted() {
    const user = await this.$store.dispatch('UserModule/getUserByUid', this.postContend.UserID)
    this.user = user
  },
  methods: {
    setLoding(ft){
      this.loading = ft
    }
  },
}
</script>
<style scoped>
.right {
  float: right;
}
</style>
