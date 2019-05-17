import { isDate, isPlainOjbect } from './util'

function encode(str: string): string {
  return encodeURIComponent(str)
    .replace(/%5B/g, '[')
    .replace(/%5D/g, ']')
    .replace(/%24/g, '$')
    .replace(/%20/g, '+')
    .replace(/%40/g, '@')
    .replace(/%3A/g, ':')
    .replace(/%2C/g, ',')
}

// 返回最终处理过的url
export function buildURL(url: string, params?: any): string {
  if (!params) return url
  let retUrl = ''
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    let values = []
    if (val === null || val === undefined) {
      return
    }
    if (Array.isArray(val)) {
      values = val
      key = `${key}[]`
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainOjbect(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  // 没有参数需要拼接
  if (parts.length === 0) {
    return url
  }
  const queryStr = parts.join('&')
  retUrl = url + (url.includes('?') ? '&' : '?') + queryStr
  if (retUrl.includes('#')) {
    retUrl = retUrl.slice(0, retUrl.indexOf('#'))
  }
  return retUrl
}
