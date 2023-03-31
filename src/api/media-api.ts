import { ResponseListData } from '@/models/common'
import { Media } from '@/models/media'
import axiosClient from './axios-client'

export const mediaApi = {
  uploadFiles(files: File[]): Promise<ResponseListData<Media>> {
    const formData = new FormData()
    files.forEach(file => {
      if (file instanceof File) {
        formData.append('files', file)
      }
    })
    return axiosClient.post('/media', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  },
}
