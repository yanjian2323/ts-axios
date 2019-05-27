import Axios from './axios'
import { extend } from '../helpers/util'
import { AxiosInstance, AxiosRequestConfig } from '../types/index'
import defaults from './defaults'

function createAxiosInstance(defaults: AxiosRequestConfig): AxiosInstance {
  const axios = new Axios(defaults)
  // const instance = Axios.prototype.request.bind(context)
  let instance = axios.request.bind(axios)
  instance = extend(instance, axios)

  return instance as AxiosInstance
}

const instance = createAxiosInstance(defaults)

export default instance
