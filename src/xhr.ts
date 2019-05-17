import { AxiosRequestConfig } from './types/index'

export default function xhr(config: AxiosRequestConfig) {
  const { url, method = 'get', data = null, params } = config
  const xhr = new XMLHttpRequest()
  xhr.open(method, url, true)
  xhr.send(data)
}
