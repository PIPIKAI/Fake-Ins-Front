<template>
  <div>
    <v-row class="ma-0 ">
      <v-col md="2" class="ma-0 pa-3 pr-1 pt-0 mt-1 mb-3 ">
        <v-list-item-avatar class="ma-0 pa-0">
          <v-img :src="user.Photo"></v-img>
        </v-list-item-avatar>
      </v-col>
      <v-col md="7" class="ma-1">
        <v-row >
          <div class="transition-swing text-body-2 font-weight-bold mb-0">
            {{user.Name}}:
          </div>
          <div class=" transition-swing text-body-2 mb-0">
            {{item.Content}}
          </div>
          
        </v-row>
        <v-row>
          <div class=" transition-swing text-caption mb-0">
            {{item.LikesCounts}}赞 ·
          </div>
          <div class=" transition-swing text-caption mb-0" @click="replayClick">
            回复
          </div>
        </v-row>
        
      </v-col>
      <v-col>
          <LikeBtn @click="reload" :owner_type="like_type" :ownerid="item.ID"></LikeBtn>
      </v-col>
    </v-row>
    <v-row v-if="item.ReplysCounts != 0" class="ma-0 ml-4">
      <div>--查看回复{{item.ReplysCounts}}</div>
    </v-row>
  </div>
</template>
<script>
import LikeBtn from '@/components/common/LikeBtn.vue'
export default {
  components:{LikeBtn},
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    user: {},
    like_type:'comments'
  }),
  async mounted() {
    this.user = await this.$store
      .dispatch('UserModule/getUserByUid', this.item.UserID)
      .then((res) => res.data.data)
  },
  methods: {
    replayClick(){
      this.$store.commit("commentModule/setCommentContent","@"+this.user.UserName+" ")
      this.$store.commit("commentModule/setReply",true)
      this.$store.commit("commentModule/setReplyID",this.item.ID)
    }
  },
}
</script>
<style>

</style>
