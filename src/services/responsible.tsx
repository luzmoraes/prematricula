import api from '../api';

export const checkResponsibleCpf = async (cpf: string) => {
  return await api.post('/api/responsible/search', { cpf });
}