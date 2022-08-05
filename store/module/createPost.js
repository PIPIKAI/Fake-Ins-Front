const cteatePostModule = {
  namespaced: true,
  state: {
    FileList:[],
    selectFixedRate:0,
    
  },
  mutations: {
    test(state){
      console.log('cteatePostModule / test')
    },
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
      console.log('cteatePostModule / uploadimges')
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

export default cteatePostModule
