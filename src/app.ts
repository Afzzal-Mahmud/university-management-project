import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { userRoutes } from './app/modules/users/users.route'
import { academicSemesterRoute } from './app/modules/academicSemester/academicSemester.route'

const app: Application = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('initial setup completed')
})

// User routes
app.use('/api/v1/users/', userRoutes.router)
// Semester routes
app.use('/api/v1/create-semesters/', academicSemesterRoute.router)

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(err, req, res, next)
})

export default app
