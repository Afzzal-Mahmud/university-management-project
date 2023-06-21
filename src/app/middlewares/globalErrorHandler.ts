import { ErrorRequestHandler } from 'express'
import { Error as MongooseError } from 'mongoose'
import ApiErrors from '../../errors/ApiErrors'
import config from '../../config'
import { IGenericErrorMessages } from '../../interfaces/IGenericErrorMessages'
import { ZodError } from 'zod'

const globalErrorHandler: ErrorRequestHandler = (err, req, res) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessages[] = []

  if (err instanceof MongooseError.ValidationError) {
    statusCode = 400
    message = 'Validation Error'
    errorMessages = Object.values(err.errors).map(error => ({
      path: error.path as string,
      message: error.message,
      stack: error?.stack,
    }))
  } else if (err instanceof ZodError) {
    statusCode = 400
    message = 'Zod Error'
    /*valuesFromZodErr returns array of object so, 
            I thought distructuring[] would be good*/
    const [valuesFromZodErr] = err.issues.map(issue => ({
      /* path returns array of array where we 
      are only taking the last property*/
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    }))

    const zodPath = valuesFromZodErr.path
    const zodMessage = valuesFromZodErr.message

    errorMessages.push({
      path: zodPath,
      message: zodMessage,
    })
  } else if (err instanceof MongooseError.CastError) {
    statusCode = 400
    message = 'Cast Error'
    errorMessages.push({
      path: err.path as string,
      message: `CastError: ${err.message}`,
      stack: err?.stack,
    })
  } else if (err instanceof ApiErrors) {
    statusCode = err.statusCode
    message = 'Api Error'
    errorMessages.push({
      path: '',
      message: `ApiError: ${err.message}`,
      stack: err?.stack,
    })
  } else if (err instanceof Error) {
    errorMessages.push({
      path: 'unknown path',
      message: `Extra Error: ${err.message}`,
      stack: err?.stack,
    })
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : message,
  })
}
export default globalErrorHandler
