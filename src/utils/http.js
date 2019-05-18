import axios from 'axios'

const SERVER_API_PREFIX = 'http://api.520guzheng.com'

export const get = (url) => {
  const isServer = typeof window === 'undefined'
  const completeUrl = !isServer ? url : SERVER_API_PREFIX + url
  return axios.get(completeUrl).then(({ data }) => {
    if (data.status !== 1) {
      !isServer && alert('请求出错')
    } else if (data.code !== 200) {
      !isServer && alert(data.message)
    } else {
      return data
    }
  }).then(res => res.data)
}

export const post = (url, params) => {
  const isServer = typeof window === 'undefined'
  const completeUrl = !isServer ? url : SERVER_API_PREFIX + url
  return axios.post(url, params).then(({ data }) => {
    if (data.status !== 1) {
      !isServer && alert('请求出错')
    } else if (data.code !== 200) {
      !isServer && alert(data.message)
    } else {
      return data
    }
  }).then(res => res && res.data)
}
