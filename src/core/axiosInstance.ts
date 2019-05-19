import Axios from './axios'
import { extend } from '../helpers/util'
import { AxiosInstance } from '../types/index'

function createAxiosInstance(): AxiosInstance {
  const axios = new Axios()
  // const instance = Axios.prototype.request.bind(context)
  let instance = axios.request.bind(axios)
  instance = extend(instance, axios)

  return instance as AxiosInstance
}

const instance = createAxiosInstance()

export default instance
