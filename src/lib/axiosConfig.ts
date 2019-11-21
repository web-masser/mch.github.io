import qs from 'qs'
import { AxiosResponse, AxiosRequestConfig } from 'axios'

let axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.VUE_APP_APIURL
}

let axiosConfigs = [axiosConfig];

for(let service of axiosConfigs){
  service.transformResponse = [function (data: AxiosResponse) {return data}]
  // service.timeout = 30000
  service.withCredentials = true
  service.responseType = 'json'
  service.xsrfCookieName = 'XSRF-TOKEN'
  service.maxRedirects = 5
  service.maxContentLength = 2000
  service.validateStatus = (status: number) => {
    return status >= 200 && status < 300
  }
  service.paramsSerializer = (params: any) => {
    return qs.stringify(params)
  }
}
  
export default { axiosConfig }