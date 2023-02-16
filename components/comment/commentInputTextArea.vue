<template>
  <div>
    <v-card-actions fixed class="pa-0 ma-0">
      <el-input
        v-model="commentContent"
        prefix-icon="el-icon-s-comment"
        placeholder="添加评论..."
        maxlength="250"
      >
      </el-input>
      <v-btn
        color="blue"
        :disabled="commentContent == ''"
        text
        @click="PostComment"
      >
        发布
      </v-btn>
    </v-card-actions>
  </div>
</template>
<script>
export default {
  props: {
    postid: {
      type: Number,
      required: true,
    },
  },
  data: () => ({}),
  computed: {
    commentContent: {
      get() {
        return this.$store.state.commentModule.commentContent
      },
      set(newVal) {
        this.$store.commit('commentModule/setCommentContent', newVal)
      },
    },
    commentPrefix: {
      get() {
        return this.$store.state.commentModule.prefix
      },
      set(newVal) {
        this.$store.commit('commentModule/setPrefix', newVal)
      },
    },
  },
  watch: {},
  methods: {
    PostComment() {
      const content = this.commentContent
      if (content[0] !== '@') {
        this.$store.commit('commentModule/setReply', false)
      }
      const data ={
        postID:this.postid,
        content:this.commentContent,
        userID:this.$store.state.user.ID
      }
      this.$store.dispatch("commentModule/CommentPost",data).then((res)=>{
        if(res.data !== null){
          const temp =[res.data.data]
          this.$store.commit("commentModule/setShowComments",temp.concat(this.$store.state.commentModule.showComments)) 
        }
        this.$message.success("评论成功！")
        this.commentContent =''
      }).catch(()=>{
        this.$message.error("评论失败！")
      })
    },
  },
}
</script>
<style lang=""></style>
