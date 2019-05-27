import { AxiosRequestConfig } from '../types'
import { deepMerge, isPlainOjbect } from '../helpers/util'

const strat = Object.create(null)
function defaultStrat(val1: any, val2: any) {
  return val2 !== undefined ? val2 : val1
}

function from2ValStrat(val1: any, val2: any) {
  if (val2 !== undefined) {
    return val2
  }
}

function deepMergeStrat(val1: any, val2: any): any {
  return deepMerge(val1, val2)
}

const stratKeyFromVal2 = ['url', 'data', 'params']
stratKeyFromVal2.forEach(prop => {
  strat[prop] = from2ValStrat
})

const stratDeepCopy = ['headers']
stratDeepCopy.forEach(prop => {
  strat[prop] = deepMergeStrat
})

function mergeConfig(config1: AxiosRequestConfig, config2: AxiosRequestConfig) {
  const config = Object.create(null)
  for (const key in config1) {
    mergeField(key)
  }
  for (const key in config2) {
    mergeField(key)
  }

  function mergeField(key: string): void {
    const stratFn = strat[key] || defaultStrat
    config[key] = stratFn(config1[key], config2[key])
  }

  return config
}

export default mergeConfig
