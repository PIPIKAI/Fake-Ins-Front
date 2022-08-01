export default ($axios) => {
    
    $axios.setBaseURL('http://localhost:1016/api')
      
    return {
      attempt: data => $axios.post('/register/attempt',data),
      // 有参数的情况
      sendEmail: () => $axios.post('/register/sendmailcode'),
      register: data => $axios.post('/register/register', data),
      login: data => $axios.post('/user/login', data),
      getlist: () => $axios.get('/auth/list'),
      info: () => $axios.post('/auth/info'),
      logout: () => $axios.post('/user/logout'),
      // ...your other api function
    }
  }
  