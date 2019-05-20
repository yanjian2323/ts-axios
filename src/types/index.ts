import InterceptorManager from '../core/interceptorManager'

export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'options'
  | 'OPTIONS'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  params?: any
  data?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  xhr: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  code: string | null
  config: AxiosRequestConfig
  response?: AxiosResponse
  xhr: XMLHttpRequest
}

export interface Axios {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  request(config: AxiosRequestConfig): AxiosPromise
  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  head(url: string, config?: AxiosRequestConfig): AxiosPromise
  options(url: string, config?: AxiosRequestConfig): AxiosPromise
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
  (url: string, config: AxiosRequestConfig): AxiosPromise
}

export interface resolveFn<T> {
  (val: T): T
}

export interface rejecteFn {
  (error: any): any
}

export interface AxiosInterceptorManager<T> {
  use(resolve: resolveFn<T>, reject?: rejecteFn): number
  eject(id: number): void
}

export interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}
