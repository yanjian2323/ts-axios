import { isPlainOjbect } from './util'
export function transformRequestData(data: any) {
  if (isPlainOjbect(data)) {
    return JSON.stringify(data)
  }
  return data
}
