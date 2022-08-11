import cteatePostModule from './module/createPost'
import UserModule from './module/userModule'
import getPostModule from './module/getPostModule'
export const state = () => ({
    counter: 0,
    mid: null,
    snackbar: false,
    snackbarText: 'store.state',
    timeout:3000,
    user: null,
    userMap : new Map()
  })
  
  export const mutations = {
    setmid(state,mid) {
      state.mid = mid
    },
    sendSnackbar(state,msg) {
      state.snackbar = true
      state.snackbarText = msg
    },
    SnackbarReset(state) {
      state.snackbar = false
    },
    info(state,user) {
      state.user=user
      state.userMap.set(user.ID,user)
      user.Watchs.forEach(element => {
        state.userMap.set(element.ID,element)
      });
    },
    SetUserMap(state,userList) {
      userList.forEach(element => {
        state.userMap.set(element.ID,element)
      });
    }
  }

  export const modules={
    cteatePostModule,
    UserModule,
    getPostModule
  }