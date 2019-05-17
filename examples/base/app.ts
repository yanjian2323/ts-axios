import axios from '../../src/axios'

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

