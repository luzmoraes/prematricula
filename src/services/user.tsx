import { userProps } from '../interfaces/user'
import api from '../api';

const USER_KEY: any = process.env.REACT_APP_LS_USER_KEY

export const getAuthenticatedUser = async () => {
  const response = await api.get('/api/user');
  const {id, name, email, created_at} = response.data
  return {id, name, email, created_at}
}

export const setUser = (user: userProps) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const getUser = () => {
  const strUserInfo = localStorage.getItem(USER_KEY)

  const userInfo: userProps = strUserInfo
    ? JSON.parse(strUserInfo)
    : null

  return userInfo
}

export const clearUser = () => {
  localStorage.removeItem(USER_KEY)
}