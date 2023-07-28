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
            console.log(`Error while closing server: ${err}`)
            reject(err)
          } else {
            resolve()
          }
        })
      })
    }

    await mongoose.disconnect()
    console.log('Server gracefully shut down.')
    process.exit(0)
  } catch (error) {
    console.log(`Error during server shutdown: ${error}`)
    process.exit(1)
  }
}

process.on('SIGINT', () => {
  console.log('SIGINT is received')
  console.log('SIGINT is received')
  shutdown()
})

process.on('SIGTERM', () => {
  console.log('SIGTERM is received')
  console.log('SIGTERM is received')
  shutdown()
})

process.on('uncaughtException', error => {
  console.log(error)
  console.log('uncaughtException is received')
  shutdown()
})

process.on('unhandledRejection', error => {
  console.log(error)
  console.log('unhandledRejection is received')
  shutdown()
})

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database is connected successfully')

    server = app.listen(config.port, () => {
      console.log(`University Application listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('Failed to connect to the database', error)
  }
}

main()
