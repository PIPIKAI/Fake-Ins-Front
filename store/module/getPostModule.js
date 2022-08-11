const getPostModule = {
  namespaced: true,
  state: {
  },
  mutations: {
    
  },
  actions: {
    async getPostsByPostId(state,postID){
      return await this.$authApi.GetPostByPostID(postID).then((result) => result).catch((err) =>  reject(err));
    },
    async getPostsByUid(state,uid){
      return await this.$authApi.GetPostByUserID(uid).then((result) => result.data.posts).catch((err) =>  reject(err));
    },
    async getHomePosts(state){
      return await this.$authApi.GetWaths().then((result) => result.data.posts).catch((err) =>  (err));
    },
    async getRecommendPosts(state,data){
     
    },
  },
  getters:{
    ListLen(state){
      return state.FileList.length
    },
    Files(state){
      return state.FileList
    }
  }
}

export default getPostModule
