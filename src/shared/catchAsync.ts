import { Request, Response, NextFunction, RequestHandler } from 'express'
export const catchAsync =
  (ReqCallbackFn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await ReqCallbackFn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
