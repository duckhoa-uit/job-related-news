import { UserDataType } from "@/context/types"
import { OutputData } from "@editorjs/editorjs"
import { Category } from "./category"

export interface Post {
  id: string
  title: string
  description: string
  slug: string
  content: OutputData
  cover: string
  published: boolean
  viewCount: number
  authorId: string
  author?: UserDataType
  createdAt: string
  updatedAt: string
  categoryId: string
  category?: Category
}

export interface CreatePostPayload {
  title: string
  description: string
  slug: string
  categoryId: string
  content: OutputData
  cover: string
  published: true
}