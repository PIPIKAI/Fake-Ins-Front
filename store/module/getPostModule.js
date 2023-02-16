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
    async getPostsByUid(state,data){
      return new Promise((resolve, reject) => {
        this.$authApi.GetPostByUserID(data.uid,data.pageinfo).then((result) => {resolve(result.data)}).catch((err) =>{ reject(err)});
      }); 
    },
    async getHomePosts(state,data){
      return await this.$authApi.GetHomePosts(data).then((result) => result.data).catch((err) =>  (err));
    },
    async deletePost(state,data){
      return new Promise((resolve, reject) => {
        this.$authApi.deletePost(data).then((result) => {resolve(result.data)}).catch((err) =>{ reject(err)});
      });   
    },
    async getRecommendPosts (state,data){
     
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
