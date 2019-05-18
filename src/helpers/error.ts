import { AxiosRequestConfig, AxiosResponse } from '../types/index'

class AxiosError extends Error {
  isAxiosError: boolean
  code: string | null
  config: AxiosRequestConfig
  xhr: XMLHttpRequest
  response?: AxiosResponse
  constructor(
    message: string,
    code: string | null,
    config: AxiosRequestConfig,
    xhr: XMLHttpRequest,
    response?: AxiosResponse
  ) {
    super(message)
    this.isAxiosError = true
    this.code = code
    this.config = config
    this.xhr = xhr
    this.response = response

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

function createAxiosError(
  message: string,
  code: string | null,
  config: AxiosRequestConfig,
  xhr: XMLHttpRequest,
  response?: AxiosResponse
) {
  return new AxiosError(message, code, config, xhr, response)
}

export default createAxiosError
