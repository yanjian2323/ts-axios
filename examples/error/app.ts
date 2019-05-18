import axios from '../../src/axios'

axios({
  url: '/error/get',
}).catch(e => {
  console.log(e)
})

// 模拟一个404错误
axios({
  url: '/error/getaa',
}).catch(e => {
  console.log(e)
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