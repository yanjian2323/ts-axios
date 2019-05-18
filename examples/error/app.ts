import axios, {AxiosError} from '../../src/index'

axios({
  url: '/error/get',
}).catch((e: AxiosError) => {
  console.log(e.isAxiosError)
  console.log(e.message)
  console.log(e.config)
  console.log(e.xhr)
  console.log(e.response)
})

// 模拟一个404错误
axios({
  url: '/error/getaa',
}).catch((e: AxiosError) => {
  console.log(e.isAxiosError)
  console.log(e.message)
  console.log(e.config)
  console.log(e.xhr)
})

// 模拟超时错误
axios({
  url: '/error/timeout',
  timeout: 2000,
}).catch(e => console.log(e))

// 模拟网络错误, 2秒后在chrome控制台开启offline 会触发
setTimeout(() => {
  axios({
  url: '/error/get'
  }).catch(e => console.log(e))
}, 4000)