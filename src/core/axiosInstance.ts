import Axios from './axios'
import { extend } from '../helpers/util'
import { AxiosStatic, AxiosRequestConfig } from '../types/index'
import defaults from './defaults'
import mergeConfig from './mergeConfig'

function createAxiosInstance(config: AxiosRequestConfig): AxiosStatic {
  const axios = new Axios(config)
  // const instance = Axios.prototype.request.bind(context)
  let instance = axios.request.bind(axios)
  instance = extend(instance, axios)

  return instance as AxiosStatic
}

const instance = createAxiosInstance(defaults)
instance.createInstance = config => {
  return createAxiosInstance(mergeConfig(defaults, config))
}

export default instance
