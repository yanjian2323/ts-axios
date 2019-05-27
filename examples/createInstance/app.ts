import axios, { AxiosTransformer } from '../../src/index'

const newAxios = axios.createInstance({
  transformResponse: [...axios.defaults.transformResponse as AxiosTransformer[], (data) => {
    data.xxx = 'xxx'
    return data
  }],
  headers: {
    test: 'test'
  }
})

newAxios({
  url: '/instance/post',
  method: 'post',
  // data: {
  //   age: 25,
  // }
  data: 'age=25',
}).then((res) => {
  console.log(res.data)
})