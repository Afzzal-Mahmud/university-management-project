type IMetaType = {
  page: number
  limit: number
  total: number
}
export type IApiResponseOnPayloadSuccess<T> = {
  statusCode: number
  success: boolean
  message?: string | null | undefined
  meta?: IMetaType | null | undefined
  data: T | null
}
