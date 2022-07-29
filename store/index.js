export const state = () => ({
    counter: 0,
    mid: null
  })
  
  export const mutations = {
    setmid(state,mid) {
      state.mid = mid
    }
  }