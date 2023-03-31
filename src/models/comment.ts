import { UserDataType } from "@/context/types"
import { Post } from "./post"

export interface Comment {
  id: string
  message: string
  authorId: string
  author?: UserDataType
  postId: string | null
  post?: Post
  parentId: string | null
  children: Comment[]
  createdAt: string
  updatedAt: string
}

export interface CreateCommentPayload {
  message: string
  postSlug: string
  parentId: string | null
}