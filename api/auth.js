export default ($axios) => {
    
    $axios.setBaseURL('http://localhost:1016/api/v1')
      
    return {
      // login and register
      attempt: data => $axios.post('/register/attempt',data),
      // 有参数的情况
      sendEmail: () => $axios.post('/register/sendmailcode'),
      register: data => $axios.post('/register/register', data),
      login: data => $axios.post('/login', data),


      // User
      info: () => $axios.post('/user/info'),
      editInfo: (data) => $axios.put('/user/info',data),
      logout: () => $axios.post('/user/logout'),
      
      WatchUser: (uid) => $axios.post(`/user/watch/${uid}`),
      UnWatchUser: (uid) => $axios.post(`/user/unwatch/${uid}`),
      GetUserByUserName:(username) => $axios.post(`/user/getby/username/${username}`),
      GetUserByUid:(uid) => $axios.post(`/user/getby/uid/${uid}`),

      // Post
      createPost: data => $axios.post(`/post/create?uid=${data.user_id}`,data),
      deletePost: (data) => $axios.request(`/post/delete/${data.postid}?uid=${data.uid}`,{
        method: 'delete'
      }),
      editPost: (postid,data) => $axios.put(`/post/edit/${postid}`,data),
      GetPostByPostID: (postid) => $axios.post(`/post/getby/postid/${postid}`),
      GetPostByUserID: (uid) => $axios.post(`/post/getby/uid/${uid}`),
      GetHomePosts: () => $axios.post(`/post/get/home`),
      // Like
      LikePost: (data) => $axios.post(`/post/like?ownerid=${data.ownerid}&owner_type=${data.owner_type}`),
      UndoLikePost: (data) => $axios.delete(`/post/undolike?ownerid=${data.ownerid}&owner_type=${data.owner_type}`),
      IsLiked:(data)=> $axios.post(`/post/likedornot?ownerid=${data.ownerid}&owner_type=${data.owner_type}`),

      // ...your other api function
      // commender
      CommentsUsers:() =>  $axios.post('/user/unwatchedusers'),
    }
  }
  