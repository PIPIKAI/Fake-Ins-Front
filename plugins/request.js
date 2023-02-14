// 引入我们刚刚创建的index.js api文件
import indexApi from '@/api/index.js'
import authApi from '@/api/auth.js'

export default function({ $axios,store }, inject) {
	function axiosConfig($axios) {
        // 设置请求拦截
        $axios.defaults.withCredentials = true
        
        $axios.onRequest((config) => {
          // 用于调试
          if (process.env.DEBUG) {
            console.log('$axios.onRequest', config)
          }
          config.startTime = new Date().getTime()
          config.headers['Content-Type'] = 'application/json'
          const mid = store.state.mid || ''
          // const token = store.state.token || ''
          if (mid) {
            config.headers.Cookie = "mid: "+mid
          }
          return config
        })
        // 设置响应拦截
        $axios.onResponse((response) => {
          response.config.endTime = new Date().getTime()
          const status = response.status
          
          if (+status === 200) {
            // 打印出每个接口的响应时间，如果慢了就捶后端，让他优化！！！
            console.info(response.config.url,'请求时间',response.config.endTime - response.config.startTime + 'ms'
            )
            // 用于调试
            if (process.env.DEBUG) {
              console.info('$axios.onResponse', response.data)
            }
            // 返回接口数据
            return response.data
          } else {
            // 如果请求失败的，打印出相应的错误信息，更好的修改。
            const responseConfig = response ? response.config : {}
            console.error('响应拦截报错提示： ', {
              url: responseConfig.baseURL + responseConfig.url,
              status: response.status,
              statusText: response.statusText,
              method: responseConfig.method,
              headers: responseConfig.headers,
              data: responseConfig.data,
              params: responseConfig.params,
              responseData: response.data
            })
          }
        })

        // axios错误处理
        $axios.onError((error) => {
          const response = error.response || {}
          const responseConfig = response.config || {}
          console.error('$axios.onError: ', error)
          console.error('错误处理提示 ', {
            url: responseConfig.baseURL + responseConfig.url,
            status: response.status,
            statusText: response.statusText,
            method: responseConfig.method,
            headers: responseConfig.headers,
            data: responseConfig.data,
            params: responseConfig.params,
            responseData: response.data
          })
        })
        // 最后返回$axios对象
        return $axios
      }
    

	// 最后将我们的api文件进行注入
	inject('authApi', authApi(axiosConfig($axios.create() )))
}
