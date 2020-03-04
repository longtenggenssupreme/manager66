import axios from 'axios'
const MyAxiosPlugin = {}
MyAxiosPlugin.install = (Vue) => {
  axios.defaults.baseURL = 'http://localhost:3000/'
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // 如果是登录的话那么就直接下一'步，，否则判断是否有token。有的话放行，没有调转到登录页
    if (config.url !== 'login') {
      // const AUTH_TOKEN = localStorage.getItem('token')
      // config.headers.common['Authorization'] = AUTH_TOKEN
      // config.defaults.defaults.headers.common['Authorization'] = AUTH_TOKEN
    }
    // console.log(config)
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })
  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
    return response
  }, function (error) {
  // 对响应错误做点什么
    return Promise.reject(error)
  })
  Vue.prototype.$http = axios
}
export default MyAxiosPlugin
