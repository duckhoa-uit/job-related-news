import { LoginParams, RegisterParams } from '../context/types'
import axiosClient from './axios-client'

export const authApi = {
  login(payload: LoginParams): Promise<{ access_token: string }> {
    return axiosClient.post('/auth/login', payload)
  },
  register(payload: RegisterParams) {
    return axiosClient.post('/auth/register', payload)
  },

  logout() {
    return axiosClient.post('/logout')
  },

  getMe() {
    return axiosClient.get('/users/me')
  },
}