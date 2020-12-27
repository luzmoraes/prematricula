import api from '../api';

interface LoginProps {
  email: string
  password: string
}

const TOKEN_KEY: any = process.env.REACT_APP_LS_TOKEN_KEY

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token)

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
    // const { access_token, refresh_token } = response.data
    const { access_token } = response.data

    setToken(access_token)

    return {success: true}

  } catch (error) {
    return {success: false, codeError: error.response.status}
  }
}


export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// const refreshToken = () => {

//   const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_LS_USER_KEY))

//   const data = {
//     'grant_type': 'refresh_token',
//     'refresh_token': currentUser.refresh_token,
//     'client_id': process.env.REACT_APP_CLIENT_INFO_ID,
//     'client_secret': process.env.REACT_APP_CLIENT_INFO_SECRET,
//     'scope': ''
//   }

//   return new Promise((resolve, reject) => {
//     api.post(`/token/url/`, data, {
//       headers: {
//         Authorization: "Basic {secret_key}"
//       }
//     })
//     .then(async response => {
//       resolve(response);
//     })
//     .catch(error => {
//       reject(error);
//     })
//   })
// }