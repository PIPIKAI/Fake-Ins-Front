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
          <div class=" transition-swing text-caption mb-0" >
            {{LikesCounts}}赞 ·
          </div>
          <div class=" transition-swing text-caption mb-0" @click="replayClick">
            回复
          </div>
        </v-row>
        
      </v-col>
      <v-col>
          <LikeBtn  :owner_type="like_type" @unliked="iteminfo.LikesCounts =iteminfo.LikesCounts - 1" 
          @liked="iteminfo.LikesCounts = iteminfo.LikesCounts+1"  :ownerid="item.ID"></LikeBtn>
      </v-col>
      <!-- {{item.Replys}} -->
    </v-row>
    <div v-if="item.ReplysCounts != 0">
      <div v-if="!showReplays" class="text-body-2 font-weight-bold text-center" @click="showReplays=true">
        —— 查看回复{{item.ReplysCounts}}
      </div>
      <div v-else>
        <ReplayCommentItem :Items="item.Replys" :ReplyUser="user"></ReplayCommentItem>
      </div>
    </div>
  </div>
</template>
<script>
import LikeBtn from '@/components/common/LikeBtn.vue'
import ReplayCommentItem from '~/components/comment/ReplayCommentItem'
export default {
  components:{
    LikeBtn,
    ReplayCommentItem
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    user: {},
    like_type:'comments',
    iteminfo:{},
    showReplays:false,
  }),
  async mounted() {
    this.user = await this.$store
      .dispatch('UserModule/getUserByUid', this.item.UserID)
      .then((res) => res.data.data)
    this.iteminfo = this.item
  },
  methods: {
    replayClick(){
      this.$store.commit("commentModule/setCommentContent","@"+this.user.UserName+" ")
      this.$store.commit("commentModule/setReply",true)
      this.$store.commit("commentModule/setReplyID",this.item.ID)
      this.tdata+=1
    },
  },
  computed:{
    LikesCounts:{
      get(){
        return this.iteminfo.LikesCounts
      },
      set(val){
        this.iteminfo.LikesCounts = val
      }
    }
  }
}
</script>
<style>

</style>
