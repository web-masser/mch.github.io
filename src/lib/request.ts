import axios from 'axios'
import configs from './axiosConfig'
// import load from '@/util/loading'
// import util from '@/util/common'

let count = 0 
let pending: Array<{
  url: string,
  cancel: Function
}> = []

const cancelToken = axios.CancelToken

const removePending = (config: any) => {
  for (let p in pending) { // key
    let item: any = p
    let list: any = pending[p]
    if (list.url === config.url + '&request_type=' + config.method) {
      list.cancel()
      // 从数组中移除记录
      pending.splice(item, 1)
    }
  }
}

const service = axios.create(configs.axiosConfig)


const axiosService = [service]

for (let services of axiosService){
  // 添加请求拦截器
  services.interceptors.request.use(
    config => {
      removePending(config)
      config.cancelToken = new cancelToken((c) => {
        pending.push({ url: config.url + '&request_type=' + config.method, cancel: c })
      })
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  services.interceptors.response.use(
    res => {
      removePending(res.config)
      return res
    },
    error => {
      if (error.message == "Network Error" ){
        // util.warning(errors)
      }else {
        return Promise.reject(error)
      }
    }
  )
}

export default {service}