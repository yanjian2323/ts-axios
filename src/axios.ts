import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'

export default function axios(config: AxiosRequestConfig) {
  xhr(config)
}
