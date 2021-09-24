import api from '../api';
import { clearUser } from './user'

interface LoginProps {
  email: string
  password: string
}

const TOKEN_KEY: any = process.env.REACT_APP_LS_TOKEN_KEY
const REFRESH_TOKEN_KEY: any = process.env.REACT_APP_LS_REFRESH_TOKEN_KEY

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY)

export const setToken = (token: string, refreshToken: string) => {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export const login = async ({ email, password }: LoginProps) => {

  const data = {
    grant_type: process.env.REACT_APP_CLIENT_INFO_GRANT_TYPE,
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_INFO_SECRET,
    scope: '',
    username: email,
    password
  }

  try {

    const response = await api.post('/oauth/token', data);

    const { access_token, refresh_token } = response.data

    setToken(access_token, refresh_token)

    return {success: true}

  } catch (error) {
    return {success: false, codeError: error.response.status}
  }
}


export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  clearUser()
}
