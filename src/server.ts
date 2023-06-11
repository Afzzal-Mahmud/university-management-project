import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, gracefullyShutdown, successLogger } from './shared/logger'

let server: Server

async function shutdown() {
  try {
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server.close(err => {
          if (err) {
            errorLogger.error(`Error while closing server: ${err}`)
            reject(err)
          } else {
            resolve()
          }
        })
      })
    }

    await mongoose.disconnect()
    successLogger.info('Server gracefully shut down.')
    process.exit(0)
  } catch (error) {
    errorLogger.error(`Error during server shutdown: ${error}`)
    process.exit(1)
  }
}

process.on('SIGINT', () => {
  successLogger.info('SIGINT is received')
  gracefullyShutdown.info('SIGINT is received')
  shutdown()
})

process.on('SIGTERM', () => {
  successLogger.info('SIGTERM is received')
  gracefullyShutdown.info('SIGTERM is received')
  shutdown()
})

process.on('uncaughtException', error => {
  errorLogger.error(error)
  gracefullyShutdown.info('uncaughtException is received')
  shutdown()
})

process.on('unhandledRejection', error => {
  errorLogger.error(error)
  gracefullyShutdown.info('unhandledRejection is received')
  shutdown()
})

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    successLogger.info('Database is connected successfully')

    server = app.listen(config.port, () => {
      successLogger.info(
        `University Application listening on port ${config.port}`
      )
    })
  } catch (error) {
    errorLogger.error('Failed to connect to the database', error)
  }
}

main()
