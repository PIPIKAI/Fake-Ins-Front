const createPostModule = {
  namespaced: true,
  state: {
    FileList:[],
    selectFixedRate:0,
    
  },
  mutations: {
    setFileList(state,filelist){
      state.FileList = filelist
    },
    delByUid(state,uid){
      state.FileList =state.FileList.filter( (item)=> item.uid !== uid)
    },
    setSelectFixedRate(state,selected){
      state.selectFixedRate = selected
    }
  },
  actions: {
    uploadimges(state,imgesList){
      console.log('createPostModule / uploadimges')
    },
    async createPost(state,data){
      return await this.$authApi.createPost(data).then((result) => result).catch((err) =>  reject(err));
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

export default createPostModule

