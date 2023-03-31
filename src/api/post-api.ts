import { ResponseData, ResponseListData } from '@/models/common'
import { CreatePostPayload, Post } from '@/models/post'
import axios from 'axios'
import axiosClient from './axios-client'
import { Comment as CommentModel } from '../models/comment'

export const postApi = {
  create(payload: CreatePostPayload): Promise<ResponseData<Post>> {
    return axiosClient.post('/posts', payload)
  },
  getAll() {
    return axios.get<ResponseListData<Post>>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`)
  },
  getPostBySlug(slug: string) {
    return axios.get<ResponseData<Post>>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${slug}`)
  }
}