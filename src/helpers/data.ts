import { isPlainOjbect } from './util'
export function transformRequestData(data: any) {
  if (isPlainOjbect(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponseData(data: any): any {
  let resData = data
  if (typeof data === 'string') {
    try {
      resData = JSON.parse(data)
    } catch (ex) {
      // todo
    }
  }

  return resData
}
