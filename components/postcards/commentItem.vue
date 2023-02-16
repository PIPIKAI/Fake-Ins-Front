<template>
  <div>
    <v-row class="d-flex justify-start ma-0 pa-0">
      <v-col md="2" class="ma-0 pa-1 pr-1 pt-1 mt-1 mb-1 mr-1">
        <v-list-item-avatar class="ma-0 pa-0">
          <v-img :src="user.Photo"></v-img>
        </v-list-item-avatar>
      </v-col>
      <v-col md="7" class="ma-1">
        <v-row>
          <div class="transition-swing text-body-2 font-weight-bold mb-0">
            {{ user.Name }}:
          </div>
          <v-col md="auto" class="ma-0 pa-0">
            <div class=" transition-swing text-body-2 mb-0">
              {{ item.Content }}
            </div>
          </v-col>

        </v-row>

        <v-row>
          <div class=" transition-swing text-caption mb-0">
            {{ LikesCounts }}赞 ·
          </div>
          <div class=" transition-swing text-caption mb-0" @click="replayClick">
            回复
          </div>
        </v-row>

      </v-col>
      <v-col class="d-flex justify-end pr-0 mr-1">
        <LikeBtn :owner_type="like_type" @unliked="iteminfo.LikesCounts = iteminfo.LikesCounts - 1"
          @liked="iteminfo.LikesCounts = iteminfo.LikesCounts + 1" :ownerid="item.ID"></LikeBtn>
      </v-col>

    </v-row>
    
      <div v-if="item.ReplysCounts != 0">

        <div class="mb-1 mt-1"></div>
        <div class="text-body-2 font-weight-bold text-center" @click="clickShowReplay">
          —— {{ checkReply }}
        </div>
        <div class="mb-1 mt-1"></div>
        <div v-if="showReplays">
          <div v-for="replyItem in item.Replys" :key="item.id">
            <CommentItem class="ml-10"  v-if="replyItem != null" :item="replyItem" :replyUser="user"></CommentItem>
          </div>
        </div>
      </div>

  </div>
</template>
<script>
import LikeBtn from '@/components/common/LikeBtn.vue'
export default {
  components: {
    LikeBtn,
  },
  name: "CommentItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
    replyUser: {
      type: Object,
      required: false,
    },
  },
  data: () => ({
    user: {},
    like_type: 'comments',
    iteminfo: {},
    showReplays: false,
  }),
  async mounted() {
    this.user = await this.$store
      .dispatch('UserModule/getUserByUid', this.item.UserID)
      .then((res) => res.data.data)
    this.iteminfo = this.item
  },
  methods: {
    replayClick() {
      this.$store.commit("commentModule/setCommentContent", "@" + this.user.UserName + " ")
      this.$store.commit("commentModule/setReply", true)
      this.$store.commit("commentModule/setReplyID", this.item.ID)
      this.tdata += 1
    },
    clickShowReplay() {
      this.showReplays = !this.showReplays
    }
  },
  computed: {
    LikesCounts: {
      get() {
        return this.iteminfo.LikesCounts
      },
      set(val) {
        this.iteminfo.LikesCounts = val
      }
    },
    checkReply() {
      if (!this.showReplays) {
        return "查看回复(" + this.item.ReplysCounts + ")"
      } else {
        return "隐藏评论"
      }
    }
  }
}
</script>
<style>

</style>
