import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import { parseResponseHeaders } from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType, timeout } = config
    const xhr = new XMLHttpRequest()
    if (responseType) {
      xhr.responseType = responseType
    }
    xhr.open(method, url, true)
    Object.keys(headers).forEach(headerName => {
      xhr.setRequestHeader(headerName, headers[headerName])
    })
    if (timeout) {
      xhr.timeout = timeout
    }
    xhr.onerror = () => {
      reject(new Error('Network Error'))
    }
    xhr.ontimeout = () => {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return
      }
      // 必须加这个，要不然会执行下面的reject和不是xhr.ontimeout中的reject
      if (xhr.status === 0) return
      const responseHeaders = parseResponseHeaders(xhr.getAllResponseHeaders())
      const responseData = responseType === 'text' ? xhr.responseText : xhr.response
      const response: AxiosResponse = {
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: responseHeaders,
        config,
        xhr
      }

      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Request failed with status code ${response.status}`))
      }
    }
    xhr.send(data)
  })
}
