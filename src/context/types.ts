import { Comment, UpdateCommentPayload } from "@/models/comment"

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type RegisterParams = {
  name: string
  email: string
  password: string
  role?: string
}

export type UserDataType = {
  id: string
  role: string
  email: string
  name: string
  photo?: string | null
  createdAt: string
  updatedAt: string
  verified: boolean
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
}
export type CommentValuesType = {
  comments: Comment[]
  setComments: (comments: Comment[]) => void
  addComment: (message: string, parentId: string | null) => void
  updateComment: (id: string, comment: UpdateCommentPayload) => void
  commentToDelete: { commentId: string, parentId: string | null }
  setCommentToDelete: (params: { commentId: string, parentId: string | null }) => void
  deleteComment: () => void
  showModal: boolean
  toggleDeleteModal: () => void
}