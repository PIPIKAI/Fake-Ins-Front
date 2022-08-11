export default ($axios) => {
    
    $axios.setBaseURL('http://localhost:1016/api')
      
    return {
      attempt: data => $axios.post('/register/attempt',data),
      // 有参数的情况
      sendEmail: () => $axios.post('/register/sendmailcode'),
      register: data => $axios.post('/register/register', data),
      login: data => $axios.post('/user/login', data),
      // getlist: () => $axios.get('/auth/list'),
      info: () => $axios.post('/auth/user/info'),
      logout: () => $axios.post('/auth/user/logout'),
      CommentsUsers:() =>  $axios.post('/auth/user/commend/users'),
      WatchUser: (uid) => $axios.post(`/auth/user/watch/${uid}`),
      UnWatchUser: (uid) => $axios.post(`/auth/user/unwatch/${uid}`),

      uploadImg: data => $axios.post('/auth/upload/imge',data),
      createPost: data => $axios.post('/auth/post/create',data),
      GetPostByPostID: (postid) => $axios.post(`/auth/post/getby/postid/${postid}`),
      
      GetPostByUserID: (uid) => $axios.post(`/auth/post/getby/uid/${uid}`),
      GetWaths: () => $axios.post(`/auth/post/get/home`),
      // $axios.headers['Content-Type'] = 'multipart/form-data'
      // ...your other api function
    }
  }
  