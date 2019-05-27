import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { buildURL } from '../helpers/url'
// import {
//   transformRequestData as transformRequest,
//   transformResponseData as transformResponse
// } from '../helpers/data'
import { processHeaders, flattenHeaders } from '../helpers/headers'
import xhr from './xhr'
import transform from '../core/transform'
import { transformResponseData } from '../helpers/data'

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  const { data, headers, transformRequest } = config
  // config.headers = transformHeaders(config)
  // config.data = transformRequestData(config)
  config.data = transform(data, headers, transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config

  return buildURL(url!, params)
}

// function transformRequestData(config: AxiosRequestConfig): any {
//   const { data } = config

//   return transformRequest(data)
// }

// function transformHeaders(config: AxiosRequestConfig): any {
//   const { headers = {}, data } = config

//   return processHeaders(headers, data)
// }

// function transformResponseData(response: AxiosResponse): any {
//   const { data } = response

//   return transformResponse(data)
// }

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    const { data, headers } = res
    const { transformResponse } = config
    // res.data = transformResponseData(res)
    res.data = transform(data, headers, transformResponse)

    return res
  })
}
