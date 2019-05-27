import axios, { AxiosTransformer } from '../../src/index'
import qs from 'qs'
const p = axios({
  transformRequest: [(data, headers) => {
    return qs.stringify(data)
  }, ...axios.defaults.transformRequest as AxiosTransformer[]],
  transformResponse: [...axios.defaults.transformResponse as AxiosTransformer[], (data, headers) => {
    data.xxx = 'xxx'
    return data
  }],
  url: '/transform/post',
  method: 'post',
  data: {
    name: 'yanjian',
    age: 25,
  }
}).then((res) => {
  console.log(res.data)
})