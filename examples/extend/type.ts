export interface ResponseData<T>{
  code: number
  message: string
  result: T
}

export interface User{
  name: string
  age: number
}