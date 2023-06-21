import { Request, Response } from 'express'

export const handleNotFoundRoute = (req: Request, res: Response) => {
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
}
