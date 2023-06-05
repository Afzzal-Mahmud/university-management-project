import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import usersRouter from './app/modules/users/users.route'
const app: Application = express()
app.use(cors())

/* perser */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application route
app.use('/api/v1/users/', usersRouter)
// route
app.get('/', (req: Request, res: Response) => {
  res.send('initial set up completed')
})
export default app
