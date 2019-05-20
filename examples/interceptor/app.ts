import axios from '../../src/index'

axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})

axios.interceptors.request.use(config => {
  config.headers.test += '2' 
  return config
})

axios.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

axios.interceptors.response.use(res => {
  res.data = res.data + '1'

  return res
})

axios.interceptors.response.use(res => {
  res.data = res.data + '2'

  return res
})

axios.interceptors.response.use(res => {
  res.data = res.data + '3'

  return res
})

axios.get('/interceptor/get', {
  headers: {
    test: 'header',
  }
}).then((res) => {
  console.log(res.data)
})