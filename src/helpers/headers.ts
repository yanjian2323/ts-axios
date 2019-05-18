import { isPlainOjbect } from './util'

function normalizeHeaders(headers: any, headerName: string): void {
  Object.keys(headers).forEach(key => {
    // 是同一个字段，只是大小写问题
    if (key !== headerName && key.toUpperCase() === headerName.toUpperCase()) {
      headers[headerName] = headers[key]
      delete headers[key]
    }
  })
}
export function processHeaders(headers: any, data: any): any {
  normalizeHeaders(headers, 'Content-Type')
  if (isPlainOjbect(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}
