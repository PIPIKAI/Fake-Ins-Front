export default ($axios) => {
    
    $axios.setBaseURL('http://localhost:1016/api')
      
    return {
      attempt: data => $axios.post('/register/attempt',data),
      // 有参数的情况
      sendEmail: data => $axios.post('/register/sendmailcode', {data}),
      getData: data => $axios.post('/register', {data})
      // ...your other api function
    }
  }
  