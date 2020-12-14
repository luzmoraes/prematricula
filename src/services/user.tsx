import api from '../api';

const USER_KEY: any = process.env.REACT_APP_LS_USER_KEY

export const setUser = async () => {
  const response = await api.get('/api/user');

  const {id, name, email, created_at} = response.data

  localStorage.setItem(USER_KEY, JSON.stringify({id, name, email, created_at}))
}