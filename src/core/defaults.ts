import { AxiosRequestConfig } from '../types'
import { processHeaders } from '../helpers/headers'
import { transformRequestData, transformResponseData } from '../helpers/data'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/html, */*'
    }
  },
  transformRequest: [
    (data: any, headers: any) => {
      processHeaders(headers, data)
      return transformRequestData(data)
    }
  ],
  transformResponse: [
    (data: any, headers: any) => {
      return transformResponseData(data)
    }
  ]
}

const methodsWithoutData = ['get', 'options', 'head', 'delete']
methodsWithoutData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
