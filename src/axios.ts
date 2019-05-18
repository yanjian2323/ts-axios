import { AxiosRequestConfig, AxiosPromise } from './types/index'
import { buildURL } from './helpers/url'
import { transformRequestData as transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
import xhr from './xhr'

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config

  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  const { data } = config

  return transformRequest(data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config

  return processHeaders(headers, data)
}

export default function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}
