import { getToken, getRefreshToken, setToken, logout } from '../services/auth'

import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
})


api.interceptors.request.use(async config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


api.interceptors.response.use((response) => {
  return response
}, (error) => {

  const originalRequest = error.config

  if (error.response.status === 401 && originalRequest.url === '/oauth/token') {

    if (window.location.pathname !== '/') {
      window.location.href = '/'
    }

    logout()

    return Promise.reject(error)
  }

  if (error.response.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true

      const data = {
        'grant_type': 'refresh_token',
        'refresh_token': getRefreshToken(),
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_INFO_SECRET,
        scope: ''
      }

      return axios.post(`${process.env.REACT_APP_BASE_URL}/oauth/token`, data)
        .then(res => {
          if (res.status === 200 || res.status === 201) {
            const { access_token, refresh_token } = res.data
            setToken(access_token, refresh_token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`
            return api(originalRequest);
          }
        })
        .catch(err => {
          window.location.href = '/'
          logout()
          return Promise.reject(error)
        })
  } else{
    window.location.href = '/'
    logout()
    return Promise.reject(error)
  }
})

export default api