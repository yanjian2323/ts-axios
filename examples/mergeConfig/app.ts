import axios from '../../src/index'

axios.defaults.headers.common['test1'] = 123

axios({
  url: '/config/post',
  method: 'post',
  headers: {
    test2: '123'
  },
  data: {
    name: 'yanjian',
    age: 30,
  }
  // data: 'name=yanjian&age=30'
})