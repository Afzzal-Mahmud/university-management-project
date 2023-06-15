export type IApiResponseOnPayloadSuccess<T> = {
  statusCode: number
  success: boolean
  message?: string | null | undefined
  data: T | null
}
