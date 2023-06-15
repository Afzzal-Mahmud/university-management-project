import { Response } from 'express'
import { IApiResponseOnPayloadSuccess } from '../interfaces/IApiResponseOnPayloadSuccess'

export const sendResponse = <T>(
  res: Response,
  data: IApiResponseOnPayloadSuccess<T>
): void => {
  const responseData: IApiResponseOnPayloadSuccess<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data || null,
  }
  res.status(200).json(responseData)
}
