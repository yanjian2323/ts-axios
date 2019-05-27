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
  [proName: string]: any
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  xhr: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  code: string | null
  config: AxiosRequestConfig
  response?: AxiosResponse
  xhr: XMLHttpRequest
}

export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  request<T>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T>(config: AxiosRequestConfig): AxiosPromise<T>
  <T>(url: string, config: AxiosRequestConfig): AxiosPromise<T>
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

export interface AxiosTransformer {
  (data: any, headers: any): any
}
