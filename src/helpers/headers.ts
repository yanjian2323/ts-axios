import { isPlainOjbect, deepMerge } from './util'

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

export function parseResponseHeaders(headers: any) {
  const parsedHeaders = Object.create(null)
  headers.split('\r\n').forEach((line: string) => {
    let [headerName, val] = line.split(':')
    headerName = headerName.toLowerCase().trim()
    if (!headerName) return
    if (val) {
      val = val.trim()
    }
    parsedHeaders[headerName] = val
  })
  return parsedHeaders
}

export function flattenHeaders(headers: any, method: string): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers['common'], headers[method], headers)
  const methodsWillDelete = ['get', 'head', 'options', 'delete', 'post', 'put', 'patch', 'common']
  methodsWillDelete.forEach(m => {
    delete headers[m]
  })

  return headers
}
