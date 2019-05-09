import axios from 'axios'

const SERVER_API_PREFIX = 'http://192.168.1.103:8080'

export const get = (url, query) => {
  const isServer = typeof window === 'undefined'
  const completeUrl = !isServer ? url : SERVER_API_PREFIX + url
  return axios.get(completeUrl).then(({ data }) => {
    if (data.status !== 1) {
      !isServer && alert('请求出错')
      throw new Error('请求出错')
    } else if (data.code !== 200) {
      !isServer && alert(data.message)
      throw new Error(data.message)
    } else {
      return data
    }
  }).then(res => res.data)
}
