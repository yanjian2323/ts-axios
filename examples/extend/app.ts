import axios from '../../src/index'

// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     name: 'yanj',
//   }
// })

// axios.request({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     name: 'yanj',
//   }
// })

// axios.get('/extend/get')
// axios.options('/extend/options')
// axios.delete('/extend/delete')
// axios.head('/extend/head')
// axios.post('/extend/post', {
//   type: 'post',
// })
// axios.put('/extend/put', {
//   type: 'put',
// })
// axios.patch('/extend/patch', {
//   type: 'patch',
// })

axios('/extend/get', {
  method: 'get',
})

axios('/extend/post', {
  method: 'post',
  data: {
    name: 'yanj'
  }
})