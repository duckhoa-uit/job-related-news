import { ResponseData } from './../models/common';
import { ResponseListData } from '@/models/common'
import axios from 'axios'
import { Comment as CommentModel, CreateCommentPayload, UpdateCommentPayload } from '../models/comment'
import axiosClient from './axios-client'

export const commentApi = {
  create(payload: CreateCommentPayload): Promise<ResponseData<CommentModel>> {
    return axiosClient.post(`/comments`, payload)
  },
  update(id: string, payload: UpdateCommentPayload): Promise<ResponseData<CommentModel>> {
    return axiosClient.patch(`/comments/${id}`, payload)
  },
  delete(id: string): Promise<ResponseData<CommentModel>> {
    return axiosClient.delete(`/comments/${id}`)
  },
  getCommentsByPostSlug(slug: string) {
    return axios.get<ResponseListData<CommentModel>>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${slug}`)
  }
}