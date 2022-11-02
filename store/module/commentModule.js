const commentModule = {
    namespaced: true,
    state: {
      reply:false,
      commentContent:'',
      replyID:'',
      prefix:'',
      showComments:[],
    },
    mutations: {
      setCommentContent(state,newVal){
        state.commentContent = newVal
      },
      setReply(state,newVal){
        state.reply = newVal
      },
      setReplyID(state,newVal){
        state.replyID = newVal
      },
      setPrefix(state,newVal){
        state.prefix = newVal
      },
      setShowComments(state,newVal){
        state.showComments = newVal
      }
    },
    actions: {
      async GetComments({state,commit},params){
        return await this.$authApi.GetComments(params).then((result) => {
          return result
        }
        ).catch((err) =>  reject(err));
      },
      CommentPost({state},data){
        if(state.reply){
          data.replyID = state.replyID
          return this.$authApi.ReplyComment(data)
        }else{
          return this.$authApi.CommentPost(data)
        }
      }
    },
    getters:{

    }
  }
  
  export default commentModule
  
  