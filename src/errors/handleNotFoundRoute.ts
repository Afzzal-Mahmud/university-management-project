import { NextFunction, Request, Response } from 'express'

export const handleNotFoundRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseMessage = res.status(404).json({
      success: false,
      message: 'Bad Request',
      errorMessage: [
        {
          path: req.originalUrl,
          message: 'Page Not Found',
        },
      ],
    })
    return responseMessage
  } catch (error) {
    next(error)
  }
}
