import axios from '../../src/index'

// 参数是数组
axios({
  url: '/base/get',
  params: {
    names: ['yanj','wangzis']
  }
})

// 参数是对象
axios({
  url: '/base/get',
  params: {
    other: {
      name: 'yanj',
    }
  }
})

// 参数是日期
axios({
  url: '/base/get',
  params: {
    date: new Date(),
  }
})

// 特殊字符
axios({
  url: '/base/get',
  params: {
    name: '@:$, '
  }
})

// age为null，不会传递
axios({
  url: '/base/get',
  params: {
    name: 'yanj',
    age: null,
  }
})

// hash的情况
axios({
  url: '/base/get#aa',
  params: {
    name: 'yanj',
  }
})

// 原url上有参数的情况
axios({
  url: '/base/get?name=yanj',
  params: {
    age: 25,
  }
})

// post,会自动添加content-type:application/json
axios({
  url: '/base/post',
  method: 'post',
  data: {
    name: 'yanj',
    age: 25,
  }
}).then((res) => {
  console.log(res)
})

// post传递
axios({
  url: '/base/buffer',
  method: 'post',
  data: new Int32Array([12,24]),
})

// 设置headers
axios({
  url: '/base/post',
  method: 'post',
  headers: {
    'content-type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
  },
  responseType: 'json',
  data: {
    name: 'yanj',
    age: 25,
  }
}).then((res) => {
  console.log(res)
})

// data传递URLSearchParams类型，浏览器会自动添加content-type:application/x-www-form-urlencoded
axios({
  url: '/base/post',
  method: 'post',
  data: new URLSearchParams('q=URLUtils.searchParams&topic=api')
})

