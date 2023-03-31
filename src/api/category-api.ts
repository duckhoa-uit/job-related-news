import { ResponseListData } from '@/models/common'
import { Post } from '@/models/post'
import axios from 'axios'
import axiosClient from './axios-client'

export const categoryApi = {
  getAll() {
    return axiosClient.get('/categories')
  },
  getTrendingTopics() {
    return axios.get<ResponseListData<Post>>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`)
  },
}