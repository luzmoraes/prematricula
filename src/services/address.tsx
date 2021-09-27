import axios from 'axios'

const api = axios.create({
  baseURL: 'https://viacep.com.br/ws/'
})

export const searchAddressFromCep = async (cep: string) => {
  return await api.get(`${cep}/json/`);
}