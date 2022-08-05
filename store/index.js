import cteatePostModule from './module/createPost'
export const state = () => ({
    counter: 0,
    mid: null,
    snackbar: false,
    snackbarText: 'store.state',
    timeout:3000,
    user: null,
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
      
    }
  }

  export const modules={
    cteatePostModule,
  }