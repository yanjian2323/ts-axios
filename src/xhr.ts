import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType } = config
    const xhr = new XMLHttpRequest()
    if (responseType) {
      xhr.responseType = responseType
    }
    xhr.open(method, url, true)
    Object.keys(headers).forEach(headerName => {
      xhr.setRequestHeader(headerName, headers[headerName])
    })
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return
      }
      const responseData = responseType === 'text' ? xhr.responseText : xhr.response
      const resolveData: AxiosResponse = {
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers,
        config,
        xhr
      }
      resolve(resolveData)
    }
    xhr.send(data)
  })
}
