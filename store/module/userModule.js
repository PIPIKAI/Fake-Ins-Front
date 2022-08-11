const UserModule = {
    namespaced: true,
    state: {
      user:null,
    },
    mutations: {
      setUser(state,userinfo){
        state.user = userinfo
      },
      setCookies(state,cookies){
        
      }
    },
    actions: {
      async attempt(state,fromData){
        return await this.$authApi.attempt(fromData).then((result) => result).catch((err) =>  (err));
      },
      async sendEmail(state){
        return await this.$authApi.sendEmail().then((result) => result).catch((err) =>  (err));
      },
      async register(state,fromData){
        return await this.$authApi.register(fromData).then((result) => result).catch((err) =>  (err));
      },
      async login(state,fromData){
        return await this.$authApi.login(fromData).then((result) => result).catch((err) =>  (err));
      },
      // 
      async watchUser(state,uid){
        return await this.$authApi.WatchUser(uid).then((result) => result).catch((err) =>  (err));
      },
      async unWatchUser(state,uid){
        return await this.$authApi.UnWatchUser(uid).then((result) => result).catch((err) =>  (err));
      },
      async getCommendUsers(state){
        return await await this.$authApi.CommentsUsers().then((result) => result.data.data).catch((err) =>  (err));
      },
    },
    getters:{
    }
}

export default UserModule