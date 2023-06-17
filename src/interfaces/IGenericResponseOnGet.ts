export type IGenericResponseOnGet<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}
