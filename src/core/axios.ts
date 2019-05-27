import {
  AxiosRequestConfig,
  AxiosPromise,
  Method,
  AxiosResponse,
  resolveFn,
  rejecteFn,
  Interceptors
} from '../types'
import InterceptorManager from './interceptorManager'
import dispatchRequest from './dispatchRequest'
import mergeConfig from './mergeConfig'

interface PromiseChain<T> {
  resolve: resolveFn<T>
  reject?: rejecteFn
}

export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors
  constructor(defaults: AxiosRequestConfig) {
    this.defaults = defaults
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    config = mergeConfig(this.defaults, config)
    console.log(config)
    const chain: PromiseChain<any>[] = [
      {
        resolve: dispatchRequest,
        reject: undefined
      }
    ]
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })
    let promise = Promise.resolve(config)
    while (chain.length) {
      const interceptor = chain.shift()
      const { resolve, reject } = interceptor!
      promise = promise.then(resolve, reject)
    }

    return promise
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData(url, 'get', config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData(url, 'head', config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData(url, 'options', config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData(url, 'delete', config)
  }

  private _requestWithoutData(url: string, method: Method, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        url,
        method
      })
    )
  }

  post(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData(url, 'post', data, config)
  }

  put(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData(url, 'put', data, config)
  }

  patch(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData(url, 'patch', data, config)
  }

  private _requestWithData(
    url: string,
    method: Method,
    data: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        url,
        data,
        method
      })
    )
  }
}
