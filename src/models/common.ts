
export interface PaginationParams {
  totalItems: number
  totalPages: number
  currentPage: number
  pageSize: number
}
export interface ListParams {
  page?: number
  pageSize?: number

  [key: string]: any
}

export interface ResponseListData<T> {
  data: T[]
  pagination: PaginationParams
  status: string
}
export interface ResponseData<T> {
  data: T
  pagination: PaginationParams
  status: string
}

export interface OptionItem {
  label: string
  value: string
}